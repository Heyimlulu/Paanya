const { Listener } = require('discord-akairo');
const { prefix } = require('../../config.json'); 
const play = require('../../json/status/playing.json');
const watch = require('../../json/status/watching.json');
const listen = require('../../json/status/listening.json');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {

        let bot = {
            id: this.client.user.id,
            name: this.client.user.tag,
            guilds: this.client.guilds.cache.size,
            users: this.client.users.cache.size,
            channels: this.client.channels.cache.size,
            commands: this.client.commandHandler.modules.size
        }

        console.log('===========[ READY ]===========');
        console.log(`\x1b[32mLogged in as \x1b[34m${bot.name}\x1b[0m! (\x1b[33m${bot.id}\x1b[0m)`);
        console.log(`Ready to serve in \x1b[33m${bot.channels}\x1b[0m channels on \x1b[33m${bot.guilds}\x1b[0m servers, for a total of \x1b[33m${bot.users}\x1b[0m users. (\x1b[33m${bot.commands}\x1b[0m commands loaded)`);
        console.log(`${this.client.readyAt}`);
        console.log('===========[ READY ]===========');

        // Bot status - Set status at startup
        setStatus(this.client);

        // Change status every 30 minutes
        setInterval(async () => {
            setStatus(this.client);
        }, 1800000);

        async function setStatus(client) {

            // Generate a random number between 0 and 2
            let random = Math.floor((Math.random() * 4));

            if (random == 0) { // Random "playing" status

                let status = play[Math.floor(Math.random() * (play.length))];
                status = status.replace('{{prefix}}', prefix[0]);

                await client.user.setActivity(status, { type: "PLAYING" });

            } else if (random == 1) { // Random "watching" status

                let status = watch[Math.floor(Math.random() * (watch.length))];
                status = status.replace('{{prefix}}', prefix[0]);

                await client.user.setActivity(status, { type: "WATCHING" });

            } else if (random == 2) { // Random "listening" status

                let status = listen[Math.floor(Math.random() * (listen.length))];
                status = status.replace('{{prefix}}', prefix[0]);

                await client.user.setActivity(status, { type: "LISTENING" });

            }

        }


    }
}

module.exports = ReadyListener;