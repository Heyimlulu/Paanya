const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CuteCommand extends Command {
    constructor() {
        super('cute', {
            aliases: ['cute'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    id: 'member',
                    type: 'string'
                }
            ],
            description: {
                content: 'Tell a user how cute he/she is',
                usage: '[@user or none for yourself]',
                examples: ['']
            }
        });
    }

    exec(message, args) {

        let member = args.member;

        let cute = [
            'Not Cute',
            'Ho hum Cute',
            'Ok, maybe a little cute',
            'Awesomely cute',
            'Adorable'
        ];

        let guess = cute[Math.floor(Math.random() * (cute.length))];

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('Cute-o-Meter');

        if (message.mentions.users.first()) { // IF => member already mentionned

            member = message.mentions.members.first();

            embed.setDescription(`I guess **${member.user.username}** is **${guess}**`)
                .setThumbnail(member.user.displayAvatarURL());



        } else { // ELSE => for yourself

            embed.setDescription(`I guess you're **${guess}**`)
                .setThumbnail(message.author.displayAvatarURL());

        }

        message.channel.send(embed);

    }
}

module.exports = CuteCommand;