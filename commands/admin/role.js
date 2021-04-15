/*
const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class RoleCommand extends Command {
    constructor() {
        super('role', {
            aliases: ['role'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    id: 'role',
                    type: 'string',
                    prompt: {
                        start: 'What name should I use for the new role?'
                    },
                },
                {
                    id: 'color',
                    type: 'string',
                    prompt: {
                        start: 'Which color for the new role?'
                    }
                }
            ],
            description: {
                content: 'Add / Remove a role',
                usage: '[role] [#HEX]',
                example: ['mods #050505']
            }
        });
    }

    exec(message, args) {

        let embed = new Discord.MessageEmbed()
            .setColor(args.color);

        if (!args.role) return;

        // If color input match "#800080" format
        if (args.color.match(/^#[0-9A-F]{6}$/i)) {

            let role = message.guild.roles.cache.find(role => role.name === args.role);

            // IF => role doesn't exist => Create role
            if (!role) {
                message.guild.roles.create({
                    data: {
                        name: args.role,
                        color: args.color.toUpperCase()
                    },
                    reason: 'Role command'
                });

                embed.setTitle('Role created! try again if you want to delete this role!')

                return message.channel.send(embed);

            } else { // ELSE IF => role exists => Delete role

                message.guild.roles.cache.delete(args.role);

                embed.setTitle('Role deleted!')

                return message.channel.send(embed);

            }

        } else {

            embed.setTitle(`${args.color} is not a valid color`)

            return message.channel.send(embed);

        }

    }
}

module.exports = RoleCommand;

 */