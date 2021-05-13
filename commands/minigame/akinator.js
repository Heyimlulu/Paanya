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

        //let myAnswer = 0; // yes = 0
        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(`Question: ${aki.question}`)
            .setDescription(`Answers: ${aki.answers}`)
            .setFooter( `Progress: ${aki.progress}`);

        await message.channel.send(embed);

        let filter = m =>  m.content && m.author.id == message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(input => {
                console.log('First Step: ', input.map(input => input.content)[0]);
                game(input.map(input => input.content)[0]);
            })
            .catch(() => {
                return message.reply('Times out!')
            });

        async function game(myAnswer) {

            await aki.step(myAnswer);

            if (aki.progress >= 70 || aki.currentStep >= 78) {

                let guessEmbed = new MessageEmbed()
                    .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                    .setTitle(`I think of: ${aki.answers[0].name}`)
                    .setDescription(`From: ${aki.answers[0].description}`)
                    .setImage(aki.answers[0].absolute_picture_path)
                    .setFooter(aki.guessCount);


                await aki.win();
                await message.channel.send(guessEmbed);
                
                console.log(aki.answers);
                console.log('Hello ', aki.answers.name);
                console.log('World ', aki.answers[0].name);
                console.log('guessCount:', aki.guessCount);
            } else {
                await nextStep();
            }
        }

        async function nextStep() {

            // Sort new questions
            embed.setTitle(`Question: ${aki.question}`)
                .setDescription(`Answers: ${aki.answers}`)
                .setFooter( `Progress: ${aki.progress}`);

            await message.channel.send(embed);

            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(input => {
                    console.log('Function nextStep: ', input.map(input => input.content)[0]);
                    game(input.map(input => input.content)[0]);
                })
                .catch(() => {
                    return message.reply('Times out!')
                });
        }
    }
}

module.exports = AkinatorCommand;