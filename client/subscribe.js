/* eslint-env meteor */

/* global Venues */

function subscribe() {
  Meteor.subscribe('venues', function() {
  Venues.find({}).fetch().forEach(function(item) {
    Venues.remove(item._id);
  });
  });
  Meteor.subscribe('queries');
}
if (Meteor.userId()) {
  subscribe();
} else {
  Accounts.onLogin(function() {
    subscribe();
  });
}
