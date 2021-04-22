const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

class WaifuCommand extends Command {
    constructor() {
        super('waifu', {
            aliases: ['waifu', 'husbando'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Get a random Waifu or Husbando (Images may be NSFW, so be careful!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch('https://animu.p.rapidapi.com/waifus', {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.ANIMU_SECRET_KEY,
                "x-rapidapi-host": "animu.p.rapidapi.com",
                "useQueryString": true
            }
        }).then(response => {
            return response.json();
        }).then(response => {

            let nameJP; // need this because some japanese name may be null

            if (response.names.jp == null) {
                nameJP = 'unknown';
            } else {
                nameJP = response.names.jp;
            }

            const i = Math.floor((Math.random() * response.images.length));

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`EN: ${response.names.en}\nJP: ${nameJP}`)
                .setURL(response.images[i])
                .setDescription(`From ${response.from.name} (${response.from.type})`)
                .setImage(response.images[i])
                .setFooter(`💖 ${response.statistics.love} - 😡 ${response.statistics.hate}`)
                .setTimestamp()

            message.channel.send(embed);

        })

    }
}

module.exports = WaifuCommand;