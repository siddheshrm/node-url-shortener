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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to Users collection
    required: true,
  },
});

const URLData = mongoose.model("short-url", URLSchema);

module.exports = URLData;
