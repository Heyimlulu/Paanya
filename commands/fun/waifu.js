const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class WaifuCommand extends Command {
    constructor() {
        super('waifu', {
            aliases: ['waifu'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Get a random Waifu. (Some images may be NSFW, so be careful!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');

        fetch('https://waifu.pics/api/sfw/waifu').then(response => {
            return response.json();
        }).then(response => {

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setImage(response.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);


        })

    }
}

module.exports = WaifuCommand;