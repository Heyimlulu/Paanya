const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'utility',
            description: {
                content: 'Ping the bot',
                usage: '',
                example: ['']
            }
        });
    }

    exec(message) {

        const pingEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Pinging...');

        message.channel.send(pingEmbed).then((msg) => {
            setTimeout(() => {
                const pongEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Pong 🏓')
                    .setDescription("Your ping is " + `${Math.round(this.client.ws.ping)} ms`)
                    .setTimestamp()

                msg.edit(pongEmbed); // Edit message
            }, 1000); // Wait 1 seconds before editing message
        })

    }
}

module.exports = PingCommand;