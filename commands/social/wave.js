const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

class WaveCommand extends Command {
    constructor() {
        super('wave', {
            aliases: ['wave'],
            category: 'roleplay',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'string'
                }
            ],
            description: {
                content: 'Wave the mentionned user :wave:',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            let image = await roleplay('wave');

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`👋 ${message.author} waves ${member}`)
                .setImage(image)
                .setFooter('Powered by waifu.pics')

            await message.channel.send(embed);

        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = WaveCommand;