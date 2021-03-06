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
    req.flash("error", "Por favor, rellena todos los campos");
    return res.redirect("/auth/signup");
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
          req.flash("success", `Hola holita, ${newUser.username}`);
          return res.redirect("/");
        } else {
          req.flash("error", "No se ha podido acceder con el usuario creado");
          return res.redirect("/");
        }
      });
    } else if (strength(password) < 2) {
      req.flash(
        "error",
        "Esa contraseña es poco segura. ¡Esfuérzate un poco más!"
      );
      return res.redirect("/auth/signup");
    } else {
      req.flash("error", "Ese usuario ya existe. Prueba con otro.");
      return res.redirect("/auth/signup");
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
    successRedirect: "back",
    failureRedirect: "back",
    failureFlash: { message: "¡Ups! Algo falló al intentar iniciar la sesión" },
    successFlash: true,
    passReqToCallback: true
  })
);

// Facebook strategy
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "back",
    failureRedirect: "back",
    successFlash: true
  })
);

// Logout
router.get("/logout", isLoggedIn(), (req, res, text) => {
  req.logOut();
  const host = "http://" + req.headers.host;
  let origin = req.headers.referer.replace(host, "");
  return res.redirect(origin);
});

module.exports = router;
