const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

class GiphyCommand extends Command {
    constructor() {
        super('giphy', {
            aliases: ['giphy'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'gif',
                    type: 'string',
                    prompt: {
                        start: 'Which gif would you like to share?'
                    }
                }
            ],
            description: {
                content: 'Send some random gif from giphy',
                usage: '[cat]',
                examples: ['cat']
            }
        });
    }

    exec(message, args) {

        let search = args.gif;

        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_SECRET_KEY}=${search}`).then((response) => {
            return response.json();

        }).then((response) => {

            if (response.success == 'false') return message.channel.send('An error has occurred');

            const i = Math.floor((Math.random() * response.data.length));

            if (response.data[i].hasOwnProperty('title')){
                var title = response.data[i].title;
            } else {
                var title = 'Untitled';
            }

            message.channel.send(`**${title}**\n${response.data[i].url}`);

        });

    }
}

module.exports = GiphyCommand;