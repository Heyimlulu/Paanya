const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class Ball8Command extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES" ,'MANAGE_MESSAGES'],
            args: [
                {
                    id: 'ball',
                    type: 'string',
                    prompt: {
                        start: 'What do you need to know?'
                    },
                    match: "rest"
                }
            ],
            description: {
                content: 'Fortune-telling or seeking advice',
                usage: '[Will I be a popular bot?]',
                examples: ['Will I be a popular bot?']
            }
        });
    }

    exec(message, args) {

        let ask = args.ball;
        let answers = [
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
        ]

        let reply = answers[Math.floor(Math.random() * answers.length)];

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(ask)
            .setDescription(reply)
            .setTimestamp()

        message.channel.send(embed);

    }
}

module.exports = Ball8Command;