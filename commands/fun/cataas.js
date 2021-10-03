const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

class CataasCommand extends Command {
    constructor() {
        super('cataas', {
            aliases: ['cataas', 'randomcat', 'cats'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Get a random cat pics.',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const response = await axios.get('https://cataas.com/cat?json=true');

        const url = response.data.url;
        const tags = response.data.tags;

        const embed = new MessageEmbed()
        .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
        .setImage(`https://cataas.com${url}`)
        .setFooter(tags)

        await message.channel.send(embed);
    }
}

module.exports = CataasCommand;