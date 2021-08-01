const express = require("express");
const Link = require("../models/links");

const router = express.Router();

router.post("/", (req, res) => {
  const link = new Link(req.body);

  link
    .save()
    .then(() => {
      res.redirect("/links");
    })
    .catch(err => console.error(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Link.findByIdAndDelete(id)
    .then(() => {
      res.json({redirect: "/links"});
      // res.redirect('/notes');
    })
    .catch(err => console.error(err));
});

router.get("/", (req, res) => {
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

module.exports = router;
