const http = require('http');
const app = require('./app') 
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
require('dotenv').config()

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function  startServer(){
    await mongoConnect();
    await loadPlanetsData();
    server.listen(PORT, ()=>{
        console.log(`Listinging Port ${ PORT } ...`);
    });
}
startServer();

