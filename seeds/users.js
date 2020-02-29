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
      const existUser = await User.findOne({ username: user.name });
      if (!existUser) {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync("qwerty1234", salt);
        const newUser = {
          username: user.name,
          password: hashPass,
          image: user.image
        };
        await User.create(newUser);
        console.log(`User ${user.name} created`);
      } else {
        console.log(`User ${user.name} already exists`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await mongoose.disconnect();
    }
  }
};

createUsers([
  {
    name: "Brian",
    image: "https://www.chortle.co.uk/images/photos/small/life_of_brian_5.jpg"
  },
  {
    name: "Judith",
    image:
      "https://alchetron.com/cdn/sue-jones-davies-b570656d-0c67-42c8-94bb-72b31054c80-resize-750.jpeg"
  },
  {
    name: "Mandy",
    image:
      "https://i.dailymail.co.uk/i/pix/2011/04/11/article-0-05A916F40000044D-488_468x286.jpg"
  },
  {
    name: "Willy Toledo",
    image:
      "https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2018/06/28/720066.jpg"
  },
  {
    name: "Timothy Lovejoy",
    image:
      "https://pbs.twimg.com/profile_images/1004659596/reverend_lovejoy_400x400.jpg"
  },
  {
    name: "Rita Maestre",
    image:
      "https://m.eldiario.es/sociedad/Rita-Maestre-portavoz-Ayuntamiento-Madrid_EDIIMA20160212_0613_4.jpg"
  }
]);
