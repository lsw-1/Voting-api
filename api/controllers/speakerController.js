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

const countTotalVotes = async (req, res) => {
  try {
    const speakers = await Speaker.find().select('+votes');
    const totalVotes = speakers.map(s => s.votes.length).reduce((acc, curr) => acc + curr);
    res.json({ totalVotes });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAll,
  getOne,
  countTotalVotes,
};
