const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require('./config.json');

client.events = new Collection();

client
    .login(client.config.TOKEN)
    .then(() => {
        console.log(`client logado como ${client.user.username}...`);
        
        client.user.setActivity(`em ${client.guilds.cache.size} servidores`);
    })
    .catch((err) => console.log(err));