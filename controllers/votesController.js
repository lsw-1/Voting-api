const VoteEntity = require("../models/Vote");
const SpeakerEntity = require("../models/Speaker");

exports.getAll = async (req, res) => {
  const votes = await VoteEntity.find({ speaker: req.params.speakerId });
  return res.json(votes);
};

exports.getOne = async (req, res) => {
  const vote = await VoteEntity.findOne({ _id: req.params.id })
    .populate("votes")
    .exec();
  return res.json(vote);
};

exports.createVote = async (req, res) => {
  const newVote = new VoteEntity({
    ticket_number: req.body.ticketNumber,
    speaker: req.params.speakerId,
    created_at: new Date()
  });
  try {
    const vote = await newVote.save();
    const speaker = await SpeakerEntity.findOne({ _id: vote.speaker });
    speaker.numVotes++;
    await speaker.save();
    return res.json(vote);
  } catch (err) {
    console.log(err);
  }
};
