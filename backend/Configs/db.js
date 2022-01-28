const mongoose = require('mongoose');


exports.dbConnection = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        });
        if(!conn){
            console.log(`ERROR In Database Connection`.bgRed);
        }
        console.log(`Database Connected SUCCESSFULLY On: ${conn.connection.host}`.black.bgGreen);
    }
    catch(err){
        console.log(`Something Went Wrong In The Server While Connecting To Database`.bgRed);
        console.log(err);
    }
}