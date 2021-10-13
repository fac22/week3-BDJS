// Import database reference
const db = require('./connection.js');

async function createUser(name, email, hash, drinkorder) {
    const INSERT_USER = `
    INSERT INTO users (name, email, hash, drinkorder) VALUES ($1, $2, $3, $4)
    RETURNING id, email, name
    `;
    const query = await db.query(INSERT_USER, [name, email, hash, drinkorder])
      return await query.rows[0].sid);
}

async function createSession(sid, json){
    const INSERT_SESSION = ` INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid`
    const query = await db.query(INSERT_SESSION, [sid, json]);
    return query.rows[0].sid 
}
// Export to auth.js (?and /routes)
module.exports = { createUser, createSession };
