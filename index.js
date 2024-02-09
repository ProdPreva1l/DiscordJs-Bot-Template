const { ShardingManager } = require('discord.js');
const {botToken, shards, env} = require("./config")

const bot = new ShardingManager(`./${env}/index.js`,{token: botToken, execArgv: [`./${env}/index.js`, `--${env}`] })

//define this here so it always gets called
bot.on('shardCreate', shard => {
    console.log(`Starting Bot Shard ${shard.id += 1}/${shards}`)
});

// Spawn the shards
bot.spawn({amount: shards});