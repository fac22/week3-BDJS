'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const home = require('./routes/home.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');
const signup = require('./routes/signup.js');

const server = express();

server.use(express.urlencoded({ extended: false }));

// COOKIE_SECRET lives in .env to stop it ending up on GitHub
// it is used to sign cookies so we can trust them
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);

server.get('/sign-up', signup.get);
server.post('/sign-up', signup.post);

server.get('/log-in', login.get);
server.post('/log-in', login.post);

server.post('/log-out', logout.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
