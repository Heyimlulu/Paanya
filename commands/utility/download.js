/*
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');
const os = require('os');

class DownloadCommand extends Command {
    constructor() {
        super('download', {
            aliases: ['download'],
            category: 'utility',
            clientPermissions: "ATTACH_FILES",
            args: [
                {
                    id: 'url',
                    type: 'string',
                    prompt: {
                        start: 'Which video do you want me to downlaod?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Download videos from youtube',
                usage: '[url-to-video]',
                example: ['url-to-video']
            }
        });
    }

    exec(message, args) {

        let url = args.url;
        let output = `${os.tmpdir()}/${message.id}_video.mp4`; // filename

        if (url.includes("http") || url.includes("www")) {
            message.channel.send('Downloading...').then(msg => {

                let video = youtubedl(url); // Get the url from the user

                video.pipe(fs.writeFile(output));

                // on error
                video.on('error', function error(err) {

                    console.log('error :', err);
                    message.channel.send("An error has occured, i can't download from the link you provided.")

                });

                // on end or if download is finished
                video.on('end', function () {

                    message.channel.send(`Downloaded by ${message.author.username}`, {files: [output]})
                        .then(msg.edit('**Download successful!**'))
                        .catch(error => message.channel.send('Uh Oh... File is too big'))

                })
            })
        } else {
            message.channel.send("You need to input a valid link");
        }

    }
}

module.exports = DownloadCommand;

 */