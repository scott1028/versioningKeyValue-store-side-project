import request from 'supertest';

import app from './app.mjs';
import orm from './orm/index.mjs';

test('app should be defined', () => {
  expect(app).toBeDefined();
});

test('api access testing', () => new Promise(done => {
  request(app)
    .get('/object')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      // NOTE: https://stackoverflow.com/questions/50676554/jest-expect-any-not-working-as-expected
      expect(res.body).toEqual(expect.any(Array));
      done();
    });
}));

// NOTE: yarn test ./src/app.test.mjs -t 'api access testing'
describe('api access testing', () => {
  let timestamp = null;
  let newTimestamp = null;
  const key = `myKey-${Date.now()}`;
  const value = Math.random();
  const newValue = `${value}-new`;

  test('api access testing by create', () => new Promise(async done => {
    request(app)
      .post('/object')
      .send({ [key]: value })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.key).toEqual(expect.any(String));
        expect(res.body.key).toEqual(key);
        expect(res.body.value).toBeDefined();
        expect(res.body.value).toEqual(value);
        expect(res.body.timestamp).toEqual(expect.any(Number));
        timestamp = res.body.timestamp;
        done();
      });
  }));

  test('api access testing by get', () => new Promise(async done => {
    request(app)
      .get(`/object/${key}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.value).toBeDefined();
        expect(res.body.value).toEqual(value);
        done();
      });
  }));

  test('api access testing by update', () => new Promise(async done => {
    request(app)
      .post('/object')
      .send({ [key]: newValue })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.key).toEqual(expect.any(String));
        expect(res.body.key).toEqual(key);
        expect(res.body.value).toBeDefined();
        expect(res.body.value).toEqual(newValue);
        expect(res.body.timestamp).toEqual(expect.any(Number));
        newTimestamp = res.body.timestamp;
        done();
      });
  }));

  test('api access testing by get with timestamp', () => new Promise(async done => {
    request(app)
      .get(`/object/${key}`)
      .query({ timestamp })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.value).toBeDefined();
        expect(res.body.value).toEqual(value);
        done();
      });
  }));

  test('api access testing by get near to newTimestamp', () => new Promise(async done => {
    request(app)
      .get(`/object/${key}`)
      .query({ timestamp: newTimestamp + 1 })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.value).toBeDefined();
        expect(res.body.value).toEqual(newValue);
        done();
      });
  }));
});
