const model = require("../database/model");
const template = require("../template");

function post(request, response) {
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((session) => model.deleteUser(session.user.email))
    .then(() => model.deleteSession(sid))
    .then(() => {
      response.clearCookie("sid");
      response.redirect("/");
    });
}

module.exports = { post };
