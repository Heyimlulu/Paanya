const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

class DanceCommand extends Command {
    constructor() {
        super('dance', {
            aliases: ['dance'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Just dance ;)',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let image = await roleplay('dance');

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(`${message.author} suddenly started dancing`)
            .setImage(image)
            .setFooter('Powered by waifu.pics')

        await message.channel.send(embed);

    }
}

module.exports = DanceCommand;