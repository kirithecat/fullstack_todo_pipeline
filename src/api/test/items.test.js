import * as assert from "assert";
import { expect } from 'chai';
import {addItem, deleteItem, getItem, getItems, updateItem} from "../db.js";
import request from 'supertest';

import app from '../index.js'

it('do stuff', async () => {
  // const req = getMockReq()
  // const {res, next, clearMockRes} = getMockRes()
  // await getAllController.get(req, res, next)
  // expect(res.body).toBe(true)
  //
  // const response = await request(app)
  //   .get('/items')
  //   .set('Accept', 'application/json')
  // expect(response.headers["Content-Type"]).to.equal(/json/);
  // expect(response.status).to.equal(200);
  // expect(response.body.email).to.equal('foo@bar.com');

  const items = getItems()

  assert.equal(items, true)
})

it('do stuff', async () => {
  const response = await request(app)
     .get('/items')
     .set('Accept', 'application/json')
  expect(response.headers["Content-Type"]).to.equal(/json/);
  // expect(response.status).to.equal(200);
  // expect(response.body.email).to.equal('foo@bar.com');
})