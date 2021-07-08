const { Command } = require('discord-akairo');
const textToSpeech = require('@google-cloud/text-to-speech');
const gclient = new textToSpeech.TextToSpeechClient();
const fs = require('fs');
const os = require('os');
const censor = require("../../json/censor.json");
const Infraction = require('../../database/dbObjects').infraction;
const dateUtils = require('../../utils/date');

class TTSCommand extends Command {
    constructor() {
        super('tts', {
            aliases: ['tts'],
            category: 'fun',
            clientPermissions: ['ATTACH_FILES'],
            args: [
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What do you want me to say with the google text-to-speech?'
                    },
                    match: "rest"
                }
            ],
            description: {
                content: 'Send you a mp3 file of what you wrote in chat',
                usage: '[text]',
                examples: ['text']
            }
        });
    }

    async exec(message, args) {

        let text = args.text;
        let output = `${os.tmpdir()}/${message.id}_tts.mp3`; // filename

        let badWordFound = false;

        // Check if user input contains censored word
        for (let findWord in censor) {
            if (text.toLowerCase().includes(censor[findWord].toLowerCase())) {
                badWordFound = true;
            }
        }

        if (badWordFound) {

            let date = await dateUtils();

            const body = {
                user: message.author.tag,
                userID: message.author.id,
                message: message.content,
                command: 'tts',
                createdAt: date,
                updatedAt: date
            };

            Infraction.create(body);

            await message.delete();
            await message.channel.send('Sorry, you use word(s) that has been blacklisted');

        } else {

            // Construct the request
            const request = {
                input: { text: text },
                // Select the language and SSML Voice Gender (optional)
                voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
                // Select the type of audio encoding
                audioConfig: { audioEncoding: 'MP3' },
            };

            // Performs the Text-to-Speech request
            await gclient.synthesizeSpeech(request, (err, response) => {
                if (err) {

                    return console.error('ERROR:', err);

                }

                console.log(response);

                // Write the binary audio content to a local file
                fs.writeFile(output, response.audioContent, 'binary', err => {
                    if (err) {

                        console.error('ERROR:', err);
                        message.channel.send('An error has occurred, the message is probably too long');
                        return;

                    }

                    console.log('Audio content written to file: tts.mp3');
                    message.channel.send({ files: [output] });
                });

            });

        }
    }
}

module.exports = TTSCommand;