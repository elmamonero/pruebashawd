// Importa node-fetch si es necesario (Node.js < v18)  
import fetch from 'node-fetch';  

const handler = async (m, { conn, usedPrefix, text, isPrems }) => {  
  try {  
    // URL de la imagen  
     let perfil = 'https://files.catbox.moe/kmfqee.jpg'
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];  
    const fechaHora = new Date().toLocaleString();  

    const str = `👑 𝗠𝗘𝗡𝗨 𝗙𝗥𝗘𝗘 𝗙𝗜𝗥𝗘 👑. 

    〔 👑 𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 👑 〕
    ╭───── • 🌟 • ─────╮
    *├❧ 🎫 ${usedPrefix}doanarsala*
    *├❧ 🎟️ ${usedPrefix}sorteo*
    *├❧ 🗼 ${usedPrefix}bermuda*
    *├❧ 🏜️ ${usedPrefix}kalahari*
    *├❧ 🏝️ ${usedPrefix}purgatorio*
    *├❧ 🥊 ${usedPrefix}cuadrilatero*
    ╰───── • 🌟 • ─────╯
    
    ⇝ ⚔️ LISTAS VERSUS ⚔️ ⇜
    ╭───── • 🌟 • ─────╮
    *├❧ 📜 ${usedPrefix}vs4*
    *├❧ 📜 ${usedPrefix}vs6*
    *├❧ 📜 ${usedPrefix}vs8*
    *├❧ 📜 ${usedPrefix}vs12*
    *├❧ 📜 ${usedPrefix}vs16*
    *├❧ 📜 ${usedPrefix}vs20*
    *├❧ 📜 ${usedPrefix}vs24*
    *├❧ 📜 ${usedPrefix}interna4*
    *├❧ 📜 ${usedPrefix}interna6*
    *├❧ 🌸 ${usedPrefix}vs4fem*
    *├❧ 🌸 ${usedPrefix}vs6fem*
    *├❧ 🌸 ${usedPrefix}vs8fem*
    *├❧ 🌸 ${usedPrefix}vs12fem*
    *├❧ 🌸 ${usedPrefix}vs16fem*
    *├❧ 🌸 ${usedPrefix}vs20fem*
    *├❧ 🌸 ${usedPrefix}vs24fem*
    *├❧ 💖 ${usedPrefix}interna4fem*
    *├❧ 💖 ${usedPrefix}interna6fem*
    *├❧ 🔷 ${usedPrefix}hexagonal*
    *├❧ 🏆 ${usedPrefix}scrim*
    *├❧ 🥇 ${usedPrefix}guerra*
    ╰───── • 🌟 • ─────╯
    
    ⇝ 📋 REGLAS VERSUS 📋 ⇜
    ╭───── • 🌟 • ─────╮
    *├❧ 📑 ${usedPrefix}reglasclk*
    *├❧ 📜 ${usedPrefix}reglascuadri*
    *├❧ 👑 ${usedPrefix}reglastreino*
    *├❧ 🏰 ${usedPrefix}reglas8imperios*
    *├❧ 👺 ${usedPrefix}reglasapostado*
    *├❧ 🎮 ${usedPrefix}reglaslideres*
    *├❧ 🎮 ${usedPrefix}reglaslideres2*
    ╰───── • 🌟 • ─────╯  
`.trim();  

    // Enviar la imagen  
    await conn.sendMessage(m.chat, {  
      image: { url: perfil },  
      caption: str,  
      mentions: [m.sender]  
    }, { quoted: m });  

    await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } }); // Reacción  

  } catch (e) {  
    console.error("Error al enviar el mensaje:", e);  
    conn.reply(m.chat, `*[ ℹ️ ] Error al enviar la imagen o al procesar la solicitud:*\n\n\`\`\`${e}\`\`\``, m);  
  }  
};  

handler.command = /^(menuff|comandosff2)$/i;  
handler.fail = null;  

export default handler;  
