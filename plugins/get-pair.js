import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';
import { lidToPhone } from '../lib/functions.js';
import { API_URL } from '../lib/secret.js';

const __filename = fileURLToPath(import.meta.url);

// API URL from secret.js
const API_BASE_URL = API_URL;

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for JAWAD-MD bot",
    category: "owner",
    use: ".pair 923427582XXX",
    filename: __filename
}, async (conn, mek, m, { from, args, q, sender, senderNumber, reply, react }) => {
    try {
        // Send processing reaction
        await react('⏳');
        
        let phoneNumber;
        
        // Check if user provided a number in command
        if (args[0]) {
            // Use provided number
            phoneNumber = args[0].trim().replace(/[^0-9]/g, '');
        } else {
            // No number provided, convert sender LID to phone number
            if (sender.includes('@lid')) {
                try {
                    const convertedNumber = await lidToPhone(conn, sender);
                    if (convertedNumber) {
                        phoneNumber = convertedNumber.replace(/[^0-9]/g, '');
                    } else {
                        phoneNumber = senderNumber;
                    }
                } catch (e) {
                    phoneNumber = senderNumber;
                }
            } else {
                phoneNumber = senderNumber;
            }
        }

        // Validate phone number format
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            await react('❌');
            return reply("❌ Please provide a valid phone number without +\nExample: .pair 923427582XXX");
        }

        // Fetch all servers from API
        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("❌ *Failed to fetch server list!*");
        }
        
        const servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await react('❌');
            return reply("❌ *No servers available!*");
        }
        
        // Select a random server from the list
        const randomIndex = Math.floor(Math.random() * servers.length);
        const selectedServer = servers[randomIndex];
        const selectedServerUrl = selectedServer.url;
        
        console.log(`🎲 Randomly selected server: ${selectedServer.name} (${selectedServer.id})`);
        
        // Make request to get pairing code
        const response = await axios.get(`${selectedServerUrl}/code`, {
            params: { 
                number: phoneNumber 
            },
            timeout: 20000
        });

        if (!response.data || !response.data.code) {
            await react('❌');
            return reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
        
        await react('✅');
        
        // Send pairing code
        await reply(`> *JAWAD-MD PAIRING CODE*

*Your pairing code is:* ${pairingCode}`);

        await reply(pairingCode);

    } catch (error) {
        console.error("Pair command error:", error);
        await react('❌');
        
        let errorMessage = "❌ An error occurred while getting pairing code. Please try again later.";
        
        if (error.response) {
            errorMessage = `❌ Server error: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = "❌ No response from server. Server might be offline.";
        }
        
        await reply(errorMessage);
    }
});
