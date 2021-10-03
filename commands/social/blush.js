const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

class BlushCommand extends Command {
    constructor() {
        super('blush', {
            aliases: ['blush'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Will make you embarassed or blushy',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {


        let image = await roleplay('blush');

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(`😳 ${message.author} blushes`)
            .setImage(image)
            .setFooter('Powered by waifu.pics')

        await message.channel.send(embed);

    }
}

module.exports = BlushCommand;