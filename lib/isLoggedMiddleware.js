const isLoggedIn = (redirectRoute = "/") => (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    req.flash(
      "error",
      "No puedes entrar aquí. Tienes que iniciar sesión primero."
    );
    return res.redirect(redirectRoute);
  }
};

const isLoggedOut = (redirectRoute = "/") => (req, res, next) => {
  if (!req.user) {
    return next();
  } else {
    req.flash("error", "¡Ya has iniciado sesión!");
    return res.redirect(redirectRoute);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};
