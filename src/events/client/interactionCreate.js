module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            //console.log('interaction: ',interaction)
            const cmd  = commands.get(commandName);
            //console.log('command:', cmd)
            if (!cmd) return;

            try {
                await cmd.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    contet: `Something went wrong while executing this command!`,
                    ephermal: true
                })
            }
        }
    }
}