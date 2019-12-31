const discord = require('discord.js');
const client = new discord.Client();
const botconfig = require('./botconfig.json');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');


client.commands = new discord.Collection();

const Conf = require('json-config-store');

const guildData = new Conf({
    cwd: __dirname,
    configName: 'guildSettings.json'
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client, fs, chalk));
    });
});

fs.readdir('./commands/general', (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log(chalk.blue("[GENERAL] ") + chalk.red("Ik kon geen files vinden!"));
        return;
    }

    jsFiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/general/${f}`)];

        var fileGet = require(`./commands/general/${f}`)
        console.log(chalk.blue("[GENERAL] ") + chalk.green(`De file ${f} is geladen.`))

        client.commands.set(fileGet.help.name, fileGet);
    });
});

fs.readdir('./commands/fun', (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log(chalk.blue("[FUN] ") + chalk.red("Ik kon geen files vinden!"));
        return;
    }

    jsFiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/fun/${f}`)];

        var fileGet = require(`./commands/fun/${f}`)
        console.log(chalk.blue("[FUN] ") + chalk.green(`De file ${f} is geladen.`))

        client.commands.set(fileGet.help.name, fileGet);
    });
});

fs.readdir('./commands/admin', (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log(chalk.blue("[ADMIN] ") + chalk.red("Ik kon geen files vinden!"));
        return;
    }

    jsFiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/admin/${f}`)];

        var fileGet = require(`./commands/admin/${f}`)
        console.log(chalk.blue("[ADMIN] ") + chalk.green(`De file ${f} is geladen.`))

        client.commands.set(fileGet.help.name, fileGet);
    });
});

fs.readdir('./commands/botowner', (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log(chalk.blue("[BOTOWNER] ") + chalk.red("Ik kon geen files vinden!"));
        return;
    }

    jsFiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/botowner/${f}`)];

        var fileGet = require(`./commands/botowner/${f}`)
        console.log(chalk.blue("[BOTOWNER] ") + chalk.green(`De file ${f} is geladen.`))

        client.commands.set(fileGet.help.name, fileGet);
    });
});

client.on('ready', async () => {
    await client.user.setStatus("online");
    await client.user.setActivity("Coding");

    console.log('--------------------');
    console.log(chalk.cyan(`De ${client.user.username} is opgestart`));
    console.log(chalk.cyan(`Actief met ${client.commands.size} command(s).`));
    console.log('--------------------');
});

client.on('message', async message => {

    var random;

    random =
        [
            "#1d64b4",
            "#14dcb4",
            "#008000",
            "#ff8000",
            "#ff8000",
            "#40e0d0",
            "#028af1",
            "#dc143c",
            "#c3f6fe",
            "#ffb400",
            "#afff00",
            "#532cea",
            "#36d44a",
            "#6ff521",
            "#2441e2",
            "#7b72b6"
        ];

    // GUILDSETTINGS
    if (!guildData.get(`${message.guild.id}.settings.prefix`)) guildData.set(`${message.guild.id}.settings.prefix`, `!`);
    if (!guildData.get(`${message.guild.id}.admin.adminRole`)) guildData.set(`${message.guild.id}.admin.adminRole`, `Geen`);
    if (!guildData.get(`${message.guild.id}.admin.logChannel`)) guildData.set(`${message.guild.id}.admin.logChannel`, `Geen`);

    var prefix = guildData.get(`${message.guild.id}.settings.prefix`);

    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    Math.floor((totalSeconds / 60) % 60);

    var randomcolor = random[Math.floor(Math.random() * random.length)];

    const timestamp = `${moment().format("HH:mm:ss DD/MM/YYYY")}`;

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (!message.content.startsWith(prefix)) return;

    var messageArray = message.content.split(" ");
    var cmd = messageArray[0];
    var args = messageArray.slice(1);
    var commands = client.commands.get(cmd.slice(prefix.length));

    if (commands) commands.run(client, message, args, randomcolor, prefix, discord, botconfig, chalk, guildData);

});

client.login(process.env.token);
