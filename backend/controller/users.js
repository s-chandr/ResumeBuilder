const User = require("../models/User");
//@desc Get one user
// @route GET  /api/v1/user/:id
//@access Public
exports.getUser = async (req, res, next) => {
    try{
        
        // const user = await User.findById(req.params.id);
        const user = await User.findOne({ accountId: req.params.accountId });
        if(!user){
            return res.status(404).json({ 
                success: false,
                error:'No user found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//@desc add a transaction
// @route POST  /api/v1/user
//@access Public
exports.addUser = async (req, res, next) => {
    try{

        const existingUser = await User.findOne({
            userName: req.body.userName,
            accountId:req.body.accountId
          });
        if (existingUser) {
            existingUser.firstName = req.body.firstName;
            existingUser.lastName = req.body.lastName;
            existingUser.password = req.body.password;
            existingUser.photoURL = req.body.photoURL;
            existingUser.dob = req.body.DOB;
            existingUser.age = req.body.age;
            existingUser.skills = req.body.skills;
            existingUser.phone = req.body.phone;
            existingUser.experience = req.body.experience;
            existingUser.education = req.body.education;
            const updatedUser = await existingUser.save();
            return res.status(200).json({
                success: true,
                data: updatedUser,
              });
        }      
        const newUser = await User.create(req.body);
        return res.status(201).json({
            success: true,
            data: newUser
        });
        
    }
    catch(err){
        if(err.name=="ValidationError"){
            const messages = Object.values(err.errors).map(val=>val.message);
            return res.status(500).json({
                success: false,
                error: messages
            })
        }
        else{
            return res.status(500).json({
                success: false,
                error: 'Server Error',
                // message : err.message // works
            })
        }
        
    }
}




