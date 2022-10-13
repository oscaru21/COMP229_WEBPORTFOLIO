let mongoose = require('mongoose')

//create a user model
let userModel = mongoose.Schema({
    username: String,
    password: String,
    email: String
},
{
    collection: 'users'
})

module.exports = mongoose.model('User', userModel)