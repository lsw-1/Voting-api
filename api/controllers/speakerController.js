const Speaker = require('../models/Speaker');

exports.getAll = async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.json(speakers);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getOne = async (req, res) => {
  try {
    const speaker = await Speaker.findOne({ _id: req.params.id });
    res.status(200).json(speaker);
  } catch (error) {
    res.sendStatus(404);
  }
};

exports.createSpeaker = async (req, res) => {
  try {
    const newSpeaker = new Speaker({
      name: req.body.name,
      description: req.body.description,
      created_at: new Date(),
    });
    const speaker = await newSpeaker.save();
    res.json(speaker);
  } catch (error) {
    res.sendStatus(400);
  }
};

exports.countTotalVotes = async (req, res) => {
  try {
    const speakers = await Speaker.find().select('+votes');
    const totalVotes = speakers.reduce((acc, curr) => curr.votes.length + acc.votes.length);
    res.json({ totalVotes });
  } catch (error) {
    res.status(500).json(error);
  }
};
