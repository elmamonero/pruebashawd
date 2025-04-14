const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
const oi = `*\`AVISO:\`* ${pesan}`;
  let teks = `𝗣𝗔𝗡𝗧𝗛𝗘𝗢𝗡 𝗕𝗢𝗧 𝗟𝗢𝗦 𝗜𝗡𝗩𝗢𝗖𝗔 🫩\n*INTEGRANTES:* ${participants.length}\n\n ${oi}\n\nෆ *ETIQUETAS*\n`;
  for (const mem of participants) {
    teks += `യ ׄ🐸˚ @${mem.id.split('@')[0]}\n`;
  }
  teks += `> *Pantheon Bot*`;
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['todos *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(tagall|t|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
export default handler;
