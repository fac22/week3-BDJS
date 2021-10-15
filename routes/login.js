// Imports
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
	const title = `coffee-login`;
	const content = /*html*/ `
    <h2>Nice to have you back!</h2>

    <form action="login" class="flex flex-column align-items__c" method="POST">
    <div class="flex-row margin-bottom">
      <label for="email" class="flex-row__one">Email</label>
      <input type="email" id="email" name="email" class="flex-row__two">
      </div>
      <div class="flex-row margin-bottom">
      <label for="password" class="flex-row__one">Password</label>
      <input type="password" id="password" name="password" class="flex-row__two">
      </div>
      <button>Log in</button>
    </form>
  `;
	response.send(buildPage(title, content));
}

function post(request, response) {
	//
	const { email, password } = request.body;
	auth
		// match passwords
		.verifyUser(email, password)
		// make new session with session id
		.then(auth.saveUserSession)
		// make a cookie
		.then(sid => {
			response.cookie('sid', sid, auth.COOKIE_OPTIONS);
			response.redirect('/');
		})
		.catch(error => {
			console.error(error);
			response.send(
				buildPage(
					`Error`,
					/*html*/ `<h2>User not found</h2> <div>
          <a href="/">Go Back</a>
      </div>`
				)
			);
		});
}

// Exports
module.exports = { get, post };
