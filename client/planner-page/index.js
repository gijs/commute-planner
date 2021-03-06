/**
 * Dependencies
 */

var each = require('each');
var FilterView = require('filter-view');
var LocationsView = require('locations-view');
var OptionsView = require('options-view');
var PlannerNav = require('planner-nav');
var session = require('session');
var TransitiveView = require('transitive-view');
var view = require('view');

/**
 * Create `View`
 */

var View = view({
  category: 'planner',
  template: require('./template.html'),
  title: 'Planner Page'
});

/**
 * Expose `render`
 */

module.exports = function(ctx, next) {
  var plan = ctx.plan;

  // redirect if plan isn't filled out
  if (!plan.welcome_complete()) {
    ctx.redirect = '/welcome';
  } else {
    var views = {
      'filter-view': new FilterView(plan),
      'locations-view': new LocationsView(plan),
      'options-view': new OptionsView(plan),
      'planner-nav': new PlannerNav(session),
      'transitive-view': new TransitiveView(plan)
    };

    ctx.view = new View(views);
    ctx.view.on('rendered', function() {
      each(views, function(key, view) {
        view.emit('rendered', view);
      });

      if (!plan.routes() || !plan.patterns()) plan.updateRoutes();
    });

    ctx.view.reactive.bind('autosubmit', function(el) {
      el.onsubmit = function(e) {
        e.preventDefault();
        plan.updateRoutes();
      };
    });
  }

  next();
};

/**
 * On submit
 */

View.prototype.onsubmit = function(e) {
  e.preventDefault();
};
