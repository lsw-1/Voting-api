const SpeakerEntity = require('../models/Speaker');

exports.getAll = async (req, res) => {
  const speakers = await SpeakerEntity.find();
  return res.json(speakers);
};

exports.getOne = async (req, res) => {
  const speaker = await SpeakerEntity.findOne({ _id: req.params.id })
    .populate('votes')
    .exec();
  return res.json(speaker);
};

exports.createSpeaker = async (req, res) => {
  const newSpeaker = new SpeakerEntity({
    name: req.body.name,
    description: req.body.description,
    created_at: new Date(),
  });
  try {
    const speaker = await newSpeaker.save();
    return res.json(speaker);
  } catch (err) {
    console.log(err);
  }
};

exports.countTotalVotes = async (req, res) => {
  const speakers = await SpeakerEntity.find();

  const totalVotes = speakers.reduce((acc, curr) => curr.numVotes + acc.numVotes);

  return res.json({ totalVotes });
};
