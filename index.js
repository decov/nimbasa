// consts (discord.js)
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
});

// função de carregar os eventos do bot
const { loadEvents } = require('./handlers/eventHandler');

client.config = require('./config.json'); // arquivo que contém configs

// eventos e comandos do bot
client.events = new Collection();
client.commands = new Collection();

// executar eventos de client
loadEvents(client);

client
    .login(client.config.TOKEN) // logando o client com o token
    .then(() => {
        console.log(`client logado como ${client.user.username}...`); // log no terminal
        
        client.user.setActivity(`em ${client.guilds.cache.size} servidores`); // status do bot
    })
    .catch((err) => console.log(err)); // log de erro, caso aconteça