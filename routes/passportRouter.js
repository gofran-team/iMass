const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const strength = require('strength');
const {hashPassword,checkHashed} = require("../lib/hash");



router.get("/signup", isLoggedOut(), (req, res) => {
  res.render("passport/signup", {
    user: req.user
  });
});
// Sign up
router.post('/signup', isLoggedOut(), async (req, res, next) => {
  const {
    username,
    password
  } = req.body;
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
        return res.redirect('/login');
      } else if (strength(password) < 2) {
        req.flash("error", "Create a password with mixed case, special character and number (minimun 8 characters and no repeated letters)");
        return res.redirect('/signup');
      } else {
        req.flash("error", "The user or password already exists");
        return res.redirect('/signup')
      }
    } catch (e) {
      next(e);
    }
});


/*

router.post("/signup", isLoggedOut(), async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash("error", "Please, fill all the fields");
    return res.redirect("/signup");
  }

  try {
    const existUser = await User.findOne({ username });
    if (!existUser) {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      await User.create({ username, password: hashPass });
      req.flash("success", "User created");
      return res.redirect("/");
    } else {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }
  } catch (e) {
    next(e);
  }
});
*/

// Login
router.get("/login", isLoggedOut(), (req, res, next) => {
  return res.render("passport/login");
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
