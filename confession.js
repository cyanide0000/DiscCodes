const { Client, Intents, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const cooldowns = new Map();
const COOLDOWN_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();
    const content = args.join(' ');

    if (command === 'c!') {
        if (args.length < 1) {
            message.channel.send('❌ **| Error**');
            return;
        }

        const userId = message.author.id;
        const now = Date.now();

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + COOLDOWN_TIME;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = Math.floor(timeLeft % 60);
                message.channel.send(`**Woah, slow down there Never!** You're still on a cool down, wait for **${minutes}m ${seconds}s** before you can send a new confession`);
                return;
            }
        }

        cooldowns.set(userId, now);

        // First channel message
        const channel1 = client.channels.cache.get('1001823035013210133');
        if (channel1) {
            const embed1 = new MessageEmbed()
                .setTitle(`username: ${message.author.username}`)
                .setDescription(content)
                .setColor('#ad3e88')
                .setFooter('Nevers Confession');
            channel1.send({ embeds: [embed1] });
        }

        // Second channel message
        const channel2 = client.channels.cache.get('1001823277146194020');
        if (channel2) {
            const embed2 = new MessageEmbed()
                .setTitle('Confession')
                .setDescription(`<@${message.author.id}>\n\n${content}`)
                .setColor('#ad3e88')
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter(`UserID: ${message.author.id}`);
            channel2.send({ embeds: [embed2] });
        }

        // Confirmation message
        const embed3 = new MessageEmbed()
            .setTitle('Confession')
            .setDescription('✍️ | Your confession has been sent successfully!')
            .setColor('#ad3e88')
            .setFooter("Don't worry your confession is safe with us!", message.author.displayAvatarURL());
        message.channel.send({ embeds: [embed3] });

    }
});

