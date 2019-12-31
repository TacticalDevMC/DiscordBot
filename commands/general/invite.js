module.exports.run = async (client, message, args, randomcolor, prefix, discord, botconfig, chalk, guildData) => {

    let embed = new discord.RichEmbed()

        .setAuthor("Invite Link")
        .setColor(randomcolor)
        .setDescription(`Bot invite link: [Klik hier](${botconfig.invitelink})\n\nSupport Discord: [Klik hier](https://discord.gg/rVuyhgs)`)
        .setTimestamp()
        .setFooter("DiscordBot");

    message.channel.send(embed);
};

module.exports.help = {
    name: "invite"
};