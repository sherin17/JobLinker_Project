const express  = require('express')
const router = express.Router()
const JOBDATA = require('../models/jobs')
const verifytoken=require('../middlewares/jwtVerify')
router.get('/getjob',verifytoken, async(req, res)=>{  // getting job
    try {
        let jobs = await JOBDATA.find()
        res.send(jobs)
    } catch (error) {
        console.log('get error:', error);
    }
})

router.get('/getidjob/:id', async(req, res)=>{  // getting job
    try {
        let empID = req.params.id
        console.log(empID)
        let jobs = await JOBDATA.find({postedBy:empID})
        res.send(jobs)
    } catch (error) {
        console.log('get error:', error);
    }
})



router.get('/getadminjob', async(req, res)=>{  // getting job by admin
    try {
    let jobs = await JOBDATA.find({postedBy:"admin"})
        res.send(jobs)
    } catch (error) {
        console.log('get error:', error);
    }
})
router.get('/getjobs', async(req, res)=>{  // getting job by HOMEPAGE
    try {
    let jobs = await JOBDATA.find()
        res.send(jobs)
    } catch (error) {
        console.log('get error:', error);
    }
})

router.post('/postjob', async(req, res)=>{  // posting job
    try {
        console.log(req.body)
        let data = {
            // data collection from body
            jobTitle: req.body.jobTitle,
            qualification: req.body.qualification,
            experience: req.body.experience,
            jobSector: req.body.jobSector,
            companyName: req.body.companyName,
            location: req.body.location,
            closingDate:req.body.closingDate,
            skills:req.body.skills,
            description:req.body.description,
            salaryRange: req.body.salaryRange,
            postedBy: req.body.postedBy
        }
        const newJob = new JOBDATA(data)
        const savedJob = await newJob.save()
        res.send(savedJob)
    } catch (error) {
        console.log('post error:',error);
    }
})

router.put('/editJob', async(req, res)=>{  // update Job
    try {
        let id = req.body.id
        let updates = {
            jobTitle: req.body.data.jobTitle,
            qualification: req.body.data.qualification,
            experience: req.body.data.experience,
            jobSector: req.body.data.jobSector,
            companyName: req.body.data.companyName,
            location: req.body.data.location,
            closingDate:req.body.data.closingDate,
            skills:req.body.data.skills,
            description:req.body.data.description,
            salaryRange: req.body.data.salaryRange,
            postedBy: req.body.data.postedBy// data of updated jobs
        }
        let updateJob = {$set: updates}
        let updatedJob = await JOBDATA.findByIdAndUpdate({"_id":id}, updateJob,{new:true})
        res.send(updatedJob)
    } catch (error) {
        console.log('update error:',error);
    }
})


router.delete('/deletejob/:id', async(req, res)=>{  //delete Jobs
    try {
            let id = req.params.id
            let deleteJob = await JOBDATA.findByIdAndDelete(id)
            res.send(deleteJob)
    } catch (error) {
        console.log('delete error:',error);
    }
})

router.get('/getOneJob/:id', async(req,res)=>{ // Get a single job by id
    try {
        let id = req.params.id
        let singleJob = await JOBDATA.findById(id)
        res.send(singleJob)
    } catch (error) {
        console.log('single error:',error);
    }
}) 


module.exports = router;