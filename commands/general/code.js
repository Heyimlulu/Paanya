const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CodeCommand extends Command {
    constructor() {
        super('code', {
            aliases: ['code', 'codeblock'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES" ,'MANAGE_MESSAGES'],
            args: [
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What do you want me to send?'
                    },
                    match: "rest"
                },
                {
                    id: 'type',
                    type: 'string',
                    prompt: {
                        start: 'What type for the code block? use none for any'
                    },
                    optional: true
                }
            ],
            description: {
                content: 'Send a message in a code block format',
                usage: '[text] [type]',
                examples: ['Hello', 'some html code [html]']
            }
        });
    }

    exec(message, args) {

        let type = args.type;
        let text = args.text;

        if (type == 'none') {
            type = '';
        }

        if (!type) {

            message.delete();
            message.channel.send(`**${message.author.tag}**\n` + '```' + `${text}` + '```');

        } else {

            message.delete();
            message.channel.send(`**${message.author.tag}**\n` + '```' + `${type}\n` + `${text}` + '```');

        }

    }
}

module.exports = CodeCommand;