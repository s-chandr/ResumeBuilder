const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        trim: true,
        // required: [true, "Please enter your userName"]  
    },
    email: {
        type: String,
        trim: true,
        // required: [true, "Please enter your email address"]
    },
    password: {
        type: String,
        trim: true,
        // required: [true, "Please enter your password"]
    },
    
    firstName: {
        type: String,
        trim: true,
        // required: [true, "Please enter your firstName"]
    },
    lastName: {
        type: String,
        trim: true,
        // required: [true, "Please enter your lastName"]
    },
    photoURL: {
        type: String,
      },
    //accountId can be google Id, facebook Id, github Id etc.
    accountId: {
        type: String,
        trim: true,
        
    },
    provider :{
        type: String,
    },
    
    dob:{
        type : Date,
        trim: true,
        
    },
    age:{
        type : Number,
        
    },
    skills: {
        type: String,
        trim: true,
        
    },
    createdAt:{
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User' , UserSchema);
