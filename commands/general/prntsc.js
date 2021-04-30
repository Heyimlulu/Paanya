const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const extract = require('meta-extractor');

class PrntscCommand extends Command {
    constructor() {
        super('prntsc', {
            aliases: ['prntsc', 'screenshot'],
            category: 'general',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: '',
                usage: '[]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let url = generator();

        function generator() {
            return 'xxyyyy'.replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        const embed = new MessageEmbed();

        await extract({ uri: `https://prnt.sc/${url}/` }, (err, res) => {

            console.log(res)

            if(!res.hasOwnProperty('ogImage')) return console.log('Could not fetch screenshot');

            embed.setTitle(res.ogTitle)
                .setDescription(res.ogDescription)
                .setURL(res.ogUrl)
                .setImage(res.ogImage)
                //.setThumbnail(res.images[2])
                .setFooter(res.title);

            return message.channel.send(embed);
        });

    }
}

module.exports = PrntscCommand;