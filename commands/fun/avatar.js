module.exports.run = async (client, message, args, randomcolor, prefix, discord, botconfig, chalk, guildData) => {

    // if (args[0] == null) {
    let embed = new discord.RichEmbed()

        .setAuthor("Avatar")
        .setColor(randomcolor)
        // .setDescription("Hier is uw avatar")
        .setImage(message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("DiscordBot");

    message.channel.send(embed)
    // }

};

module.exports.help = {
    name: "avatar"
};