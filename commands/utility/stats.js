const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const os = require('os');

class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats'],
            category: 'utility',
            description: {
                content: 'Show some stats about the bot',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message) {

        var uptime = process.uptime();
        const date = new Date(uptime*1000);
        const days = date.getUTCDate() - 1,
            hours = date.getUTCHours(),
            minutes = date.getUTCMinutes(),
            seconds = date.getUTCSeconds();


        let segments = [];

        // Format the uptime string.
        if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
        if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
        if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'));
        if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'));
        const dateString = segments.join(', ');

        const bytesToSize = (bytes) => {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };

        const Embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('Bot stats')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .addField('Servers', this.client.guilds.cache.size, true)
            .addField('Channels', this.client.channels.cache.size, true)
            .addField('Users', this.client.users.cache.size, true)
            .addField('Uptime', dateString, false)
            .addField('Ram usage', `${bytesToSize(process.memoryUsage().heapUsed)}/${bytesToSize(os.totalmem)}`, true)
            .addField('CPU', `${os.cpus()[0].model} (${os.cpus().length} core)`, true)
            .addField('OS', `${os.platform()} ${os.release()}`, true)
            .setTimestamp();

        await message.channel.send(Embed);

    }
}

module.exports = StatsCommand;