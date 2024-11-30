const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

async function getItemIcon(item_id) {
  let final = item_id.substring(10).split("_");
  final = final
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join("_");

  let pngUrl = `https://minecraft.wiki/w/Special:FilePath/${final}.png`;
  const pngResponse = await fetch(pngUrl);
  pngUrl = pngResponse.url;

  if (pngResponse.status != 404) {
    return pngUrl;
  } else {
    let gifUrl = `https://minecraft.wiki/w/Special:FilePath/${final}.gif`;
    return gifUrl;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getitemicon")
    .setDescription("Get an item's icon")
    .addStringOption((option) =>
      option.setName("item").setDescription("The item").setRequired(true)
    ),
  async execute(interaction) {
    try {
      let icon = await getItemIcon(interaction.options.getString("item"));
      const itemEmbed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Item Icon")
        .setImage(icon);
      await interaction.reply({ embeds: [itemEmbed] });
    } catch (error) {
      await interaction.reply(`${error}`);
    }
  },
};
