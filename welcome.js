const { MessageEmbed } = require('discord.js');
 
module.exports = {
  handleWelcome: function(member) {
    const welcomeChannel = member.guild.channels.cache.get('1001681690198036500');
    if (welcomeChannel) {
      const embed = new MessageEmbed()
        .setTitle(`Welcome to ${member.guild.name}`)
        .setDescription(`
:black_small_square: Check out the rules at <#1001716534416252998>
:black_small_square: Select your roles at <#1001716586144604250>
:black_small_square: Please do your intro at <#1001735483400925204>
:black_small_square: **__We are so happy to see you here!__**
        `)
        .setImage('https://cdn.discordapp.com/attachments/1051112638156902430/1051240938414014624/ezgif-4-98a0ac7524.gif')
        .setColor('#130216')
        .setFooter(`${member.user.username}, you are the ${member.guild.memberCount}th member!`, member.user.displayAvatarURL());
 
      welcomeChannel.send({ embeds: [embed] });
    }
  }
};
