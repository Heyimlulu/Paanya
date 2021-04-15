const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const embed = new Discord.MessageEmbed().setTitle('Music');
let musicQueue = [];

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play'],
            category: 'fun',
            clientPermissions: ['CONNECT', 'SPEAK'],
            args: [
                {
                    id: 'url',
                    type: 'string',
                    prompt: {
                        start: 'Which video do you want me to play?'
                    }
                }
            ],
            description: {
                content: 'Play a song from youtube in a voice channel',
                usage: '[youtube link]',
                examples: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ']
            }
        });
    }

    async exec(message, args) {

        let youtubeUrl = args.url;

        if (musicQueue.some(url => url === youtubeUrl)) {
            embed.setDescription("Url is already in queue!");
        } 

        musicQueue.push(youtubeUrl);
        embed.setDescription('Url has been added in the queue!');
        await message.channel.send(embed);

        let vc = message.member.voice.channel;
        if(vc && vc.connection) {
            if(!vc.connection.speaking) {
                await this.playSong(vc.connection);
            } else {
                console.log(musicQueue);
            }
        }

        if (args.url == 'stop') {
            vc.leave();
            embed.setDescription('I left the channel!');
            return message.channel.send(embed);
        }
    }

    async playSong(connection) {

        const stream = ytdl(musicQueue[0], { filter: "audioonly" });
        console.log(musicQueue[0])
        const dispatcher = connection.play(stream);

        dispatcher.on('start', () => {
            embed.setDescription(`Playing ${musicQueue[0]}`);
        });

        dispatcher.on('end', () => {
            console.log("Finished song.");
            musicQueue.shift(); // Remove song from list

            if (musicQueue.length === 0) {
                console.log("No more songs to be played...");
                connection.disconnect();
            } else {
                setTimeout(() => {
                    this.playSong(connection);
                }, 500)
            }
        });

    }
}

module.exports = PlayCommand;