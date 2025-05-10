
// utils/generateContent.js
const fetch = require('node-fetch').default;

const CHATBOT_INSTRUCTIONS = `
You are Binnabot, an intelligent and respectful virtual assistant for the Binaa platform. Your mission is to help users understand Algerian architectural heritage. 

Always respond in a helpful, concise, and polite manner. If a user’s question is unclear or missing context, answer in general with what you know. Use a tone that is informative, supportive, and aligned with Binaa’s mission of preserving cultural heritage.
 Always try to keep track of the current conversation and refer back to earlier user questions when needed. Ask for clarification only when necessary.`;
const CHATBOT_INITIAL_RESPONSE = `Understood! I'm ready to assist. Just let me know what you need. I'll do my best to provide clear, helpful, and accurate information. And if I'm unsure about something, I'll be sure to ask for clarification. Let's get started!`;

async function generateContent(userInput) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");

    const data = {
        generationConfig: {
            temperature: 1.65,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: 'text/plain',
        },
        contents: [
            { role: 'user', parts: [{ text: CHATBOT_INSTRUCTIONS }] },
            { role: 'model', parts: [{ text: CHATBOT_INITIAL_RESPONSE }] },
            { role: 'user', parts: [{ text: userInput }] },
        ],
    };

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    );

    const json = await res.json();
    if (json.candidates?.[0]?.content?.parts?.[0]?.text) {
        return json.candidates[0].content.parts[0].text;
    } else {
        throw new Error("Unexpected Gemini API response");
    }
}

module.exports = generateContent;
