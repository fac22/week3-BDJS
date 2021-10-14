const db = require("./connection.js");

function createUser(name, email, hash, drinkorder) {
  const INSERT_USER = `
  INSERT INTO users (name, email, password, drinkorder) VALUES ($1, $2, $3, $4)
  RETURNING id, email, name
  `;
  return db
    .query(INSERT_USER, [name, email, hash, drinkorder])
    .then((result) => result.rows[0]);
}

// Got this from a workshop solution:
function getSession(sid) {
  const SELECT_SESSION = "SELECT data FROM sessions WHERE sid=$1";
  return db.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

function getUser(email) {
  const SELECT_USER = `
    SELECT id, email, password, name FROM users WHERE email=$1
  `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function showPosts() {
  const query = `SELECT name, drinkorder FROM users`;
  return db.query(query).then((result) => result.rows);
}

function createSession(sid, json) {
  const INSERT_SESSION = ` INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid`;
  return db
    .query(INSERT_SESSION, [sid, json])
    .then((response) => response.rows[0].sid);
}

function deleteSession(sid) {
  const DELETE_SESSION = "DELETE FROM sessions WHERE sid=$1";
  return db.query(DELETE_SESSION, [sid]);
}

module.exports = {
  createUser,
  getUser,
  getSession,
  createSession,
  deleteSession,
  showPosts,
};
