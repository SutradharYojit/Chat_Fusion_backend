const router = require('express').Router();
const chatModel = require('../model/chat_model');


router.post('/send', (req, res, next) => {

    const data = req.body;
    const ids = [data.senderId, data.receiverId];
    ids.sort();
    const chatId = ids.join('_');

    chatModel.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        messageType: data.messageType,
        chatId: chatId,
    }).then((message) => {
        console.log(message);
        return res.status(201).json({ success: true, message });
    });
});

router.get('/getMessage', (req, res, next) => {

    console.log(req.body);
    const chatId = req.body.chatId;
    chatModel.findAll({ where: { chatId: chatId }, order: [['createdAt', 'DESC']] }).then((message) => {
        return res.status(200).json([...message])
    })
});


module.exports = router;