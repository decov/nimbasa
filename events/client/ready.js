const { loadCommands } = require('../../handlers/commandHandler');

module.exports = {
    name: "ready",
    once: true,

    execute(client) {
        console.log('o client está pronto para ser utilizado...');

        loadCommands(client);
    }
}