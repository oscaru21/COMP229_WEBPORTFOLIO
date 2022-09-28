/**
 * File name: users.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-09-28
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
