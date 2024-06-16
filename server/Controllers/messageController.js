 const {Message} = require('../db')

 const getMessages = async (req,res) => {
    
    const messages = await Message.find();
    res.status(200).send({message:"Messages",payload:messages});
 }

 const getMessageFromSender = async (req,res) => {
    const sender = req.params.sender;
    //console.log(req.params)
   const messages = await Message.find({sender});
   res.status(200).send({message:"Messages",payload:messages});
}

 const createMessage = async (req,res) => {
   
    const message = req.body;

    const Document = new Message(message);
    let data = await Document.save();

    res.status(201).send({message:"Message Created",payload:data})
 }

 const deleteMessage = async (req,res) => {
    let _id = req.body;

    let message = await Message.deleteOne({_id})

    if(message.deletedCount !== 0){
        res.send({message:"Message deleted",payload:message})
    }
    else if(message.acknowledged && message.deletedCount === 0){
        res.send({message:"Message not found in DB"})
 }
}

module.exports = {getMessages,getMessageFromSender,createMessage,deleteMessage}