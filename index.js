const http = require('http')
const app = require('./server')
const sqConnect = require('./api/connection/db_connection')
const port = process.env.PORT || 7412;
const chatModel = require('./api/model/chat_model');


async function connect() {
    try {
        await sqConnect.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect();

const server = http.createServer(app)


sqConnect.sync().then(() => {
    const jimmy = server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    const socketIo = require('socket.io')(jimmy);

    socketIo.on("connection", (socket) => {
        console.log(socket.id);

        socket.on("chatRoom", async (data) => {
            console.log(data);
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
                socket.emit('chatRoom', message);

            });
        });


    });
});

