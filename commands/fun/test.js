const { Command } = require('discord-akairo');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test']
        });
    }

    exec(message) {
        return message.reply('Hello World!', {files: ['./asset/img/yoshi-you-have-been-banned.gif']});
    }
}

module.exports = TestCommand;