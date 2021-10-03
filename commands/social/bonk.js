const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

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

            let image = await roleplay('bonk');

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`${message.author} hits ${member}`)
                .setImage(image)
                .setFooter('Powered by waifu.pics')

            await message.channel.send(embed);

        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = BonkCommand;