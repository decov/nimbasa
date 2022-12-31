async function loadCommands(client) {
    const { loadFiles } = require('../functions/fileLoader');

    const ascii = require('ascii-table');

    const table = new ascii().setHeading('comandos', 'status');

    await client.commands.clear();

    let commandsArray = [];

    const files = await loadFiles('commands');

    files.forEach((file) => {
        const command = require(file);

        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "✅ sucesso");
    });

    client.application.commands.set(commandsArray);

    return console.log(table.toString(), '\n[✓] comandos inicializados com sucesso...');
}

module.exports = { loadCommands };