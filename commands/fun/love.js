const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class LoveCommand extends Command {
    constructor() {
        super('love', {
            aliases: ['love'],
            category: 'fun',
            args: [
                {
                    id: 'member',
                    type: 'string',
                    prompt: {
                        start: 'Which user do you want me to verify your compatibility?',
                        retry: "It doesn't seem to be a valid user, please try again!"
                    }
                }
            ],
            description: {
                content: 'Tell a user the love he/she has to another person',
                usage: '[@user]',
                examples: ['@user']
            }
        });
    }

    exec(message, args) {

        let member = args.member;

        const love = Math.random() * 100
        const loveIndex = Math.floor(love / 10)
        const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex)

        if (message.mentions.users.first()) { // IF => member already mentionned

            member = message.mentions.members.first();

            const Embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle('Love')
                .addField(`**${message.author.username}** loves **${member.user.username}** this much`, `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
                .setThumbnail(member.user.displayAvatarURL())

            message.channel.send(Embed)

        } else { // ELSE => after first prompt message
            message.reply(`You did not mentionned a user!`)
        }

    }
}

module.exports = LoveCommand;