require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/user");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"]
    },
    async function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        existingUser.username = profile.displayName;
        existingUser.image = profile.photos[0].value;
        existingUser.facebookToken = accessToken;
        await existingUser.save();
        return cb(null, existingUser);
      } else {
        const newUser = await User.create({
          username: profile.displayName,
          image: profile.photos[0].value,
          facebookId: profile.id,
          facebookToken: accessToken
        });
        return cb(null, newUser);
      }
    }
  )
);