const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class FactCommand extends Command {
    constructor() {
        super('fact', {
            aliases: ['fact', 'catfact'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Get a daily cat facts! 🐱',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://cat-fact.herokuapp.com/facts`).then((response) => {
            return response.json();
        }).then((response) => {

            console.log(response);

            const i = Math.floor((Math.random() * response.length));

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(response[i].text)
                .setFooter(`Updated at: ${response[i].updatedAt}\nCreated at: ${response[i].createdAt}`)

            message.channel.send(embed);
        })

    }
}

module.exports = FactCommand;