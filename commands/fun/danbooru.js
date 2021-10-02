const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { danbooru } = require('../../config.json');

class DanbooruCommand extends Command {
    constructor() {
        super('danbooru', {
            aliases: ['danbooru', 'danb'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Get a random anime picture from Danbooru. (Images may be NSFW, so be careful!) (You must use this command in a NSFW channel!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        await axios.get(`https://danbooru.donmai.us/explore/posts/popular.json?api_key=${process.env.DANBOORU_SECRET_KEY}&login=${danbooru.login}&limit=100`)
        .then(async (response) => {

            const result = await response.data;

            const i = Math.floor((Math.random() * result.length));

            if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');

            if (result[i].has_children == true || result[i].has_active_children == true || result[i].has_visible_children == true) {
                return message.channel.send('I could not send you the image because it contains blacklisted words');
            }
            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(result[i].tag_string_artist)
                .setURL(result[i].source)
                .setImage(result[i].large_file_url)
                //.setFooter(`tags: ${result[i].tag_string}`)
            
                message.channel.send(embed);

        })
    }
}

module.exports = DanbooruCommand;
