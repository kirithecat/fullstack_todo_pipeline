import axios from 'axios';
import https from 'https';
import {expect, it, describe, afterEach, vi} from 'vitest'
import config from 'config'

//note that config is picked up based on the following env variable:
  //NODE_ENV=production
  //or if not present, default.json will be used
  const environmentVariable = config.get('apis.todo.url')

describe('E2E tests (with or without mocking)', () => {
  it('Test hits the API endpoint', async () => {

    //1. pull base URL from environment variable
    //2. Make it work on local machine
    //3. update documentation 
    //4. update the workflow to populate the correct url for each stage
    //5. Make sure that it works on the pipeline
    console.log(environmentVariable)

    const response = await axios.get(`https://localhost:443/items`, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Disable certificate check
      })
    })

    expect(response.headers["content-type"]).toContain('application/json');
    expect(response.status).toEqual(200);
    expect(response.data).toBeDefined()

    console.log(environmentVariable)

  })
})