const { ChatInputCommandInteraction, Client } = require('discord.js');
const { loadCommands } = require('../../../handlers/commandHandler');

module.exports = {
	subCommand: 'reload.comandos',

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */

	execute(interaction, client) {
		loadCommands(client);

        interaction.reply({
            content: "comandos recarregados com sucesso...",
            ephemeral: true
        });
	}
}