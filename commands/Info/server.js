const Discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js')
module.exports = {
    name : 'server',
    alisases : ['srv'],
    category : 'Info',
    description : "Permet de récuperer des informations sur le serveur Discord.",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

        let invite = await message.channel.createInvite()
        const user = message.mentions.members.first() || message.author || message.guild.members.cache.get(args[0]) || message.member

        var prefix = 'k!'
        const mysql = require('mysql');
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'discord_bot',
        });

        db.query(`SELECT server_prefix FROM discord_server WHERE server_ID = ${message.guild.id}`, (err, rows) => {
            if(err) return message.channel.send('Error from MYSQL')
            else {
              if(rows.lenght < 1) var prefix = 'k!'
              else var prefix = rows[0].server_prefix
                let sEmbed = new Discord.MessageEmbed()
                .setTitle(`Informations sur ${message.guild.name}`)
                .setColor('BLURPLE')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**Cette commande donne des informations sur ce serveur.**\r\n\n**Owner** : ${message.guild.owner}\r\n**Crée le** : ${message.guild.createdAt.toLocaleString()}\r\n**ID**: ${message.guild.id}\r\n**Prefix** : ${prefix}\r\n**Nombre d'utilisateurs** : ${message.guild.memberCount}\r\n**Boost** : ${message.guild.premiumSubscriptionCount}\r\n**Lien** : ${invite}`)
                message.channel.send({ embeds: [sEmbed]})

            }
        })


  }
}