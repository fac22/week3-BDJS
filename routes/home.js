const model = require('../database/model.js');
const template = require('../template');

function get(request, response) {
  response.send(template.buildPage('Home', '<h1> hello world! </h1>'));
}

module.exports = { get };
