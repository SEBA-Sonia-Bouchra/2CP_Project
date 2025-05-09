const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

router.post('/', chatbotController.sendMessage);
router.get('/messages', chatbotController.getMessages);

module.exports = router;
