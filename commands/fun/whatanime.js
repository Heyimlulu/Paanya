/*
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { createCanvas } = require('canvas');

class WhatAnimeCommand extends Command {
    constructor() {
        super('whatanime', {
            aliases: ['whatanime'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'url',
                    type: 'url',
                    prompt: {
                        start: 'I need a link to an image!'
                    }
                }
            ],
            description: {
                content: 'Get the anime title from the image you provide!)',
                usage: '[image url]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let img = args.url;
        let canvas = createCanvas(1280, 720);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        fetch(`https://trace.moe/api/search`, {
            method: "POST",
            body: JSON.stringify({ image: canvas.toDataURL("image/jpeg", 0.8) }),
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            return response.json();
        }).then((result) => {

            console.log(result);

        });

    }
}

module.exports = WhatAnimeCommand;

 */