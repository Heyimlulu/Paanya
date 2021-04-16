const { Command } = require('discord-akairo');
const cleverbot = require('cleverbot-free');
let conversation = {};

class CleverBotCommand extends Command {
    constructor() {
        super('cleverbot', {
            aliases: ['cleverbot', 'chatbot', 'chat'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    id: 'message',
                    type: 'string',
                    prompt: {
                        start: 'What do you want to say to Cleverbot?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Talk to cleverbot',
                usage: '[message]',
                examples: ['Hello how are you?']
            }
        });
    }

    async exec(message, args) {

        // If there are no conversation in the guild => Start the conversation and store it in a array
        if (!conversation[message.guild.id]) conversation[message.guild.id] = [];

        // Conversation
        cleverbot(args.message).then(response => {
            conversation[message.guild.id].push(args.message);
            conversation[message.guild.id].push(response);
            return message.channel.send(response);
        });

        // Log the conversation - Will reset on bot reboot
        console.log(conversation);

    }
}

module.exports = CleverBotCommand;