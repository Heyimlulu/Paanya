const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

class HappyCommand extends Command {
    constructor() {
        super('happy', {
            aliases: ['happy'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Show to everyone how you are happy today',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let image = await roleplay('smile');

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(`😀 ${message.author} is happy`)
            .setImage(image)
            .setFooter('Powered by waifu.pics')

        await message.channel.send(embed);
    }
}

module.exports = HappyCommand;