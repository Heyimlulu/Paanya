const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { donation } = require('../../config/config.json');

class DonateCommand extends Command {
    constructor() {
        super('donate', {
            aliases: ['donate'],
            category: 'utility',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Send you a donate link to support Paanya',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (!donation.url) return message.channel.send('No donations has been setup for that bot yet');

        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('Donation link')
            .setDescription(`Donations are optional, but are appreciated if you want to support ${this.client.user.tag} 💛\n[Paypal](${donation.url})`);

        return message.channel.send(embed);

    }
}

module.exports = DonateCommand;