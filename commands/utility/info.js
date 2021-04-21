const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { owner } = require('../../config.json');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info', 'about'],
            category: 'utility',
            description: {
                content: 'Send some informations about the developer',
                usage: '',
                example: ['']
            }
        });
    }

    exec(message) {

        const attachment = new Discord.MessageAttachment('./asset/gif/catJam.gif', 'catJam.gif');

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setTitle('About me')
            .setDescription('Feel free to contact me if you have any question regarding my bot :3')
            .addField('Owner', `${this.client.users.resolve(owner).tag} (${this.client.users.resolve(owner).id})`)
            .addField('My GitHub', 'https://github.com/Heyimlulu')
            .addField('Support server', 'none yet')
            .attachFiles(attachment)
            .setThumbnail('attachment://catJam.gif')
            .setFooter(`${this.client.user.tag} made with 💛 by ${this.client.users.resolve(owner).tag}`)
            .setTimestamp()

        message.channel.send(embed);

    }
}

module.exports = InfoCommand;