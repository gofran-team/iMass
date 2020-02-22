const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Review = require("../models/review");
const Temple = require("../models/temple");

router.get("/", (req, res, next) => {
  Review.find()
    .populate("temple")
    .sort({ "rates.average": -1 })
    .limit(4)
    .then(reviews => {
      res.render("index", { reviews });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

const passportRouter = require("./passportRouter");
router.use("/auth", passportRouter);
const templesRouter = require("./templesRouter");
router.use("/temple", templesRouter);

module.exports = router;
