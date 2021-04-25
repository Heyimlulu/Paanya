/*
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

class AnimeFactCommand extends Command {
    constructor() {
        super('animefact', {
            aliases: ['animefact'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Get a random anime fact',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        fetch('https://animu.p.rapidapi.com/fact', {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.ANIMU_SECRET_KEY,
                "x-rapidapi-host": "animu.p.rapidapi.com",
                "useQueryString": true
            }
        }).then(response => {
            return response.json();
        }).then(response => {

            //console.log(response);

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${response.fact}`)

            message.channel.send(embed);

        })

    }
}

module.exports = AnimeFactCommand;

 */