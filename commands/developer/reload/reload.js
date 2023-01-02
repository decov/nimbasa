// discord.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    developer: true,

    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('recarrega todos os comandos e eventos do bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addSubcommand((options) => options
            .setName('eventos')
            .setDescription('recarrega todos os eventos do bot.'))
            
        .addSubcommand((options) => options
            .setName('comandos')
            .setDescription('recarrega todos os comandos do bot.')
        ),
}