const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
require('./config/auth');

// Load Config
dotenv.config({path: './config/config.env'});

// Check if logined in
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();

// Session remembers the signed in user
app.use(session({secret: 'cats'})); // the secret should be in an environment variable
app.use(passport.initialize());
app.use(passport.session());

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'PlanDone - Student Productive Website',
    path: req.route.path,
  });
});

app.get('/plandone', isLoggedIn, (req, res) => {
  res.render('index', {
    title: 'PlanDone - Student Productive Website',
    firstName: req.user.given_name,
    displayName: req.user.displayName,
    picture: req.user.picture,
    path: req.route.path,
  });
});

app.get('/notes', (req, res) => {
  res.render('notes', {title: 'Create Notes - PlanDone'});
});

app.get('/tasks', (req, res) => {
  res.render('tasks', {title: 'Create Tasks - PlanDone'});
});

app.get('/gpa-forecaster', (req, res) => {
  res.render('forecaster', {title: 'CGPA Forecaster'});
});

app.get('/links', (req, res) => {
  res.render('link', {title: 'Create Links - PlanDone'});
});

app.get(
  '/auth/google',
  passport.authenticate('google', {scope: ['email', 'profile']})
);

app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/plandone',
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) => {
  res.send('something went wrong');
});

app.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
});

// 404 page
// app.use((req, res) => {});

app.listen(3000);
