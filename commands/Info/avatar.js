const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'avatar',
    alisases : ['avtr'],
    category : 'Info',
    description : "Permet de récuperer l'avatar de la personne.",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

        const tUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        let aEmbed = new Discord.MessageEmbed()
        .setColor('BLURPLE')
        .setDescription(`**🖼️ Voici l'avatar de ${tUser.user}**`)
        .setFooter(`Executé par : ${message.author.username}`,`${message.author.displayAvatarURL({ dynamic : true})}`)
        .setTimestamp()

        if(!args[0]) {
            aEmbed.setImage(`${message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })}`)
            message.channel.send({ embeds: [aEmbed] })

        } else {
            aEmbed.setImage(`${tUser.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })}`)
            message.channel.send({ embeds: [aEmbed] })
        }
  }
}