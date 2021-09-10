const express = require("express");
const Note = require("../models/notes");

const router = express.Router();

router.get("/", (req, res) => {
  Note.find()
    .then((data) => {
      res.render("notes", {
        title: "Create Notes - PlanDone",
        firstName: req.isAuthenticated() ? req.user.firstName : "",
        displayName: req.isAuthenticated() ? req.user.displayName : "",
        picture: req.isAuthenticated() ? req.user.image : "",
        isAuth: req.isAuthenticated(),
        notes: req.isAuthenticated() ? data : "",
        activePath: req.url,
      });
      console.log(req, "req");
    })
    .catch((err) => {
      console.error(err);
    });
});

// router.get('/notes/:id', (req, res) => {
//   res.redirect('/notes');
// });

router.post("/", (req, res) => {
  const note = new Note(req.body);

  note
    .save()
    .then(() => {
      res.redirect("/notes");
    })
    .catch((err) => console.error(err));
});

router.get("/edit/:id", (req, res) => {
  Note.findById(req.params.id).then((result) => {
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

router.put("/edit/:id", (req, res) => {
  Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).then(() => res.redirect("/notes"));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/notes" });
      // res.redirect('/notes');
    })
    .catch((err) => console.error(err));
});

module.exports = router;
