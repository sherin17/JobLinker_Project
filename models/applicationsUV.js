// UNVERIFIED APPLICATIONS SCHEMA
const mongoose = require('mongoose')
const schema = mongoose.Schema

const applicationSchema = new schema({

    resume:String,
    link: String,
    job_id: String,
    jobseeker_id: String,
    approval_status: {
        type: String,
        default: "not approved"
    },
}) 
let applicationData = mongoose.model('Applications',applicationSchema)
module.exports= applicationData
