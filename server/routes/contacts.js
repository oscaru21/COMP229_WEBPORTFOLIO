/**
 * File name: contacts.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-12
 */
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

//connect to our contact model
let Contact = require("../models/contact");

let contactController = require("../controllers/contacts");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}
/* GET Route for the Contact List page - READ Operation */
router.get("/", requireAuth, contactController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, contactController.addpage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, contactController.addprocesspage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, contactController.displayeditpage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, contactController.processingeditpage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, contactController.deletepage);

module.exports = router;
