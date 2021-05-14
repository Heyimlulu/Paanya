const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { createCanvas, loadImage } = require('canvas');

class WhatAnimeCommand extends Command {
    constructor() {
        super('whatanime', {
            aliases: ['whatanime'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'link',
                    type: 'url'
                }
            ],
            description: {
                content: 'Search the anime title from the image you provide! (May not work always!)',
                usage: '[image url or attachment]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let url = '';
        let Attachment = (message.attachments).array();

        if (args.link) {
            url = args.link.href;
        } else {
            url = Attachment[0].url;
        }

        //let img = url; // select image
        let canvas = createCanvas(1000, 1000);
        let background = await loadImage(url).catch(() => {
            return message.channel.send('An error as occurred, please try again. Is it a correct image?');
        });

        let ctx = canvas.getContext("2d");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        fetch("https://trace.moe/api/search", {
            method: "POST",
            body: JSON.stringify({ image: canvas.toDataURL("image/jpeg", 0.8) }),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((result) => {

                console.log(result);

                if (result.error == 429) return message.channel.send('You are requesting too fast. Please try in a moment');

                const embed = new MessageEmbed();

                if (result.docs[0].is_adult === true) embed.addField('Mature', '🔞')

                    embed.setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                        .setDescription(`${result.docs[0].title_english} (${result.docs[0].title_native})`)
                        .setImage(url)
                        .setFooter('Powered by trace.moe')


                message.channel.send(embed);

            }).catch(() => {
                message.channel.send('I couldn\'t find anything with this image. Please try again');
        })

    }
}

module.exports = WhatAnimeCommand;