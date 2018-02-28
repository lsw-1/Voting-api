const Speaker = require('../models/Speaker');

const getAll = async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.json(speakers);
  } catch (error) {
    res.json(error);
  }
};

const getOne = async (req, res) => {
  try {
    const speaker = await Speaker.findOne({ _id: req.params.id });
    res.status(200).json(speaker);
  } catch (error) {
    res.status(404);
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

const countTotalVotes = async (req, res) => {
  try {
    const speakers = await Speaker.find().select('+votes');
    const totalVotes = speakers.map(s => s.votes.length).reduce((acc, curr) => acc + curr);
    res.json({ totalVotes });
  } catch (error) {
    res.json(error).status(500);
  }
};

module.exports = {
  getAll,
  getOne,
  createSpeaker,
  countTotalVotes,
};
