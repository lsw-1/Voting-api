const mongoose = require('mongoose');

const { Schema } = mongoose;

const Speaker = new Schema({
  images: {
    type: [String],
  },
  video: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  description: { type: String, required: true, maxlength: 500 },
  votes: { type: [{ type: Schema.ObjectId, ref: 'Vote' }], select: false },
  created_at: Date,
});

const SpeakerModel = mongoose.model('Speaker', Speaker);

module.exports = SpeakerModel;
