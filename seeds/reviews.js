require("dotenv").config();
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");
const { loremIpsum } = require("lorem-ipsum");
const mongoose = require("mongoose");
const Utils = require("../lib/utils");

const randomNum = n => Math.round(Math.random() * n);
let totalReviews = 0;

const writeReviews = async () => {
  await mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    let users = await User.find();
    let temples = await Temple.find();

    for (temple of temples) {
      const lorem = loremIpsum({
        count: 1,
        paragraphLowerBound: 3,
        paragraphUpperBound: 7,
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        units: "paragraph"
      });

      const randomRates = [randomNum(5), randomNum(5), randomNum(5)];

      let review = {
        user: users[randomNum(users.length - 1)].id,
        temple: temple.id,
        rates: {
          facilities: randomRates[0],
          cleanliness: randomRates[1],
          priest: randomRates[2],
          average: Utils.calcAverage(randomRates)
        },
        comment: lorem
      };

      if (Math.round(Math.random()) === 0) {
        try {
          await Review.create(review);
          console.log(`${temple.name} review added`);
          totalReviews++;
        } catch (error) {
          console.log(error);
        }
      }
    }
    console.log(`${totalReviews} reviews were created`);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

writeReviews();
