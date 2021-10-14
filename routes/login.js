// Imports
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const title = `coffee-login`;
  const content = `
    <h2>Nice to have you back!</h2>
    <form action="login" class="flex flex-column" method="POST">
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
    // match passwords
    .verifyUser(email, password)
    // make new session with session id
    .then(auth.saveUserSession)
    // make a cookie
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      response.send(buildPage(`Error`, `<h2>User not found</h2>`));
    });
  // console.log('Logging in...');
  // response.redirect('/');
}

// Exports
module.exports = { get, post };
