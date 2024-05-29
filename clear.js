module.exports = {
    name: 'clear',
    description: 'Clear a specified number of messages from a channel',
    async execute(message, args) {
        // Check for Manage Messages permission
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            message.channel.send('❌ You need permission to delete messages!');
            return;
        }

        // Check if the number of messages to delete is specified
        if (!args[0] || isNaN(args[0]) || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) {
            message.channel.send('❌ Please specify the number of messages to be deleted (1-100 maximum).');
            return;
        }

        const deleteCount = parseInt(args[0]);

        try {
            // Fetch and delete the messages
            await message.channel.bulkDelete(deleteCount + 1, true);

            // Send a confirmation message
            const confirmationMessage = await message.channel.send(`__**✅ Clear done. ${deleteCount} message(s) deleted!**__`);

            // Delete the confirmation message after 5 seconds
            setTimeout(() => confirmationMessage.delete(), 5000);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ An error occurred while trying to delete messages.');
        }
    },
};
