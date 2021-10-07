if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoDB = require("./models");

// process env or node util
const PORT = process.env.PORT || 5000;
const IP = process.env.IP;
const path = require("path");

// dev dependencies
const morgan = require("morgan");

// express settings
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Disabling Powered by tag for security
app.disable("x-powered-by");

// http request logger, dev setting colorizes output logs
app.use(morgan("dev"));

// set Mongo Database
mongoDB.on("error", console.error.bind(console, "Connection ERROR: "));
mongoDB.once("open", () => {
  console.log("Mongo Atlas Database CONNECTED!");
});

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/images", require("./routes/images"));

// serve static assets for production
if (process.env.NODE_ENV === "production") {
  //set static folder. React creates a build folder for production
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () =>
  console.log(`Server started and listening on PORT: ${PORT} and IP: ${IP}`)
);
