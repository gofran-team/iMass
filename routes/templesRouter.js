const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");

// temple details
router.get("/:id", (req, res, next) => {
  Temple.findById(req.params.id)
    .then(async temple => {
      const reviews = await Review.find({ temple }).populate("user");
      return res.render("temple", { temple, reviews });

    })
    .catch(error => {
      console.log(error);
      next();
    });
});

// temple search
router.post("/search", (req, res, next) => {
  let { search } = req.body;
  Temple.find({ name: { $regex: search, $options: "i" } })
  .populate("reviews")
    .then(temples => {
      res.render("search-temple", { temples });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.get("/", (req, res, next) => {
  Review.find().populate("temple")
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

router.get("/search", (req, res, next) => {
  Temple.find().then(temples => res.render("search-temple", { temples }));
});

module.exports = router;
