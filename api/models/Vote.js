const mongoose = require('mongoose');

const { Schema } = mongoose;

const Vote = new Schema({
  ticket_number: {
    type: Number,
    required: true,
    unique: true,
    validate: { validator: num => /^[0-9]{6}$/.test(num) },
  },
  speaker: { type: Schema.ObjectId, ref: 'Speaker', required: true },
  created_at: Date,
});

module.exports = mongoose.model('Vote', Vote);
