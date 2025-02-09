const mongoose = require('mongoose');

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('connect to mongo successfully');
    }catch(error){
        console.log("Error connecting to mongodb",error);
        process.exit(1);
    }
};

module.exports = connectDb;