const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
  shortID: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const URLData = mongoose.model("short-url", URLSchema);

module.exports = URLData;
