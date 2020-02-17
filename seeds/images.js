const { withDbConnection } = require("../lib/withDbConnection");
const Temple = require("../models/temple");
const axios = require("axios");

const getImages = async () => {
  let temples;

  // get all the temples from the data base
  try {
    await withDbConnection(async () => {
      temples = await Temple.find().limit(1);
    });
  } catch (error) {
    console.log(error);
  }

  // get image from the Google API and save it in the temple document
  temples.forEach(async (temple, index, array) => {
    try {
      const response = await axios({
        url: "https://www.googleapis.com/customsearch/v1",
        params: {
          key: "AIzaSyBOBeP8nxkoGElwOGbvTBYvmJVrZkfTPok",
          cx: "016807599423372473728:fckpvg5ppnl",
          q: temple.name,
          searchType: "image",
          fileType: "jpg",
          imgSize: "large",
          alt: "json"
        }
      });
      temple.image = response.data.items[0].link;
      temple.save();
    } catch (error) {
      console.log(error);
    }
    console.log(`${temple.name} image added (${index + 1} of ${array.length})`);
  });

  //
  // try {
  //   await withDbConnection(async () => {
  //     await dropIfExists(Temple);
  //     await Temple.create(temples);
  //   });
  //   console.log(`Temples created`);
  // } catch (error) {
  //   console.log(error);
  // }
};

getImages();
