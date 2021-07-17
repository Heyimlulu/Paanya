const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const os = require('os');
const fs = require('fs');
const download = require('../../utils/download');

class DownloadCommand extends Command {
    constructor() {
        super('download', {
            aliases: ['download'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    prompt: {
                        start: 'Which youtube video do you want to download?',
                        retry: 'It doesn\'t seem to be a valid youtube URL, please try again!'
                    }
                }
            ],
            description: {
                content: 'Download videos from youtube',
                usage: '[url to video]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let filePath = `${os.tmpdir()}/${message.id}_video.mp4`; // filename

        let url = args.link;
        if (!url) return;

        let Embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(`Downloaded by ${message.author.username}`, message.author.displayAvatarURL(), url)
            .setFooter(`Simply view the original video by clicking on the "Downloaded by ${message.author.username}"!`);

        let loadingMessage = await message.channel.send('Downloading...');

        (await download(message, url, filePath))
            .on('error', async err => {
                await loadingMessage.delete();
                console.error('error :', err);
            })
            .on('end', async output => {
                await loadingMessage.delete();
                return message.channel.send({embed: Embed, files: [output] })
                    .catch(error => {
                        message.channel.send('Uh Oh... File is too big to be send on discord');
                        console.error('error :', error);
                    });
            })

    }
}

module.exports = DownloadCommand;