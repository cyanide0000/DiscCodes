module.exports = {
    name: 'checkwarn',
    description: 'Check the number of warnings a user has',
    async execute(message, args) {
        // Check if the user is an admin
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send("Sorry, you can't use this command.");
            return;
        }

        // Check if a user is mentioned
        if (args.length < 1) {
            message.channel.send('Please mention a user.');
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
        if (!message.client.warns[user.id]) {
            message.client.warns[user.id] = 0;
        }

        message.channel.send(`<@${user.id}> currently has \`${message.client.warns[user.id]}\` warnings.`);
    },
};
