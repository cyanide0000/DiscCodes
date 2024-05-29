const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'removewarns',
    description: 'Remove all warnings from a user',
    async execute(message, args) {
        // Check if the user is an admin
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send("You aren't an admin, so you can't use this command!");
            return;
        }

        // Check if a user is mentioned
        if (args.length < 1) {
            message.channel.send('Please Mention Someone!!');
            return;
        }

        const user = message.mentions.users.first();
        if (!user) {
            message.channel.send('❌ **| Error: User not found in the server**');
            return;
        }

        // Initialize user warnings if not already set
        if (!message.client.warns) {
            message.client.warns = {};
        }

        // Reset user warnings
        message.client.warns[user.id] = 0;

        const embed = new MessageEmbed()
            .setTitle('WARNINGS')
            .setDescription(`Removed all Warnings from <@${user.id}>!`)
            .setFooter('Moderation')
            .setColor('#ad3e88');

        message.channel.send({ embeds: [embed] });
    },
};
