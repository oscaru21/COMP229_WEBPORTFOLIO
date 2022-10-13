/**
 * File name: contacts.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-12
 */
 let express = require('express');
 let router = express.Router();
 let mongoose = require('mongoose')

 let Contact = require('../models/contact.js')
 
 /* GET contacts listing. */
 router.get('/', function(req, res, next) {
    Contact.find((err, contactList) => {
        if(err){
            console.error(err)
        }else{
            console.log(contactList);
        }
    })
 });
 
 module.exports = router;
 