const model = require('../database/model.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const sid = request.signedCookies.sid;

  const title = `e-Coffee Home`;

  return model
    .showPosts()
    .then((data) => {
      // console.log(data);
      return data
        .map(
          (coffee) =>
            /*html*/ `<li class="flex"><div class= "flex-row__one">${coffee.name}</div> <div class="flex-row__two"><span aria-hidden="true">☕️</span> ${coffee.drinkorder}</class=></li>`
        )
        .join('');
    })
    .then((coffeeList) => {
      // console.log(coffeeList);
      if (sid) {
        return model
          .getSession(sid)
          .then((session) => session.user.email)
          .then((userMail) => model.getUser(userMail))
          .then((user) => {
            return /*html*/ `
            <section>
            <h2>Hello ${user.name}</h2>
            <div>
          <a href="/edituser"> Edit my details </a>
          </div>
          <div>
          <form action="/logout" method="POST">
          <button>Log out</button>
          </form>  
          <div>
        <div>
          <form action="/deletecoffee" method="POST">
          <button>I don't like coffee</button>
            </form>
            </div>
            </section>
            <section>
          ${coffeeList}
          </section>`;
          });
      } else {
        return /*html*/ `
        <section>
      <h2>What's your order?</h2>
      <div class="centre">
      <a href="/signup">Sign up</a>
      <a href="/login">Log in</a>
      </div>
      </section>
      <section>
      <div>
      ${coffeeList}
      </div>
      </section>
      `;
      }
    })
    .then((page) => response.send(buildPage(title, page)));
}

module.exports = { get };
