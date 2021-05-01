const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class InspiroBotCommand extends Command {
    constructor() {
        super('ib', {
            aliases: ['ib', 'inspirobot'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES" ,'EMBED_LINKS'],
            description: {
                content: 'Get an inspirational quote image from InspiroBot',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const embed = new MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('InspiroBot')
            .setFooter('Powered by https://inspirobot.me/')

        fetch('http://inspirobot.me/api?generate=true')
            .then(res => res.text())
            .then(body => {

                embed.setImage(body)
                    .setURL(body);
                

                message.channel.send(embed);

            });

    }
}

module.exports = InspiroBotCommand;