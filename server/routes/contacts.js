/**
 * File name: contacts.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-12
 */
let express = require("express");
let router = express.Router();
let jwt = require('jsonwebtoken')

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

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, contactController.displayUpdatepage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, contactController.processingUpdatepage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, contactController.delete);

module.exports = router;
