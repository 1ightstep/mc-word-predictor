const mongoose = require("mongoose");

const ngramSchema = new mongoose.Schema({
  context: { type: [String], required: true, index: true },
  frequency: { type: Number, required: true, default: 0 },
  next: {
    type: String,
    required: true,
    index: true,
  },
});

const NgramModel = mongoose.model("NgramModel", ngramSchema);

module.exports = NgramModel;
