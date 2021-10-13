// Imports
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const title = `coffee-login`;
  const content = `
    <h1>Log in</h1>
    <form action="login" method="POST">
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
  const { email, password } = request.body;
  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      response.send(`<h1>User not found</h1>`);
    });
  // console.log('Logging in...');
  // response.redirect('/');
}

// Exports
module.exports = { get, post };
