const { Listener } = require('discord-akairo');
const { Client } = require('pg');

class LogsListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {

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
        // IF => message is from the bot => ignore it
        if (message.author.id === '829230505123119164') {
            return
        } else {
            logsDatabase();
        }

    }
}

module.exports = LogsListener;