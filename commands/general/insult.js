const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class InsultCommand extends Command {
    constructor() {
        super('insult', {
            aliases: ['insult'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Generate an insult from evilinsult.com',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json').then(response => {
            return response.json();
        }).then(response => {
            message.channel.send(response.insult);
        })

    }
}

module.exports = InsultCommand;