const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://nasa-api:NkzSjD790i3a3Ei9@nasacluster.ijj1f7i.mongodb.net/nasa?retryWrites=true&w=majority";

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
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
    mongoose
}