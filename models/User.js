const mongoose = require("mongoose");
const Image = require("./Image");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "image",
    },
  ],
});

// cascade delete for reviews when a User is deleted
UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Image.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("user", UserSchema);
