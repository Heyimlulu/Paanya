const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class FCommand extends Command {
    constructor() {
        super('f', {
            aliases: ['f'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Press 🇫 to pay respect',
                usage: '[text]',
                examples: ['']
            }
        });
    }

    async exec(message) {


        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
            .setTitle(`${message.author.username} just pressed 🇫 to pay respect`)

        await message.channel.send(embed);

    }
}

module.exports = FCommand;