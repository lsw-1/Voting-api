const supertest = require('supertest');
const app = require('../../app');
const Speaker = require('../../api/models/Speaker');

const request = supertest(app);
const ROOT_PATH = '/api/speakers';

describe('Speaker routes', () => {
  afterAll(async () => {
    await Speaker.remove({ name: 'test' });
  });

  it('should return all speakers with valid fields on /speakers', async () => {
    const response = await request.get(ROOT_PATH);
    expect(response.statusCode).toBe(200);
    response.body.forEach((speaker) => {
      expect(speaker.name).toBeTruthy();
      expect(speaker.description).toBeTruthy();
    });
  });

  it('should respond with totalValues when GET /count_votes', async () => {
    const response = await request.get(`${ROOT_PATH}/count_votes`);
    expect(response.statusCode).toBe(200);
    expect(response.body.totalVotes).toBeTruthy();
    expect(response.body.totalVotes.toString()).toMatch(/[0-9]+/);
  });
});
