const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unlockchannel',
    description: 'Unlock the current channel',
    async execute(message, args) {
        // Check if the user is an admin
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send("Only Admin can use this command.");
            return;
        }

        // Get the reason for unlocking the channel
        const reason = args.join(' ') || 'No reason provided';

        // Unlock the channel by modifying the permissions
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: true,
            MENTION_EVERYONE: false
        });

        const embed = new MessageEmbed()
            .setTitle('🔓 | **Unlocked**')
            .setColor('#ad3e88')
            .setDescription(reason)
            .setFooter(`Action by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        // Send the embed message
        await message.channel.send({ embeds: [embed] });

        // Delete the command message
        await message.delete();
    },
};
