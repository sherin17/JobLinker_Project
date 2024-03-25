// VERIFIED JOBS SCHEMA DESIGN and ADMIN DIRECT POSTING
const mongoose = require('mongoose')
const schema = mongoose.Schema

const jobSchema = new schema({
    jobTitle: String,
    qualification: String,
    experience: String,
    jobSector: String,
    companyName: String,
    location: String,
    closingDate: Date,
    skills:Array,
    description:String,
    salaryRange: String,
    postedBy: String
})

let jobData = mongoose.model('jobData', jobSchema)
module.exports = jobData