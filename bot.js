const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const dotenv = require('dotenv');
dotenv.config();
const { owner, prefix } = require('./config.json');
const updateGrid = require('./events/misc/updateGrid');

class PaanyaClient extends AkairoClient {

    constructor() {
        super({
            ownerID: owner,
            presence: {
                status: 'online',
                activity: {
                    type: 'PLAYING',
                    name: 'Getting everything ready...',
                }
            }
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: prefix,
            argumentDefaults: {
                prompt: {
                    timeout: 'Time ran out, command has been cancelled.',
                    ended: 'Too many retries, command has been cancelled.',
                    retry: 'Could not find your argument, please try again!',
                    cancel: 'Command has been cancelled.',
                    retries: 4,
                    time: 30000
                }
            }
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './events/inhibitors/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './events/listeners/'
        });

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
            process: process
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
    }

}

const client = new PaanyaClient();
// Below const client
require("discord-buttons")(client);

client.login(process.env.TOKEN);

client.on('clickButton', async button => {
    // Tic Tac Toe
    await updateGrid(button);
});
