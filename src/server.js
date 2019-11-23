const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('../db/api');

const app = express();

// Register body parser middleware
app.use(session({secret: 'alkdfjalk', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set 'public' to be a static directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Connect to the database
require('../db/dbconnect');

app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/signup', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.users.findAll({
    where: {
      username: username, 
      password: password,
    }})
  .then(users => {
    console.log(users);
    req.session.userId = username;
    res.sendFile(path.join(__dirname, '..', 'public', 'app.html'));
  });
});

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.users.addUser(username, password).then(() => {
    req.session.userId = username;
    res.sendFile(path.join(__dirname, '..', 'public', 'app.html'));
  });
});

app.get('/logout', (req, res) => {
  console.log("hi");
  req.session.userId = null;
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.use((req,res,next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    next()
  }
})


// Load the api router onto app
app.use('/api', require('./server/routes/apirouter'));


// Any non-api routes should be sent the html file as a response
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'app.html'));
});

app.listen(3000, () => console.log('listening...'));
