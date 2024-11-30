const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whatsthis")
    .setDescription("Sends a YouTube link"),
  async execute(interaction) {
    try {
      await interaction.reply("https://www.youtube.com/watch?v=JqZRB4WtqZI");
    } catch (error) {
      await interaction.reply(`${error}`);
    }
  },
};
