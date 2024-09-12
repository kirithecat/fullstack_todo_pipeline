import {expect, it, describe, afterEach, vi} from 'vitest'
import request from 'supertest';
import app from '../index.js'
import * as db from "../db.js"
import * as weather from "../helpers/weather.js"

vi.mock('../db.js')
vi.mock('../helpers/weather.js')

afterEach(()=>{
  vi.clearAllMocks()
})

describe('sdf', () => {
  it('Look, mum, no e2e!', async () => {
    const response = await request(app).get('/items')

    expect(response.headers["content-type"]).toContain('application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined()
  })


it('Can we mock a weather???', async () => {
  vi.mocked(weather.getWeather).mockReturnValue('99.9');

  const postRequest = await request(app).post('/items').send({item: 'walk'})
  console.log('AAAA', JSON.stringify(postRequest.body))
  const response = await request(app).get('/items')

  expect(response.headers["content-type"]).toContain('application/json');
  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined()
})

//
  it('Vitest can mock API functions on the fly!! (hooking in with Supertest)', async () => {
    const mockedResult = [{id: 1, name: 'I am a mocked result!'}]
    vi.mocked(db.getItems).mockReturnValue(mockedResult)
    const response = await request(app).get('/items')

    expect(response.status).toEqual(200);
    expect(db.getItems).toHaveBeenCalled()
    expect(db.getItems).toHaveReturnedWith(mockedResult)
    expect(response.body).toEqual(mockedResult)
  })

//
//
// it.skip('Can Jest mock from the outside?!! (http calls to the API)', async () => {
//   const mockedResult = [{id: 1, name: 'Item 1'}]
//   db.getItems.mockReturnValueOnce(mockedResult);
//
//   const https = require('https');
//   const httpsAgent = new https.Agent({
//     rejectUnauthorized: false,
//   });
//
//   const url = 'https://localhost:443/items'
//   const response = await fetch(url, {method: 'GET', agent: httpsAgent});
//   const data = await response.json()
//
//   expect(data).toBe(mockedResult)
// })
//
})

