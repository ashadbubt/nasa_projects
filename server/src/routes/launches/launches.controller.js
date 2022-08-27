const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortlaunchById
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res){    
    let data = getAllLaunches();
    return res.status(200).json(data);
}

function httpAddNewLaunch(req, res){
    const launch = req.body;
    if(!launch.mission || !launch.rocket 
        || !launch.target || !launch.launchDate  ){
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }
    
    launch.launchDate = new Date(launch.launchDate);
    if(launch.launchDate.toString() === 'Invalid Date'){
        return res.status(400).json({
            error: "Invalid launch date"
        });
    }
    
    addNewLaunch(launch);
    res.status(201).json(launch);
}

function httpAbrotLaunch(req, res){
    const launchId = Number(req.params.id);
    // if launch id dosenot exists     
    if(!existsLaunchWithId(launchId)){
        return res.status(404).json({
            error: 'Launch not found'
        })
    }

    const aborted = abortlaunchById(launchId);
    //  if launch dose exists
    return res.status(200).json(aborted)
}

module.exports= {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbrotLaunch
}