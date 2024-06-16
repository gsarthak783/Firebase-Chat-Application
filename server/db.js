const mongoose = require('mongoose')

require('dotenv').config()

const DB_URL = process.env.ATLAS_DB_URL;

mongoose.connect(DB_URL)
.then(()=> console.log("DB Connect Success"))
.catch(err => console.log("Error in DB Connect", err))


//creating schema
const message = new mongoose.Schema({
    sender:String,
    message: String,
    date:String
})

const Message = mongoose.model('message',message)

module.exports = {Message};