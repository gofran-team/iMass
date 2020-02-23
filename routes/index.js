const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Review = require("../models/review");
const Temple = require("../models/temple");

router.get("/", (req, res, next) => {
  Review.aggregate([
    {
      $group: {
        _id: "$temple",
        average: {
          $avg: "$rates.average"
        }
      }
    },
    {
      $sort: {
        average: -1
      }
    },
    {
      $limit: 4
    }
  ]).exec(function(err, bestReviews) {
    Temple.populate(bestReviews, { path: "_id" }, function(error, bestTemples) {
      return res.render("index", { bestTemples });
    });
  });
});

const passportRouter = require("./passportRouter");
router.use("/auth", passportRouter);
const templesRouter = require("./templesRouter");
router.use("/temple", templesRouter);

module.exports = router;
