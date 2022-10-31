/**
 * File name: contacts.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-18
 */
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let jwt = require('jsonwebtoken')

//create reference to the model (dbschema )
let Contact = require("../models/contact");

module.exports.displayContactList = (req, res, next) => {
  Contact.find({}, null, {sort: {name: 1}}, (err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("contacts/contacts", {
        title: "List",
        contactList: contactList,
      });
    }
  });
};

module.exports.displayUpdatepage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Contact.findById(id, (err, contactToUpdate) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("contacts/contacts", {
        title: "Update",
        contact: contactToUpdate,
      });
    }
  });
};

module.exports.processingUpdatepage = (req, res, next) => {
  let id = req.params.id; 

  let updateContact = Contact({
    _id: id,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });

  Contact.updateOne({ _id: id }, updateContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contacts");
    }
  });
};

module.exports.delete = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contacts");
    }
  });
};
