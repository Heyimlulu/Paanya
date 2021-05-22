const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { donation } = require('../../config.json');

class DonateCommand extends Command {
    constructor() {
        super('donate', {
            aliases: ['donate'],
            category: 'general',
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

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('Donation link')
            .setURL(donation.url)
            .setDescription(`Donations are optional, but are appreciated if you want to support ${this.client.user.tag} 💛`);

        return message.channel.send(embed);

    }
}

module.exports = DonateCommand;