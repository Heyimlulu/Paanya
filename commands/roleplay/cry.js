const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class CryCommand extends Command {
    constructor() {
        super('cry', {
            aliases: ['cry'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Why are you sad ;c',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://waifu.pics/api/sfw/cry`).then((response) => {
            return response.json();
        }).then((response) => {

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`${message.author} is sad ;c`)
                .setImage(response.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);

        });

    }
}

module.exports = CryCommand;