const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  //
  const title = `coffee-signup`;
  const content = `
  <h1>Create an account</h1>
  <form action="signup" method="POST">
    <label for="name">Name</label>
    <input type="text" id="name" name="name">
    <label for="email">Email</label>
    <input type="email" id="email" name="email">
    <label for="password">Password</label>
    <input type="password" id="password" name="password">
    <button>Sign up</button>
  </form>
  `;
  response.send(buildPage(title, content));
}

function post(request, response) {
  const { email, password, name } = request.body;
  auth
    .createUser(email, password, name)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      response.send(`<h1>Couldn't sign up, sorry</h1>`);
    });
}

module.exports = { get, post };
