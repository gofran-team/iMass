const mongoose = require("mongoose");
const User = mongoose.model("User");
const Temple = mongoose.model("Temple");

const reviewSchema = new mongoose.Schema(
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
