const { Command } = require('discord-akairo');

class InviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite'],
            category: 'utility',
            description: {
                content: 'Get the invite link for the bot',
                usage: '',
                example: ['']
            }
        });
    }

    exec(message) {

        message.channel.send("You can add me from here: https://discord.com/api/oauth2/authorize?client_id=829230505123119164&permissions=842136663&scope=bot");

    }
}

module.exports = InviteCommand;