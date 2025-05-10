
// utils/generateContent.js
const fetch = require('node-fetch').default;

const CHATBOT_INSTRUCTIONS = `You are a smart and polite AI chatbot designed to assist users with a wide range of questions. Always respond in a clear, not long, and helpful manner. If a question is ambiguous or lacks detail, ask follow-up questions to clarify. Never assume facts that aren’t provided, and avoid giving inaccurate information. Your tone should be friendly and professional.`;

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
