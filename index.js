const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
require('dotenv').config();
const config = require('./config.json');

class iroChanClient extends AkairoClient {

    constructor() {
        super({
            ownerID: config.owner,
            presence: {
                status: 'online',
                activity: {
                    type: 'PLAYING',
                    name: 'Loading simulator...',
                }
            }
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: config.prefix
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './inhibitors/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
    }

}

const client = new iroChanClient();

client.login(process.env.token);