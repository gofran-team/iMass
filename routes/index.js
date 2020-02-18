const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Temple = require("../models/temple");
const Review = require("../models/review");


router.get("/", (req, res, next) => {
  Temple.find()
    .limit(4)
    .then(templeDB => {
      res.render("index", { temples: templeDB });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.post("/", (req, res, next) => {
  let {search} = req.body
  console.log(search)
  Temple.find({name:{$regex: search, $options: 'i' }})
    .limit()
    .then(templeDB => {
      res.render("temple" , { temples: templeDB });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

module.exports = router;
