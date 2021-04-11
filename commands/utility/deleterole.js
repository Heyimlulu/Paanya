const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class DeleteRoleCommand extends Command {
    constructor() {
        super('deleterole', {
            aliases: ['deleterole'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    id: 'deleteRole',
                    type: 'string',
                    prompt: {
                        start: 'Which role do you want me to delete?',
                        retry: 'You did not specify a role! Please try again.'
                    },
                }
            ],
            description: {
                content: 'Delete an existing role',
                usage: '[roleName]',
                example: ['myRole']
            }
        });
    }

    exec(message, args) {

        let deleteRole = args.deleteRole;

        const role = message.guild.roles.cache.find(r => r.name == deleteRole)

        // Delete the role
        role.delete(deleteRole);

        // Display on a embed message
        const embed = new Discord.MessageEmbed()
            .setTitle('Role has been deleted!')
            .setDescription(`${message.author.tag} has deleted the role **${deleteRole}**`)

        message.channel.send(embed)

    }
}

module.exports = DeleteRoleCommand;