//import test project data
let data = require('../../public/javascripts/data.js')
//import third party dependencies
let passport = require("passport");


// serve static pages
module.exports.displayHomepage = (req, res, next) => {
  res.render("index", {
    title: "Home",
  });
};

module.exports.displayaboutpage = (req, res, next) => {
  res.render("index", {
    title: "About",
  });
};

module.exports.displayprojectspage = (req, res, next) => {
  res.render("index", {
    title: "Projects",
    projects: data.projects,
  });
};

module.exports.displayservicespage = (req, res, next) => {
  res.render("index", {
    title: "Services",
  });
};

module.exports.displayContactpage = (req, res, next) => {
  res.render("index", {
    title: "Contact",
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    res.render("partials/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
    });
  } else {
    return res.redirect("/");
  }
};

//process /login POST requests
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }
      return res.redirect("/contacts");
    });
  })(req, res, next);
};

//process logout request
module.exports.performLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
