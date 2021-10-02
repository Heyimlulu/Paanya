const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const axios = require('axios');

class MeguminCommand extends Command {
    constructor() {
        super('megumin', {
            aliases: ['megumin'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Get a random Megumin pics from Konosuba!. (Some images may be NSFW, so be careful!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');

        await axios.get('https://waifu.pics/api/sfw/megumin')
        .then(async (response) => {

            const result = await response.data;

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setImage(result.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);

        })
    }
}

module.exports = MeguminCommand;