const model = require('../database/model.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getSession(sid).then((session) => {
      const content = `
      <h1>Hello ${session.user.name}</h1>
      <form action="/log-out" method="POST">
        <button>Log out</button>
      </form>
    `;
      const title = `e-Coffee Home`;
      response.send(buildPage(title, content));
    });
  } else {
    const content = `
    <h1>Hello anonymous</h1>
    <a href="/sign-up">Sign up</a>
    <span> | </span>
    <a href="/log-in">Log in</a>
    `;
    const title = `e-Coffee Enter`;
    response.send(buildPage(title, content));
  }
}

module.exports = { get };
