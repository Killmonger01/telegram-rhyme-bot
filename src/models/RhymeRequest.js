const mongoose = require('mongoose');

const rhymeRequestSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    default: null,
  },
  word: {
    type: String,
    required: true,
  },
  rhymes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('RhymeRequest', rhymeRequestSchema);
