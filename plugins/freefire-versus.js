const handler = async (m, { text, conn, args, usedPrefix, command }) => {

    if (args.length < 2) {  
        conn.reply(m.chat, `*[ ℹ️ ] Ingresa una hora en formato (HH:MM) seguido de AM/PM, el país y la modalidad.*
*Usa MX para México, CO para Colombia, CL para Chile, AR para Argentina, PE para Perú y EC para Ecuador.*

*[ 💡 ] Ejemplo:* .${command} 08:30 PM PE Vv2`, m);
        return;
    }

    // Validación para formato de hora en 12 horas
    const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    if (!horaRegex.test(args[0])) {  
        conn.reply(m.chat, '*[ ⏰ ] Formato de hora incorrecto. Debe ser HH:MM en formato de 12 horas.*', m);  
        return;  
    }

    // Validación para AM/PM
    const ampm = args[1].toUpperCase();
    if (!['AM', 'PM'].includes(ampm)) {  
        conn.reply(m.chat, '*[ ⏰ ] Debes especificar "AM" o "PM" después de la hora.*', m);  
        return;  
    }

    let [hora, minutos] = args[0].split(':').map(Number);
    if (ampm === 'PM' && hora !== 12) hora += 12;
    if (ampm === 'AM' && hora === 12) hora = 0;  

    let [hora, minutos] = args[0].includes(':') ? args[0].split(':').map(Number) : [Number(args[0]), 0];

    const pais = args[1].toUpperCase();  

    const diferenciasHorarias = {
    MX: -1, // UTC-6
    CO: 0,  // UTC-5
    CL: 2,  // UTC-4
    AR: 2,  // UTC-3
    PE: 0,  // UTC-5
    EC: 0   // UTC-5
};
  

    if (!(pais in diferenciasHorarias)) {  
        conn.reply(m.chat, '*[ ℹ️ ] País no válido. Usa MX para México, CO para Colombia, CL para Chile, AR para Argentina, PE para Perú y EC para Ecuador.*', m);  
        return;  
    }  

    const diferenciaHoraria = diferenciasHorarias[pais];  
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: true, hour: '2-digit', minute: '2-digit' });  

    const horasEnPais = { MX: '', CO: '', CL: '', AR: '', PE: '', EC: '' };  

    for (const key in diferenciasHorarias) {  
        const horaActual = new Date();  
        horaActual.setHours(hora, minutos, 0, 0);

        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));  
        horasEnPais[key] = formatTime(horaEnPais);  
    }  

    const modalidad = args.slice(2).join(' ');  
    m.react('🎮');  

    // Configuración de la modalidad según el comando usado
    let titulo = '';
    let players = [];
    let iconos = [];
    let iconos2 = [];

    switch (command) {
        case 'v4fem':
        case 'vsfem4':
            titulo = '4VS4 FEM';
            players = ['Jᥙgᥲძ᥆rᥲs:'];
            iconos = ['🌸', '🌸', '🌸', '🌸'];
            iconos2 = ['🌸', '🌸'];
            break;
        case 'v4masc':
        case 'vsmasc4':
            titulo = '4VS4 MASC';
            players = ['Jᥙgᥲძ᥆rᥱs'];
            iconos = ['🥥', '🥥', '🥥', '🥥'];
            iconos2 = ['🥥', '🥥'];
            break;
        case 'v4mixto':
        case 'vsmixto4':
            titulo = '4VS4 MIXTO';
            players = ['Jᥙgᥲძ᥆r᥊s'];
            iconos = ['🍁', '🍁', '🍁', '🍁'];
            iconos2 = ['🍁', '🍁'];
            break;
        case 'v6fem':
        case 'vsfem6':
            titulo = '6VS6 FEM';
            players = ['Jᥙgᥲძ᥆rᥲs'];
            iconos = ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋'];
            iconos2 = ['🦋', '🦋'];
            break;
        case 'v6masc':
        case 'vsmasc6':
            titulo = '6VS6 MASC';
            players = ['Jᥙgᥲძ᥆rᥱs'];
            iconos = ['🥞', '🥞', '🥞', '🥞', '🥞', '🥞'];
            iconos2 = ['🥞', '🥞'];
            break;
        case 'v6mixto':
        case 'vsmixto6':
            titulo = '6VS6 MIXTO';
            players = ['Jᥙgᥲძ᥆r᥊s'];
            iconos = ['🥯', '🥯', '🥯', '🥯', '🥯', '🥯'];
            iconos2 = ['🥯', '🥯'];
            break;
        default:
            conn.reply(m.chat, '*[ ❌ ] Comando no válido.*', m);
            return;
    }

    const message = `ㅤㅤㅤ *\`${titulo}\`*

🕹꒱ *ʀᴇɢʟᴀs:* ${modalidad}
⏰꒱ *ʜᴏʀᴀ:*  
🇲🇽 México: ${horasEnPais.MX}  
🇨🇴 Colombia: ${horasEnPais.CO}  
🇵🇪 Perú: ${horasEnPais.PE}  
🇪🇨 Ecuador: ${horasEnPais.EC}  
🇨🇱 Chile: ${horasEnPais.CL}  
🇦🇷 Argentina: ${horasEnPais.AR}  

ㅤ \`${players}\`

${iconos.map(icono => `${icono}˚ `).join('\n')}

ㅤ \`Sᥙ⍴ᥣᥱᥒ𝗍ᥱs:\`

${iconos2.map(icono => `${icono}˚ `).join('\n')}

ㅤ \`𝗢𝗥𝗚𝗔𝗡𝗜𝗭𝗔𝗗𝗢𝗥:\`
@${m.sender.split('@')[0]}`.trim();

conn.sendMessage(m.chat, { text: message, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['inmixto4', 'inmixto6', 'inmasc4', 'inmasc6', 'infem4', 'infem6'];
handler.tags = ['ff'];
handler.command = /^(v4fem|vsfem4|v4masc|vsmasc4|v4mixto|vsmixto4|v6fem|vsfem6|v6masc|vsmasc6|v6mixto|vsmixto6)$/i;

export default handler;
