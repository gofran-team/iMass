const { withDbConnection } = require("../lib/withDbConnection");
const Temple = require("../models/temple");
const axios = require("axios");

const getImages = async () => {
  let temples;

  // get all the temples from the data base
  try {
    temples = await Temple.find({ image: { $exists: false } });
  } catch (error) {
    console.log(error);
  }

  // get image from the Google API and save it in the temple document
  temples.forEach(async (temple, index, array) => {
    try {
      const response = await axios({
        url: "https://www.googleapis.com/customsearch/v1",
        params: {
          key: process.env.GOOGLE_KEY,
          cx: process.env.GOOGLE_CX,
          q: temple.name,
          searchType: "image",
          fileType: "jpg",
          imgSize: "large",
          alt: "json"
        }
      });
      temple.image = response.data.items[0].link;
      await withDbConnection(async () => await temple.save());
      console.log(
        `${temple.name} image added (${index + 1} of ${array.length})`
      );
    } catch (error) {
      console.log(
        error.response.status,
        error.response.statusText,
        `(${index + 1} of ${array.length})`
      );
    }
  });
};

withDbConnection(async () => await getImages());
