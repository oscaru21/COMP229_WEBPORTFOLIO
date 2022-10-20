/**
 * File name: index.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-09-28
 */
let express = require('express');
let data = require('../../public/javascripts/data')
let router = express.Router();

let indexController = require('../controllers/index')

/* GET home page. */
router.get("/", indexController.displayHomepage);

/* GET home page. */
router.get("/home", indexController.displayHomepage);

/* GET About Us page. */
router.get("/about", indexController.displayaboutpage);

/* GET Products page. */
router.get("/projects", indexController.displayprojectspage);

/* GET Services page. */
router.get("/services", indexController.displayservicespage);

/* GET Contact Us page. */
router.get("/contact", indexController.displayContactpage);

/* GET Route for displaying the Login page */
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post("/login", indexController.processLoginPage);

/* GET to perform UserLogout */
router.get("/logout", indexController.performLogout);

module.exports = router;
