const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {title: 'PlanDone - Student Productive Website'});
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

// 404 page
// app.use((req, res) => {});

app.listen(3000);
