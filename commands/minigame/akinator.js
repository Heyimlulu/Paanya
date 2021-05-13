const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { Aki } = require('aki-api');

class AkinatorCommand extends Command {
    constructor() {
        super('akinator', {
            aliases: ['akinator'],
            category: 'minigame',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Let Akinator guess about a real or fictional character you choose',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let region = 'en';
        let aki = new Aki(region);

        await aki.start();

        let myAnswer;

        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(`Question: ${aki.question}`)
            .setDescription('Yes [0] | No [1] | Don\'t know [2] | Probably [3] | Probably not [4]')
            .setFooter( `Progress: ${aki.progress}`);

        await message.channel.send(embed);

        let filter = m =>  m.content && m.author.id == message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(input => {
                myAnswer = input.map(input => input.content)[0]
                game();
            })
            .catch(() => {
                return message.reply('Times out!')
            });

        async function game() {

            await aki.step(myAnswer);

            if (aki.progress >= 70 || aki.currentStep >= 78) {

                if (aki.answers[0].nsfw === true && !message.channel.nsfw) {
                    return await message.channel.send(`I think of \u0060${aki.answers[0].name}\u0060 from \u0060${aki.answers[0].description}\u0060 (${aki.guessCount} attempts)`);
                }

                await aki.win();
                await message.channel.send(`I think of \u0060${aki.answers[0].name}\u0060 from \u0060${aki.answers[0].description}\u0060 (${aki.guessCount} attempts)`, {files: [aki.answers[0].absolute_picture_path]});
            } else {
                await nextStep();
            }
        }

        async function nextStep() {

            // Sort new questions
            embed.setTitle(`Question: ${aki.question}`)
                .setFooter( `Progress: ${aki.progress}`);

            await message.channel.send(embed);

            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(input => {
                    myAnswer = input.map(input => input.content)[0];
                    game();
                })
                .catch(() => {
                    return message.reply('Times out!')
                });
        }
    }
}

module.exports = AkinatorCommand;