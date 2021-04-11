const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class AddRoleCommand extends Command {
    constructor() {
        super('addrole', {
            aliases: ['addrole'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    id: 'roleName',
                    type: 'string',
                    prompt: {
                        start: 'What name should I use for the new role?'
                    },
                },
                {
                    id: 'color',
                    type: 'color',
                    prompt: {
                        start: 'Which color for the new role?'
                    }
                }
            ],
            description: {
                content: 'Create a new role',
                usage: '[roleName] [#HEX]',
                example: ['myRole #050505']
            }
        });
    }

    exec(message, args) {

        let roleName = args.roleName;
        let color = args.color;

        // Check if the role has a name
        if (!roleName) {
            return message.channel.send('You did not specify a name for your role!')
        }

        // Check if the role has a color
        if (!color) {
            return message.channel.send('You did not specify a color for your role!')
        }
        
        // Check if the color got a correct Hex Color Code
        if (color >= 16777215) message.channel.send(`That hex color range was too big!`)
        if (color <= 0) message.channel.send(`That hex color range was too small`)
        roleName = roleName.replace(`${color}`, ``)

        // Create the role with the user's value
        const newRole = message.guild.roles.create({
            data: {
                name: roleName,
                color: color,
            }
        })

        // Display the new created role in a MessageEmbed
        const Embed = new Discord.MessageEmbed()
            .setTitle('New role created!')
            .setDescription(`${message.author.tag} has created the role **${roleName}** with Hex color code: **#${color}**`)
            .setColor(color)
            .setTimestamp()

        // Send the MessageEmbed
        message.channel.send(Embed)

    }
}

module.exports = AddRoleCommand;