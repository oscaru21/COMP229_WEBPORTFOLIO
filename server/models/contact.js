/**
 * File name: contact.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-12
 */
let mongoose = require('mongoose')

//create a contact model
let contactSchema = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: 'contacts'
})

module.exports = mongoose.model('Contact', contactSchema)