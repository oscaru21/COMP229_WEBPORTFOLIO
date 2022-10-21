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