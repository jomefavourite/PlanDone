const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');
const {ensureAuth, ensureGuest} = require('./middleware/auth');
require('./config/auth');

const Note = require('./models/Notes');

// Load Config
dotenv.config({path: './.env'});

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
  })
); // the secret should be in an environment variable

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

// Body parser
app.use(express.urlencoded({extended: true}));

// Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.get('/', ensureGuest, (req, res) => {
  res.render('index', {
    title: 'PlanDone - Student Productive Website',
    isAuth: req.isAuthenticated(),
  });
});

app.get('/plandone', ensureAuth, (req, res) => {
  res.render('index', {
    title: 'PlanDone - Student Productive Website',
    firstName: req.user.firstName,
    displayName: req.user.displayName,
    picture: req.user.image,
    isAuth: req.isAuthenticated(),
  });
});

app.get('/notes', (req, res) => {
  Note.find()
    .then(data => {
      res.render('notes', {
        title: 'Create Notes - PlanDone',
        firstName: req.isAuthenticated() ? req.user.firstName : '',
        displayName: req.isAuthenticated() ? req.user.displayName : '',
        picture: req.isAuthenticated() ? req.user.image : '',
        isAuth: req.isAuthenticated(),
        notes: req.isAuthenticated() ? data : '',
      });
    })
    .catch(err => {
      console.error(err);
    });
});

// app.get('/notes/:id', (req, res) => {
//   res.redirect('/notes');
// });

app.post('/notes', (req, res) => {
  const note = new Note(req.body);

  note
    .save()
    .then(() => {
      res.redirect('/notes');
    })
    .catch(err => console.error(err));
});

app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then(() => {
      res.json({redirect: '/notes'});
      // res.redirect('/notes');
    })
    .catch(err => console.error(err));
});

app.get('/notes/edit/:id', (req, res) => {
  Note.findById(req.params.id).then(result => {
    res.render('edit-note', {
      note: result,
      title: 'Edit note',
      firstName: req.isAuthenticated() ? req.user.firstName : '',
      displayName: req.isAuthenticated() ? req.user.displayName : '',
      picture: req.isAuthenticated() ? req.user.image : '',
      isAuth: req.isAuthenticated(),
    });
  });
});

app.put('/notes/edit/:id', (req, res) => {
  let note = Note.findById(req.params.id);

  note = Note.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true,
  }).then(() => res.redirect('/notes'));
});

app.get('/tasks', (req, res) => {
  res.render('tasks', {
    title: 'Create Tasks - PlanDone',
    firstName: req.isAuthenticated() ? req.user.firstName : '',
    displayName: req.isAuthenticated() ? req.user.displayName : '',
    picture: req.isAuthenticated() ? req.user.image : '',
    isAuth: req.isAuthenticated(),
  });
});

app.get('/gpa-forecaster', (req, res) => {
  res.render('forecaster', {
    title: 'CGPA Forecaster',
    firstName: req.isAuthenticated() ? req.user.firstName : '',
    displayName: req.isAuthenticated() ? req.user.displayName : '',
    picture: req.isAuthenticated() ? req.user.image : '',
    isAuth: req.isAuthenticated(),
  });
});

app.get('/links', (req, res) => {
  res.render('link', {
    title: 'Create Links - PlanDone',
    firstName: req.isAuthenticated() ? req.user.firstName : '',
    displayName: req.isAuthenticated() ? req.user.displayName : '',
    picture: req.isAuthenticated() ? req.user.image : '',
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
