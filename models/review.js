const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const strength = require('strength');


const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    temple: { type: Schema.Types.ObjectId, ref: "Temple" },
    rates: {
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

//User.find().populate("username") antes de llamarlo hay que configurarlo en la colección como en las líneas 6 y 7. Llamando a user con populate te devuelve lo que le hayas indicado 

