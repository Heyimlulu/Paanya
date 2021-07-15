const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class BonkCommand extends Command {
    constructor() {
        super('bonk', {
            aliases: ['bonk'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Hit/Bonk the mentionned user',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            fetch(`https://waifu.pics/api/sfw/bonk`).then((response) => {
                return response.json();
            }).then((response) => {

                const embed = new Discord.MessageEmbed()
                    .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                    .setDescription(`${message.author} hits ${member}`)
                    .setImage(response.url)
                    .setFooter('Powered by waifu.pics')

                message.channel.send(embed);

            });

        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = BonkCommand;