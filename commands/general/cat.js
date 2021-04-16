const { Command } = require('discord-akairo');

class CatCommand extends Command {
    constructor() {
        super('cat', {
            aliases: ['cat'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'Write something so i can replace the space with :cat:',
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Replace:cat:what:cat:you:cat:write:cat:with:cat:spaces',
                usage: '[text]',
                examples: ['Hello how are you doing?']
            }
        });
    }

    exec(message, args) {

        if (!args.text) return;

        let clap = args.text.replace(/ /g, ':cat:');

        message.delete();
        message.channel.send(`${clap}:cat:`);

    }
}

module.exports = CatCommand;