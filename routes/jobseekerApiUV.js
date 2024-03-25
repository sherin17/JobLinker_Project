const express = require('express')
const router = express.Router()
const jobseekerData = require('../models/jobseekerProfileUV')
const jwt = require('jsonwebtoken')
 
router.post('/jobseekersignup', async (req, res) => {
    try {
        let item = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            highest_qualification: req.body.highest_qualification,
            main_stream: req.body.batch_details,
            placement_status: req.body.placement_status,
            company_name: req.body.company_name,
            password: req.body.password,
        }
        let user = await jobseekerData.findOne({ email: req.body.email })
        if (!user) {
            const newuser = new jobseekerData(item)
            const saveuser = await newuser.save()
            res.send(saveuser)
        }
        return res.json({ message:"Email already registered" });
    } catch (error)
{
        console.log('post error:',error)
    }
})

router.get('/jobseekerlist', async (req, res) => {
    try {
        let list = await jobseekerData.find()
        res.send(list)
    } catch (error) {
        console.log(error)
    }
})

router.get('/jobseekers', async (req, res) => {       // getdata for admin to collect unverified jobseeker
    try {
        let list = await jobseekerData.find({ approval_status: "not approved" })
        res.send(list)
    } catch (error) {
        console.log(error)
    }
})

router.get('/jobseekerVer', async (req, res) => {       // getdata for admin to collect verified jobseeker
    try {
        let list = await jobseekerData.find({ approval_status: "verified" })
        res.send(list)
    } catch (error) {
        console.log(error)
    }
})


router.post('/singlejobseeker',async(req,res)=>{       //get singledata of jobseeker
    
    // console.log(req.body) 

    try{
        let data = await jobseekerData.findOne({email:req.body.email,
            password:req.body.password,approval_status:"verified"})
            let payload = {'email':req.body.email,'password':req.body.password,'date':Date.now()}
            let token = jwt.sign(payload,'secretkey')
        if(!data){
            return res.json({ message: " Admin didnot verified your data yet !!" });

        }else{

            res.send({token,data});
        }
    }
    catch(error){
        console.log(error)
    }
})
//TODO: get single data from db  
router.get('/jobseeker/:id',(req,res)=>{
    try{
        jobseekerData.findById({"_id":req.params.id}).then(function(data){
            res.send(data);
        })
    }
    catch(error){
        console.log(error);
    } 
})

router.put('/generaldata',async(req,res)=>{ //update one jobseeker general information
    try{
        console.log(req.body)
        let id = req.body.id 
        let generaldata = {
            gender:req.body.data.gender,
            date_of_birth:req.body.data.date_of_birth,
            permanent_address:req.body.data.permanent_address,
            alternate_phone_number:req.body.data.alternate_phone_number,
            eircode:req.body.data.eircode,
            city:req.body.data.city,
            county:req.body.data.county,
            country:req.body.data.country,
        }
        let generaldatas = {$set:generaldata}
        let generaldataupdate= await jobseekerData.findByIdAndUpdate({"_id":id},generaldatas,{new:true})
        res.send(generaldataupdate)
    }
    catch(error){
        console.log('update error : ',error)
    }
})
router.put('/jobseekereducation', async (req, res) => { //for add education data of jobseeker
    try {
            console.log(req.body.data, req.body.id)
            let id = req.body.id;
            let updates = {education: req.body.data}
            let toUpdate = {$set: updates}
            let updated = await jobseekerData.findByIdAndUpdate({"_id":id},toUpdate,{new:true})
            res.send(updated)
       }
       catch (error) {
       console.log('post error:', error);
}
})
router.put('/jobseekerexperience',async (req,res)=>{ //for update experience data of jobseeker
    try{
        console.log(req.body.data,req.body.id)
        let id = req.body.id;
        let update={experience:req.body.data}
        let experiencedatas={$set:update}
        let experiences= await jobseekerData.findByIdAndUpdate({"_id":id},experiencedatas,{new:true})
        res.send(experiences)
        console.log(experiences)
    }
    catch (error) {
        console.log('post error:', error);
 }
})

router.put('/onejobseeker', async (req, res) => {    // for admin to get one jobseeker to verify
    try {

        console.log(req.body)
        let id = req.body._id
        let update = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            highest_qualification: req.body.highest_qualification,
            placement_status: req.body.placement_status,
            company_name: req.body.company_name,
            approval_status: req.body.approval_status,
            password: req.body.password
        }
        let updates = { $set: update }
        let verifiedjobseeker = await jobseekerData.findByIdAndUpdate({ "_id": id }, updates, { new: true })
        res.send(verifiedjobseeker)
        
    } catch (error) {
        console.log('update error:', error);
    }
})

router.delete('/deletejobseeker/:id', async (req, res) => {        // for admin to delete jobseeker
    try {

        let id = req.params.id
        let data = await jobseekerData.findByIdAndDelete(id)
        res.send(data)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;