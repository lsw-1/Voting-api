const Speaker = require('../models/Speaker');

const speakersWithVoteCount = async (req, res) => {
  try {
    const speakers = await Speaker.find().select('+votes');

    const speakerWithCount = speakers.map(speaker => ({
      ...speaker.toJSON(),
      count: speaker.votes.length,
    }));
    res.json(speakerWithCount);
  } catch (error) {
    res.send(error.message);
  }
};

const createSpeaker = async (req, res) => {
  try {
    const newSpeaker = new Speaker({
      name: req.body.name,
      description: req.body.description,
      created_at: new Date(),
    });
    const speaker = await newSpeaker.save();
    res.status(201).json(speaker);
  } catch (error) {
    res.status(400);
  }
};

module.exports = {
  speakersWithVoteCount,
  createSpeaker,
};
