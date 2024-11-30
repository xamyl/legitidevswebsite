const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'legitimoose.com',
  username: '72521d41-9aaf-481d-a8bf-d97adf219911', // Legitimooseapi
  auth: 'microsoft'
})
/*
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})*/
bot.on('message', (jsonMsg, position, sender, verified) => {
    console.log(jsonMsg.toString());
})

bot.on('kicked', () => {
  console.log("The bot is probably banned. Please contact the Minecraft server administrator")
})
bot.on('error', () => {
  console.log("The bot encountered a problem and can't continue. Please submit the issue on github.")
})
