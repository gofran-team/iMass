const { withDbConnection } = require("../lib/withDbConnection");
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");
const { loremIpsum } = require("lorem-ipsum");

const writeReview = async () => {
  let users, temples;

  await withDbConnection(async () => (users = await User.find()));
  await withDbConnection(async () => (temples = await Temple.find()));

  temples.forEach(async temple => {
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
        average:
          randomRates.reduce((acc, cur) => acc + cur, 0) / randomRates.length
      },
      comment: lorem
    };

    await withDbConnection(async () => Review.create(review));
    console.log("All reviews were created");
  });
};

writeReview();

const randomNum = n => Math.round(Math.random() * n);
