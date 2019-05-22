//Variables to require the necessary dependencies
const express = require('express');
const app = express();
//Connect to JSON
const data = require('./data.json');
//Grab project info
const projects = data.projects;

//Define settings in Express, pug tells Express which template engine to use
app.set('view engine', 'pug');

//Serve the static files located in the public folder
app.use('/static', express.static('public'));

//Render the "Home" page with the locals set to data.projects
app.get('/', (req, res) => {
    //Sends string to client
    res.render('index', { projects });
});

//Render the "About" page
app.get('/about', (req, res) => {
    //Sends string to client
    res.render('about');
});

//Render Pug project template
app.get('/projects/:id', (req, res) => {
  const {id} = req.params;
  const project = projects[id];
  //If a character/string or a number larger than the amount of projects is entered
  if (isNaN(id) || id > projects.length) {
    //Then redirect to main page
    return res.redirect('/');
  }
  //Otherwise show the selected project
  res.render('project', { project });
});



//Error handler for non-existant route
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
  console.log('Page cannot be found.');
});

//Error handling middleware
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  //Render template back to client
  res.render('error');
});


//Start the server
app.listen(3000, () => {
  console.log('The server is running on localhost:3000.');
});
