const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { UserKey } = require('../../database/db_config');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data : new SlashCommandBuilder()
        .setName('employee')
        .setDescription('Get employee list'),
    async execute(interaction, client){
        try {

            let getTornID = await UserKey.findOne({
                where: {
                  dc_id: interaction.user.id,
                },
              });

              let response = await fetch(
                `https://api.torn.com/company/98839?selections=&key=` +
                  getTornID.torn_key
              );

              let data = await response.json();
              let employees = data.company.employees;
              //console.log("company employees: ", employees);
              //console.log("ID", employees[getTornID.torn_id]);

              let textList = `**${data.company.name}** ${data.company.employees_hired}/${data.company.employees_capacity} Employee(s) (+1 Director)\n\`\`\``
              let listEmployees = []

              for (let i of Object.values(employees)) {
                listEmployees.push([i.name, i.position, i.status['description'], i.days_in_company])
              }

              for (let index = 0; index < listEmployees.length; index++) {
                if(index < 9){
                    textList += `0${index+1}. ${listEmployees[index][0]} (${listEmployees[index][3]} days(s) as ${listEmployees[index][1]})\n    Status: ${listEmployees[index][2]}\n`
                } else {
                    textList += `${index+1}. ${listEmployees[index][0]} (${listEmployees[index][3]} days(s) as ${listEmployees[index][1]})\n    Status: ${listEmployees[index][2]}\n`
                }
              }

              textList += `\`\`\``

              wait(5000)

            await interaction.reply(
            textList
            );
        } catch (error) {
            console.error(error);
        }
       
    }
}