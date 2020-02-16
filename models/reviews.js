const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    templeId: [ { type : Schema.Types.ObjectId, ref: 'Temple' } ],
    rate: [Number],
    facilities: Number,
    cleanliness: Number,
    priest: Number,
    comment: String,
    date: Date,
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
