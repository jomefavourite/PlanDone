const express = require("express");
const Task = require("../models/tasks");

const router = express.Router();

router.get("/", (req, res) => {
  Task.find()
    .then((data) => {
      res.render("tasks", {
        title: "Create Tasks - PlanDone",
        firstName: req.isAuthenticated() ? req.user.firstName : "",
        displayName: req.isAuthenticated() ? req.user.displayName : "",
        picture: req.isAuthenticated() ? req.user.image : "",
        isAuth: req.isAuthenticated(),
        tasks: req.isAuthenticated() ? data : "",
        activePath: "/tasks",
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.redirect("/tasks");
    })
    .catch((err) => console.error(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/tasks" });
      // res.redirect('/notes');
    })
    .catch((err) => console.error(err));
});

module.exports = router;
