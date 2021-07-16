const { Command } = require('discord-akairo');
const download = require('../../utils/download');

class DownloadCommand extends Command {
    constructor() {
        super('download', {
            aliases: ['download'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'url',
                    type: 'string',
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

        let url = args.url;
        if (!url) return;

        await download(message, url);

    }
}

module.exports = DownloadCommand;