const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model');

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

async function verifyUser(email, password) {
  const user = await model.getUser(email);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Password mismatch');
  } else {
    delete user.password;
    return user;
  }
}

async function saveUserSession(user) {
  const sid = await crypto.randomBytes(18).toString('base64');
  return await model.createSession(sid, { user });
}

async function createUser(name, email, password, drinkorder) {
  const hash = await bcrypt.hash(password, 10);
  return await model.createUser(name, email, hash, drinkorder);
}

module.exports = { createUser, saveUserSession, verifyUser, COOKIE_OPTIONS };
