const model = require('../database/model.js');
const { buildPage } = require('../template.js');

function get(request, response) {
	const sid = request.signedCookies.sid;

	const title = `e-Coffee Home`;

	return model
		.showPosts()
		.then(data => {
			return data
				.map(
					coffee =>
						/*html*/ `<li class="flex"><div class= "flex-row__one">${coffee.name}</div> <div class="flex-row__two"><span aria-hidden="true">☕️</span> ${coffee.drinkorder}</class=></li>`
				)
				.reverse()
				.join('');
		})
		.then(coffeeList => {
			if (sid) {
				return model
					.getSession(sid)
					.then(session => session.user.email)
					.then(userMail => model.getUser(userMail))
					.then(user => {
						return /*html*/ `
            <section>
            <h2>Hello ${user.name}</h2>
            <div class="centre">
              <a href="/edituser">Edit my details</a>
            </div>
            <div class="centre">
              <form action="/logout" method="POST">
                <button id="logoutBtn">Log out</button>
              </form>  
            </div>
            <div class="centre">
              <form action="/deletecoffee" method="POST">
               <button id="deleteBtn" >Forget me</button>
              </form>
            </div>
            </section>
            <section>
            <ul>
             ${coffeeList}
           </ul>
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
		.then(page => response.send(buildPage(title, page)));
}

module.exports = { get };
