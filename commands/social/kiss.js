const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class KissCommand extends Command {
    constructor() {
        super('kiss', {
            aliases: ['kiss'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'string'
                }
            ],
            description: {
                content: 'Give a kiss to the mentionned user',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            fetch(`https://waifu.pics/api/sfw/kiss`).then((response) => {
                return response.json();
            }).then((response) => {

                const embed = new Discord.MessageEmbed()
                    .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                    .setDescription(`${message.author} kissed ${member} :heart:`)
                    .setImage(response.url)
                    .setFooter('Powered by waifu.pics')

                message.channel.send(embed);

            });

        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = KissCommand;