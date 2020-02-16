const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: ObjectId,
    username: String,
    password: String,
    facebookId: String,
    facebookToken: String,
    image: String,
    favorites: Array,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
