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
                    id: 'member',
                    type: 'string',
                    unordered: true,
                    prompt: {
                        start: 'Which user do you want to set role?'
                    },
                    optional: true
                },
                {
                    id: 'role',
                    type: 'string',
                    prompt: {
                        start: 'Which role do you want that user be?'
                    }
                }
            ],
            description: {
                content: 'Assign or unassign a role to a user or yourself',
                usage: '[role] [@user] or [role] for yourself',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')

        let role = message.guild.roles.cache.find(role => role.name === args.role);

        if (message.mentions.members.first()) {

            let member = message.mentions.members.first();

            // IF => User has the specified role
            if (message.guild.member(member).roles.cache.has(role.id)) {

                embed.setTitle(`${member.user.username}, you have been removed from role: \u0060${args.role}\u0060 by ${message.author.username}!`)

                await message.guild.member(message.author).roles.remove(role);
                return message.channel.send(embed);

            }

            // ELSE => Add role to the user
            embed.setTitle(`${member.user.username}, you have been added to role: \u0060${args.role}\u0060 by ${message.author.username}!`)

            await message.guild.member(member).roles.add(role);
            return message.channel.send(embed);

        } else {

            // IF => User has the specified role
            if (message.guild.member(message.author).roles.cache.has(role.id)) {

                embed.setTitle(`You have been removed from role: \u0060${args.role}\u0060!`)

                await message.guild.member(message.author).roles.remove(role);
                return message.channel.send(embed);

            }

            // ELSE => Add role to the user
            embed.setTitle(`You have been added to role: \u0060${args.role}\u0060!`)

            await message.guild.member(message.author).roles.add(role);
            return message.channel.send(embed);


        }

    }
}

module.exports = RoleCommand;