require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUsers = async users => {
  for (user of users) {
    try {
      await mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const existUser = await User.findOne({ username: user });
      if (!existUser) {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync("awesomepassword", salt);
        const newUser = { username: user, password: hashPass };
        await User.create(newUser);
        console.log(`User ${user} created`);
      } else {
        console.log(`User ${user} already exists`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await mongoose.disconnect();
    }
  }
};

createUsers(["Mateo", "José", "Lucas", "Juan", "Pedro", "Jesús", "Judas"]);
