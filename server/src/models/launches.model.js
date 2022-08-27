const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber:100,
    mission: "Keplar Exploration A",
    rocket: "Explorer IS1",
    launchDate:new Date('December 27 ,2030'),
    destination: 'Kepler-442 b',
    customer:['ZTM', 'NASA'],
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber, launch);

function getAllLaunches(){    
    return Array.from(launches.values());
    // return {a:10};
    
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch,{
        flightNumber:latestFlightNumber,        
        customer:['Z to Mastr ', 'NASA'],
        upcoming:true,
        success:true
    }));
}

function existsLaunchWithId(launchId){
     return launches.has(launchId);
}

function abortlaunchById(launchId){
    const aborted =  launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortlaunchById
}