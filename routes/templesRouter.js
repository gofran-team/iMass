const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");
const mongoose = require("mongoose");
const isTempleFavorite = require("../lib/isTempleFavorite");
const Utils = require("../lib/utils");
const distanceToSearch = 1;

// new review
router.post("/review", async (req, res, next) => {
  try {
    const { facilities = 0, cleanliness = 0, priest = 0 } = req.body;
    await Review.create({
      temple: mongoose.Types.ObjectId(req.body.temple),
      user: mongoose.Types.ObjectId(req.user.id),
      rates: {
        facilities,
        cleanliness,
        priest,
        average: Utils.calcAverage([facilities, cleanliness, priest])
      },
      comment: req.body.comment
    });
    return res.redirect(`/temple/${req.body.temple}`);
  } catch (error) {
    console.log(error);
  }
});

// temple search
router.get("/search", (req, res, next) => {
  let { search = "" } = req.query;
  Review.aggregate([
    {
      $group: {
        _id: "$temple",
        average: {
          $avg: "$rates.average"
        },
        reviews: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        average: -1
      }
    },
    {
      $project: {
        _id: 0,
        temple: "$_id",
        average: {
          $round: ["$average", 1]
        },
        reviews: 1
      }
    }
  ]).exec(function(err, reviews) {
    Temple.populate(
      reviews,
      {
        path: "temple"
      },
      function(error, temples) {
        temples = temples
          .map(t => ({
            id: t.temple._id,
            name: t.temple.name,
            image: t.temple.image,
            location: t.temple.location,
            average: t.average,
            reviews: t.reviews
          }))
          .filter(
            t => t.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );

        const templesN = temples.length;
        const found =
          templesN < 1
            ? "Ningún templo encontrado"
            : templesN > 1
            ? `${templesN} templos encontrados`
            : `${templesN} templo encontrado`;

        Utils.setDefaultImage(temples);
        if (temples.length === 1)
          return res.redirect(`/temple/${temples[0].id}`);
        else
          return res.render("search-temple", {
            temples,
            found,
            search
          });
      }
    );
  });
});

// search temples near me
router.get("/search/near", (req, res, next) => {
  const userLatitude = req.query.lat,
    userLongitude = req.query.lon;
  Review.aggregate([
    {
      $group: {
        _id: "$temple",
        average: {
          $avg: "$rates.average"
        },
        reviews: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        average: -1
      }
    },
    {
      $project: {
        _id: 0,
        temple: "$_id",
        average: {
          $round: ["$average", 1]
        },
        reviews: 1
      }
    }
  ]).exec(function(err, reviews) {
    Temple.populate(
      reviews,
      {
        path: "temple"
      },
      function(error, temples) {
        temples = temples
          .map(t => ({
            id: t.temple._id,
            name: t.temple.name,
            image: t.temple.image,
            location: t.temple.location,
            distance: Utils.distanceToTemple(
              userLatitude,
              userLongitude,
              t.temple.location.latitude,
              t.temple.location.longitude
            ),
            average: t.average,
            reviews: t.reviews
          }))
          .filter(t => t.distance <= distanceToSearch)
          .sort((a, b) => a.distance - b.distance);

        const templesN = temples.length;
        const found =
          templesN < 1
            ? "No hay ningún templo cerca"
            : templesN > 1
            ? `Tienes ${templesN} templos cerca`
            : `Tienes ${templesN} templo cerca`;

        Utils.setDefaultImage(temples);
        return res.render("search-temple", {
          temples,
          found
        });
      }
    );
  });
});

// API that serves the name of all the temples
router.post("/get-names", async (req, res, next) => {
  try {
    const temples = await Temple.aggregate([
      {
        $project: {
          _id: 0,
          name: 1
        }
      }
    ]);
    return res.json(temples);
  } catch (error) {
    console.log(error);
  }
});

// temple details
router.get("/:id", (req, res, next) => {
  Temple.findById(req.params.id)
    .then(async temple => {
      const reviews = await Review.find({
        temple
      })
        .populate("user")
        .sort({
          createdAt: -1
        });
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
    res.json({
      done: true
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
