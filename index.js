const { Client } = require('discord.js');
const client = new Client({ intents: ["Guilds"] });

client.config = require('./config.json');

client
    .login(client.config.TOKEN)
    .then(() => {
        console.log(`client logado como ${client.user.username}...`);
        
        client.user.setActivity(`em ${client.guilds.cache.size} servidores`);
    })
    .catch((err) => console.log(err));