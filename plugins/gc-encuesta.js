let handler = async (m, { conn, text, args, usedPrefix, command }) => {  
    // Verifica primero si existen argumentos  
    if (!args[0]) {  
        throw `⚠️️ *_Ingrese un texto para iniciar la encuesta._*\n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`;  
    }  

    // Verifica que 'text' no sea undefined o null  
    if (!text || !text.includes('|')) {   
        throw `⚠️️ Separe las encuestas con *|*\n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`;  
    }  

    let a = [];  
    let b = text.split('|');  
    
    for (let c = 0; c < b.length; c++) {  
        a.push([b[c]]);  
    }  

    // Asegúrate que 'a' tenga elementos antes de enviar la encuesta  
    if (a.length === 0) {  
        throw `⚠️️ No se han agregado opciones a la encuesta.`;  
    }  

    return conn.sendPoll(m.chat, `${wm}`, a, m);  
}  

handler.help = ['encuesta <text|text2>'];  
handler.tags = ['grupo'];   
handler.command = ['poll', 'encuesta'];   
handler.group = true;  

export default handler;  
