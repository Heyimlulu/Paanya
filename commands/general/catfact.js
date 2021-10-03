const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

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

        await axios.get('https://catfact.ninja/fact')
        .then(async (response) => {

            const result = response.data;

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle('Random cat fact 🐱')
                .setDescription(result.fact)

            await message.channel.send(embed);

        })

    }
}

module.exports = CatFactCommand;