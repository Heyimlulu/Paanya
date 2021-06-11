const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const extract = require('meta-extractor');

class MediumCommand extends Command {
    constructor() {
        super('medium', {
            aliases: ['medium'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'url',
                    type: 'url'
                }
            ],
            description: {
                content: 'Read an article from Medium from the link you provide',
                usage: '[url]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let url = args.url;
        if (!url) return;

        let search = url.replace(/(^\w+:|^)\/\//, '');

        const embed = new MessageEmbed()
        .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL());

        await extract({ uri: `https://raaom.herokuapp.com/${search}` }, (err, res) => {
            
        embed.setTitle(res.ogTitle)
        .setURL(`https://raaom.herokuapp.com${res.pathname}`)
        .setDescription(res.description)
        .setImage(res.ogImage)
        .setFooter(`Powered by RAAOM & Medium`)
        
        return message.channel.send(embed);
        });

    }
}

module.exports = MediumCommand;