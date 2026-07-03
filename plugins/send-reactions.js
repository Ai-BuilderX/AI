import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import { fetchGif, gifToVideo } from '../lib/fetchgif.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

// ========== UPDATED: Using your new Vercel API (No Headers) ==========
async function getNekosGif(action) {
    const apiUrl = `https://jawadtech-dev.vercel.app/api/gif?category=${action}`;
    const response = await axios.get(apiUrl);
    return response.data.result;
}

// ==================== CRY COMMAND ====================
cmd({
    pattern: "cry",
    desc: "Send a crying reaction GIF.",
    category: "fun",
    react: "😢",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is crying over @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is crying!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("cry");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .cry command:", error);
        reply(`❌ *Error in .cry command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HUG COMMAND ====================
cmd({
    pattern: "hug",
    desc: "Send a hug reaction GIF.",
    category: "fun",
    react: "🤗",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} hugged @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is hugging everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("hug");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .hug command:", error);
        reply(`❌ *Error in .hug command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== KISS COMMAND ====================
cmd({
    pattern: "kiss",
    desc: "Send a kiss reaction GIF.",
    category: "fun",
    react: "💋",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} kissed @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} kissed everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("kiss");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .kiss command:", error);
        reply(`❌ *Error in .kiss command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SLAP COMMAND ====================
cmd({
    pattern: "slap",
    desc: "Send a slap reaction GIF.",
    category: "fun",
    react: "✊",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} slapped @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} slapped everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("slap");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .slap command:", error);
        reply(`❌ *Error in .slap command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== PAT COMMAND ====================
cmd({
    pattern: "pat",
    desc: "Send a pat reaction GIF.",
    category: "fun",
    react: "🫂",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} patted @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is patting everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("pat");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .pat command:", error);
        reply(`❌ *Error in .pat command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== CUDDLE COMMAND ====================
cmd({
    pattern: "cuddle",
    desc: "Send a cuddle reaction GIF.",
    category: "fun",
    react: "🤗",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} cuddled @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is cuddling everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("cuddle");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .cuddle command:", error);
        reply(`❌ *Error in .cuddle command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== WINK COMMAND ====================
cmd({
    pattern: "wink",
    desc: "Send a wink reaction GIF.",
    category: "fun",
    react: "😉",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} winked at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is winking at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("wink");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .wink command:", error);
        reply(`❌ *Error in .wink command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== LAUGH COMMAND ====================
cmd({
    pattern: "laugh",
    desc: "Send a laugh reaction GIF.",
    category: "fun",
    react: "😂",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} laughed at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is laughing at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("laugh");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .laugh command:", error);
        reply(`❌ *Error in .laugh command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== WAVE COMMAND ====================
cmd({
    pattern: "wave",
    desc: "Send a wave reaction GIF.",
    category: "fun",
    react: "👋",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} waved at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is waving at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("wave");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .wave command:", error);
        reply(`❌ *Error in .wave command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HIGHFIVE COMMAND ====================
cmd({
    pattern: "highfive",
    desc: "Send a high-five reaction GIF.",
    category: "fun",
    react: "✋",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} gave a high-five to @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is high-fiving everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("highfive");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .highfive command:", error);
        reply(`❌ *Error in .highfive command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HANDHOLD COMMAND ====================
cmd({
    pattern: "handhold",
    desc: "Send a hand-holding reaction GIF.",
    category: "fun",
    react: "🤝",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is holding hands with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} wants to hold hands with everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("handhold");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .handhold command:", error);
        reply(`❌ *Error in .handhold command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BITE COMMAND ====================
cmd({
    pattern: "bite",
    desc: "Send a bite reaction GIF.",
    category: "fun",
    react: "🦷",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} bit @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is biting everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("bite");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .bite command:", error);
        reply(`❌ *Error in .bite command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== POKE COMMAND ====================
cmd({
    pattern: "poke",
    desc: "Send a poke reaction GIF.",
    category: "fun",
    react: "👉",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} poked @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} poked everyone`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("poke");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .poke command:", error);
        reply(`❌ *Error in .poke command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SMILE COMMAND ====================
cmd({
    pattern: "smile",
    desc: "Send a smile reaction GIF.",
    category: "fun",
    react: "😁",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} smiled at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is smiling at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("smile");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .smile command:", error);
        reply(`❌ *Error in .smile command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BLUSH COMMAND ====================
cmd({
    pattern: "blush",
    desc: "Send a blush reaction GIF.",
    category: "fun",
    react: "😊",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is blushing at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is blushing!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("blush");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .blush command:", error);
        reply(`❌ *Error in .blush command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SLEEP COMMAND ====================
cmd({
    pattern: "sleep",
    desc: "Send a sleep reaction GIF.",
    category: "fun",
    react: "😴",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is sleeping with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is sleeping!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("sleep");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .sleep command:", error);
        reply(`❌ *Error in .sleep command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== KICK COMMAND ====================
cmd({
    pattern: "kick",
    desc: "Send a kick reaction GIF.",
    category: "fun",
    react: "🦶",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} kicked @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} kicked everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("kick");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .kick command:", error);
        reply(`❌ *Error in .kick command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SHOOT COMMAND ====================
cmd({
    pattern: "shoot",
    desc: "Send a shoot reaction GIF.",
    category: "fun",
    react: "🔫",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} shot @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} shot everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("shoot");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .shoot command:", error);
        reply(`❌ *Error in .shoot command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== DANCE COMMAND ====================
cmd({
    pattern: "dance",
    desc: "Send a dance reaction GIF.",
    category: "fun",
    react: "💃",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} danced with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is dancing with everyone`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("dance");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .dance command:", error);
        reply(`❌ *Error in .dance command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SHRUG COMMAND ====================
cmd({
    pattern: "shrug",
    desc: "Send a shrug reaction GIF.",
    category: "fun",
    react: "🤷",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} shrugged at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} shrugged at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("shrug");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .shrug command:", error);
        reply(`❌ *Error in .shrug command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== FACEPALM COMMAND ====================
cmd({
    pattern: "facepalm",
    desc: "Send a facepalm reaction GIF.",
    category: "fun",
    react: "🤦",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} facepalmed at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} facepalmed at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("facepalm");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .facepalm command:", error);
        reply(`❌ *Error in .facepalm command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== THUMBSUP COMMAND ====================
cmd({
    pattern: "thumbsup",
    desc: "Send a thumbsup reaction GIF.",
    category: "fun",
    react: "👍",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} gave a thumbs up to @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} gave a thumbs up to everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("thumbsup");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .thumbsup command:", error);
        reply(`❌ *Error in .thumbsup command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== THINK COMMAND ====================
cmd({
    pattern: "think",
    desc: "Send a think reaction GIF.",
    category: "fun",
    react: "🤔",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is thinking about @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is thinking!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("think");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .think command:", error);
        reply(`❌ *Error in .think command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== STARE COMMAND ====================
cmd({
    pattern: "stare",
    desc: "Send a stare reaction GIF.",
    category: "fun",
    react: "👀",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is staring at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is staring at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("stare");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .stare command:", error);
        reply(`❌ *Error in .stare command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== PECK COMMAND ====================
cmd({
    pattern: "peck",
    desc: "Send a peck reaction GIF.",
    category: "fun",
    react: "🐦",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} pecked @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} pecked everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("peck");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .peck command:", error);
        reply(`❌ *Error in .peck command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== YEET COMMAND ====================
cmd({
    pattern: "yeet",
    desc: "Send a yeet reaction GIF.",
    category: "fun",
    react: "💨",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} yeeted @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is yeeting everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("yeet");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .yeet command:", error);
        reply(`❌ *Error in .yeet command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== NOD COMMAND ====================
cmd({
    pattern: "nod",
    desc: "Send a nod reaction GIF.",
    category: "fun",
    react: "🙂",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} nodded at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} nodded at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("nod");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .nod command:", error);
        reply(`❌ *Error in .nod command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== NOM COMMAND ====================
cmd({
    pattern: "nom",
    desc: "Send a nom reaction GIF.",
    category: "fun",
    react: "🍽️",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is nomming @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is nomming everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("nom");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .nom command:", error);
        reply(`❌ *Error in .nom command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== NOPE COMMAND ====================
cmd({
    pattern: "nope",
    desc: "Send a nope reaction GIF.",
    category: "fun",
    react: "🙅",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} said nope to @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} said nope to everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("nope");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .nope command:", error);
        reply(`❌ *Error in .nope command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== YAWN COMMAND ====================
cmd({
    pattern: "yawn",
    desc: "Send a yawn reaction GIF.",
    category: "fun",
    react: "🥱",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} yawned at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} yawned at everyone!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("yawn");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .yawn command:", error);
        reply(`❌ *Error in .yawn command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SMUG COMMAND ====================
cmd({
    pattern: "smug",
    desc: "Send a smug reaction GIF.",
    category: "fun",
    react: "😏",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is smug at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is feeling smug!`
            : `> © Powered By JawadTechX 🖤`;

        let gifUrl = await getNekosGif("smug");

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .smug command:", error);
        reply(`❌ *Error in .smug command:*\n\`\`\`${error.message}\`\`\``);
    }
});
