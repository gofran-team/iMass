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
      reviews.forEach(review => {
        const date = new Date(review.user.createdAt);
        review.date = date.toUTCString();
      });
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
    .then(temples => {
      res.render("search-temple", { temples });
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
