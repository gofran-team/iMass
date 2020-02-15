const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

router.get("/", (req, res, next) => {
  res.render("index");
});

// delete/modify this route because it doesn't already exist
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private");
});

module.exports = router;
