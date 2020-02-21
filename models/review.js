const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    temple: { type: Schema.Types.ObjectId, ref: "Temple" },
    rates: {
      facilities: { type: Number, default: 0 },
      cleanliness: { type: Number, default: 0 },
      priest: { type: Number, default: 0 },
      average: { type: Number, default: 0 }
    },
    comment: String
  },
  {
    timestamps: true
  }
);

reviewSchema.virtual("date").get(function() {
  const date = new Date(this.createdAt);
  return date.toUTCString().replace(" GMT", "");
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
