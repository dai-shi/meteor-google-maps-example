/* eslint-env meteor */

/* global Venues, Queries*/

Meteor.publish('venues', function() {
  return Venues.find({
    owner: this.userId
  });
});

Meteor.publish('queries', function() {
  return Queries.find({
    owner: this.userId
  });
});
