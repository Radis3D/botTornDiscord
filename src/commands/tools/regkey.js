const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { parse } = require("dotenv");
const { UserKey, UserWork } = require("../../database/db_config");
const fetch = require('cross-fetch')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("regkey")
    .setDescription("Registering your API key")
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

    const workstats = await fetch(
      `https://api.torn.com/user/?selections=workstats&key=` + APIKEY.value
    );
    let wData = await workstats.json();
    function totalWorkingStats() {
      return (
        parseInt(wData.manual_labor) +
        parseInt(wData.intelligence) +
        parseInt(wData.endurance)
      );
    }
    console.log(totalWorkingStats());

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

      let query = await UserKey.findOne({
        where: {
          torn_key: newKey.torn_key,
        },
      });

     /* let query1 = await UserWork.findOne({
        where: {
          torn_key: newKey.torn_key,
        },
      });

      if (!query1) {
        await UserWork.create({
          id: `${interaction.user.id}`,
          torn_key: `${newKey.torn_key}`,
          man: wData.manual_labor,
          int: wData.intelligence,
          end: wData.endurance,
          ttl: totalWorkingStats(),
        });
      } else {
        await UserWork.update({ttl: `${totalWorkingStats()}`},{torn_key: `${APIKEY.value}`})
      }
*/
      console.log("query: ", query);

      if (!query) {
        newMsg = `Registration completed!`;
        await UserKey.create(newKey);

        await interaction.deferReply({
          ephemeral: true,
        });

        await totalWorkingStats();

        await interaction.editReply({
          content: newMsg,
          ephemeral: true,
        });

        console.log(`Register \`${APIKEY.value}\` as user key`);
      } else {
        newMsg = `\`${APIKEY.value}\` already registered`;
        await interaction.deferReply({
          ephemeral: true,
        });

        await totalWorkingStats();

        await interaction.editReply({
          content: newMsg,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);

      newMsg = `Your key is Incorrect!`;
      await interaction.deferReply({
        ephemeral: true,
      });

      await totalWorkingStats();

      await interaction.editReply({
        content: newMsg,
        ephemeral: true,
      });
    }
  },
};
