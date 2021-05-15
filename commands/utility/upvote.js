const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class UpvoteCommand extends Command {
    constructor() {
        super('upvote', {
            aliases: ['upvote', 'vote'],
            category: 'utility',
            description: {
                content: 'Send you a link to vote for my bot',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message) {

        const attachment = new Discord.MessageAttachment('./asset/img/paanya-this-must-hurted-a-lot.jpg', 'paanya-this-must-hurted-a-lot.jpg');
        const UpvoteEmbed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('You can vote for my bot if you like it!')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setDescription('[top.gg](https://top.gg/bot/829230505123119164) | [discordbotlist.com](https://discordbotlist.com/bots/paanya) | [discord.bots.gg](https://discord.bots.gg/bots/829230505123119164)')
            .attachFiles(attachment)
            .setImage('attachment://paanya-this-must-hurted-a-lot.jpg')
            .setTimestamp()
            .setFooter('💛 Thanks for the upvote', message.author.displayAvatarURL());

        message.channel.send(UpvoteEmbed);

    }
}

module.exports = UpvoteCommand;