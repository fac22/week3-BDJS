'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const home = require('./routes/home.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');
const signup = require('./routes/signup.js');
const edit = require('./routes/edituser.js');
const remove = require('./routes/deletecoffee.js');

const server = express();

server.use(express.urlencoded({ extended: false }));

server.use(express.static('./public'));

// COOKIE_SECRET lives in .env to stop it ending up on GitHub
// it is used to sign cookies so we can trust them
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);

server.get('/signup', signup.get);
server.post('/signup', signup.post);

server.get('/login', login.get);
server.post('/login', login.post);

server.get('/edituser', edit.get);
server.post('/edituser', edit.post);

server.post('/logout', logout.post);
server.post('/deletecoffee', remove.post);

server.post('/goback', home.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// Do we want this to handle all errors?
// process.on("unhandledRejection", (error) => {
//   console.error(error);
//   process.exit(1);
// });
