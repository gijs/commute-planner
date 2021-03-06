/**
 * Dependencies
 */

var template = require('./template.html');
var create = require('view');

/**
 * Expose `Alert`
 */

var Alert = module.exports = create(template, function(alert) {
  document.getElementById('alerts').appendChild(alert.el);
});

/**
 * Dispose
 */

Alert.prototype.dispose = function(e) {
  e.preventDefault();
  this.off();
  this.el.remove();
};
