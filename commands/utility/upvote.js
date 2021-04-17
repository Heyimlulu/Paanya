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

    exec(message) {

        const attachment = new Discord.MessageAttachment('./asset/img/please-cat.jpg', 'please-cat.jpg');
        const UpvoteEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Vote for my bot')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setDescription('You can vote for my bot if you like it!')
            .addField('top.gg', 'https://top.gg/bot/829230505123119164')
            //.addField('Discordbotlist.com', 'https://discordbotlist.com/bots/racoonbot/upvote')
            .attachFiles(attachment)
            .setImage('attachment://please-cat.jpg')
            .setTimestamp()
            .setFooter('💛 Thanks for the upvote', message.author.displayAvatarURL());

        message.channel.send(UpvoteEmbed);

    }
}

module.exports = UpvoteCommand;