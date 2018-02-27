const Speaker = require('../models/Speaker');

exports.speakersWithVoteCount = async (req, res) => {
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
