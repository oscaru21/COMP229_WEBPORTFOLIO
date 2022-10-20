/**
 * File name: users.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-09-28
 */
var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')

let User = require('../models/user')

/* GET Users listing. */
router.get('/', function(req, res, next) {
   User.find((err, userList) => {
       if(err){
           console.error(err)
       }else{
           console.log(userList);
       }
   })
});

module.exports = router;
