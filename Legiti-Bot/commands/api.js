const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("api")
    .setDescription("API"),
  async execute(interaction) {
    try {
      await interaction.reply("<@" + `${interaction.user.id}` + ">");
    } catch (error) {
      await interaction.reply(`${error}`);
    }
  },
};
