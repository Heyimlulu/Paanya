const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class DogFactCommand extends Command {
    constructor() {
        super('dogfact', {
            aliases: ['dogfact'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Get a random dog facts! 🐶',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://dog-api.kinduff.com/api/facts`).then((response) => {
            return response.json();
        }).then((response) => {

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle('Random dog fact 🐶')
                .setDescription(response.facts)

            message.channel.send(embed);
        })

    }
}

module.exports = DogFactCommand;