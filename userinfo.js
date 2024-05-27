const { Client, Intents, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();

    if (command === ',userinfo') {
        let user;
        if (args.length === 0) {
            user = message.author;
        } else if (message.mentions.users.size > 0) {
            user = message.mentions.users.first();
        } else if (!isNaN(args[0])) {
            user = await client.users.fetch(args[0]).catch(() => null);
        }

        if (!user) {
            message.channel.send('❌ **| Error: User not found**');
            return;
        }

        const embed = new MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Username: \`${user.username}#${user.discriminator}\`
ID: \`${user.id}\`
Creation Date: \`${user.createdAt.toDateString()}\`
Bot: \`${user.bot}\`
Avatar: [Link](${user.displayAvatarURL({ dynamic: true })})`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('#ad3e88');

        message.channel.send({ embeds: [embed] });
    }
});
