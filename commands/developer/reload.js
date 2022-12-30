// discord.js
const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    Client
} = require("discord.js");

// constando os handlers de comandos e eventos
const { loadCommands } = require('../../handlers/commandHandler');
const { loadEvents } = require('../../handlers/eventHandler');

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

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch(subCommand) {
            case "eventos" : {
                for (const [key, value] of client.events)

                client.removeListener(`${key}`, value, true);

                loadEvents(client);

                interaction.reply({
                    content: "eventos recarregados com sucesso...",
                    ephemeral: true
                });
            }

            break;

            case "comandos" : {
                loadCommands(client);

                interaction.reply({
                    content: "comandos recarregados com sucesso...",
                    ephemeral: true
                });
            }

            break;
        }
    }
}