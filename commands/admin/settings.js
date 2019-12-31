module.exports.run = async (client, message, args, randomcolor, prefix, discord, botconfig, chalk, guildData) => {

    // let prefix = guildData.get(`${message.guild.id}.settings.prefix`);
    let adminRole = guildData.get(`${message.guild.id}.admin.adminRole`);
    let logChannel = guildData.get(`${message.guild.id}.admin.logChannel`);

    var logChan = message.guild.channels.find(c => c.id === logChannel);
    var adminRol = message.guild.roles.find(r => r.id === adminRole);


    if (args[0] === undefined) {

        let embed = new discord.RichEmbed()
            .setAuthor("Settings - Info")
            .setColor(randomcolor)
            .addField("Prefix", prefix)
            .addField("AdminRole", adminRole)
            .addField("Logchannel", logChannel)
            .setTimestamp()
            .setFooter("DiscordBot - Settings");
        return message.reply(embed)
    }

    var role = message.mentions.roles.first();

    if (!adminRole === "Geen") {
        let embed = new discord.RichEmbed()
            .setAuthor("Settings - Error")
            .setColor(randomcolor)
            .setDescription(`Er is geen adminrole gezet.\n\nCommando: **${prefix}settings setadminrole [newAdminRole]**\n\nPermission: **ADMINISTRATOR**`)
            .setTimestamp()
            .setFooter("DiscordBot - Settings");
        await message.reply(embed)
    }

    if (args[0] === "setadminrole") {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (args[1] === undefined) {
                let embed = new discord.RichEmbed()
                    .setAuthor("Settings - GeenArgs")
                    .setColor(randomcolor)
                    .setDescription(`Gebruik het commando als volgt: **${prefix}settings setadminrole [newAdminRole]**`)
                    .setTimestamp()
                    .setFooter("DiscordBot - Settings");
                return message.reply(embed)
            }

            if (logChannel !== "Geen") {
                let embed = new discord.RichEmbed()
                    .setAuthor("Settings - Log")
                    .setColor(randomcolor)
                    .setDescription(`Er is een log binnengekomen!\n\nLogFunctie: **Settings**\n\nSetting: **AdminRole**\n\nOude Setting: **${adminRole}**\n\nNieuwe Setting: **${args[1]}**`)
                    .setTimestamp()
                    .setFooter("DiscordBot - Log");
                logChan.send(embed);
            }

            let succesEmbed = new discord.RichEmbed()
                .setAuthor("Settings - Succes")
                .setColor(randomcolor)
                .setDescription(`Gelukt! U hebt succesvol de adminrole veranderd.\n\nOude Adminrole: **${adminRole}**\n\nNieuwe Adminrole: **${args[1]}**`)
                .setTimestamp()
                .setFooter("DiscordBot - Settings");
            await message.reply(succesEmbed);
            guildData.set(`${message.guild.id}.admin.adminRole`, role.name);
        } else {
            let embed = new discord.RichEmbed()
                .setAuthor("Settings - GeenPerms")
                .setColor(randomcolor)
                .setDescription(`U hebt hier geen permissions voor!\n\nPermission: **ADMINISTRATOR**`)
                .setTimestamp()
                .setFooter("DiscordBot - Permissions");
            await message.reply(embed);
        }
    } if (args[0] === "setlogchannel") {
        if (!message.member.roles.has(adminRole)) {
            if (args[1] === undefined) {
                let embed = new discord.RichEmbed()
                    .setAuthor("Settings - GeenArgs")
                    .setColor(randomcolor)
                    .setDescription(`Gebruik het commando als volgt: **${prefix}settings setlogchannel [newLogChannel]**`)
                    .setTimestamp()
                    .setFooter("DiscordBot - Settings");
                return message.reply(embed)
            }

            if (logChannel !== "Geen") {
                let embed = new discord.RichEmbed()
                    .setAuthor("Settings - Log")
                    .setColor(randomcolor)
                    .setDescription(`Er is een log binnengekomen!\n\nLogFunctie: **Settings**\n\nSetting: **LogChannel**\n\nOude Setting: **${logChannel}**\n\nNieuwe Setting: **${args[1]}**`)
                    .setTimestamp()
                    .setFooter("DiscordBot - Log");
                logChan.send(embed);
            }

            let succesEmbed = new discord.RichEmbed()
                .setAuthor("Settings - Succes")
                .setColor(randomcolor)
                .setDescription(`Gelukt! U hebt succesvol de logchannel veranderd.\n\nOude LogChannel: **${logChannel}**\n\nNieuwe LogChannel: **${args[1]}**`)
                .setTimestamp()
                .setFooter("DiscordBot - Settings");
            await message.reply(succesEmbed);
            guildData.set(`${message.guild.id}.admin.logChannel`, message.guild.channels.find(c => c.name == args[1]));
        } else {
            let embed = new discord.RichEmbed()
                .setAuthor("Settings - GeenPerms")
                .setColor(randomcolor)
                .setDescription(`U hebt hier geen permissions voor!\n\nPermission: **ADMINISTRATOR**`)
                .setTimestamp()
                .setFooter("DiscordBot - Permissions");
            await message.reply(embed);
        }
    } else if (args[0] === "info") {
        if (!message.member.roles.has(adminRole)) {
            let embed = new discord.RichEmbed()
                .setAuthor("Settings - GeenPerms")
                .setColor(randomcolor)
                .setDescription(`U hebt hier geen permissions voor!`)
                .setTimestamp()
                .setFooter("DiscordBot - Permissions");
            return message.reply(embed);
        }

        let embed = new discord.RichEmbed()
            .setAuthor("Settings - Info")
            .setColor(randomcolor)
            .addField("Prefix", prefix)
            .addField("AdminRole", adminRole)
            .addField("Logchannel", logChannel)
            .setTimestamp()
            .setFooter("DiscordBot - Settings");
        await message.reply(embed);
    } else if (args[0] === "setprefix") {
        if (!message.member.roles.has(adminRole)) {
            let embed = new discord.RichEmbed()
                .setAuthor("Settings - GeenPerms")
                .setColor(randomcolor)
                .setDescription(`U hebt hier geen permissions voor!`)
                .setTimestamp()
                .setFooter("DiscordBot - Permissions");
            return message.reply(embed);
        }

        if (args[1] === undefined) {
            let embed = new discord.RichEmbed()
                .setAuthor("Settings - GeenArgs")
                .setColor(randomcolor)
                .setDescription(`Gebruik het commando als volgt: **${prefix}settings setprefix [newPrefix]**`)
                .setTimestamp()
                .setFooter("DiscordBot - Settings");
            return message.reply(embed)
        }

        if (logChannel !== "Geen") {
            let embed = new discord.RichEmbed()
                .setAuthor("Settings - Log")
                .setColor(randomcolor)
                .setDescription(`Er is een log binnengekomen!\n\nLogFunctie: **Settings**\n\nSetting: **Prefix**\n\nOude Setting: **${prefix}**\n\nNieuwe Setting: **${args[1]}**`)
                .setTimestamp()
                .setFooter("DiscordBot - Log");
            logChan.send(embed);
        }

        let succesEmbed = new discord.RichEmbed()
            .setAuthor("Settings - Succes")
            .setColor(randomcolor)
            .setDescription(`Gelukt! U hebt succesvol de prefix veranderd.\n\nOude Prefix: **${prefix}**\n\nNieuwe Prefix: **${args[1]}**`)
            .setTimestamp()
            .setFooter("DiscordBot - Settings");
        await message.reply(succesEmbed);
        guildData.set(`${message.guild.id}.settings.prefix`, args[1]);
    }
};


module.exports.help = {
    name: "settings"
};