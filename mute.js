const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mute a user in the server',
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

        // Check if a reason is provided
        if (args.length < 2) {
            message.channel.send('Please mention user and reason.');
            return;
        }

        const user = message.mentions.users.first();
        const member = message.guild.members.cache.get(user.id);
        const reason = args.slice(1).join(' ');

        if (!member) {
            message.channel.send('❌ **| Error: User not found in the server**');
            return;
        }

        // Find or create the Muted role
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: 'Muted',
                    color: '#ad3e88',
                    permissions: []
                });

                // Adjust channel permissions for the new role
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.edit(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
                });
            } catch (error) {
                console.error(error);
                message.channel.send('❌ **| Error: Unable to create Muted role**');
                return;
            }
        }

        try {
            await member.roles.add(muteRole);

            const embed = new MessageEmbed()
                .setTitle('Mute')
                .setDescription(`Successfully Muted <@${user.id}>\nModerator: <@${message.author.id}>\n\nReason: \`${reason}\``)
                .setFooter(`Muted User ID: ${user.id}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('#ad3e88');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **| Error: Unable to mute the user**');
        }
    },
};
