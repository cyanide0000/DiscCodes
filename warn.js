const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'Warn a user in the server',
    async execute(message, args) {
        // Check if the user is an admin
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send("Sorry, you can't use this command.");
            return;
        }

        // Check if a user is mentioned and a reason is provided
        if (args.length < 2) {
            message.channel.send('Please mention a user and provide a reason.');
            return;
        }

        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ');

        if (!user) {
            message.channel.send('❌ **| Error: User not found in the server**');
            return;
        }

        // Initialize user warnings if not already set
        if (!message.client.warns) {
            message.client.warns = {};
        }
        if (!message.client.warns[user.id]) {
            message.client.warns[user.id] = 0;
        }

        // Increment user warnings
        message.client.warns[user.id] += 1;

        const embed = new MessageEmbed()
            .setTitle('Warnings!')
            .setDescription(`<@${user.id}> has been warned by <@${message.author.id}>.\n\nReason: \`${reason}\``)
            .setFooter(`Warned by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('#ad3e88');

        message.channel.send({ embeds: [embed] });
    },
};
