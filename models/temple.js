const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templeSchema = new Schema({

  reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
  name: String,
  address: {
    locality: String,
    postalCode: String,
    streetAddress: String
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  description: String,
  image: String
}, {
  timestamps: true
});

const Temple = mongoose.model("Temple", templeSchema);
module.exports = Temple;