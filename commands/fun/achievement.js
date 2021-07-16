const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class AchievementCommand extends Command {
    constructor() {
        super('achievement', {
            aliases: ['achievement', 'mc'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args : [
                {
                    id: 'block',
                    type: 'string',
                    prompt: {
                        start: 'Which block type should I be?',
                        retry: 'It doesn\'t seem to be a valid block name, please try again!'
                    }
                },
                {
                    id: 'title',
                    type: 'string',
                    prompt: {
                        start: 'Which title should I have?'
                    }
                },
                {
                    id: 'text',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: 'Which text should I have?'
                    }
                }
            ],
            description: {
                content: 'Minecraft custom achievement generator. (Click [here](https://minecraft-api.com/achivements/blocks/) to see all available blocks list)',
                usage: '[block_type] [title] [text]',
                examples: ['apple "This is the title" This is the text']
            }
        });
    }

    async exec(message, args) {

        let block = args.block;
        if (!block) return;

        let title = args.title;
        if (!title) return
        if (title.length > 26) return message.channel.send('This title has too many characters, please try again!');

        let text = args.text;
        if (!text) return;
        if (text.length > 26) return message.channel.send('This text has too many characters, please try again!');

        try {
            const response = await fetch(`https://minecraft-api.com/api/achivements/${block}/${title}/${text}`);
            return message.channel.send(response.url.replace(/\%20/g, '..'));
        } catch {
            return message.channel.send('Uh Oh.. there was an error. Did you use a correct block name from the [list](https://minecraft-api.com/achivements/blocks/)?')
        }

    }
}

module.exports = AchievementCommand;