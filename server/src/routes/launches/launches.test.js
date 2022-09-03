const request = require('supertest');
const app = require('../../app');

const { 
    mongoConnect,
    mongoDisconnect
 } = require('../../services/mongo');
const {  loadPlanetsData } = require('../../models/planets.model');

describe('Launches API ', () => {    
    beforeAll( async () => {
        await mongoConnect();
        await loadPlanetsData();
    });

    describe('Test GET /launches', ()=>{
        test('It should respond wid 200 success', async () => { 
            const response = await request(app)
                .get('/launches')
                .expect('Content-type', /json/)
                .expect(200);
            // expect(200).toBe(200);
        })
    })
    
    
    afterAll(async () => {
         await mongoDisconnect();
      });
    describe('Test POST /launch', ()=>{
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-186 f',
            launchDate: 'January 4, 2028'
        }
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-186 f'
        }
        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-186 f',
            launchDate: 'ashad'
        }
        test('It should response 201 success', async()=>{
            const response =  await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-type', /json/)
            .expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
    
        });
    
        test('It should catch missing require property', async ()=>{
            const response =  await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: "Missing required launch property"
            });
        })
    
        test('It should catch invalid dates', async () => {
            const response =  await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: "Invalid launch date"
            });
        })
    })
    

})

