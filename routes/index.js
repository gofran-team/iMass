const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Review = require("../models/review");
const Temple = require("../models/temple");
const Utils = require("../lib/utils");

router.get("/", (req, res, next) => {
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
      $limit: 6
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
  ]).exec(function(err, bestReviews) {
    Temple.populate(
      bestReviews,
      {
        path: "temple"
      },
      function(error, bestTemples) {
        const temples = bestTemples.map(t => ({
          id: t.temple._id,
          name: t.temple.name,
          image: t.temple.image,
          location: t.temple.location,
          average: t.average,
          reviews: t.reviews
        }));
        Utils.setDefaultImage(temples);
        return res.render("index", {
          temples,
          menuHome: true
        });
      }
    );
  });
});

const passportRouter = require("./passportRouter");
router.use("/auth", passportRouter);
const templesRouter = require("./templesRouter");
router.use("/temple", templesRouter);
const apigoogleRouter = require("./apigoogleRouter");
router.use("/api", apigoogleRouter);
const userRouter = require("./userRouter");
router.use("/user", userRouter);

module.exports = router;
