const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    facebookId: String,
    facebookToken: String,
    image: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: "Temple" }]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
