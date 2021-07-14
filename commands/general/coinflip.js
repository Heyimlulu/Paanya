const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CoinFlipCommand extends Command {
    constructor() {
        super('coinflip', {
            aliases: ['coinflip', 'flip'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Flip a coin',
                usage: '',
                examples: ['']
            }
        });
    }

    exec(message, args) {

        let coin = [
            'Tails',
            'Heads'
        ];

        let coinFlip = coin[Math.floor(Math.random() * (coin.length))];

        const flipEmbed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('🪙\u2000Coin flip')
            .setDescription(`It's **${coinFlip}**`)

        message.channel.send(flipEmbed);

    }
}

module.exports = CoinFlipCommand;