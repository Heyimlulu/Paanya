const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const roleplay = require('../../utils/roleplay');

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

            let image = await roleplay('bully');

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`😈 ${message.author} the meanie bullies ${member}`)
                .setImage(image)
                .setFooter('Powered by waifu.pics')

            await message.channel.send(embed);

        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = BullyCommand;