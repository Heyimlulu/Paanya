const { Command } = require('discord-akairo');
const censor = require("../../json/censor.json");
const Infraction = require('../../database/dbObjects').infraction;
const dateUtils = require('../../utils/date');

class FakeUserCommand extends Command {
    constructor() {
        super('fakeuser', {
            aliases: ['fakeuser'],
            category: 'fun',
            clientPermissions: ['MANAGE_WEBHOOKS'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Which user should I fake?'
                    }
                },
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What message should I send?'
                    },
                    match: 'rest'
                }
            ],
            channel: 'guild',
            description: {
                content: 'Fake a user using webhook',
                usage: '[user] [text]',
                examples: ['user Hello']
            }
        });
    }

    async exec(message, args) {

        let username = args.user.username;
        let member = message.guild.members.resolve(args.user.id);
        let text = args.text;

        let badWordFound = false;

        // Check if user input contains censored word
        for (let findWord in censor) {
            if (text.toLowerCase().includes(censor[findWord].toLowerCase())) {
                badWordFound = true;
            }
        }

        if (badWordFound) {

            let date = await dateUtils();

            const body = {
                user: message.author.tag,
                userID: message.author.id,
                message: message.content,
                command: 'fakeuser',
                createdAt: date,
                updatedAt: date
            };

            Infraction.create(body);

            await message.delete();
            await message.channel.send('Sorry, you use word(s) that has been blacklisted');

        } else {

            // Show nickname if user is in guild
            if (member) {
                if (member.nickname) {
                    username = member.nickname;
                }
            }

            message.channel.createWebhook(username, {
                avatar: args.user.displayAvatarURL(),
                reason: `Fakeuser command triggered by: ${message.author.username}`
            }).then(webhook => {

                webhook.edit({
                    name: username,
                    avatar: args.user.displayAvatarURL(),
                    reason: `Fakeuser command triggered by: ${message.author.username}`
                });

                this.client.fetchWebhook(webhook.id)
                    .then(webhook => {
                        message.delete();

                        webhook.send(text);

                        setTimeout(() => {
                            webhook.delete({
                                reason: `Fakeuser command triggered by: ${message.author.username}`
                            });
                        }, 3000);
                    });

            });

        }

    }
}

module.exports = FakeUserCommand;