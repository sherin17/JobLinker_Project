const express = require('express')
const router = express.Router()
const ApplicationData = require('../models/applicationsUV')
const multer=require('multer')
const path = require("path");


const DIR  = './uploads'                         // file upload code 
const storage  = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, DIR)
    },
    filename: (req, file, cb)=>{
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, filename)
    },
})
var upload = multer({ 
    storage:storage,
})

router.post('/api/upload', upload.single('resume'), async(req, res, next)=>{
   try {
    const url = req.protocol + '://' + req.get('host')
    const user = new ApplicationData({
        resume : url + '/download/' + req.file.filename,
        link: req.body.link,
        job_id: req.body.job_id,
        jobseeker_id: req.body.jobseeker_id

    })
    let saved = await user.save()
    res.send(saved)
   } catch (error) {
    console.log(error)
   }
})

router.get('/api/applicationdata/:id', async (req, res) => {       // getdata for admin to collect unverified applications
    try {
        let id = req.params.id
        let list = await ApplicationData.find({job_id: id , approval_status: "not approved"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}) 

router.get('/api/UVApps', async (req, res) => {      //  unverified applications
    try {
     
        let list = await ApplicationData.find({ approval_status: "not approved"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
})


router.get('/api/VApps', async (req, res) => {      //  verified applications
    try {
       
        let list = await ApplicationData.find({ approval_status: "verified"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
})
router.get('/api/Apps', async (req, res) => {      //  verified applications
    try {
       
        let list = await ApplicationData.find({ approval_status: "verified",postedBy:"employe"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
})
router.get('/api/applicationdatas/:id', async (req, res) => {       // getdata for verified applications
    try {
        let id = req.params.id
        let list = await ApplicationData.find({job_id: id,approval_status:"verified" })
        res.send(list)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/api/delete/:id', async (req, res)=>{
    try {
        id = req.params.id
        let data = await ApplicationData.findByIdAndDelete(id)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

router.put('/api/verify', async(req, res)=>{
    try {
        console.log(req.body.id)
        let id = req.body.id
        let update = {
            approval_status: "verified"
        }
        let updates = {$set: update}
        let verified = await ApplicationData.findByIdAndUpdate({"_id": id}, updates, {new:true} )
        res.send(verified)
    } catch (error) { 
        console.log(error)
    }
})


module.exports = router;
