const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const Temple = require("../models/temple");
const Review = require("../models/review");
const mongoose = require("mongoose");
const isTempleFavorite = require("../lib/isTempleFavorite");
const Utils = require("../lib/utils");

router.get("/favorites", isLoggedIn(), (req, res, next) => {
  Review.aggregate([
    {
      $group: {
        _id: "$temple",
        average: {
          $avg: "$rates.average"
        },
        reviews: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        average: -1
      }
    },
    {
      $project: {
        _id: 0,
        temple: "$_id",
        average: {
          $trunc: ["$average", 1]
        },
        reviews: 1
      }
    }
  ]).exec(function(err, reviews) {
    Temple.populate(
      reviews,
      {
        path: "temple"
      },
      function(error, temples) {
        temples = temples
          .map(t => ({
            id: t.temple._id,
            name: t.temple.name,
            image: t.temple.image,
            location: t.temple.location,
            average: t.average,
            reviews: t.reviews
          }))
          .filter(t => req.user.favorites.includes(t.id));

        const templesN = temples.length;
        const found =
          templesN < 1
            ? "Aún no tienes ningún templo favorito"
            : templesN > 1
            ? `Mis ${templesN} templos favoritos`
            : `Mi templo favorito`;

        Utils.setDefaultImage(temples);
        if (temples.length === 1)
          return res.redirect(`/temple/${temples[0].id}`);
        else
          return res.render("search-temple", {
            temples,
            found
          });
      }
    );
  });
});

router.get("/", isLoggedIn(), (req, res, next) => {
  User.find()
    .then(userDB => {
      res.render("users", {
        users: userDB
      });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.post("/", isLoggedIn(), (req, res, next) => {
  const newUser = {
    title: req.body.name,
    password: req.body.password,
    image: req.body.image
  };

  User.create(newUser)
    .then(() => {
      res.render("users/new");
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

/*router.get("/new", isLoggedIn(), (req, res, next) => {
  res.render("users/new");
});
*/

router.get("/:id", isLoggedIn(), (req, res, next) => {
  User.findById(req.params.id)
    .then(theUser => {
      res.render("users/show", {
        users: theUser
      });
    })

    .catch(error => {
      console.log(error);
      next();
    });
});

router.post("/:id", isLoggedIn(), (req, res, next) => {
  User.updateOne(
    {
      _id: req.body.id
    },
    {
      username: req.body.username,
      // password: req.body.password,
      image: req.body.image
    }
  )
    .then(() => {
      res.redirect("/user");
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.post("/delete/:id", isLoggedIn(), (req, res, next) => {
  User.findByIdAndDelete(req.body.id)
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.get("/edit/:id", isLoggedIn(), (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.render("users/edit", user);
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

router.post("/edit/:id", isLoggedIn(), (req, res, next) => {
  User.findOne({
    _id: req.body.id
  })
    .then(user => {
      res.render("users/edit", user);
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

module.exports = router;
