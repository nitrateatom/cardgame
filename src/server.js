const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('../db/api');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connections = [];


// Register body parser middleware
app.use(session({secret: 'alkdfjalk', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set 'public' to be a static directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Connect to the database
require('../db/dbconnect');



app.get('/login', (req,res) => {
  if (!req.session.userId) {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  } else {
    res.redirect('/');
  }
});

app.get('/signup', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.users.checkUser(username, password)
  .then(users => {
    if (users) {
      req.session.userId = username;
      res.redirect('/');
      //path.join(__dirname, '..', 'public', 'app.html')
      // res.sendFile(path.join(__dirname, '..', 'public', 'app.html'), {headers:{'user': req.session.userId}});
    } else {
      res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    }
  });
  // if (db.users.checkUsers(username, password)) {
  //   console.log("log in");
  //   req.session.userId = username;
  //   res.sendFile(path.join(__dirname, '..', 'public', 'app.html'));
  // } else {
  //   console.log("wrong log in");
  //   res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  // }
});

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.users.addUser(username, password).then(() => {
    req.session.userId = username;
    res.sendFile(path.join(__dirname, '..', 'public', 'app.html'));
  });
});

app.get('/getUser', (req,res) => {
  if (!req.session.userId) {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  } else {
    res.sendFile(path.join(__dirname, '..', 'public', 'app.html'), {headers:{'user': req.session.userId}});
  }
});

app.get('/logout', (req, res) => {
  req.session.userId = null;
  //res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  res.redirect('/login');
});

app.use((req,res,next) => {
  if (!req.session.userId) {
    res.redirect('/login');
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

server.listen(3000, () => console.log('listening...'));


io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });
  socket.on('join room', room => {
    currRoom = room;
    socket.join(room, () => {
      // socket.on('send message', function(data) {
      //   console.log('server side messages: ', data);
      //   console.log('server side room: ', room);
      //   io.in(room).emit('send message', data);
      // });
      socket.on('send message', function(data) {
        console.log(socket.rooms);
        io.to(room).emit('send message', data);
      });
    });
    io.in(room).emit('new user', 'New user has joined: ' + room);
    io.in(room).clients((err, client) => {
      console.log(client);
    })
  })
  // socket.on('send message', function(data) {
    // console.log('server side messages: ', data);
    // console.log('server side room:', currRoom);
    // console.log(typeof currRoom);
    // io.to(currRoom).emit('send message', data);
    // io.in(currRoom).clients((err, client) => {
    //   console.log(client);
    // })
  // });
});
