let handler = async (m, { conn, text, args, usedPrefix, command }) => {  
    // Verifica si 'args' está definido  
    if (!args || !args[0]) {  
        throw `⚠️️ *_Ingrese un texto para iniciar la encuesta._*\n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`;  
    }  

    // Verifica que 'text' esté definido y contenga el separador '|'  
    if (!text || !text.includes('|')) {   
        throw `⚠️️ Separe las encuestas con *|*\n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`;  
    }  

    let a = [];  
    let b = text.split('|'); // Divide el texto en opciones  

    // Agrega las opciones a la matriz 'a'  
    for (let c = 0; c < b.length; c++) {  
        a.push([b[c].trim()]); // Usa .trim() para eliminar espacios innecesarios  
    }  

    // Verifica que 'a' no esté vacío  
    if (a.length === 0) {  
        throw `⚠️️ No se han agregado opciones a la encuesta.`;  
    }  

    // Envía la encuesta  
    return conn.sendPoll(m.chat, `${wm}`, a, m);  
}  

handler.help = ['encuesta <text|text2>'];  
handler.tags = ['grupo'];   
handler.command = ['poll', 'encuesta'];   
handler.group = true;  

export default handler;  
