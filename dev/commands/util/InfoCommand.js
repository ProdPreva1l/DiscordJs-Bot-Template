const { SlashCommandBuilder, EmbedBuilder, version} = require('discord.js');
const {env, shards} = require("../../../config");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives you info on the bot!'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Bot Info")
            .addFields(
                {name: 'Environment', value: env, inline: true},
                {name: 'Shard ID', value: `${shardID} / ${shards}`, inline: true},
                {name: 'NodeJS Version', value: `${process.version}`},
                {name: 'DiscordJS Version', value: `v${version}`},
            )

        await interaction.reply({embeds: [embed]});
    }
};