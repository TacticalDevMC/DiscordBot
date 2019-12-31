module.exports.run = async (client, message, args, randomColor, prefix, discord, botConfig) => {

    if (message.author.id !== botConfig.botOwnerID) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomColor)
            .setDescription(`***Geen permissions.***\n\nPermission: **Botowner(${botConfig.botOwner})**`);

        return message.channel.send(embed)

    }

    // if (!args[0]) return message.channel.send(`**⚠️ ERROR**\n\nUse: **${prefix}eval <text>**.`)
    if (!args[0]) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomColor)
            .setDescription(`***Te wijnig argumenten.***\n\nGebruik: **${prefix}eval [text]**`);
        return message.channel.send(embed)

    }


    try {
        var code = args.join(" ");
        var evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        let embed = new discord.RichEmbed()
            .setAuthor('Gelukt')
            .setColor(randomColor)
            .setDescription(`📥 Input: **${code}**\n\n📤 Output: **${evaled}**`);
        message.channel.send(embed)
        // message.channel.sendCode('d', clean(evaled));
    } catch (err) {
        let embed = new discord.RichEmbed()
            .setAuthor('Evalled')
            .setColor(randomColor)
            .setDescription(`📥 Input: **${code}**\n\n📤 Output: **${clean(err)}**`);
        // message.channel.send(`\`📥 Input: ${code}\n\n\ 📤Output: \`\`\`\`${clean(err)}\n\`\`\``);
        message.channel.send(embed)
    }
};

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports.help = {
    name: "eval"
};