const db = require('./connection.js');

async function createUser(name, email, hash, drinkorder) {
  const INSERT_USER = `
  INSERT INTO users (name, email, hash, drinkorder) VALUES ($1, $2, $3, $4)
  RETURNING id, email, name
  `;
  const query = await db.query(INSERT_USER, [name, email, hash, drinkorder]);
  return await query.rows[0].sid;
}

async function getUser(email) {
  const SELECT_USER = `
    SELECT id, email, password, name FROM users WHERE email=$1
  `;
  const user = await db.query(SELECT_USER, [email]);
  return user.rows[0];
}

async function getSession(sid) {
  const SELECT_SESSION = 'SELECT data FROM sessions WHERE sid=$1';
  const session = await db.query(SELECT_SESSION, [sid]);
  const singleResult = session.rows[0];
  return singleResult && singleResult.data;
}

async function createSession(sid, json) {
  const INSERT_SESSION = ` INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid`;
  const query = await db.query(INSERT_SESSION, [sid, json]);
  return query.rows[0].sid;
}

async function deleteSession(sid) {
  const DELETE_SESSION = 'DELETE FROM sessions WHERE sid=$1';
  return await db.query(DELETE_SESSION, [sid]);
}

module.exports = {
  createUser,
  getUser,
  getSession,
  createSession,
  deleteSession,
};
