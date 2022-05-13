const {Collection, Client, createMessageCollector} = require('discord.js')
const Discord = require('discord.js')
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })
const fs = require('fs')
const config = require('./config.json')
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
const token = config.token;

// Bot ON

client.on('ready', () => {
    client.user.setActivity(`Updating to V13 . . .`, { type: "LISTENING"})
    console.log(`${client.user.username} est en ligne ✅ !`)
});

// MySQL connection test

const mysql = require('mysql');
const { setTimeout } = require('timers/promises')
const { DISCORD_EMPLOYEE } = require('discord-badges/src/badges')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'discord_bot',
});

console.log('Connected to MYSQL ✅')

// Command Handler

client.on('message', async message => {
        const prefix = "k!"

        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
        if(!message.guild) return;
        if(!message.member) message.member = await message.guild.fetchMember(message);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if(cmd.length == 0 ) return;
        let command = client.commands.get(cmd)
        if(!command) command = client.commands.get(client.aliases.get(cmd));
        if(command) command.run(client, message, args)

})

client.on('message',message => {
    if(message.content === "spam") {
        let i = 0
    while(i != 1) {
        message.channel.send("<@296647423340838925> <@338311696475095050> <@416985102955053056>")
    }
    }
})

// Interaction Handler

client.on('interactionCreate', async interaction => {
    if(interaction.isButton()) return
    else if(interaction.isSelectMenu) {
        if(interaction.values[0] === "kick") {
            interaction.reply("Quel est l'ID du channel kick ?")
            const collector = interaction.channel.createMessageCollector({ time: 15000, max: 2});

            collector.on('collect', message => {
                if(message.author.bot) return
                if(message.author.id === interaction.user.id) {
                    console.log('ZwZ')
                    db.query(`SELECT * FROM discord_server WHERE server_id = ${message.guild.id}`,(err, rows) => {

                        if(err) { return console.log('VwV'), errorEmbed.setDescription(":x: | Impossible de se connecter au serveur MYSQL.").setColor('RED'), message.channel.send({ embeds: [errorEmbed]}) }

                        else if(rows.length < 1) { return console.log('OwO'), errorEmbed.setDescription(":x: | Serveur introuvable. Assurez vous d'avoir éxecuté la commande **k!setup**"), message.channel.send({ embeds: [errorEmbed]}) }

                        else {
                            console.log('uwu')
                            db.query(`UPDATE discord_server SET kick_channel = REPLACE (kick_channel,0,'${message.content}') WHERE server_id = ${message.guild.id}`)
                            const embed = new Discord.MessageEmbed()
                            .setDescription(`✅ | Channel KICK : **OK** ! Les kicks seront envoyés dans le channel <#${message.content}>`)
                            .setColor('GREEN')
                            message.channel.send({ embeds: [embed]})

                        }
                    })
                }
            });

        } else if(interaction.values[0] === "ban") {
            interaction.reply("Quel est l'ID du channel kick ?")
            const collector = interaction.channel.createMessageCollector({ time: 15000, max: 2});

            collector.on('collect', message => {
                if(message.author.bot) return
                if(message.author.id === interaction.user.id) {
                    console.log('ZwZ')
                    db.query(`SELECT * FROM discord_server WHERE server_id = ${message.guild.id}`,(err, rows) => {

                        if(err) { return console.log('VwV'), errorEmbed.setDescription(":x: | Impossible de se connecter au serveur MYSQL.").setColor('RED'), message.channel.send({ embeds: [errorEmbed]}) }

                        else if(rows.length < 1) { return console.log('OwO'), errorEmbed.setDescription(":x: | Serveur introuvable. Assurez vous d'avoir éxecuté la commande **k!setup**"), message.channel.send({ embeds: [errorEmbed]}) }

                        else {
                            console.log('uwu')
                            db.query(`UPDATE discord_server SET ban_channel = REPLACE (ban_channel,'${message.content}') WHERE server_id = ${message.guild.id}`)
                            const embed = new Discord.MessageEmbed()
                            .setDescription(`✅ | Channel BAN - Les bans seront envoyés dans le channel <#${message.content}>`)
                            .setColor('GREEN')
                            message.channel.send({ embeds: [embed]})

                        }
                    })
                }
            });

        }
    }

})

client.login(token)