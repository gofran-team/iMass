const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Temple = require("../models/temple")


router.get("/", (req, res, next) => {
  Temple.find().limit(5)
  .then(templeDB => {
    res.render('index', {temples: templeDB});
    console.log(templeDB.name)
  })
  .catch(error => {
    console.log(error)
    next()
  })
});


// delete/modify this route because it doesn't already exist
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private");
});

module.exports = router;
