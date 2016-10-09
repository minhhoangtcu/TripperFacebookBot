'use strict';

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/basic.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('user said...', request.text);
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
  getForecast({context, entities}) {
    return new Promise(function(resolve, reject) {
      // var location = firstEntityValue(entities, 'location')
      // if (location) {
      //   context.forecast = 'sunny in ' + location; // we should call a weather API here
      //   delete context.missingLocation;
      // } else {
      //   context.missingLocation = true;
      //   delete context.forecast;
      // }
      console.log('work!')
      return resolve();
    });
  },
};

const client = new Wit({accessToken, actions});
interactive(client);
