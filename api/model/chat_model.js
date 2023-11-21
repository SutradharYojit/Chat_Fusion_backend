const sqConnect=require('../connection/db_connection')

const Sequelize = require('sequelize');

// Define the "Chat Table" table using Sequelize

const chatTable = sqConnect.define('chats', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },

    senderId: { 
        type: Sequelize.TEXT,
        allowNull: false,
    },
    receiverId: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    messageType:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    chatId:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports=chatTable;