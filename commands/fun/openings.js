const { Command } = require('discord-akairo');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

class OpeningsCommand extends Command {
    constructor() {
        super('openings', {
            aliases: ['openings', 'endings'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Fetch a random anime opening or ending from https://openings.moe/',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const uid = await axios.get('https://openings.moe/api/list.php')
        .then(async (response) => {
            const list = await response.data
            const i = Math.floor((Math.random() * list.length) + 1);
            
            return list[i].uid; // Get video UID
        });

        const video = await axios.get(`https://openings.moe/api/details.php?name=${uid}`);

        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(`${video.data.song.title} by ${video.data.song.artist} (from ${video.data.source})`)
            .setDescription(`[mp4](https://openings.moe/video/${video.data.file}.mp4) | [webm](https://openings.moe/video/${video.data.file}.webm)`)
            .setThumbnail('https://openings.moe/assets/logo/512px.png')
            .setFooter('Powered by https://openings.moe/')

        await message.channel.send(embed);

    }
}

module.exports = OpeningsCommand;