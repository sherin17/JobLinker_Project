// UNVERIFIED ALUMNI PROFILE SCHEMA DESIGN 
const mongoose=require('mongoose')
const schema=mongoose.Schema

const jobseekerSchema= new schema({   
    name:String,
    email:String,
    phone:Number,
    gender:String,
    date_of_birth:Date,
    marital_status:String,
    permanent_address:String,
    alternate_phone_number:Number,
    eircode:String,
    city:String,
    county:String,
    country:String,
    profile:String,
    education :[
        {
            qualification:{
                type: String,
                default: "sample"
            },
            completion_status:{
                type: String,
                default: ""
            },
            main_stream:{
                type: String,
                default: ""
            },
            specialization:{
                type: String,
                default: ""
            },
            university:{
                type: String,
                default: ""
            },
            percentage:{
                type: Number,
                default:  0
            },
            year_of_pass:{
                type: Number,
                default: 0
            }  
        }
    ],
       
    experience :[
        {
            company:{
                type: String,
                default: ""
            },
            Designation:{
                type: String,
                default: ""
            },
            presently_working:{
                type: String,
                default: " "
            },
            starting_date:{
                type: Date,
                default: ""
            },
            ending_date:{
                type: Date,
                default: ""
            },
            current_monthly_salary:{
                type: Number,
                default: 0
            },
            notice_period:{
                type: Number,
                default: 0
            },
        } 
    ],
   
    highest_qualification:{
                type: String,
                default: ""
            },
    main_stream:{
                type: String,
                default: ""
            },
    placement_status:{
                type: String,
                default: ""
            },
    company_name:{
                type: String,
                default: ""
            },
    approval_status:{
        type: String,
        default: "not approved"
    },
    usertype:{
        type:String,
        default:"jobseeker"
    },
    password:String
})

let jobseekerData=mongoose.model('jobseeker_Details',jobseekerSchema)
module.exports=jobseekerData