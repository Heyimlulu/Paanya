const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

class CryCommand extends Command {
    constructor() {
        super('cry', {
            aliases: ['cry'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Why are you sad ;c',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let image = await roleplay('cry');

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(`😢 ${message.author} cries`)
            .setImage(image)
            .setFooter('Powered by waifu.pics')

        await message.channel.send(embed);

    }
}

module.exports = CryCommand;