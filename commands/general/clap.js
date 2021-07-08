const { Command } = require('discord-akairo');

class ClapCommand extends Command {
    constructor() {
        super('clap', {
            aliases: ['clap'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'Write something so i can replace the space with clap',
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Replace👏spaces👏with👏clap👏emote',
                usage: '[text]',
                examples: ['Hello how are you doing?']
            }
        });
    }

    async exec(message, args) {

        if (!args.text) return;

        let clap = args.text.replace(/ /g, '👏');

        await message.delete();
        await message.channel.send(`${clap}`);

    }
}

module.exports = ClapCommand;