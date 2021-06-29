const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');
const {ensureAuth, ensureGuest} = require('./middleware/auth');
require('./config/auth');

// Load Config
dotenv.config({path: './config/.env'});

connectDB();

const app = express();

// Session remembers the signed in user
// Session middleware
// --------------------------------------------------
// MongoStore prevents you from being kicked out
// from being logged in, when ever the code is changed
// and refreshed on the browser and then save to the DB
app.use(
  session({
    secret: 'cats',
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
  })
); // the secret should be in an environment variable

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));

app.get('/', ensureGuest, (req, res) => {
  res.render('index', {
    title: 'PlanDone - Student Productive Website',
    isAuth: req.isAuthenticated(),
  });
});

app.get('/plandone', ensureAuth, (req, res) => {
  console.log('name', req.user.firstName);
  res.render('index', {
    title: 'PlanDone - Student Productive Website',
    firstName: req.user.firstName,
    displayName: req.user.displayName,
    picture: req.user.image,
    isAuth: req.isAuthenticated(),
  });
});

app.get('/notes', (req, res) => {
  res.render('notes', {
    title: 'Create Notes - PlanDone',
    firstName: req.isAuthenticated() ? req.user.firstName : '',
    isAuth: req.isAuthenticated(),
  });
});

app.get('/tasks', (req, res) => {
  res.render('tasks', {
    title: 'Create Tasks - PlanDone',
    isAuth: req.isAuthenticated(),
  });
});

app.get('/gpa-forecaster', (req, res) => {
  res.render('forecaster', {
    title: 'CGPA Forecaster',
    isAuth: req.isAuthenticated(),
  });
});

app.get('/links', (req, res) => {
  res.render('link', {
    title: 'Create Links - PlanDone',
    isAuth: req.isAuthenticated(),
  });
});

// Auth with Google
app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

// Google auth Callback
app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/plandone',
    failureRedirect: '/',
  })
);

app.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
});

// 404 page
// app.use((req, res) => {});

app.listen(process.env.PORT);
