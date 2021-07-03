const { Command } = require('discord-akairo');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

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

    async exec(message, args) {

        // Create a 700x250 pixels canvas and get its context
        // The context will be used to modify the canvas
        const canvas = Canvas.createCanvas(475, 250);
        const context = canvas.getContext('2d');

        let member = args.member;
        let description = '';
        
        let love = Math.random() * 100; // Generate a random number between 0 and 100
        let loveIndex = Math.floor(love / 10);
        //let loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

        if (love < 50) description = 'It\'s low, but don\'t give up';
        if (love == 50) description = 'It\'s a fifty fifty'
        if (love > 50) description = 'You have your chance';
        if (love == 100) description = 'It\'s a perfect match!';

        if (message.mentions.users.first()) {

            member = message.mentions.members.first();

            // Wait for Canvas to load the image
            const authorAvatar = await Canvas.loadImage(message.author.displayAvatarURL({format: 'jpg'}));
            const memberAvatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}));

            // Move the image downwards vertically and constrain its height to 200, so that it's square
            context.drawImage(authorAvatar, 25, 25, 200, 200);
            context.drawImage(memberAvatar, 250, 25, 200, 200);

            // Use the helpful Attachment class structure to process the file for you
            const attachment = new MessageAttachment(canvas.toBuffer(), 'couple.png');

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle(`${message.author.username} + ${member.user.username} = 💟 ${Math.floor(love)}%`)
                .setDescription(description)
                //.addField('📊', loveLevel)
                .attachFiles(attachment)
                .setImage('attachment://couple.png')

            await message.channel.send(embed);

        } else {
            await message.reply(`You did not mentionned a member!`);
        }

    }
}

module.exports = LoveCommand;