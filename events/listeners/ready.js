const { Listener } = require('discord-akairo');
const { prefix } = require('../../config/config.json');
const play = require('../../json/status/playing.json');
const watch = require('../../json/status/watching.json');
const listen = require('../../json/status/listening.json');
// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

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
        let commandSize = this.client.commandHandler.modules.size - 12; // Total commands
        let clientID = this.client.user.id; // Total servers

        //  Send stats to the console
        console.log('===========[ READY ]===========');
        console.log(`\x1b[32mLogged in as \x1b[34m${clientTag}\x1b[0m! (\x1b[33m${clientID}\x1b[0m)`);
        console.log(`Ready to serve in \x1b[33m${channelSize}\x1b[0m channels on \x1b[33m${guildSize}\x1b[0m servers, for a total of \x1b[33m${userSize}\x1b[0m users. (\x1b[33m${commandSize}\x1b[0m commands loaded)`);
        console.log(`${this.client.readyAt}`);
        console.log('===========[ READY ]===========');

        // Bot status
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

        // Google Cloud
        const storage = new Storage();

        async function listBuckets() {
            try {
                const results = await storage.getBuckets();

                const [buckets] = results;

                console.log('Buckets:');
                buckets.forEach(bucket => {
                    console.log(bucket.name);
                });
            } catch (err) {
                console.error('ERROR:', err);
            }
        }
        listBuckets();
    }
}

module.exports = readyListener;