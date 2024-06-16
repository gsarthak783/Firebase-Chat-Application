const express = require('express');
const app = express();

const cors = require('cors')

//configured env variables
require('dotenv').config()

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.json({message : "Helloo from server!"});
});

const messageApp = require('./API/messageAPI')

app.use('/message-api',messageApp)

//error handler
app.use((err,req,res,next) =>{
    res.send({message:'Error occured',error:err.message})
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});