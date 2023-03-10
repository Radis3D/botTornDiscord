require('lightrun').start({
    lightrunSecret: 'be80d8b8-8838-4279-ba78-d3128012deea',
});


require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')
const db_config = require('./database/db_config.js');


async function loadDB(){
    return await db_config;
}


const client = new Client({ intents: GatewayIntentBits.Guilds })
client.commands = new Collection();
client.colour = "";
client.cmdArr = [];

const funcFolder = fs.readdirSync(`./src/functions`);
for (const folder of funcFolder) {
    const funcFile = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith(`.js`));

        for (const file of funcFile) {
            require(`./functions/${folder}/${file}`)(client)
        }
}



client.eventHandler();
client.cmdHandler();
client.login(token)