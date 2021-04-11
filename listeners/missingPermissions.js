const { Listener } = require('discord-akairo');

class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, type, missing) {

        let Embed = this.client.util.embed()
            .setColor('RED')
            .setTitle('Missing permission')
            .setDescription(`I'm missing the required permissions for the ${command.id} command!`)
            .addField('Missing permission:', missing);

        switch(type) {
            case 'client': // The bot
                if (missing == 'SEND_MESSAGES') {
                    console.log('1');
                    return;
                } else {
                    message.reply(Embed);
                }
                break;
            case 'user': // The users
                if (missing == 'SEND_MESSAGES') {
                    console.log('2');
                    return;
                } else {
                    Embed.setDescription(`You are missing the required permissions for the ${command.id} command!`);
                    message.reply(Embed);
                }
                break;
        }

    }
}

module.exports = MissingPermissionsListener;