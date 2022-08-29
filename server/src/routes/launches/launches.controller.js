const {
    getAllLaunches,
    scheduleNewLaunche,
    existsLaunchWithId,
    abortlaunchById
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res){    
    let data = await  getAllLaunches();
    return res.status(200).json(data);
}

async function httpAddNewLaunch(req, res){
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
    
    await scheduleNewLaunche(launch);
    res.status(201).json(launch);
}

async function httpAbrotLaunch(req, res){
    const launchId = Number(req.params.id);
    // if launch id dosenot exists   
    const existsLaunch =  await existsLaunchWithId(launchId);
    if(!existsLaunch){
        return res.status(404).json({
            error: 'Launch not found'
        })
    }
    const aborted = await abortlaunchById(launchId);
    if(!aborted){
        return res.status(200).json({
            error: 'Launch not  aborted'
        })
    } else {
        return res.status(200).json({
            ok:  true
        })
    }
    //  if launch dose exists

}

module.exports= {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbrotLaunch
}