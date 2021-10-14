const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model');

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'lax',
  signed: true,
};

// async function verifyUser(email, password) {
//   const user = await model.getUser(email);
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     throw new Error('Password mismatch');
//   } else {
//     delete user.password;
//     return user;
//   }
// }

function verifyUser(email, password) {
  return model.getUser(email).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("password doesn't match!");
      } else {
        delete user.password;
        return user;
      }
    });
  });
}

// async function saveUserSession(user) {
//   const sid = await crypto.randomBytes(18).toString('base64');
//   return await model.createSession(sid, { user });
// }

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, { user });
}
// async function createUser(name, email, password, drinkorder) {
//   const hash = await bcrypt.hash(password, 10);
//   return await model.createUser(name, email, hash, drinkorder);
// }

function createUser(name, email, password, drinkorder) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(name, email, hash, drinkorder));
}

module.exports = { createUser, saveUserSession, verifyUser, COOKIE_OPTIONS };
