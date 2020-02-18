
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");
const Temple = require("../models/temple");



router.get("/:id", (req, res, next) => {
    Temple.findById(req.params.id)
      .then(theTemple => {
        res.render("temple", { temples: theTemple });
      })
      .catch(error => {
        console.log(error);
        next();
      });
  });

  router.post("/", (req, res, next) => {
    let {search} = req.body
    Temple.find({name:{$regex: search, $options: 'i' }})
      .limit()
      .then(theTemple => {
        res.render("temple" , { temples: theTemple });
      })
      .catch(error => {
        console.log(error);
        next();
      });
  });
  
  // delete/modify this route because it doesn't already exist
  router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("passport/private");
  });

module.exports = router;
