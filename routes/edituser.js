// Importing
const model = require("../database/model");
const auth = require("../auth.js");
const { buildPage } = require("../template.js");

function get(request, response) {
  const title = "Edit Profile";
  // Who is logged in right now?
  const sid = request.signedCookies.sid;
  model.getSession(sid).then((session) => {
    const content =
      /*html */
      `<form action="edituser" method="POST">
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" value=${session.user.name} required />
      <label for="coffeeWish">My Coffee Wish <span aria-hidden="true">*</span></label>
      <select name="coffeeWish" id="coffeeWish" value=${session.user.drinkorder} required />
      <option value="Espresso">Espresso</option>
      <option value="Americano">Americano</option>
      <option value="Filter Coffee">Filter Coffee</option>
      <option value="Latte">Latte</option>
      <option value="Cappucino">Cappucino</option>
      <option value="Macchiato">Macchiato</option>
      <option value="Flat white">Flat white</option>
    </select>
    <button> Save Changes</button>
    </form>`;
    response.send(buildPage(title, content));
  });
}

function post(request, response) {
  const { name, coffeeWish } = request.body;

  // Who is logged in?
  const sid = request.signedCookies.sid;

  // look up email from current sid-data
  return (
    model
      .getSession(sid)
      .then((session) => session.user.email)
      // Update users row for this email
      .then((sessionMail) => model.updateUser(sessionMail, name, coffeeWish))
      .then(() => response.redirect("/"))
  );
}

module.exports = { get, post };

// const sid = request.signedCookies.sid;
