const exp = require('express')
const messageApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

const {getMessages,getMessageFromSender,createMessage,deleteMessage} = require('../Controllers/messageController')

//get all messages
messageApp.get('/get-message', expressAsyncHandler(getMessages))

//get messages from sender
messageApp.get('/get-message/:sender', expressAsyncHandler(getMessageFromSender))

//create message
messageApp.post('/create-message',expressAsyncHandler(createMessage))

//delete message
messageApp.delete('/delete-message',expressAsyncHandler(deleteMessage))

module.exports = messageApp;