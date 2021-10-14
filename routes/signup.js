const auth = require("../auth.js");
const { buildPage } = require("../template.js");

function get(request, response) {
  //
  const title = `coffee-signup`;
  const content = /*html*/ `
  <h1>Create an account</h1>
  <form action="signup" method="POST">
    <label for="name">Name <span aria-hidden="true">*</span></label>
    <input type="text" id="name" name="name" required />
    <label for="coffeeWish">My Coffee Wish <span aria-hidden="true">*</span></label>
    <select name="coffeeWish" id="coffeeWish" required />
    <option value="Espresso">Espresso</option>
    <option value="Americano">Americano</option>
    <option value="Filter Coffee">Filter Coffee</option>
    <option value="Latte">Latte</option>
    <option value="Cappucino">Cappucino</option>
    <option value="Macchiato">Macchiato</option>
    <option value="Flat white">Flat white</option>
  </select>
    <label for="email">Email <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" required />
    <div id="emailError" class="error"></div>

    <label for="password">Password <span aria-hidden="true">*</span></label>
<<<<<<< HEAD
    <input type="password" id="password" name="password"  pattern=".*\d.*"  
    minlength="8" required />
=======
    <input type="password" id="password" name="password" minlength="8" required />
>>>>>>> b5cdcdf7d7430bddcea4acc8b309c36b93d284a2
    <p id="passwordError" class="error"></p>
    <button>Sign up</button>
    <script src="./index.js"></script>
    </form>
  `;
  response.send(buildPage(title, content));
}

function post(request, response) {
  const { email, coffeeWish, password, name } = request.body;
  auth
    .createUser(name, email, password, coffeeWish)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      response.send(`<h1>Couldn't sign up, sorry</h1>`);
    });
}

module.exports = { get, post };
