const launchesDatabase = require('./launches.mongo');
const  planets = require('./planet.mongo');
const DEFAULT_FLIGHT_NUMBER  = 100;

const launch = {
    flightNumber:100,
    mission: "Keplar Exploration A",
    rocket: "Explorer IS1",
    launchDate:new Date('December 27 ,2030'),
    target: 'Kepler-442 b',
    customer:['ZTM', 'NASA'],
    upcoming:true,
    success:true
}
// target: 'Kepler-442 b',
saveLaunchs(launch);

async function getAllLaunches(){    
    return  await launchesDatabase
    .find({}, {'_id':0, '__v':0});
}


async function  getLatestFlightNumber(){
    const latestLaunche = await launchesDatabase
    .findOne()
    .sort('-flightNumber');
    if(!latestLaunche){
        return DEFAULT_FLIGHT_NUMBER; 
    }
    return latestLaunche.flightNumber
} 

async  function saveLaunchs(launch){
    const planet = await planets.findOneAndUpdate({
        keplerName: launch.target
    });

    if(!planet){
        throw new Error('No matching planet found');
    }

    await launchesDatabase.updateOne({
        flightNumber:launch.flightNumber,
    },launch, {
        upsert: true
    })
}

async function scheduleNewLaunche(){
    const newFlightNumber =  await getLatestFlightNumber()+1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customer:['Z to Mastr ', 'NASA'],
        flightNumber:newFlightNumber 
    })

    await saveLaunchs(newLaunch);
}


async function existsLaunchWithId(launchId){
     return await launchesDatabase.findOne({
        flightNumber: launchId
     });
}

async function abortlaunchById(launchId){
   const aborted =  await launchesDatabase.updateOne({
        flightNumber:launchId
    }, {
        upcoming: false,
        success: false
    })

   return aborted.modifiedCount == 1; 


    // const aborted =  launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;
}

module.exports = {
    getAllLaunches,
    existsLaunchWithId,
    scheduleNewLaunche,
    abortlaunchById
}