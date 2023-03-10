const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9')
const fs = require('fs');

module.exports = (client) => {
    client.cmdHandler = async () => {
        const cmdFolders = fs
            .readdirSync('./src/commands');
        for (const folder of cmdFolders) {
            const cmdFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            const {commands, cmdArr} = client;
            for (const file of cmdFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                cmdArr.push(command.data.toJSON());

                console.log(`command : ${command.data.name} has been added!`)
            }
        }


        const clientID = '1081161369031819314';
        const guildID = '1078231013815234621';
        const rest = new REST({version: '9'}).setToken(process.env.token);

        try {
            console.log('Started refreshing application (/) command')

            await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
                body: client.cmdArr,
            });

            //console.log(client.cmdArr)

            console.log("Successfully reload (/) commands!");
        } catch (error) {
            console.error(error)
        }
    }
}