const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  //
  const title = `coffee-signup`;
  const content = /*html*/ `
  <h2>Create an account</h2>
  <div>
  <form action="signup" class="flex flex-column" method="POST">
  <div class="flex">
    <label for="name" class="flex-row__one">Name <span aria-hidden="true">*</span></label>
    <input type="text" id="name" name="name" required />
    </div>
    <div class="flex">
    <label for="coffeeWish" class="flex-row__one">My Coffee Wish <span aria-hidden="true">*</span></label>
    <select name="coffeeWish" id="coffeeWish" class="flex-row__two" required />
    <option value="Espresso">Espresso</option>
    <option value="Americano">Americano</option>
    <option value="Filter Coffee">Filter Coffee</option>
    <option value="Latte">Latte</option>
    <option value="Cappucino">Cappucino</option>
    <option value="Macchiato">Macchiato</option>
    <option value="Flat white">Flat white</option>
  </select>
  </div>
  <div class="flex">
    <label for="email" class="flex-row__one">Email <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" class="flex-row__two" required />
    </div>
    <div id="emailError" class="error"></div>
    <div class="flex">
    <label for="password" class="flex-row__one">Password <span aria-hidden="true">*</span></label>
    <input type="password" id="password" class="flex-row__two" name="password" minlength="8" required />
    <p id="passwordError" class="error"></p>
    </div>
    <button>Sign up</button>
    <script src="./index.js"></script>
    </form>
    </div>
  `;
  response.send(buildPage(title, content));
}

function post(request, response) {
  const { email, coffeeWish, password, name } = request.body;
  auth
    .createUser(name, email, password, coffeeWish)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      response.send(buildPage(`Error`, `<h2>Couldn't sign up, sorry</h2>`));
    });
}

module.exports = { get, post };
