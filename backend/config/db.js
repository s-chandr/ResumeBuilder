const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true, // ye krna pdta hai kuch kuch error aate hai wrna
            // createUserIndex: true, // ye hat chuka hai ab nhi use krna hota hai 
            useUnifiedTopology:true
        });
        console.log(`MongoDb Connected : ${conn.connection.host} `.cyan.underline.bold);
        
    }
    catch(err){
        console.log(`Error ${err.message}`.red);
        process.exit(1);//aaplication failed
    }
}
module.exports = connectDB;