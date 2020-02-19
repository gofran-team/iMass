const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const strength = require("strength");
const { hashPassword, checkHashed } = require("../lib/hash");
const axios = require("axios");

// Sign up
router.get("/signup", isLoggedOut(), (req, res) => {
  res.render("passport/signup", {
    user: req.user
  });
});

router.post("/signup", isLoggedOut(), async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash("error", "Please, fill all the fields");
    return res.redirect("/signup");
  }
  try {
    const existingUser = await User.findOne({
      username
    });
    if (!existingUser && strength(password) >= 2) {
      const newUser = await User.create({
        username,
        password: hashPassword(password)
      });

      // login with the user created
      req.login(newUser, function(err) {
        if (!err) {
          return res.redirect("/");
        } else {
          req.flash("error", "No se ha podido acceder con el usuario creado");
          return res.redirect("/");
        }
      });
    } else if (strength(password) < 2) {
      req.flash(
        "error",
        "Create a password with mixed case, special character and number (minimum 8 characters and no repeated letters)"
      );
      return res.redirect("/signup");
    } else {
      req.flash("error", "The user or password already exists");
      return res.redirect("/signup");
    }
  } catch (e) {
    next(e);
  }
});

// Local strategy
router.post(
  "/login",
  isLoggedOut(),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
    successFlash: "Welcome",
    passReqToCallback: true
  })
);

// Facebook strategy
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successFlash: "Welcome"
  }),
  function(req, res) {
    res.redirect("/");
  }
);

// Logout
router.get("/logout", isLoggedIn(), (req, res, text) => {
  req.logOut();
  return res.redirect("/");
});

module.exports = router;
