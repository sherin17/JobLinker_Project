const express = require('express')
const cors = require('cors')
const logger = require('morgan') // for seeing api calls in terminal
require('./middlewares/mongodb') //to init mongoDB

const path = require("path");
const fs = require("fs")
const app = express();
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))
app.use(cors()) //to connect frontend and backend without any disturbance
  
//api setup
const api = require('./routes/api') 
app.use('/api', api)

// app.use('/uploads', express.static('uploads'))
app.get('/download/:resume', (req,res)=>{
    console.log(res)
    res.sendFile(path.join(__dirname, `./uploads/${req.params.resume}`))
})

// Server connection 
var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is connected to ${port}....`)
})

