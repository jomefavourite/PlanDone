const express = require("express");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");
const noteRoutes = require("./routes/noteRoutes");
const taskRoutes = require("./routes/taskRoutes");
const linkRoutes = require("./routes/linkRoutes");

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

// Note Route
app.use("/notes", noteRoutes);

// Task Route
app.use("/tasks", taskRoutes);

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

// Link Route
app.use("/links", linkRoutes);

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
