
const API_URL = 'http://localhost:8000'
async function httpGetPlanets() {

 const response=  await fetch(`${ API_URL }/planets`);
 return await response.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/launches`);
  return await response.json()
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try{ 
      return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch(err){
    return {
      ok:false
    }
  }
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launches/${id}`,{
      method:"delete",
    })
  } catch(err){
    console.log(err);
    return {
      ok:false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};