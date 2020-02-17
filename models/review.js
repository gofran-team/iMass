const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    temple: { type: Schema.Types.ObjectId, ref: "Temple" },
    rate: {
      facilities: Number,
      cleanliness: Number,
      priest: Number,
      average: Number
    },
    comment: String
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
