const { Listener } = require('discord-akairo');

class UncaughtExceptionListener extends Listener {
    constructor() {
        super('uncaughtException', {
            emitter: 'process',
            event: 'uncaughtException'
        });
    }

    async exec(error) {
        console.error(`\x1b[31mUncaughtException: ${error}\x1b[37m`);
    }
}

module.exports = UncaughtExceptionListener;