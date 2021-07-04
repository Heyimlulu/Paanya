const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class HappyCommand extends Command {
    constructor() {
        super('happy', {
            aliases: ['happy'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Show to everyone how you are happy today',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://waifu.pics/api/sfw/smile`).then((response) => {
            return response.json();
        }).then((response) => {

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`${message.author} is feeling happy today`)
                .setImage(response.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);

        });

    }
}

module.exports = HappyCommand;