const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server,{
    cors:{
        origin: '*',
        methods: ['GET','POST'],
    },
});

//configured env variables
require('dotenv').config()

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.json({message : "Helloo from server!"});
});

//Message Model
const {Message} = require('./db')

// Track active users
let activeUsers = [];

//Socket.io connection
io.on('connection',(socket) => {
    console.log('New Client Connected', socket.id);

    // Handle new user joining
    socket.on('join', (user) => {
       // console.log(user.username)
        let exist ;
       // console.log("1",exist)
        exist = activeUsers.filter((u)=>u.username === user.username)
      //  console.log("2",exist,exist.length)
        if(exist.length === 0){
            let id = socket.id
            console.log(socket.id)
            let obj = {...user,id}
            activeUsers.push(obj);
        }
        
        console.log("On connect",activeUsers)
        io.emit('updateUsers', activeUsers);
    });

    // Fetch previous messages
    // Message.find().then((messages) => {
    //     socket.emit('init', messages);
    // });

    // Handle incoming messages
    socket.on('message', (messageData) => {
        // const message = new Message(messageData);
        // message.save().then(() => {
        //     io.emit('message', messageData);
        // }).catch((err) => {
        //     console.error('Error saving message:', err);
        // });
        io.emit('message',messageData);
    });

    //Handle user disconnect
    socket.on('disconnect', () => {
            activeUsers = activeUsers.filter((u) => u.id !== socket.id);
        io.emit('updateUsers', activeUsers);
        console.log("On disconnect",activeUsers)
       
        
        console.log('Client disconnected');
    });
})

// //error handler
// app.use((err,req,res,next) =>{
//     res.send({message:'Error occured',error:err.message})
// })


const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});