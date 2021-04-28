const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class DanceCommand extends Command {
    constructor() {
        super('dance', {
            aliases: ['dance'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Are you a good dancer?',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch(`https://waifu.pics/api/sfw/dance`).then((response) => {
            return response.json();
        }).then((response) => {

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`${message.author} just want to dance right now :musical_note:`)
                .setImage(response.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);

        });

    }
}

module.exports = DanceCommand;