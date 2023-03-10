const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { TornKey, UserKey } = require("../../database/db_config");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addkey")
    .setDescription("Add API Key of Torn City")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("Add your Torn API here")
        .setRequired(true)
    ),
  async execute(interaction) {
    console.log(interaction.user.id);
    console.log(interaction.options.get("key"));
    const APIKEY = interaction.options.get("key");
    console.log(APIKEY);
    let jsonkey = {};

    const response = await fetch(
      `https://api.torn.com/user/?selections=&key=` + APIKEY.value
    );
    let data = await response.json();
    jsonkey = data;
    //console.log(jsonkey);
    //console.log("keyData", data);

    let newMsg = `reply`;
    let newKey = {
      dc_id: `${interaction.user.id}`,
      dc_name: `${interaction.user.username}`,
      torn_id: `${jsonkey.player_id}`,
      torn_name: `${jsonkey.name}`,
      torn_key: `${APIKEY.value}`,
    };

    //console.log(newKey);

    try {
      if (jsonkey.hasOwnProperty("error")) throw new Error("Incorect API Key!");

      let query = await TornKey.findOne({
        where: {
          torn_key: newKey.torn_key,
        },
      });

      let query1 = await UserKey.findOne({
        where: {
          torn_key: newKey.torn_key,
        },
      });

      if (!query1) {
        await UserKey.create(newKey);
      }

      console.log("query: ", query);

      if (!query) {
        newMsg = `You add \`${APIKEY.value}\` as the key`;
        await TornKey.create(newKey);

        await interaction.deferReply({
          ephemeral: true,
        });

        await wait(2000);

        await interaction.editReply({
          content: newMsg,
          ephemeral: true,
        });

        console.log(`\`${APIKEY.value}\` has been added`);
      } else {
        newMsg = `\`${APIKEY.value}\` already registered`;
        await interaction.deferReply({
          ephemeral: true,
        });

        await wait(2000);

        await interaction.editReply({
          content: newMsg,
          ephemeral: true,
        });
      }

      /* 
      TornKey.createTables(newdb){
        newdb.exec(`
            INSERT INTO TornKey(id, dc_id, dc_name, torn_id, torn_key)
                VALUE(?, ${interaction.user.id}, ${interaction.user.username}, ${jsonkey.player_id}, ${APIKEY.value})
        `, () => {

        })
      }
      */
    } catch (error) {
      console.error(error);

      newMsg = `Your key is Incorrect!`;
      await interaction.deferReply({
        ephemeral: true,
      });

      await wait(2000);

      await interaction.editReply({
        content: newMsg,
        ephemeral: true,
      });
    }
  },
};
