const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema(
  {
    name: String,
    locality: String,
    postalCode: String,
    streetAddress: String,
    latitude: Number,
    longitude: Number,
    description: String,
    image: String,
  },
  {
    timestamps: true
  }
);

const Temple = mongoose.model("Temple", templeSchema);
module.exports = Temple;
