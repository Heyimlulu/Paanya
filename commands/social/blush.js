const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class BlushCommand extends Command {
    constructor() {
        super('blush', {
            aliases: ['blush'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Will make you embarassed or blushy',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://waifu.pics/api/sfw/blush`).then((response) => {
            return response.json();
        }).then((response) => {

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`${message.author} became all blushy :point_right: :point_left:`)
                .setImage(response.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);

        });

    }
}

module.exports = BlushCommand;