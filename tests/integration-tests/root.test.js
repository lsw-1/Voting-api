const request = require('supertest');
const app = require('../../app');

describe('Test the root path', () => {
  test('It should respond with 200 and matching text', async () => {
    const response = await request(app).get('/api/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatch(/Voting api/);
  });
});
