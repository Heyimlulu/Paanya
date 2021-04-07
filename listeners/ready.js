const { Listener } = require('discord-akairo');
const play = require('../json/status/playing.json');
const watch = require('../json/status/watching.json');

class readyListener extends Listener {

    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        let clientTag = this.client.user.tag; // Bot name
        let guildSize = this.client.guilds.cache.size; // Bot ID
        let userSize = this.client.users.cache.size; // Total users
        let channelSize = this.client.channels.cache.size; // Total channels
        let clientID = this.client.user.id; // Total servers

        //  Send stats to the console
        console.log('===========[ READY ]===========');
        console.log(`\x1b[32mLogged in as \x1b[34m${clientTag}\x1b[0m! (\x1b[33m${clientID}\x1b[0m)`);
        console.log(`Ready to serve in \x1b[33m${channelSize}\x1b[0m channels on \x1b[33m${guildSize}\x1b[0m servers, for a total of \x1b[33m${userSize}\x1b[0m users.`);
        console.log(`${this.client.readyAt}`);
        console.log('===========[ READY ]===========');

        // Bot status
        setStatus(this.client);

        // Change status every 30 minutes
        setInterval(async () => {
            setStatus(this.client);
        }, 1800000);

        async function setStatus(client) {

            let random = Math.floor((Math.random() * 3));

            if (random == 0) {

                let status = play[Math.floor(Math.random() * (play.length))];

                client.user.setActivity(status, { type: "PLAYING" });

            } else if (random == 1) {

                let status = watch[Math.floor(Math.random() * (watch.length))];

                client.user.setActivity(status, { type: "WATCHING" });

            }

        }
    }
}

module.exports = readyListener;