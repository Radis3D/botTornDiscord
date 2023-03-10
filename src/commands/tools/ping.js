const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return my ping!'),
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply : true,
            //ephemeral: true
        });
        await wait(500)
        const newMsg = `API latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp} `
        await interaction.editReply({
            content : newMsg,
            //ephemeral: true
        });

        console.log('PONG!')
    }
}