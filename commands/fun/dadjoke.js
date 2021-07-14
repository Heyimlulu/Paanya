const { Command } = require('discord-akairo');
const extract = require('meta-extractor');

class DadJokeCommand extends Command {
    constructor() {
        super('dadjoke', {
            aliases: ['dadjoke'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Get a random dad joke',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let jokeId = Math.floor(Math.random() * 100000000000).toString(16);

        await extract({ uri: `https://icanhazdadjoke.com/j/${jokeId}` }, (err, res) => {
            if (err) {
                return console.error('ERROR:', err);
            }
            return message.channel.send({files: [res.ogImageUrl]});
        });

    }
}

module.exports = DadJokeCommand;