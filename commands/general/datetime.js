const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const extract = require('meta-extractor');

class DateTimeCommand extends Command {
    constructor() {
        super('datetime', {
            aliases: ['datetime', 'date', 'time'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            args: [
                {
                    id: 'region',
                    type: 'string',
                    optional: true
                }
            ],
            description: {
                content: 'What time is it?',
                usage: '[region]',
                examples: ['us']
            }
        });
    }

    async exec(message, args) {

        let region = args.region;
        if (!region) {
            region = "us";
        }

        let date = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(`Current Date/Time for region: ${region.toUpperCase()}`)
            .setDescription(`📅 ${date.toLocaleDateString(region, options)} - 🕘 ${date.toLocaleTimeString(region)}`);

        await message.channel.send(embed);

    }
}

module.exports = DateTimeCommand;