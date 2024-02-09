const yaml_config = require("node-yaml-config");
let config;

let env = process.argv[2].replace("--", "");

config = yaml_config.load(__dirname + "/config.yml", env);

const botToken = config.bot_token;
const botId = config.bot_id;
const shards = config.shards;

module.exports = {
    botToken,
    shards,
    botId,
    env
};