const ChatMessage = require('../models/ChatMessage');
const generateContent = require('../utils/generateContent');

exports.sendMessage = async (req, res) => {
    const userInput = req.body.message;
    const userId = req.user.userId;

    if (!userInput) {
        return res.status(400).json({ error: "Missing 'message'" });
    }

    try {
        await ChatMessage.create({ role: 'user', message: userInput, userId });
        const aiResponse = await generateContent(userInput);
        await ChatMessage.create({ role: 'bot', message: aiResponse, userId });

        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Chatbot Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    const userId = req.user.userId;
    try {
        const messages = await ChatMessage.find({ userId }).sort({ timestamp: 1 });
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};