const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');
const planets = require('./planet.mongo');

// const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

const process = new Promise((resolve, reject)=>{
    resolve();
});

function loadPlanetsData(){
    
    return new Promise((resolve, reject )=>{
        fs.createReadStream(path.join(__dirname, '..', '..' ,'data' ,'/kepler_data.csv'))
        .pipe(parse({
          comment: '#',
          columns: true,
        }))
        .on('data', async(data) => {
          
          if (isHabitablePlanet(data)) {
            // habitablePlanets.push(data);
            // TODP insert + update = upsert
            savePlanetData(data);
          }
        })
        .on('error', (err) => {
            reject(err);
        })
        .on('end', () => {
          resolve();
        });
    })
}

async function getAllPlanets(){
    return await planets.find({});
}

async function savePlanetData(planet){
  try{
    await planets.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name
    }, {
      upsert: true
    });
  } catch(err) {
    console.error(' Could not save ' , err);
  }

}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};