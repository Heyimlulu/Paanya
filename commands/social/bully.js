const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class BullyCommand extends Command {
    constructor() {
        super('bully', {
            aliases: ['bully'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'string'
                }
            ],
            description: {
                content: 'Bully the mentionned user',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            fetch(`https://waifu.pics/api/sfw/bully`).then((response) => {
                return response.json();
            }).then((response) => {

                const embed = new Discord.MessageEmbed()
                    .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                    .setDescription(`😈 ${message.author} the meanie bullies ${member}`)
                    .setImage(response.url)
                    .setFooter('Powered by waifu.pics')

                message.channel.send(embed);

            });

        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = BullyCommand;