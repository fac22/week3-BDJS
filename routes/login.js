// Imports
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const title = `coffe-login`;
  const content = `
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Log in</button>
    </form>
  `;
  response.send(buildPage(title, content));
}

function post(request, response) {
  //
}

// Exports
module.exports = { get, post };
