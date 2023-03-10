const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageEmbed,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const {
  TornKey,
  UserKey,
  UserWork,
  Rating,
  Fitness,
} = require("../../database/db_config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mystats")
    .setDescription("Check your working stats"),
  async execute(interaction, client) {
    try {
      /*let workstats = await UserWork.findOne({
        where: { id: interaction.user.id },
      });

      if (!workstats) throw new Error("Data not found");
  */
      let getTornID = await UserKey.findOne({
        where: {
          dc_id: interaction.user.id,
        },
      });

      //console.log('TornID: ', getTornID)

      let response = await fetch(
        `https://api.torn.com/company/98839?selections=&key=` +
          getTornID.torn_key
      );

      let data = await response.json();
      let employees = data.company.employees;
      //console.log("company employees: ", employees);
      //console.log("ID", employees[getTornID.torn_id]);
      //console.log("Data",data);

      let response3 = await fetch(
        `https://api.torn.com/company/98839?selections=employees&key=` +
          getTornID.torn_key
      );

      let worker = await response3.json();
      let empData = worker.company_employees;

      //console.log("empData ", empData);
      //console.log("employee ", empData[getTornID.torn_key]);

      let response2 = await fetch(
        `https://api.torn.com/user/?selections=workstats&key=` +
          getTornID.torn_key
      );

      let data2 = await response2.json();
      //if (data.hasOwnProperty("error")) return;

      if (!employees[getTornID.torn_id]) {
        //console.log(interaction)

        let embed = new EmbedBuilder()
          .setTitle(`Working Stats`)
          .setDescription(`You\'re not in any company yet`)
          .setColor(0x18e1ee)
          .setThumbnail(interaction.user.displayAvatarURL())
          .setTimestamp(Date.now())
          .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.tag,
          })
          .addFields([
            {
              name: `Manual Labor (MAN)`,
              value: `${data2.manual_labor.toLocaleString("en-US")}`,
              inline: false,
            },
            {
              name: `Intelligence (INT)`,
              value: `${data2.intelligence.toLocaleString("en-US")}`,
              inline: false,
            },
            {
              name: `Endurance (END)`,
              value: `${data2.endurance.toLocaleString("en-US")}`,
              inline: false,
            },
            {
              name: `Total Working Stats`,
              value: `${parseInt(
                data2.manual_labor + data2.intelligence + data2.endurance
              ).toLocaleString("en-US")}`,
              inline: true,
            },
          ]);

        wait(2000);

        await interaction.reply({
          embeds: [embed],
        });

        return;
      }

      let director = await UserKey.findOne({
        where: {
          torn_id: data.company.director,
        },
      });

      async function checkDirector(s) {
        try {
          if (
            employees[getTornID.torn_id].position.toLowerCase() === "director"
          ) {
            let dirGain = await Rating.findOne({
              where: {
                rating: data.company.rating,
              },
            });

            return await dirGain.gain;
          } else {
            let jobInfo = await Fitness.findOne({
              where: {
                pos_name: empData[getTornID.torn_id].position,
              },
            });

            let gain = 0;
            if (jobInfo.pri_name === s) {
              if (
                empData[getTornID.torn_id]["effectiveness"]["total"] < 100
              ) {
                gain = Math.round(
                  (empData[getTornID.torn_id]["effectiveness"]["total"] /
                    100) *
                    jobInfo.pri_gain
                );
              } else {
                gain = jobInfo.pri_gain;
              }

              return gain;
            } else if (jobInfo.sec_name === s) {
              if (
                empData              ) {
                gain = Math.round(
                  (empData[getTornID.torn_id]["effectiveness"]["total"] /
                    100) *
                    jobInfo.sec_gain
                );
              } else {
                gain = jobInfo.sec_gain;
              }
              return await gain;
            } else {
              return await gain;
            }
          }
        } catch (e) {
          console.error(e);
        }
      }

      let embed = new EmbedBuilder()
        .setTitle(`Working Stats`)
        .setDescription(
          `*${employees[getTornID.torn_id].position}* of **${
            data.company.name
          }**`
        )
        .setColor(0x18e1ee)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setFooter({
          iconURL: client.user.displayAvatarURL(),
          text: client.user.tag,
        })
        .addFields([
          {
            name: `Director`,
            value: `${director.torn_name}`,
            inline: true,
          },
          {
            name: `Day Serve`,
            value: `${employees[getTornID.torn_id].days_in_company} Day(s)`,
            inline: true,
          },
          {
            name: `Effectiveness`,
            value: `${
              !empData[getTornID.torn_id]["effectiveness"]
                ? 0
                : empData[getTornID.torn_id]["effectiveness"]["total"]
            }`,
            inline: true,
          },
          {
            name: `Manual Labor (MAN)`,
            value: `${
              employees[getTornID.torn_id].manual_labor
                ? parseInt(
                    employees[getTornID.torn_id].manual_labor
                  ).toLocaleString("en-US")
                : data2.manual_labor.toLocaleString("en-US")
            } (+${await checkDirector("manual_labor")}/day)`,
            inline: false,
          },
          {
            name: `Intelligence (INT)`,
            value: `${
              employees[getTornID.torn_id].intelligence
                ? parseInt(
                    employees[getTornID.torn_id]["intelligence"]
                  ).toLocaleString("en-US")
                : data2.intelligence.toLocaleString("en-US")
            } (+${await checkDirector("intelligence")}/day)`,
            inline: false,
          },
          {
            name: `Endurance (END)`,
            value: `${
              employees[getTornID.torn_id].endurance
                ? parseInt(
                    employees[getTornID.torn_id]["endurance"]
                  ).toLocaleString("en-US")
                : data2.endurance.toLocaleString("en-US")
            } (+${await checkDirector("endurance")}/day)`,
            inline: false,
          },
          {
            name: `Total Working Stats`,
            value: `${parseInt(
              data2.manual_labor + data2.intelligence + data2.endurance
            ).toLocaleString("en-US")}`,
            inline: true,
          },
        ]);

      wait(2000);

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);
      await interaction.deferReply({
        ephemeral: true,
      });

      await wait(2000);

      await interaction.editReply({
        content: `You\'re not registered yet!`,
        ephemeral: true,
      });
    }
  },
};
