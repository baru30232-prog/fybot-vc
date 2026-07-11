import express from 'express';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import "dotenv/config";

// --- WEB SERVER BAYANGAN (AGAR SERVER CLOUD TIDAK ERROR/LOADING TERUS) ---
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Mesin Bot VC Aktif 24 Jam!'));
app.listen(port, () => console.log(`[SYSTEM] Web server bayangan berjalan di port ${port}`));

// --- BOT MTPROTO LOGIC ---
const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const botToken = process.env.BOT_TOKEN;
const ownerId = 5883448928; 

const session = new StringSession(""); 
const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
});

async function startBot() {
    console.log("MENGHUBUNGKAN KE MTPROTO...");
    await client.start({ botAuthToken: botToken });
    console.log("[SUCCESS] Bot VC berhasil terhubung ke server Telegram!");
    
    client.addEventHandler(async (update) => {
        const message = update.message;
        if (message && message.peerId) {
            const senderId = Number(message.senderId);
            if (senderId === ownerId && message.message.startsWith("/pingvc")) {
                await client.sendMessage(message.chatId, {
                    message: "┌  *ＦＹＢＯＴ ＶＣ*  ┐\n\n✅ _Mesin Voice Chat dari Render Aktif!_\n\n└ ────────────── ┘",
                    parseMode: "markdown"
                });
            }
        }
    });
}

startBot();
