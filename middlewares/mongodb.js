const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Sherin17:Reenijiji1@cluster0.quvjjgb.mongodb.net/JobLinkers?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
. then(()=>{
    console.log('mongoDB connected successfully!!!')
}).catch((error)=>{
    console.log(error.message)
})
