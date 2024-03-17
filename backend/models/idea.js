const mongoose = require("mongoose");

const actSchema = new mongoose.Schema(
  {
    Title:String,
    Date:Date,
    Statuscr:String,
    // detail: String,
  },
//   { timestamps: true }
);

const act = mongoose.model("activity", actSchema);

module.exports = act;
