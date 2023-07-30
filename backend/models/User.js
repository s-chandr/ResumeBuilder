const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email address"]
    },
    photoURL: {
        type: String,
      },
    //accountId can be google Id, facebook Id, github Id etc.
    accountId: {
        type: String,
        trim: true,
        required: [true , "Please Enter your accountId"]
    },
    provider :{
        type: String,
    },
    password: {
        type: String,
        trim: true,
        
    },
    
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter your name"]
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
