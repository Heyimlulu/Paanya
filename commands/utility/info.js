const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { owner } = require('../../config.json');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            category: 'utility',
            description: {
                content: 'Send some informations about the developer',
                usage: '',
                example: ['']
            }
        });
    }

    exec(message) {

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Information')
            .setDescription(`${this.client.user.tag} made with 💛 by ${this.client.users.resolve(owner)}`)
            .setTimestamp()

        message.channel.send(embed);

    }
}

module.exports = InfoCommand;