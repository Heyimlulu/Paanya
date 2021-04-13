const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const censor = require("../../json/censor.json");

class SeeBannedWordCommand extends Command {
    constructor() {
        super('seebannedword', {
            aliases: ['seebannedword'],
            category: 'utility',
            description: {
                content: 'Show the list of banned words',
                usage: '',
                example: ['']
            }
        });
    }

    exec(message) {

        let bannedWords = JSON.stringify(censor);

        console.log(bannedWords);

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('List of banned words')
            .setDescription(bannedWords);

        message.channel.send(embed);

    }
}

module.exports = SeeBannedWordCommand;