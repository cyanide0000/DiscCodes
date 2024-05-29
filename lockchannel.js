const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lockchannel',
    description: 'Lock the current channel',
    async execute(message, args) {
        // Check if the user is an admin
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send("Only Admin can use this command.");
            return;
        }

        // Get the reason for locking the channel
        const reason = args.join(' ') || 'No reason provided';

        // Lock the channel by modifying the permissions
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: false
        });

        const embed = new MessageEmbed()
            .setTitle('🔒 | **Channel Locked**')
            .setColor('#ad3e88')
            .setDescription(`<#${message.channel.id}> has been locked`)
            .addField('Reason:', `**${reason}**`)
            .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));

        // Send the embed message
        await message.channel.send({ embeds: [embed] });

        // Delete the command message
        await message.delete();
    },
};
