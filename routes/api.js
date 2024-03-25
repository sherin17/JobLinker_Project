//MASTER API

const express = require('express')
const router = express.Router()

// below declare all required api
const verifiedJobs = require('./jobApi')
// const jobseeker=require('./jobseekerApi')
const jobseekerUV = require('./jobseekerApiUV')
// const jobuv=require('./jobApiUV')
const applicationsUV=require('./applicationsApiUV')
const login=require('./login')
//use api
router.use('/login',login)

router.use('/verifiedjobs',verifiedJobs)
// router.use('/jobseeker',jobseeker)
router.use('/jobseekeruv',jobseekerUV)
// router.use('/jobuv',jobuv)
router.use('/applicationsuv',applicationsUV)
module.exports = router;

