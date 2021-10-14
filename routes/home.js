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
          (coffee) => /*html*/ `<li>${coffee.name} : ${coffee.drinkorder}</li>`
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
            <h1>Hello ${user.name}</h1>
          <a href="/edituser"> Edit my details </a>
          <form action="/logout" method="POST">
           <button id="logoutBtn">Log out</button>
          </form>  
          <form action="/deletecoffee" method="POST">
          <button id="deleteBtn" >I don't like coffee</button>
            </form>
          ${coffeeList}`;
          });
      } else {
        return /*html*/ `
      <h1>Hello anonymous</h1>
      <a href="/signup">Sign up</a>
      <span> | </span>
      <a href="/login">Log in</a>
      ${coffeeList}
      `;
      }
    })
    .then((page) => response.send(buildPage(title, page)));
}

module.exports = { get };
