const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class NomCommand extends Command {
    constructor() {
        super('nom', {
            aliases: ['nom'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Are you hungry?',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://waifu.pics/api/sfw/nom`).then((response) => {
            return response.json();
        }).then((response) => {

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`I think ${message.author} is hungry`)
                .setImage(response.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);

        });

    }
}

module.exports = NomCommand;