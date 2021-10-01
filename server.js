if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoDB = require("./models");

// dev dependencies
const morgan = require("morgan");

// process env or node util
const PORT = process.env.PORT || 5000;
const IP = process.env.IP;
const path = require("path");

app.use(express.json({ extended: true }));

// http request logger, dev setting colorizes output logs
app.use(morgan("dev"));

// set MongoDB
mongoDB.on("error", console.error.bind(console, "Connection ERROR: "));
mongoDB.once("open", () => {
  console.log("Mongo Atlas Database CONNECTED!");
});

app.get("/", (req, res) => res.json({ msg: "Welcome to Image Uploader" }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/images", require("./routes/images"));

app.listen(PORT, () =>
  console.log(`Server started and listening on PORT: ${PORT} and IP: ${IP}`)
);
