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

bot.on('kicked', console.log)
bot.on('error', console.log)