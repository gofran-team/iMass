const mongoose = require("mongoose");
require("dotenv").config();
const { MongoError } = require("mongodb");

const dropIfExists = async Model => {
  try {
    await Model.collection.drop();
  } catch (e) {
    if (e instanceof MongoError) {
      console.log(
        `Cannot drop collection ${Model.collection.name}, because does not exist in DB`
      );
    } else {
      throw e;
    }
  }
};

const withDbConnection = async (fn, disconnectEnd = true) => {
  try {
    await mongoose.connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await fn();
  } catch (error) {
    console.log("ERROR");
    console.log(error);
  } finally {
    // Disconnect from database
    if (disconnectEnd) {
      await mongoose.disconnect();
    }
  }
};

module.exports = {
  withDbConnection,
  dropIfExists
};
