const supertest = require('supertest');
const app = require('../../app');
const Speaker = require('../../api/models/Speaker');
const Vote = require('../../api/models/Vote');

const request = supertest(app);
const ROOT_PATH = '/api/speakers';

describe('Vote routes', () => {
  let speakerId;
  beforeAll(async () => {
    const speaker = new Speaker({ name: 'vote-test', description: 'test' });
    await speaker.save();
    speakerId = speaker._id;
  });
  afterAll(async () => {
    await Speaker.remove({ name: 'vote-test' });
    await Vote.remove({ ticket_number: 123456 });
    await Vote.remove({ ticket_number: 555555555555 });
    request.app.close();
  });

  it('should create a vote for a speaker', async () => {
    const response = await request.post(`${ROOT_PATH}/${speakerId}/votes`).send({
      ticketNumber: 123456,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.speaker).toBeTruthy();
  });

  it('should not create a Vote due to bad inuput', async () => {
    const response = await request.post(`${ROOT_PATH}/${speakerId}/votes`).send({
      ticketNumber: 555555555555,
    });
    expect(response.statusCode).toBe(400);
  });

  it('should get all votes for a speaker', async () => {
    const response = await request.get(`${ROOT_PATH}/${speakerId}/votes`);
    expect(response.statusCode).toBe(200);
    response.body.forEach((vote) => {
      expect(vote.ticket_number).toBeTruthy();
      expect(vote.speaker).toBeTruthy();
    });
  });
});
