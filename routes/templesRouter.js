const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");

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

router.post("/", (req, res, next) => {
  let { search } = req.body;
  Temple.find({ name: { $regex: search, $options: "i" } })
    .limit()
    .then(theTemple => {
      res.render("search-temple", { temples: theTemple });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

module.exports = router;
