const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    name: String,
    locality: String,
    postalCode: String,
    streetAddress: String,
    latitude: Integer,
    longitude: Integer,
    description: String,
    image: String,
  },
  {
    timestamps: true
  }
);

const Temple = mongoose.model("Temple", templeSchema);
module.exports = Temple;
