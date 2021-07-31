const express = require("express");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");

const Note = require("/models/Notes.");
const Task = require("/models/Tasks.");
const Link = require("/models/Links.");

const {ensureAuth, ensureGuest} = require("./middleware/auth");

require("./config/auth");

// Load Config
dotenv.config({path: "./.env"});

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
app.set("view engine", "ejs");

// middleware and static files
// app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));

// Body parser
app.use(express.urlencoded({extended: true}));

// Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.get("/", ensureGuest, (req, res) => {
  res.render("index", {
    title: "PlanDone - Student Productive Website",
    isAuth: req.isAuthenticated(),
    activePath: req.url,
  });
});

app.get("/plandone", ensureAuth, (req, res) => {
  res.render("index", {
    title: "PlanDone - Student Productive Website",
    firstName: req.user.firstName,
    displayName: req.user.displayName,
    picture: req.user.image,
    isAuth: req.isAuthenticated(),
    activePath: req.url,
  });
});

app.get("/notes", (req, res) => {
  Note.find()
    .then(data => {
      res.render("notes", {
        title: "Create Notes - PlanDone",
        firstName: req.isAuthenticated() ? req.user.firstName : "",
        displayName: req.isAuthenticated() ? req.user.displayName : "",
        picture: req.isAuthenticated() ? req.user.image : "",
        isAuth: req.isAuthenticated(),
        notes: req.isAuthenticated() ? data : "",
        activePath: req.url,
      });
    })
    .catch(err => {
      console.error(err);
    });
});

// app.get('/notes/:id', (req, res) => {
//   res.redirect('/notes');
// });

app.post("/notes", (req, res) => {
  const note = new Note(req.body);

  note
    .save()
    .then(() => {
      res.redirect("/notes");
    })
    .catch(err => console.error(err));
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then(() => {
      res.json({redirect: "/notes"});
      // res.redirect('/notes');
    })
    .catch(err => console.error(err));
});

app.get("/notes/edit/:id", (req, res) => {
  Note.findById(req.params.id).then(result => {
    res.render("edit-note", {
      note: result,
      title: "Edit note",
      firstName: req.isAuthenticated() ? req.user.firstName : "",
      displayName: req.isAuthenticated() ? req.user.displayName : "",
      picture: req.isAuthenticated() ? req.user.image : "",
      isAuth: req.isAuthenticated(),
      activePath: req.url,
    });
  });
});

app.put("/notes/edit/:id", ensureAuth, (req, res) => {
  Note.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true,
  }).then(() => res.redirect("/notes"));
});

app.get("/tasks", (req, res) => {
  Task.find()
    .then(data => {
      res.render("tasks", {
        title: "Create Tasks - PlanDone",
        firstName: req.isAuthenticated() ? req.user.firstName : "",
        displayName: req.isAuthenticated() ? req.user.displayName : "",
        picture: req.isAuthenticated() ? req.user.image : "",
        isAuth: req.isAuthenticated(),
        tasks: req.isAuthenticated() ? data : "",
        activePath: req.url,
      });
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.redirect("/tasks");
    })
    .catch(err => console.error(err));
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then(() => {
      res.json({redirect: "/tasks"});
      // res.redirect('/notes');
    })
    .catch(err => console.error(err));
});

app.get("/gpa-forecaster", (req, res) => {
  res.render("forecaster", {
    title: "CGPA Forecaster",
    firstName: req.isAuthenticated() ? req.user.firstName : "",
    displayName: req.isAuthenticated() ? req.user.displayName : "",
    picture: req.isAuthenticated() ? req.user.image : "",
    isAuth: req.isAuthenticated(),
    activePath: req.url,
  });
});

app.get("/links", (req, res) => {
  Link.find()
    .then(data => {
      res.render("link", {
        title: "Create Links - PlanDone",
        firstName: req.isAuthenticated() ? req.user.firstName : "",
        displayName: req.isAuthenticated() ? req.user.displayName : "",
        picture: req.isAuthenticated() ? req.user.image : "",
        isAuth: req.isAuthenticated(),
        links: req.isAuthenticated() ? data : "",
        activePath: req.url,
      });
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/links", (req, res) => {
  const link = new Link(req.body);

  link
    .save()
    .then(() => {
      res.redirect("/links");
    })
    .catch(err => console.error(err));
});

app.delete("/links/:id", (req, res) => {
  const id = req.params.id;

  Link.findByIdAndDelete(id)
    .then(() => {
      res.json({redirect: "/links"});
      // res.redirect('/notes');
    })
    .catch(err => console.error(err));
});

// Auth with Google
app.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));

// Google auth Callback
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/plandone",
    failureRedirect: "/",
  })
);

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

// 404 page
// app.use((req, res) => {});

app.listen(process.env.PORT);
