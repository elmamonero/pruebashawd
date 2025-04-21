const handler = async (m, {conn, usedPrefix, text}) => {
  if (isNaN(text) && !text.match(/@/g)) {
  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }
  if (!text && !m.quoted) return conn.reply(m.chat, `*[ ℹ️ ] Menciona a un usuario para quitar admin.*`, m);
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `*[ ⚠️ ] El usuario ingresado es incorrecto.*`, m);
  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    const groupMetadata = await conn.groupMetadata(m.chat);
    if (user === groupMetadata.owner) {
      return conn.reply(m.chat, `*[ ℹ️ ] No se puede degradar al creador del grupo.*`, m);
    }
    conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    conn.reply(m.chat, `*[ ✅ ] Usuario Degradado*`, m);
  }
};

handler.help = ['*<@tag>*'].map((v) => 'demote ' + v);
handler.tags = ['gc'];
handler.command = /^(demote|quitarpoder|quitaradmin|quitarpija)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
//handler.fail = null;
export default handler;
