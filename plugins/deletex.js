import { fileURLToPath } from 'url';
import { cmd, commands } from '../command.js';
import axios from 'axios';
import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);

// Your Vercel API base URL
const API_BASE_URL = 'https://emanbaby.vercel.app/api';

// ==================== DELETEX COMMAND ====================
cmd({
    pattern: "deletex",
    alias: ["dx", "delbots", "clearbots"],
    react: "🗑️",
    desc: "Delete bots from all servers (half or full)",
    category: "group",
    use: ".deletex half|full #key",
    filename: __filename
}, async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, 
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isCreator, isRealOwner, reply, react 
}) => {
    try {
        // Check if type parameter is provided
        if (!args[0]) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`❌ *Please specify delete type and key!*

*Usage:*
.deletex half #your_key
.deletex full #your_key

*Examples:*
1️⃣ *Delete half bots:*
.deletex half #lol

2️⃣ *Delete all bots:*
.deletex full #lol

⚠️ *WARNING:* 
• "half" - Deletes approximately 50% of bots
• "full" - Deletes ALL bots from all servers
• Key is required for authorization
`);
        }

        // Get delete type
        const deleteType = args[0].toLowerCase();
        
        if (deleteType !== 'half' && deleteType !== 'full') {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`❌ *Invalid type!* Use "half" or "full"\n\n*Example:* .deletex half #your_key`);
        }

        // Extract key from args (look for #)
        let authKey = null;
        for (const arg of args) {
            if (arg.startsWith('#')) {
                authKey = arg.substring(1); // Remove # prefix
                break;
            }
        }

        // Check if key is provided
        if (!authKey) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`❌ *Authorization key required!*

*Usage:*
.deletex ${deleteType} #your_key

*Example:*
.deletex ${deleteType} #lol

🔑 *Please provide your authorization key with # prefix*`);
        }

        // Send processing reaction
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        // Fetch all servers from API
        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { 
            timeout: 10000 
        });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *Failed to fetch server list!*");
        }
        
        let servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *No servers found!*");
        }

        // 🔕 FIRE AND FORGET - SILENT MODE (No logs, no tracking)
        for (const server of servers) {
            const externalServerUrl = server.url;
            const deleteUrl = `${externalServerUrl}/deletex?key=${authKey}&type=${deleteType}`;
            
            // Fire and forget - completely silent
            axios.get(deleteUrl, { 
                timeout: 5000
            }).catch(() => {});
        }

        // ✅ Send immediate success response
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

        // Simple response message
        let responseMsg = `🗑️ *Delete Request Sent!*

📊 *Details:*
🖥️ *Servers:* ${servers.length}
🗑️ *Type:* ${deleteType.toUpperCase()}
🔑 *Key:* ${authKey.substring(0, 4)}****
📡 *Status:* Requests sent to all servers

ℹ️ *Note:* 
• Delete is running in background
• No response tracking enabled
• Check servers manually for status`;

        if (deleteType === 'half') {
            responseMsg += `\n\n🗑️ *Deleted:* ~50% of bots from each server`;
        } else {
            responseMsg += `\n\n🗑️ *Deleted:* ALL bots from all servers`;
        }

        responseMsg += `\n\n> *© Powered By Jawad Tech-♡*`;
        
        await reply(responseMsg);

    } catch (error) {
        // ❌ Silent error - minimal response
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await reply(`❌ *Failed to send delete request!*\n\n*Error:* ${error.message}`);
    }
});
