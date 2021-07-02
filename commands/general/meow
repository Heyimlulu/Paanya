const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class MeowCommand extends Command {
    constructor() {
        super('meow', {
            aliases: ['meow'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Send some random cat facts',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const response = await fetch('https://meowfacts.herokuapp.com/');
        const meowFact = await response.json();

        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(meowFact.data)
            .setFooter('Powered by https://meowfacts.herokuapp.com/')

        await message.channel.send(embed);

    }
}

module.exports = MeowCommand;