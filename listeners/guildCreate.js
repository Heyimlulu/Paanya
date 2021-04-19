const { Listener } = require('discord-akairo');
const { statsChannel } = require('../config.json');
const Discord = require('discord.js');

class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {

        await guild.members.fetch();

        const channel = this.client.channels.resolve(statsChannel);
        let botCount = guild.members.cache.filter(member => member.user.bot).size;

        const embed = new Discord.MessageEmbed()
            .setColor('#52e80d')
            .setTitle('Someone invited me in their guild')
            .setThumbnail(guild.iconURL())
            .addField('Guild', `${guild.name} (${guild.id})`)
            .addField('Total number of members', guild.memberCount, true)
            .addField('Number of users', guild.memberCount - botCount, true)
            .addField('Number of bots', botCount, true)
            .addField('Owner', `${guild.owner.user.username} (${guild.owner.id})`, true)
            .setFooter(`I'm now in ${this.client.guilds.cache.size} servers!`)
            .setTimestamp();

        channel.send(embed);

    }
}

module.exports = GuildCreateListener;