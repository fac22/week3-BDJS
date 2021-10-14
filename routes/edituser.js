// Importing
const auth = require("../auth.js");
const { buildPage } = require("../template.js");

function get(request, response) {
  const title = "Edit Profile";
  const content =
    /*html */
    `<form action="edituser" method="POST">
      <label for="name">Name</label>
      <input type="text" id="name" name="name">
      <label for="coffeeWish">My Coffee Wish</label>
      <input type="text" id="coffeeWish" name="coffeeWish">
      <button> Save Changes</button>
    </form>`;
  response.send(buildPage(title, content));
}

function post(request, response) {
  const { name, coffeeWish } = request.body;
  response.redirect("/");
}

module.exports = { get, post };

// const sid = request.signedCookies.sid;
// model.getSession(sid)`UPDATE users SET name = $1 WHERE `;
