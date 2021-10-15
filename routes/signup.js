const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  //
  const title = `coffee-signup`;
  const content = /*html*/ `
  <h2>Create an account</h2>
  <div class="margin-auto">
  <form action="signup" class=" flex-column" method="POST">
  <div class="flex-left">
    <label for="name" class="form-left_one">Name <span aria-hidden="true">*</span></label>
    <input type="text" id="name" name="name" class="form-left_two" required maxlength="20" placeholder="max 20 characters" required />
  </div>
  <div class="flex-left">
    <label for="coffeeWish" class="form-left_one">My Coffee Wish <span aria-hidden="true">*</span></label>
    <select name="coffeeWish" id="coffeeWish" class="form-left_two" required />
    <option value="Espresso">Espresso</option>
    <option value="Americano">Americano</option>
    <option value="Filter Coffee">Filter Coffee</option>
    <option value="Latte">Latte</option>
    <option value="Cappucino">Cappucino</option>
    <option value="Macchiato">Macchiato</option>
    <option value="Flat white">Flat white</option>
  </select>
  </div>
  <div class="flex-left">
    <label for="email" class="form-left_one">Email <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" class="form-left_two" placeholder="exa@mp.le" required />
    </div>
    <p id="emailError" class="error"></p>
    <div class="flex-left">
    <label for="password" class="form-left_one">Password <span aria-hidden="true">*</span></label>
    <input type="password" id="password" class="form-left_two" name="password" minlength="8" placeholder="min 8 characters" required />
    </div>
    <p id="passwordError" class="error"></p>
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
