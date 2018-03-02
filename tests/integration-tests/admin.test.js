const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);
const User = require('../../api/models/User');

describe('authorization', () => {
  afterAll(async () => {
    await User.remove({ name: 'test' });
  });

  it('should register a user and return a token', async () => {
    const loginRes = await request
      .post('/api/auth/register')
      .send({ name: 'test', password: '12345' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeTruthy();
  });

  it('It should return a token when using admin login and with that token be able to get speakers with votes and count', async () => {
    const loginRes = await request
      .post('/api/auth/login')
      .send({ name: 'test', password: '12345' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeTruthy();

    const response = await request
      .get('/api/admin/speakers')
      .set('Authorization', `Bearer ${loginRes.body.token}`);
    expect(response.statusCode).toBe(200);
    response.body.forEach((speaker) => {
      expect(speaker.votes).toBeTruthy();
      expect(speaker.count).toBeGreaterThanOrEqual(0);
    });
  });

  it('should login and create a speaker', async () => {
    const loginRes = await request
      .post('/api/auth/login')
      .send({ name: 'test', password: '12345' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeTruthy();
    const response = await request
      .post('/api/admin/speakers')
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .set('Content-Type', 'application/json')
      .send({ name: 'test', description: 'test' });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toMatch(/test/);
  });
});
