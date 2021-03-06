/**
 * Dependencies
 */

var onLoad = require('on-load');
var page = require('page');
var Plan = require('plan');
var utils = require('router-utils');
var session = require('session');

/**
 * Set up routes
 */

page('/', utils.redirect('/planner'));
page('/welcome', session.commuterIsLoggedIn, Plan.load, require('welcome-page'));
page('/planner', session.commuterIsLoggedIn, Plan.load, require('planner-page'));
page('/planner/:link', session.loginWithLink);

/**
 * Render all
 */

page('*', utils.render);

/**
 * Once the browser has "loaded"...ugh, can't believe we still need this.
 */

onLoad(function() {
  // listen
  page();
});
