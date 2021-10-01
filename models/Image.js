const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  url: String,
  filename: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("image", ImageSchema);
