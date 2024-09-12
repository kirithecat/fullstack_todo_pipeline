import axios from 'axios';
import https from 'https';
import {expect, it, describe, afterEach, vi} from 'vitest'


describe('E2E tests (with or without mocking)', () => {
  it('Test hits the API endpoint', async () => {

    const baseUrl = 'https://localhost:443'
    const baseUrl1 = process.env.BASEURL
   
    console.log(baseUrl1)
    
    //1. pull base URL from environment variable
    //2. Make it work on local machine
    //3. update documentation 
    //4. update the workflow to populate the correct url for each stage
    //5. Make sure that it works on the pipeline

    const response = await axios.get(`${baseUrl}/items`, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Disable certificate check
      })
    })

    expect(response.headers["content-type"]).toContain('application/json');
    expect(response.status).toEqual(200);
    expect(response.data).toBeDefined()
  })
})