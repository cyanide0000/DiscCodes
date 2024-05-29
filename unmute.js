const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Unmute a user in the server',
    async execute(message, args) {
        // Check for Kick Members permission
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            message.channel.send("You need the 'Kick Members' permission to use that command!");
            return;
        }

        // Check if a user is mentioned
        if (!message.mentions.users.size) {
            message.channel.send('**✍️ | You need to mention someone.**');
            return;
        }

        const user = message.mentions.users.first();
        const member = message.guild.members.cache.get(user.id);

        if (!member) {
            message.channel.send('❌ **| Error: User not found in the server**');
            return;
        }

        // Find the Muted role
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            message.channel.send('❌ **| Error: Muted role not found**');
            return;
        }

        try {
            await member.roles.remove(muteRole);

            const embed = new MessageEmbed()
                .setTitle('Unmute')
                .setDescription(`Successfully Unmuted <@${user.id}>\nModerator: <@${message.author.id}>`)
                .setColor('#ad3e88')
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **| Error: Unable to unmute the user**');
        }
    },
};
