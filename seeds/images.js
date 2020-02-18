require("dotenv").config();
const Temple = require("../models/temple");
const axios = require("axios");
const mongoose = require("mongoose");

const getImages = async () => {
  await mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // get all the temples from the data base
  const temples = await Temple.find({ image: { $exists: false } });

  // get image from the Google API and save it in the temple document
  let templeCount = 0;
  for (temple of temples) {
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
      await temple.save();
      console.log(
        `${temple.name} image added (${++templeCount} of ${temples.length})`
      );
    } catch (error) {
      console.log(
        error.response.status,
        error.response.statusText,
        `${temple.name} (${++templeCount} of ${temples.length})`
      );
    } finally {
      await mongoose.disconnect();
    }
  }
};

getImages();
