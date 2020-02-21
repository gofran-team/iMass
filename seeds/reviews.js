require("dotenv").config();
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");
const { loremIpsum } = require("lorem-ipsum");
const mongoose = require("mongoose");

const randomNum = n => Math.round(Math.random() * n);

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
          average: parseFloat(
            (
              randomRates.reduce((acc, cur) => acc + cur, 0) /
              randomRates.length
            ).toFixed(1)
          )
        },
        comment: lorem
      };

      try {
        await Review.create(review);
        console.log(`${temple.name} review added`);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(`${temples.length} reviews were created`);
  } catch (error) {
    console.log(error);
  } finally {
    await Review.find()
      .then(reviews => {
        reviews.forEach(review => {
          Temple.findByIdAndUpdate(review.temple, {
            $push: {
              reviews: review._id
            }
          }).then(() => {
            console.log("Temple succesfully updated");
          });
        });
      })
      .then(() => {
        // mongoose.disconnect()
      });
  }
};

writeReviews();
