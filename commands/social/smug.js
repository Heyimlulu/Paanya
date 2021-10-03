const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

class SmugCommand extends Command {
    constructor() {
        super('smug', {
            aliases: ['smug'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Show an excessive pride of yourself',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let image = await roleplay('smug');

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(`🥴 ${message.author} smugs`)
            .setImage(image)
            .setFooter('Powered by waifu.pics')

        await message.channel.send(embed);

    }
}

module.exports = SmugCommand;