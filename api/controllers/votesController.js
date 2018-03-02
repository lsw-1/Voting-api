const Vote = require('../models/Vote');
const Speaker = require('../models/Speaker');

exports.getAll = async (req, res) => {
  try {
    const votes = await Vote.find({ speaker: req.params.speakerId });
    res.json(votes);
  } catch (error) {
    res.send(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const vote = await Vote.findOne({ _id: req.params.id });
    res.json(vote);
  } catch (error) {
    res.status(404);
  }
};

exports.createVote = async (req, res) => {
  const newVote = new Vote({
    ticket_number: req.body.ticketNumber,
    speaker: req.params.speakerId,
    created_at: new Date(),
  });
  try {
    const vote = await newVote.save();
    const speaker = await Speaker.findOne({ _id: vote.speaker }).select('+votes');
    speaker.votes = [...speaker.votes, vote._id];
    await speaker.save();
    res.status(201).json(vote);
  } catch (err) {
    res.status(400).json(err);
  }
};
