/**
 * File name: db.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-20
 */
let mongoose = require('mongoose');

options =
{
    //"URI": "mongodb://localhost/portfolio"
    "URI": "mongodb+srv://newuser:NYArAf04sj2zrz4E@cluster0.4p4vbae.mongodb.net/portfolio?retryWrites=true&w=majority"
}

module.exports.Connect = () => {
    mongoose.connect(options.URI)

    let mongoDB = mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'Connection error: '));
    mongoDB.once('open', ()=>{
    console.log('Connected to database...');
    })
}