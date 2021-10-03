const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

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
            let image;

            // Randomly generated number between 0 and 1
            let i = Math.floor(Math.random() * 2);

            switch (i) {
                case 0:
                    image = await roleplay('hug');
                    break;
                case 1:
                    image = await roleplay('glomp');
                    break;
            }

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`🤗 ${message.author} hugs ${member}`)
                .setImage(image)
                .setFooter('Powered by waifu.pics')

            await message.channel.send(embed);

        } else {
            return message.reply('You have to mention a user first!')
        }

    }
}

module.exports = HugCommand;