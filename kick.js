const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send("You can't use this command");
            return;
        }

        if (args.length < 1) {
            message.channel.send('**✍️ | Please mention the user**');
            return;
        }

        const user = message.mentions.users.first();
        if (!user) {
            message.channel.send('**✍️ | Please mention the user**');
            return;
        }

        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            message.channel.send('❌ **| Error: User not found in the server**');
            return;
        }

        try {
            await member.kick();
            const embed = new MessageEmbed()
                .setTitle('Kick')
                .setColor('#ad3e88')
                .setDescription(`${user.username} Kicked from the server`)
                .setImage('https://c.tenor.com/NiIDNzA6g-MAAAAC/kickbutt-anime.gif')
                .setFooter(`Made by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **| Error: Unable to kick the user**');
        }
    },
};
