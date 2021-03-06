const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      User.findOne({ username }, (err, user) => {
        if (err) return next(err);
        if (!user)
          return next(null, false, { message: "¡Ese usuario no existe!" });
        if (!bcrypt.compareSync(password, user.password))
          return next(null, false, {
            message: "¡La contraseña no es correcta!"
          });
        return next(null, user, { message: `Hola holita, ${username}` });
      });
    }
  )
);
