const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class GuessCommand extends Command {
    constructor() {
        super('guess', {
            aliases: ['guess'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    id: 'easy',
                    match: 'flag',
                    flag: '--easy'
                },
                {
                    id: 'normal',
                    match: 'flag',
                    flag: '--normal'
                },
                {
                    id: 'hard',
                    match: 'flag',
                    flag: '--hard'
                }
            ],
            description: {
                content: 'Guess the number',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let max = 0;
        let numberTry = 0;

        if (args.easy) { max = 100; }
        else if (args.normal) { max = 1000; }
        else if (args.hard) { max = 10000; }
        else { return message.reply('It looks like you set an invalid difficulty. Please try again!'); }

        let secretNumber = Math.floor((Math.random() * max));
        console.log(secretNumber);

        const filter = m =>  m.content && m.author.id == message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
            .then(input => {
                checkNumber(input.map(input => input.content)[0]);
            })
            .catch(() => {
                return message.reply('Times out!')
            });

        async function checkNumber(input) {
            numberTry++;
            if (input != secretNumber) {
            await tryAgain(input);
            } else {
                if (numberTry > 1) {
                    return message.reply(`Congratulations! You won! It took you ${numberTry} tries!`);
                } else {
                    return message.reply('Congratulations! You won! You get it One shot!');
                }
            }
        }

        async function tryAgain (input) {
            if (input != secretNumber) {
                if (input > secretNumber) {
                    await message.reply('Its less!');
                } else if (input < secretNumber) {
                    await message.reply('Its more!');
                }
            }
            message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
                .then(input => {
                    checkNumber(input.map(input => input.content)[0]);
                })
                .catch(() => {
                    return message.reply('Times out!')
                });
        }

    }
}

module.exports = GuessCommand;