const Discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { NEWDECIMAL } = require('mysql/lib/protocol/constants/types');
module.exports = {
    name : 'setup',
    alisases : ['set'],
    category : 'Staff',
    description : "Set channel",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

    const mysql = require('mysql');
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'discord_bot',
    });

    const errorEmbed = new Discord.MessageEmbed()
    
    const row2 = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("menu_setup")
        .setPlaceholder("Cliquez ici pour choisir")
        .addOptions([
          {
            label:"Ban Channel",
            value:"ban",
            description:("Permet de mettre un channel ou seront répértorié les bans"),
            emoji:"🏦"
          },
          {
            label:"Kick Channel",
            value:"kick",
            description:("Permet de mettre un channel ou seront répértorié les kick"),
            emoji:"❌"
          },
          {
            label:"Prefix",
            value:"prefix",
            description:("Permet de choisir le prefix du serveur"),
            emoji:"🧾"
          },
        ])
    )

    db.query(`SELECT * FROM discord_server WHERE server_id = ${message.guild.id}`,(err, rows) => {
      if(err) return errorEmbed.setDescription("❌ | Impossible de se connecter au serveur MYSQL.").setColor('RED'), message.channel.send({ embeds: [errorEmbed]})
      else if(rows.length < 1) {
          db.query(`INSERT INTO discord_server(server_id,server_name,server_prefix) VALUES ('${message.guild.id}','${message.guild.name}','k!')`)
          errorEmbed.setDescription("✅ | Base de donnée créer pour le serveur !\r\nSi vous refaite la commande, vous aurez accès à la configuration du serveur.").setColor("GREEN"), message.channel.send({ embeds: [errorEmbed]})
      } else {
        const selectEmbed = new Discord.MessageEmbed()
        .setDescription('🛠️ | Bienvenue dans les paramètres de configuration :').setColor('BLURPLE')
          message.channel.send({ embeds:[selectEmbed], components: [row2]})
      }
  })

  }

}