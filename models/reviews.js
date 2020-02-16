const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    userId: ObjectId,
    templeId: ObjectId,
    rate: [Number],
    facilities: Integer,
    cleanliness: Integer,
    priest: Integer,
    comment: String,
    date: Date,
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
