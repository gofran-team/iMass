const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Review = require("../models/review");

router.get("/", (req, res, next) => {
  Review.find()
    .sort({ "rates.average": -1 })
    .populate("temple")
    .limit(4)
    .then(reviews => {
      res.render("index", { reviews });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

module.exports = router;
