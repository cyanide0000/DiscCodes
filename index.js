const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});
 
app.listen(3000, () => {
  console.log('The project is ready');
});
 
const { Client, Intents } = require('discord.js');
const { handleBoost } = require('./commands/boost');
const { handleStick, handleUnstick, loadStickyData, saveStickyData } = require('./commands/stick');
const { handleWelcome } = require('./commands/welcome'); // Import the handleWelcome function
 
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
 
let stickyData = {
  content: '',
  channel: '',
  maxStickMessageCount: 1,
  count: 0,
  lastStickyMessage: null
};
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  loadStickyData(); // Load sticky data on bot startup
});
 
client.on('messageCreate', async (message) => {
  // Ignore messages sent by the bot itself
  if (message.author.bot) return;
 
  // Check if the message is in the specified channel
  if (message.channelId === '1001735483400925204') {
    const stickyMessage = `
Please, fill in the aforementioned 
 
━━━━━━━━━━━━━━━━━━━━━━━━
Name: 
Age:
Birthday: 
Gender: 
Sexual Orientation: 
Pronouns: 
Likes: 
Dislikes:
━━━━━━━━━━━━━━━━━━━━━━━━
`;
    // Send the sticky message without replying to the user
    message.channel.send({ content: stickyMessage });
  }
 
  // Other message handling logic
  if (message.content === 'ping') {
    message.reply('pong');
  }
 
  handleStick(message, stickyData);
  handleUnstick(message, stickyData);
});
 
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  await oldMember.fetch();
  await newMember.fetch();
 
  const boostingChannelId = '1001720504325001246'; // Replace with the ID of the channel you want to send the message to
  const premiumSubscriberRole = '1001718034676854897'; // Replace with the ID of the boosting role
 
  if (
    !oldMember.roles.cache.has(premiumSubscriberRole) &&
    newMember.roles.cache.has(premiumSubscriberRole)
  ) {
    handleBoost(client, newMember, boostingChannelId);
  }
});
 
client.on('guildMemberAdd', (member) => {
  // Call the handleWelcome function when a new member joins the server
  handleWelcome(member);
});
 
client.login(process.env.token);
 
process.on('SIGINT', () => {
  saveStickyData(); // Save sticky data on bot shutdown
  process.exit();
});
