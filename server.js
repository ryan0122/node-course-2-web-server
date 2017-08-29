const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res, next) =>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;

  fs.appendFileSync('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server file');
    }
  });

  console.log(log);
  next();
});

//app.use((req,res, next) =>{
//  res.render('maintenance.hbs', {
//    pageTitle: 'Maintenance Page',
//    message: 'We are working on this.'
//  });
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'This site the shit, not for shitting.'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    content: 'Here are my projects'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Cant even the request right now'
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});