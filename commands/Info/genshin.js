const Discord = require('discord.js')
const { MessageButton} = require('discord.js')
const Data2 = require("../../models/serverdata.js");
const { getColorFromURL } = require('color-thief-node');
const botconfig = require('../../config.json');
const mongoose = require('mongoose')
const genshindb = require('genshin-db')
const genshinimage = require('../../jsonFiles/genshinimages.json')
const paginationEmbed = require('discordjs-button-pagination');
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})
const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js');
const { join } = require('path/posix');
module.exports = {
    name : 'genshin',
    alisases : ['g'],
    category : 'Info',
    description : "Permet de récuperer des informations sur le serveur Discord.",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

    if(args[0] === 'charlist') {
        let PEmbed = new Discord.MessageEmbed()
            .setTitle("Liste des personnages Genshin 🐲")
            .setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png/revision/latest?cb=20201117071158')
            .setColor('BLURPLE')
            .setDescription("**A** : Aether, Albedo, Aloy, Amber, Arataki Itto\n**B** : Barbara, Beidou, Bennett\n**C** : Chongyun\n**D** : Diluc, Diona\n**E** : Eula\n**F** : Fischl\n**G** : Ganyu, Gorou\n**H** : Hu Tao\n**J** : Jean\n**K** : Kaedehara Kazuha, Kaeya, Kamisato Ayaka, Keqing, Klee, Kujou Sara\n**L** : Lisa, Lumine\n**M** : Mona\n**N** Ningguang, Noelle\n**Q** : Qiqi\n**R** : Raiden Shogun, Razor, Rosalia\n**S** : Sangonomiua Kokomi, Sayu, Sucrose\n**T** : Tartaglia, Thomas\n**V** : Venti\n **X** : Xiangling, Xiao, Xingqiu, Xinyan\n**Y** : Yanfei, Yoimiya, Yun Jin\n**Z** : Zhongli")
            .setFooter(`Executé par : ${message.author.username}`,`${message.author.displayAvatarURL({ dynamic : true})}`)
            .setTimestamp()
            message.channel.send({ embeds: [PEmbed]})


    }
    else if(args[0] === 'help') {
        Data2.findOne({
            serverID: message.guild.id
        }, (err, data) => {
        let hembed = new Discord.MessageEmbed()
        .setTitle('**Genshin Help ⭐**')
        .setColor('#FFFF00')
        .setDescription("Aide pour la commande 'Genshin'.")
        .setThumbnail('https://cdn.discordapp.com/attachments/712063798386884678/826900881949458513/1f527.png')
        .addField('Que fait cette commande ? ✨',`Cette commande permet de recevoir quelques informations concernant le jeu Genshin Impact.\nListe de commandes :\n**-${data.prefix}genshin (Personnage) info**\n**-${data.prefix}genshin (Personnage) attaque**\n**-${data.prefix}genshin charlist**\n**-${data.prefix}genshin weaponlist**\n**-${data.prefix}genshin ...**`)
        .addField("Besoin d'aide supplémentaire ? 🌗", "Dirigez vous vers une personne du staff ou vers le créateur.")
        .setFooter(`Executé par : ${message.author.username}`,`${message.author.displayAvatarURL({ dynamic : true})}`)
        .setTimestamp()
        message.channel.send({ embeds: [hembed]})
    })

    } else {
        let char = genshindb.characters(`${args[0]}`,{ resultLanguage: 'FR' })
        let char2 = genshindb.talents(`${args[0]}`,{ resultLanguage: 'FR' })

        const button1 = new MessageButton()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("DANGER")

        const button2 = new MessageButton()
      .setCustomId("nextbtn")
      .setLabel("Next")
      .setStyle("SUCCESS")


        //CHAR INFO
        const cDesc = char.description
        const cWeapon = char.weapontype
        const cGender = char.gender
        const cAff = char.affiliation
        const cAnniv = char.birthday
        const cConst = char.constellation
        const cElem = char.element
        const cStats = char.substat
        const cRare = char.rarity

        //TALENTS
        const cCombpass1 = char2.passive1.name
        const cCombpass2 = char2.passive2.name
        const cCombpass3 = char2.passive3.name
        const cComb1 = char2.combat1.name
        const cComb2 = char2.combat2.name
        const cComb3 = char2.combat3.name
        const cCombD1 = char2.combat1.info
        const cCombD2 = char2.combat2.info
        const cCombD3 = char2.combat3.info


        //Artéfacts
        var cImage = char.images.card
        if(!cImage) {
            cImage = genshinimage[`${char.name}`][0].banner
        }

        const dominantColor = await getColorFromURL(cImage);

    if(cGender === "Femme") { gEmoji = "♀️" } else { gEmoji = "♂️" }
        let MEmbed = new Discord.MessageEmbed()
        .setTitle(`${char.name}, ${char.title} 🧧`)
        .setColor(dominantColor)
        .setDescription(cDesc)
        .setImage(cImage)
        .addFields(
		    { name: `Genre ${gEmoji}:`, value: cGender, inline: true },
            { name: 'Element ☀️:', value: cElem, inline: true },
		    { name: 'Région 🗺️:', value: char.region, inline: true },
            { name: 'Affiliation 🔗:', value: cAff, inline: true },
		    { name: 'Arme ⚔️:', value: cWeapon, inline: true },
            { name: 'Stats 📋:', value: cStats, inline: true },
            { name: 'Constellation 🌌:', value: cConst, inline: true },
            { name: 'Anniversaire 🎂:', value: cAnniv, inline: true },
            { name: 'Rareté ⭐:', value: cRare, inline: true },
        )
        .addField("Passives 📗:", `- ${cCombpass1}\n- ${cCombpass2}\n- ${cCombpass3}\n`)
        .addField("Attaques 📙:", `- ${cComb1}\n- ${cComb2}\n- ${cComb3}` )
        .setFooter(`Executé par : ${message.author.username}`,`${message.author.displayAvatarURL({ dynamic : true})}`)
        .setTimestamp()

        const combo = `**${cComb1}**\n${cCombD1}\n\r**${cComb2}**\n${cCombD2}\n\r**${cComb3}**\n${cCombD3}`
        let AEmbed = new Discord.MessageEmbed()
        .setTitle(`${char.name}, ${char.title} 🧧`)
        .setColor(dominantColor)
        .setImage(cImage)
        .setDescription(combo)
        .setFooter(`Executé par : ${message.author.username}`,`${message.author.displayAvatarURL({ dynamic : true})}`)
        .setTimestamp()

        let UEmbed = new Discord.MessageEmbed()
        .setTitle(`${char.name}, ${char.title} 🧧`)
        .setColor(dominantColor)
        try {
            let build = genshinimage[`${char.name}`][0].build
            UEmbed.setImage(build)
        }catch(e) {
            UEmbed.addField("Build non trouvé","Le build n'est pas encore pris en charge pour ce personnage par ce bot")
        }

        pages = [MEmbed, UEmbed, AEmbed]
        const buttonList = [button1, button2];
        paginationEmbed(message, pages, buttonList, 60000)


    }
}

}
