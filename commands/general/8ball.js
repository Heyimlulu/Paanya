const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class EightBallCommand extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball', 'eightball'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'say',
                    type: 'string',
                    prompt: {
                        start: 'You need to ask the 8ball a question!'
                    },
                    match: "rest"
                }
            ],
            description: {
                content: 'Fortune-telling or seeking advice',
                usage: '[text]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let answer = [
            "It is certain",
            "It is decidely so",
            "Without a doubt",
            "Yes - definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy, try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ];

        let ask = args.say;
        let reply = answer[Math.floor(Math.random() * answer.length) + 1];

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(ask)
            .setDescription(reply)

        await message.channel.send(embed);

    }
}

module.exports = EightBallCommand;