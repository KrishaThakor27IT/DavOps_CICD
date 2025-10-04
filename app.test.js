// app.test.js

const request = require('supertest');
const app = require('./app'); // Import your app

describe('GET /', () => {
  it('should respond with Hello World message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hello, 23IT132!');
  });
});

describe('GET /status', () => {
    it('should respond with status UP', async () => {
      const response = await request(app).get('/status');
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('UP');
    });
  });
