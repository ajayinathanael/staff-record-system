const mongoose = require('mongoose');
const validator = require('validator');
const slug = require('slugify');
// const rand = Math.floor((Math.random()*6) + 1); 

// MODEL
const userSchema = new mongoose.Schema({
    
    // application_id: {
    //     type: Number,
    //     set: rand => Math.floor((Math.random()*6) + 1)
    // },
    lastname: {
        type: String,
        required: [true, 'Please choose a lastname!']
    },
    firstname: {
        type: String,
        required: [true, 'Please tell us your surname!']
    },   
    address: {
        type: String,
    },
    department:{
        type: String
    },
    faculty:{
        type: String
    },
    dob: {
        type: String
    },
    courses: {
        type: String,
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    comment: {
        type: String,
    },
    whatsapp: {
        type: Number,
    }
});

const User = mongoose.model('staff_record', userSchema);

module.exports=User;
