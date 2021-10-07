const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  url: String,
  filename: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("image", ImageSchema);
