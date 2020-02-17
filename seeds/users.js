const { withDbConnection } = require("../lib/withDbConnection");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const users = ["Mateo"];

users.forEach(user => {
  try {
    withDbConnection(async () => {
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
    });
  } catch (error) {
    console.log(error);
  }
});
