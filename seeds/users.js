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
    name: "Willy",
    image:
      "https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2018/06/28/720066.jpg"
  },
  {
    name: "Jesús",
    image:
      "https://pbs.twimg.com/profile_images/3712063588/f9b74870167ffee90bbe229191d0b9f9.jpeg"
  },
  {
    name: "Moisés",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964876_249px.jpg"
  },
  {
    name: "Abraham",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964932_249px.jpg"
  },
  {
    name: "José",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964886_249px.jpg"
  },
  {
    name: "María",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964887_249px.jpg"
  },
  {
    name: "David",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964933_249px.jpg"
  },
  {
    name: "Noé",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964872_249px.jpg"
  },
  {
    name: "Job",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964883_249px.jpg"
  },
  {
    name: "Juan el Bautista",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964889_249px.jpg"
  },
  {
    name: "Sansón",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964950_249px.jpg"
  },
  {
    name: "Jacob",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964882_249px.jpg"
  },
  {
    name: "Josué",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964888_249px.jpg"
  },
  {
    name: "Ester",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964875_249px.jpg"
  },
  {
    name: "María Magdalena",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964873_249px.jpg"
  },
  {
    name: "Judas",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964874_249px.jpg"
  },
  {
    name: "Jeremías",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964884_249px.jpg"
  },
  {
    name: "Pedro",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964985_249px.jpg"
  },
  {
    name: "Matusalem",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964935_249px.jpg"
  },
  {
    name: "Salomón",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964986_249px.jpg"
  },
  {
    name: "Jonás",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964885_249px.jpg"
  },
  {
    name: "Nicodemo",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964983_249px.jpg"
  },
  {
    name: "Sara",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964951_249px.jpg"
  },
  {
    name: "Malaquías",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964981_249px.jpg"
  },
  {
    name: "Mateo",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964934_249px.jpg"
  },
  {
    name: "Lot",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964949_249px.jpg"
  },
  {
    name: "Herodes",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964870_249px.jpg"
  },
  {
    name: "Zacarías",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964976_249px.jpg"
  },
  {
    name: "Nabuconodosor",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964982_249px.jpg"
  },
  {
    name: "Poncio Pilato",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964984_249px.jpg"
  },
  {
    name: "Lázaro",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964936_249px.jpg"
  },
  {
    name: "Lucas",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964948_249px.jpg"
  },
  {
    name: "Satán",
    image:
      "https://st-listas.20minutos.es/images/2013-03/358120/3964980_249px.jpg"
  }
]);
