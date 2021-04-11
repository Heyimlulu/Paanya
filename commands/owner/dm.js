const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class DmCommand extends Command {
    constructor() {
        super('dm', {
            aliases: ['dm'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'user',
                    type: 'string',
                    prompt: {
                        start: 'Who do you want to send that dm?'
                    }
                },
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What do you want to say to that user?'
                    }
                }
            ],
            description: {
                content: 'Send a dm to a user',
                usage: '[userID] [text]',
                example: ['265896171384340480 "Hello World ;)"']
            }
        });
    }

    exec(message, args) {

        let user = this.client.users.resolve(args.user);
        if (!user) return message.channel.send('Not a valid user ID');
        let text = args.text;

        const embed = new Discord.MessageEmbed()
            .setTitle('You got a message from the developer')
            .setDescription(text)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()

        let Attachment = (message.attachments).array();
        if (Attachment[0]) {

            embed.setImage(Attachment[0].url)

            user.send(embed)
                .then(() => {
                    return message.channel.send(`DM sent to ${user.username}`);
                })
                .catch(() => {
                    return message.channel.send(`Could not send a DM to ${user.username}`);
                });

        } else {

            user.send(embed)
                .then(() => {
                    return message.reply(`Your message has been sent to ${user.tag}!`);
                })
                .catch(() => {
                    return message.channel.send(`Could not send a DM to ${user.tag}`)
                })

        }

    }
}

module.exports = DmCommand;