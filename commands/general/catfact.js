const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

class CatFactCommand extends Command {
    constructor() {
        super('catfact', {
            aliases: ['catfact'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Get a random cat facts! 🐱',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://catfact.ninja/fact`).then((response) => {
            return response.json();
        }).then((response) => {

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle('Random cat fact 🐱')
                .setDescription(response.fact)

            message.channel.send(embed);
        })

    }
}

module.exports = CatFactCommand;