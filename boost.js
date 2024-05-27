const { MessageEmbed } = require('discord.js');

async function handleBoost(client, member, boostingChannelId) {
  const boostingChannel = client.channels.cache.get(boostingChannelId);
  if (boostingChannel && boostingChannel.isText()) {
    const embed = new MessageEmbed()
      .setTitle('Thank You for Boosting!')
      .setDescription(
        `Thank you, ${member.user.username}, for boosting our server! We appreciate your support.`
      )
      .setColor('#ffb7c5') // Replace with your desired color
      .setImage('https://media.tenor.com/ggQxZOGeZQsAAAAC/thank-you-sweetheart.gif')
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(`Server Boosts: ${member.guild.premiumSubscriptionCount}`, member.guild.iconURL());

    try {
      await boostingChannel.send({ embeds: [embed] });
      console.log(`Thank you message sent to ${member.user.username}`);
    } catch (error) {
      console.error(`Failed to send thank you message: ${error}`);
    }
  }
}

module.exports = {
  handleBoost
};
