import {jest} from '@jest/globals'
import request from 'supertest';

import * as db from "../db.js"
jest.mock('../db.js')

import app from '../index.js'

// it('Look, mum, no e2e!', async () => {
//   const response = await request(app).get('/items')
//
//   expect(response.headers["content-type"]).to.contain('application/json');
//   expect(response.status).to.equal(200);
// })


it('Jest mock test!', async () => {
  db.getItems.mockReturnValueOnce([{ id: 1, name: 'Item 1' }]);

  const response = await request(app).get('/items')

  expect(response.headers["content-type"]).toContain('application/json');
  expect(response.status).toEqual(200);
  expect(db.getItems).toHaveBeenCalled()
})