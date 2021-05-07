const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class InsultCommand extends Command {
    constructor() {
        super('insult', {
            aliases: ['insult'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'lang',
                    type: ['cn', 'de', 'el', 'en', 'es', 'fr', 'ru', 'sw'],
                    optional: true
                }
            ],
            description: {
                content: 'Generate an insult from evilinsult.com',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let lang = 'en';

        if (args.lang) {
            lang = args.lang;
        }

        fetch(`https://evilinsult.com/generate_insult.php?lang=${lang}&type=json`).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            message.channel.send(response.insult);
        })

    }
}

module.exports = InsultCommand;