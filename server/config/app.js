/**
 * File name: app.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-09-28
 */
//third party dependencies
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')

//modules for authentication
let session = require("express-session");
let passport = require("passport");
let flash = require("connect-flash");

let passportJWT = require("passport-jwt")
let JWTStrategy = passportJWT.Strategy
let ExtractJWT = passportJWT.ExtractJwt


//routes
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contacts');

//create express app instance
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//https force
app.use((req,res,next) => {
  if(process.env.NODE_ENV === 'production'){
    if(req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://' + req.headers.host + req.url);
    else
      return next;  
  }
  else
    return next();
})
//database setup
let DB = require('./db')
DB.Connect()

//setup express session
app.use(
  session({
    secret: "mysupersecret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1_800_000 } // 30 min
  })
);

//initialize flash
app.use(flash());

//intialize passport
app.use(passport.initialize());
app.use(passport.session());

//expose user data to templates
app.use(function(req, res, next) {
  console.log(req.user);
  if(req.user){
    res.locals.user = req.user
  }
  else{
    res.locals.user = {}
  }
  next();
});

//passport user configuration

//create usermodel instance
let userModel = require("../models/user");
let User = userModel.User;

//implement a user authenticaion Strategy
passport.use(User.createStrategy());

//serialize and deserialize user object info -encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.options.Secret;

let strategy = new JWTStrategy(jwtOptions, ((jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(null, false)
    })
}))

passport.use(strategy)

//create test User
//User.register({username:"admin", email:"admin@admin.com", displayName: "Oscar"}, 'admin')

//Router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
