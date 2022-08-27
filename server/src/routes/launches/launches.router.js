const express = require('express');
const {  
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbrotLaunch
} = require('./launches.controller');
const launchesRouter = express.Router();

launchesRouter.get('/',  httpGetAllLaunches);
launchesRouter.post('/',  httpAddNewLaunch);
launchesRouter.delete('/:id',  httpAbrotLaunch);

module.exports = launchesRouter;