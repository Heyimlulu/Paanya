const { Listener } = require('discord-akairo');
//const { Client } = require('pg');
const { owner, prefix } = require('../config/config.json');
const Logs = require('../database/dbObjects').Logs;

class LogsListener extends Listener {
    constructor() {
        super('logs', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {

        // IF => message is from the bot or the owner => ignore it
        if (message.author.bot || message.author.id === owner) return;

        // IF => message does not start with the prefix => ignore it
        if (!message.content.startsWith(prefix)) return;

        /*
        async function logsDatabase() {
            // Database connection
            const pgClient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });

            pgClient.connect();

            let query = `INSERT INTO logs(author, author_id, message) VALUES('${message.author.tag}', '${message.author.id}', '${message.content}')`;

            pgClient.query(
                query,
                (err, res) => {
                    console.log(err, res);
                    pgClient.end();
                }
            );
        }

        logsDatabase();

         */

        let date;
        let today = new Date();

        let dd = today.getDate(); // Day
        let mm = today.getMonth() + 1; // Month
        let yyyy = today.getFullYear(); // Year

        today = yyyy + '-' + mm + '-' + dd;

        // Get current hour
        let time = new Date();
        let currentTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

        date = today + ' ' + currentTime;

        const body = {
            user: message.author.tag,
            userID: message.author.id,
            message: message.content,
            createdAt: date,
            updatedAt: date
        };

        Logs.create(body);

    }
}

module.exports = LogsListener;