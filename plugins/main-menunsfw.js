import fetch from 'node-fetch';  

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {  
  try {  
    const img = './media/menus/Menu.jpg';  
    const more = String.fromCharCode(8206);  
    const readMore = more.repeat(850);  
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];  

    // Obtener la fecha y hora actual  
    const now = new Date();  
    const fechaHora = now.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }); // Formato de fecha y hora  

    const str = `👋🏻 ¡Hᴏʟᴀ! ${taguser}  
Bɪᴇɴᴠᴇɴɪᴅᴏ ᴀʟ ᴍᴇɴᴜ *ɴsғᴡ* 🔞  

\`\`\`${fechaHora}\`\`\`  

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`* 🪱 ᦡᦡ  
ര ׄ⃟🪱˚ .xnxxsearch *texto*  
...  
> © mᥱᥒᥙ *ᥒs𝖿ᥕ* ᑲᥡ  ᥴrіss.᥎᥊`.trim(); // Asegúrate de completar con el resto de tu cadena  

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });  

    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });  
  } catch (e) {  
    conn.reply(m.chat, `*[ ℹ️ ] Error al enviar el menú.*\n\n> ${e}`, m);  
    console.error(e); // Esto imprimirá el error en la consola para mayor diagnóstico  
  }  
};  

handler.help = ['menunsfw'];  
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18|menucaliente|menuporno|pornomenu|menuxxx)$/i;  
handler.fail = null;  

export default handler;  
