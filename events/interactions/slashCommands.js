const { ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command)
            return interaction.reply({
                content: "esse comando é inválido...",
                ephemeral: true
            });
    }
}

// 10:40 - https://youtu.be/1eKV2_WsWR0