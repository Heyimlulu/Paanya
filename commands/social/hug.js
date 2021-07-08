const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class HugCommand extends Command {
    constructor() {
        super('hug', {
            aliases: ['hug'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'string'
                }
            ],
            description: {
                content: 'Give a hug to the mentionned user',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            let response;
            let hug;

            // Randomly generated number between 0 and 1
            let i = Math.floor(Math.random() * 2);

            if (i === 0) {
                response = await fetch('https://waifu.pics/api/sfw/hug');
                hug = await response.json();
            } else if (i === 1) {
                response = await fetch('https://waifu.pics/api/sfw/glomp');
                hug = await response.json();
            }

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`🤗 ${message.author} hugs ${member}`)
                .setImage(hug.url)
                .setFooter('Powered by waifu.pics')

            await message.channel.send(embed);

        } else {
            return message.reply('You have to mention a user first!')
        }

    }
}

module.exports = HugCommand;