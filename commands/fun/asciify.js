const { Command } = require('discord-akairo');
const os = require('os');
const fs = require('fs');
const asciify = require('asciify-image');

class AsciifyCommand extends Command {
    constructor() {
        super('asciify', {
            aliases: ['asciify'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    prompt: {
                        start: 'Which image do you want me to asciify?',
                        retry: "It doesn't seem to be a valid url, please try again!"
                    }
                }
            ],
            description: {
                content: 'Transform your image into ASCII',
                usage: '[url to image]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let url = args.link.href;

        let options = {
            fit:    'box',
            width:  50,
            height: 25
        }

        asciify(url, options)
            .then(function (asciified) {

                // Print asciified image to console
                console.log(asciified);

                // Write asciified image into a text file
                fs.writeFile(`${os.tmpdir()}/${message.id}ascii.txt`, asciified, function (err) {
                    if (err) {
                        console.log(err);
                    }

                    return message.channel.send({files: [`${os.tmpdir()}/${message.id}ascii.txt`]});
                });
            })
            .catch(function (err) {
                // Print error to console
                console.error(err);
            });

    }
}

module.exports = AsciifyCommand;