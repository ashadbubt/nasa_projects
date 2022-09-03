const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_DB;

mongoose.connection.once('open', ()=>{
    console.log('MongoDB connection ready !');
});

mongoose.connection.once('error', (err)=>{
       console.error(err);
});

async function  mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    // await mongoose.connection.close();
    await mongoose.connection.close();
    await mongoose.disconnect();
    
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}