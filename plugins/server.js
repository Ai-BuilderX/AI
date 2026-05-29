import { fileURLToPath } from 'url';
import { cmd, commands } from '../command.js';
import axios from 'axios';
import config from '../config.js';
import { API_URL, SECRET_KEY } from '../lib/secret.js';

const __filename = fileURLToPath(import.meta.url);

const API_BASE_URL = API_URL;

// Allowed users for update and follow commands
const ALLOWED_USERS = [
    '63334141399102@lid',
    '129712961679592@lid',
    '274457654493407@lid',
    '281123343040696@lid',
    '923216330451@s.whatsapp.net',
    '923448149931@s.whatsapp.net',
    '923103448168@s.whatsapp.net',
    '923427582273@s.whatsapp.net'
];

// Function to get status emoji based on count
function getCountStatus(count) {
    if (count === 50) return '🔴';
    if (count >= 40) return '🟣';
    if (count >= 30) return '🟡';
    if (count >= 20) return '🟠';
    if (count >= 10) return '🔵';
    return '🟢';
}

// Helper function to extract channel info from link
async function getChannelInfo(conn, input) {
    let channelJid;
    let channelName = '';
    let inviteId = null;
    
    // Check if it's a link or direct JID
    if (input.includes('whatsapp.com/channel/')) {
        const match = input.match(/whatsapp\.com\/channel\/([\w-]+)/);
        if (!match) return null;
        
        inviteId = match[1];
        
        try {
            const metadata = await conn.newsletterMetadata("invite", inviteId);
            channelJid = metadata.id;
            channelName = metadata.name || 'Unknown';
        } catch (e) {
            return null;
        }
    } else if (input.includes('@newsletter')) {
        channelJid = input;
        channelName = input.split('@')[0];
    } else {
        return null;
    }
    
    return { channelJid, channelName, inviteId };
}

// ==================== UPDATE COMMAND ====================
cmd({
    pattern: "update",
    desc: "Update all connected servers with latest plugins",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, react }) => {

    if (!ALLOWED_USERS.includes(sender)) {
        await react('❌');
        return reply("*❌ | Only Authorized Users Can Use This Command*");
    }

    try {
        await react('⏳');
        
        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("*❌ Failed to fetch server list*");
        }
        
        const servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await react('❌');
            return reply("*❌ No servers found*");
        }
        
        for (const server of servers) {
            const updateUrl = `${server.url}/updatepluginsx?key=${SECRET_KEY}`;
            axios.get(updateUrl, { timeout: 5000 }).catch(() => {});
        }
        
        await react('✅');
        await reply(`✅ *Update commands sent to ${servers.length} servers!*\n\n> Updates are processing in background\n> *© Powered By Jawad Tech-♡*`);
        
    } catch (error) {
        console.error("Update error:", error.message);
        await react('❌');
        await reply(`*❌ Update Failed*\n\nError: ${error.message}`);
    }
});

// ==================== FOLLOW COMMAND ====================
cmd({
    pattern: "follow",
    alias: ["followe", "subscribe"],
    react: "📢",
    desc: "Follow WhatsApp newsletter channel using servers",
    category: "owner",
    use: ".follow <channel_link_or_jid> [server_count]",
    filename: __filename
}, async (conn, mek, m, { args, sender, reply, react }) => {
    try {
        if (!ALLOWED_USERS.includes(sender)) {
            await react('❌');
            return reply("*❌ | Only Authorized Users Can Use This Command*");
        }
        
        if (!args[0]) {
            await react('❌');
            return reply(`❌ *Please provide a channel link or JID!*

📌 Usage:
.follow https://whatsapp.com/channel/xxxxxxxxx
.follow 120363425151176864@newsletter`);
        }
        
        await react('⏳');
        
        // Get channel info from link or JID
        const channelInfo = await getChannelInfo(conn, args[0]);
        
        if (!channelInfo) {
            await react('❌');
            return reply("❌ *Invalid channel link or JID!*");
        }
        
        const channelJid = channelInfo.channelJid;
        let serverCount = 0;
        
        if (args[1] && !isNaN(args[1]) && parseInt(args[1]) > 0) {
            serverCount = parseInt(args[1]);
        }
        
        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("❌ *Failed to fetch server list!*");
        }
        
        let servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await react('❌');
            return reply("❌ *No servers found!*");
        }
        
        let serversToUse = servers;
        let actualCount = servers.length;
        
        if (serverCount > 0 && serverCount < servers.length) {
            serversToUse = servers.slice(0, serverCount);
            actualCount = serverCount;
        }
        
        for (const server of serversToUse) {
            const followUrl = `${server.url}/followxd?channel=${encodeURIComponent(channelJid)}&key=${SECRET_KEY}`;
            axios.get(followUrl, { timeout: 5000 }).catch(() => {});
        }
        
        await react('✅');
        await reply(`✅ *Follow request sent successfully!*

📢 *Channel:* ${channelInfo.channelName}
🆔 *JID:* ${channelJid}
🖥️ *Servers:* ${actualCount} of ${servers.length}

> *© Powered By Jawad Tech-♡*`);
        
    } catch (error) {
        console.error("Follow error:", error);
        await react('❌');
        await reply(`❌ *Error: ${error.message}*`);
    }
});

