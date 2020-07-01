const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { sendMessage, getInbox, getChat } = require('../controllers/chat');

router.get('/inbox/:userId', getInbox)
router.post('/chat/:studentId/:tutorId', sendMessage);
router.get('/messages/:senderId/:studentId/:tutorId', getChat)

module.exports = router;