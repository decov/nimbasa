async function loadCommands(client) {
    const { loadFiles } = require('../functions/fileLoader');

    const ascii = require('ascii-table');

    const table = new ascii().setHeading('comandos', 'status');
}