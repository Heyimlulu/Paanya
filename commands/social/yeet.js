const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class YeetCommand extends Command {
    constructor() {
        super('yeet', {
            aliases: ['yeet'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Which user do you want to yeet',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            fetch(`https://waifu.pics/api/sfw/yeet`).then((response) => {
                return response.json();
            }).then((response) => {

                const embed = new Discord.MessageEmbed()
                    .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                    .setDescription(`${message.author} yeets ${member}`)
                    .setImage(response.url)
                    .setFooter('Powered by waifu.pics')

                message.channel.send(embed);

            });

        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = YeetCommand;