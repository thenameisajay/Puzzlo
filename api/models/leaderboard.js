const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  leaderboard: [{
    username: {
      type: String,
      required: true,
    },
    numberOfTries: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  }],
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);