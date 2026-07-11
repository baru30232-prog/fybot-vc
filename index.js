import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import "dotenv/config"; 

const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const botToken = process.env.BOT_TOKEN;

const ownerId = 5883448928; 

const session = new StringSession(""); 
const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
});

async function startBot() {
    console.log("┌───────────────────────────┐");
    console.log("│ MENGHUBUNGKAN KE MTPROTO... │");
    console.log("└───────────────────────────┘");

    await client.start({
        botAuthToken: botToken,
    });

    console.log("[SUCCESS] Bot VC berhasil terhubung ke server Telegram!");

    client.addEventHandler(async (update) => {
        const message = update.message;
        if (message && message.peerId) {
            const senderId = Number(message.senderId);
            if (senderId === ownerId && message.message.startsWith("/pingvc")) {
                await client.sendMessage(message.chatId, {
                    message: "┌  *ＦＹＢＯＴ ＶＣ*  ┐\n\n✅ _Mesin Voice Chat Aktif dan Standby 24 Jam di Koyeb!_\n\n└ ────────────── ┘",
                    parseMode: "markdown"
                });
            }
        }
    });
}

startBot();
