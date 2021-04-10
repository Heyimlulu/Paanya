const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play'],
            category: 'fun',
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

    exec(message, args) {

        let url = args.url;

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You must be in a voice channel first');

        if (args.url == 'stop') {

            voiceChannel.leave();
            return message.channel.send('I left the channel');

        } else {

            voiceChannel.join().then(voiceChannel => {
                
                const stream = ytdl(url, { filter: "audioonly" });
                const dispatcher = voiceChannel.play(stream);

                dispatcher.on('finish', () => voiceChannel.disconnect());

            }).catch(err => {

                console.log('ERROR:', err);
                voiceChannel.leave();
                return message.channel.send('An error has occured! is the link you sent me valid?');

            })

        }

    }
}

module.exports = PlayCommand;