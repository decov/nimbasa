const { ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command)
            return interaction.reply({
                content: 'esse comando está desatualizado...',
                ephemeral: true
            });

        if (command.developer && interaction.user.id !== '1041302056872448100')
            return interaction.reply({
                content: 'esse comando está apenas disponível para o desenvolvedor...',
                ephemeral: true
            });

		// subcomandos
		const subCommand = interaction.options.getSubcommand(false);

		if (subCommand) {
			const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);

			if (!subCommandFile)
				return interaction.reply({
					content: 'esse comando está desatualizado...',
                	ephemeral: true
				});

			subCommandFile.execute(interaction, client);
		} else {
			command.execute(interaction, client);
		}
    }
}