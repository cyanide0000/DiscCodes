const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            message.channel.send("You need the 'ban' permission to use that command!");
            return;
        }

        if (args.length < 1) {
            message.channel.send('**✍️ | Please mention someone or type the user ID to ban someone.**');
            return;
        }

        const user = message.mentions.users.first() || await message.guild.members.fetch(args[0]).catch(() => null);
        if (!user) {
            message.channel.send('**✍️ | Please mention someone or type the user ID to ban someone.**');
            return;
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            await message.guild.members.ban(user, { reason });
            const embed = new MessageEmbed()
                .setTitle('Ban')
                .setDescription(`Successfully Banned <@${user.id}>\nModerator: <@${message.author.id}>\n\nReason: \`${reason}\``)
                .setColor('#ad3e88')
                .setFooter(`Banned by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **| Error: Unable to ban the user**');
        }
    },
};