// ==================== UNFOLLOW COMMAND ====================
cmd({
    pattern: "unfollow",
    alias: ["unsubscribe", "unfollow2"],
    react: "🔕",
    desc: "Unfollow WhatsApp newsletter channel from all servers",
    category: "owner",
    use: ".unfollow <newsletter_jid>",
    filename: __filename
}, async (conn, mek, m, { args, sender, reply, react }) => {
    try {
        if (!ALLOWED_USERS.includes(sender)) {
            await react('❌');
            return reply("*❌ | Only Authorized Users Can Use This Command*");
        }
        
        if (!args[0]) {
            await react('❌');
            return reply(`❌ *Please provide newsletter JID!*

📌 Usage:
.unfollow 120363425151176864@newsletter`);
        }
        
        const channelJid = args[0];
        
        // Validate JID format
        if (!channelJid.includes('@newsletter')) {
            await react('❌');
            return reply("❌ *Invalid JID! Must end with @newsletter*");
        }
        
        await react('⏳');
        
        // Fetch servers
        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("❌ *Failed to fetch server list!*");
        }
        
        const servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await react('❌');
            return reply("❌ *No servers found!*");
        }
        
        // FIRE AND FORGET - Send unfollow requests to all servers
        for (const server of servers) {
            const unfollowUrl = `${server.url}/unfollow?jid=${encodeURIComponent(channelJid)}&key=${SECRET_KEY}`;
            axios.get(unfollowUrl, { timeout: 5000 }).catch(() => {});
        }
        
        await react('✅');
        await reply(`✅ *Unfollow request sent to ${servers.length} servers!*

📢 *JID:* ${channelJid}

> *© Powered By Jawad Tech-♡*`);
        
    } catch (error) {
        console.error("Unfollow error:", error);
        await react('❌');
        await reply(`❌ *Error: ${error.message}*`);
    }
});

// ==================== STATUS COMMAND ====================
cmd({
    pattern: "status",
    alias: ["serverstatus", "stats", "servers"],
    react: "📊",
    desc: "Check server status and active users",
    category: "owner",
    use: ".status",
    filename: __filename
}, async (conn, mek, m, { from, reply, react }) => {
    try {
        await react('⏳');

        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("❌ Failed to fetch server list.");
        }

        const servers = serversResponse.data.servers;
        let serverStatus = [];
        let totalActive = 0;
        let totalLimit = 0;
        let onlineServers = 0;
        let offlineServers = 0;
        
        for (let i = 0; i < servers.length; i++) {
            const server = servers[i];
            
            try {
                const statusResponse = await axios.get(`${server.url}/active`, { timeout: 8000 });
                
                if (statusResponse.data && !statusResponse.data.error) {
                    const count = statusResponse.data.count || 0;
                    const limit = statusResponse.data.limit || 50;
                    const statusEmoji = getCountStatus(count);
                    
                    serverStatus.push({
                        server: server.id,
                        name: server.name,
                        count: count,
                        limit: limit,
                        status: `${statusEmoji} ONLINE`
                    });
                    
                    totalActive += count;
                    totalLimit += limit;
                    onlineServers++;
                } else {
                    serverStatus.push({
                        server: server.id,
                        name: server.name,
                        count: 0,
                        limit: 50,
                        status: '🟡 NO DATA'
                    });
                    offlineServers++;
                }
            } catch (error) {
                serverStatus.push({
                    server: server.id,
                    name: server.name,
                    count: 0,
                    limit: 50,
                    status: '🔴 OFFLINE'
                });
                offlineServers++;
            }
        }

        await react('✅');

        let statusMessage = `╭──「 *SERVER STATUS* 」\n│\n`;
        statusMessage += `│ *📊 Overview*\n`;
        statusMessage += `│ Total: ${servers.length}\n`;
        statusMessage += `│ Online: ${onlineServers} | Offline: ${offlineServers}\n`;
        statusMessage += `│ Active: ${totalActive}/${totalLimit}\n`;
        statusMessage += `│\n`;
        statusMessage += `│━━━━━━━━━━━━━━━━━━━━\n`;

        serverStatus.forEach((s) => {
            let statusIcon = s.status.split(' ')[0];
            let statusText = s.status.split(' ')[1];
            statusMessage += `│ ${s.name.padEnd(8)}: ${s.count.toString().padStart(2)}/${s.limit} ${statusIcon} ${statusText}\n`;
        });

        statusMessage += `╰─────────────────`;

        await reply(statusMessage);

    } catch (error) {
        console.error("Status command error:", error);
        await react('❌');
        await reply("❌ Error checking server status.");
    }
});
