

import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';
import { API_URL, SECRET_KEY } from '../lib/secret.js';

const __filename = fileURLToPath(import.meta.url);
const API_BASE_URL = API_URL;

// Validate channel post URL format
function isValidChannelPostUrl(url) {
    const pattern = /^https?:\/\/(?:www\.)?whatsapp\.com\/channel\/[a-zA-Z0-9]+\/\d+$/;
    return pattern.test(url);
}

// Extract channel ID and post ID from URL
function extractIdsFromUrl(url) {
    const match = url.match(/\/channel\/([a-zA-Z0-9]+)\/(\d+)/);
    if (match) {
        return {
            channelId: match[1],
            postId: match[2]
        };
    }
    return null;
}

// Parse emojis
function parseEmojis(input) {
    let emojis = [];
    const parts = input.split(',').map(p => p.trim()).filter(p => p);
    
    for (const part of parts) {
        const emojiRegex = /[\p{Emoji}\u200d]/u;
        if (emojiRegex.test(part)) {
            emojis.push(part);
        }
    }
    
    return emojis;
}

// Validate emojis format
function validateEmojis(emojis) {
    if (!emojis || emojis.length === 0) {
        return {
            valid: false,
            error: '❌ *No valid emojis found!*\n*Example:* .chreact https://whatsapp.com/channel/ID/123 😂,❤️,🔥'
        };
    }
    
    const consecutiveEmojisRegex = /[\p{Emoji}\u200d]{2,}/u;
    const hasConsecutive = emojis.some(e => consecutiveEmojisRegex.test(e));
    
    if (hasConsecutive) {
        return {
            valid: false,
            error: '❌ *Invalid format! Please separate all emojis with commas*\n*Example:* .chreact link 😂,❤️,🔥,👏,😮'
        };
    }
    
    return { valid: true, emojis };
}

// ==================== CHREACT COMMAND ====================
cmd({
    pattern: "chreact",
    alias: ["channelreact", "react", "rp"],
    react: "🎯",
    desc: "React to WhatsApp channel post",
    category: "group",
    use: ".chreact <channel_post_url> [emojis]",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        // Check if URL is provided
        if (!args[0]) {
            return reply(`❌ *Please provide a channel post URL!*

*Example:* 
.chreact https://whatsapp.com/channel/0029VbCO8mW8F2p5iZ2ZoS3k/609

*With custom emojis:*
.chreact https://whatsapp.com/channel/0029VbCO8mW8F2p5iZ2ZoS3k/609 ❤️,👍,🔥
`);
        }
        
        const url = args[0];
        
        // Validate URL format
        if (!isValidChannelPostUrl(url)) {
            return reply(`❌ *Invalid URL!*

*Valid format:* 
https://whatsapp.com/channel/CHANNEL_ID/POST_ID

*Example:* 
https://whatsapp.com/channel/0029VbCO8mW8F2p5iZ2ZoS3k/609
`);
        }
        
        // Extract IDs for response message
        const ids = extractIdsFromUrl(url);
        if (!ids) {
            return reply(`❌ *Failed to extract channel/post IDs from URL!*`);
        }
        
        // Parse emojis from arguments
        let emojis = [];
        let emojisString = '';
        
        if (args.length > 1) {
            const remaining = args.slice(1).join(' ');
            emojis = parseEmojis(remaining);
            emojisString = emojis.join(',');
        }
        
        // If no emojis provided, use defaults
        if (!emojisString) {
            emojis = ['❤️', '👍', '🔥'];
            emojisString = emojis.join(',');
        }
        
        // Validate emojis
        const validation = validateEmojis(emojis);
        if (!validation.valid) {
            return reply(validation.error);
        }
        
        // Send processing reaction
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        // Fetch all servers from YOUR API
        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *Failed to fetch server list!*");
        }
        
        const servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *No servers found!*");
        }
        
        // Format success message
        const resultMessage = `✅ *Reactions sent successfully!*

📊 *Details:*
🎯 *Channel:* ${ids.channelId}
📝 *Post:* ${ids.postId}
😊 *Emojis:* ${validation.emojis.join(' ')}
🌐 *Servers:* ${servers.length}

> *Powered By Jawad Tech*`;

        // Send immediate response to user
        await reply(resultMessage);
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        
        // FIRE AND FORGET - Send reactions to all servers using YOUR local API endpoint
        for (const server of servers) {
            const externalServerUrl = server.url;
            // Call the working API endpoint on each server
            const reactUrl = `${externalServerUrl}/reactxd?key=${SECRET_KEY}&url=${encodeURIComponent(url)}&emojis=${encodeURIComponent(emojisString)}`;
            
            // Fire and forget - no await, silent fail
            axios.get(reactUrl, { 
                timeout: 5000
            }).catch((err) => {
                // Silent fail - no console logs
            });
        }
        
    } catch (error) {
        console.error("React post error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await reply(`❌ *Error processing request!*\n\n*Error:* ${error.message}`);
    }
});
