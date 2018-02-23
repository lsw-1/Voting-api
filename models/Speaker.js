const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Speaker = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  numVotes: { type: Number, default: 0 },
  created_at: Date
});

Speaker.virtual("url").get(() => `/speakers/${this._id}`);

const SpeakerModel = mongoose.model("Speaker", Speaker);

module.exports = SpeakerModel;
