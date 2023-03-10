const {ActivityType } = require('discord.js');

module.exports = {
    name : 'ready',
    once : true,
    async execute(client){
        console.log(`${client.user.tag} is ready and logged in! Online Now!`)

        client.user.setPresence({
            activities: [{ name: `all employees activity!`, type: ActivityType.Watching }],
            status: 'idle',
          });
    } 
}