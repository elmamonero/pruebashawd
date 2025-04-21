const handler = async (m, { text, conn, args, usedPrefix, command }) => {  
    if (args.length < 3) {  
        conn.reply(m.chat, `*[ ℹ️ ] Ingresa una hora en formato (HH:MM AM/PM) seguida del país y la modalidad.*  

        *Usa:*  
        🇲🇽 MX para México  
        🇨🇴 CO para Colombia  
        🇨🇱 CL para Chile  
        🇦🇷 AR para Argentina  
        🇵🇪 PE para Perú  
        🇪🇨 EC para Ecuador  
        🇺🇾 UY para Uruguay  
        🇻🇪 VE para Venezuela  

        *[ 💡 ] Ejemplo:* .${command} 08:30 PM PE Vv2`, m);  
        return;  
    }  

    // Validación de formato de hora en 12 horas incluyendo AM/PM  
    const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;  
    if (!horaRegex.test(`${args[0]} ${args[1]}`)) {  
        conn.reply(m.chat, '*[ ⏰ ] Formato de hora incorrecto. Debe ser HH:MM AM/PM en formato de 12 horas (ejemplo: 07:00 AM o 11:30 PM).*', m);  
        return;  
    }  

    let [hora, minutos] = args[0].split(':').map(Number);  
    const ampm = args[1].toUpperCase();  

    if (ampm === 'PM' && hora !== 12) hora += 12;  
    if (ampm === 'AM' && hora === 12) hora = 0;  

    const pais = args[2].toUpperCase();  

    const diferenciasHorarias = {  
        MX: -1, CO: 0, CL: 2, AR: 2, PE: 0, EC: 0, UY: 2, VE: 1  
    };  

    if (!(pais in diferenciasHorarias)) {  
        conn.reply(m.chat, '*[ ℹ️ ] País no válido. Usa códigos de país en mayúsculas.*', m);  
        return;  
    }  

    const diferenciaHoraria = diferenciasHorarias[pais];  
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: true, hour: '2-digit', minute: '2-digit' });  

    const horasEnPais = {};  

    for (const key in diferenciasHorarias) {  
        const horaActual = new Date();  
        horaActual.setHours(hora, minutos, 0, 0);  

        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));  
        horasEnPais[key] = formatTime(horaEnPais);  
    }  

    const modalidad = args.slice(3).join(' ');  
    m.react('🎮');  

    const banderas = {  
        MX: '🇲🇽', CO: '🇨🇴', CL: '🇨🇱', AR: '🇦🇷', PE: '🇵🇪', EC: '🇪🇨', UY: '🇺🇾', VE: '🇻🇪'  
    };  

    // Configuración de la modalidad según el comando usado  
    let titulo = '';  
    let players = '';  
    let iconos = [];  
    let iconos2 = [];  

    switch (command) {  
        case 'v4fem':  
        case 'vsfem4':  
            titulo = '4VS4 FEM';  
            players = 'Jugadoras:';  
            iconos = ['🌸', '🌸', '🌸', '🌸'];  
            iconos2 = ['🌸', '🌸'];  
            break;  
        case 'v4masc':  
        case 'vsmasc4':  
            titulo = '4VS4 MASC';  
            players = 'Jugadores:';  
            iconos = ['🥥', '🥥', '🥥', '🥥'];  
            iconos2 = ['🥥', '🥥'];  
            break;  
        case 'v4mixto':  
        case 'vsmixto4':  
            titulo = '4VS4 MIXTO';  
            players = 'Jugadores:';  
            iconos = ['🍁', '🍁', '🍁', '🍁'];  
            iconos2 = ['🍁', '🍁'];  
            break;  
        case 'v6fem':  
        case 'vsfem6':  
            titulo = '6VS6 FEM';  
            players = 'Jugadoras:';  
            iconos = ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋'];  
            iconos2 = ['🦋', '🦋'];  
            break;  
        case 'v6masc':  
        case 'vsmasc6':  
            titulo = '6VS6 MASC';  
            players = 'Jugadores:';  
            iconos = ['🥞', '🥞', '🥞', '🥞', '🥞', '🥞'];  
            iconos2 = ['🥞', '🥞'];  
            break;  
        case 'v6mixto':  
        case 'vsmixto6':  
            titulo = '6VS6 MIXTO';  
            players = 'Jugadores:';  
            iconos = ['🥯', '🥯', '🥯', '🥯', '🥯', '🥯'];  
            iconos2 = ['🥯', '🥯'];  
            break;  
        default:  
            conn.reply(m.chat, '*[ ❌ ] Comando no válido.*', m);  
            return;  
    }  

    const message = `ㅤㅤㅤ *\`${titulo}\`*  

🕹꒱ *Reglas:* ${modalidad}  
⏰꒱ *Hora:*  
${Object.entries(horasEnPais).map(([p, h]) => `${banderas[p]} ${p}: ${h}`).join('\n')}  

ㅤ *${players}*  

${iconos.map(icono => `${icono}˚ `).join('\n')}  

ㅤ *Salientes:*  

${iconos2.map(icono => `${icono}˚ `).join('\n')}  

ㅤ *Organizador:*  
@${m.sender.split('@')[0]}`.trim();  

    conn.sendMessage(m.chat, { text: message, mentions: [m.sender] }, { quoted: m });  
};  

handler.help = ['v4fem', 'vsfem4', 'v4masc', 'vsmasc4', 'v4mixto', 'vsmixto4', 'v6fem', 'vsfem6', 'v6masc', 'vsmasc6', 'v6mixto', 'vsmixto6'];  
handler.tags = ['ff'];  
handler.command = /^(v4fem|vsfem4|v4masc|vsmasc4|v4mixto|vsmixto4|v6fem|vsfem6|v6masc|vsmasc6|v6mixto|vsmixto6)$/i;  

export default handler;
