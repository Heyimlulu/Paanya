const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const config = require('../../config.json');

class SafebooruCommand extends Command {
    constructor() {
        super('safebooru', {
            aliases: ['safebooru', 'safeb'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Get a random anime picture from Safebooru. (Some images may be NSFW, so be careful!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        fetch(`https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1`).then((response) => {
            return response.json();
        }).then((response) => {

            const i = Math.floor((Math.random() * response.length));

            //console.log(`https://safebooru.org/images/3308/${response[i].image}`);

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setImage(`https://safebooru.org/images/3308/${response[i].image}`)
                //.setFooter(`tags: ${response[i].tags}`)

            message.channel.send(embed);
        });

    }
}

module.exports = SafebooruCommand;