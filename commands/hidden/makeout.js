const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

class MakeoutCommand extends Command {
    constructor() {
        super('makeout', {
            aliases: ['makeout'],
            category: 'hidden',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'string'
                }
            ],
            description: {
                content: 'Makeout with the user',
                usage: '[@user]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            const response = await fetch(`https://g.tenor.com/v1/search?q=anime%20makeout&key=${process.env.TENOR_SECRET_KEY}&limit=50`);
            const res = await response.json();

            let i = Math.floor((Math.random() * res.results.length));
            
            await message.channel.send(`${message.author} makeout with ${member} 💕\n${res.results[i].url}`);
        } else {
            return message.reply('You have to mentionned a user first!')
        }

    }
}

module.exports = MakeoutCommand;