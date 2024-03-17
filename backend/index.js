const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const port = 3031;
const config = require("./config");

const actRouter = require("./routes/ideas");
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbUrl = config.dbUrl;

(async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
    app.use("/ideas", actRouter);
    app.listen(port, function () {
      console.log("Running on " + port);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

module.exports = app;
