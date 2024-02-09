// This file is a big mess, it always is, good thing you barely touch it!

const {Client, Collection, Events, ActivityType} = require('discord.js');
const {DefaultWebSocketManagerOptions: {identifyProperties}} = require("@discordjs/ws");
const client = new Client({intents: [1, 2, 4, 512, 4096]});
identifyProperties.browser = "Discord iOS";
const fs = require('node:fs');
const path = require('node:path');
const {botId, botToken} = require("../config");

// Listen for slash commands in the commands folder
client.commands = new Collection();
const foldersPath = path.join(__dirname, '/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    if (folder === "deploycmds.js") continue;
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`[Bot] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`[Bot] No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
});

client.once('shardReady', shard => {
    shardID = shard += 1;
    clientID = client.user.id;
    console.log(`Shard ${shardID} Ready!`)
    client.user.setActivity(`Shard #${shardID}`, {type: ActivityType.Watching})
})

client.login(botToken)