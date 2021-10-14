const model = require("../database/model");
const template = require("../template");

function post(request, response) {
  const sid = request.signedCookies.sid;
  model.deleteSession(sid).then(() => {
    response.clearCookie("sid");
    response.redirect("/");
  });
}

module.exports = { post };
