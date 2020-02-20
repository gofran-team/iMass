const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");
const mongoose = require("mongoose");
const isTempleFavorite = require("../lib/isTempleFavorite");

// temple details
router.get("/:id", (req, res, next) => {
  Temple.findById(req.params.id)
    .then(async temple => {
      const reviews = await Review.find({ temple })
        .populate("user")
        .sort({ createdAt: -1 });
      const savedFavorite = isTempleFavorite(req.user, temple._id);
      const averageTempleRate = parseFloat(
        reviews.reduce((acc, review) => acc + review.rates.average, 0) /
          reviews.length
      ).toFixed(1);
      return res.render("temple", {
        temple,
        reviews,
        averageTempleRate,
        savedFavorite
      });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

// mark favorite temple
router.post("/:id/mark-favorite", isLoggedIn(), async (req, res, next) => {
  const templeObjectId = mongoose.Types.ObjectId(req.params.id);
  try {
    const user = await User.findById(req.user.id);
    if (isTempleFavorite(req.user, templeObjectId)) {
      user.favorites.splice(user.favorites.indexOf(templeObjectId), 1);
    } else {
      user.favorites.push(templeObjectId);
    }
    await user.save();
    res.json({ done: true });
  } catch (error) {
    console.log(error);
  }
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
