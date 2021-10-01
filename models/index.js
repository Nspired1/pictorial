const mongoose = require("mongoose");
// debug setting for dev environment for verbose error messages
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_ATLAS_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error(err.message);
  });

const mongoDB = mongoose.connection;

module.exports = mongoDB;
