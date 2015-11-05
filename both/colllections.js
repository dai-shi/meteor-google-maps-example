/* eslint-env meteor */
/* eslint no-unused-vars:0 */

/* global Venues:true, Queries:true */

Venues = new Mongo.Collection('venues'); // only needed in the client side, but we need it here (or not?)
Queries = new Mongo.Collection('queries');

Meteor.users.deny({
  update: function() {
    return true;
  }
});

Venues.allow({
  insert: function(userId, doc) {
    return userId && userId === doc.owner;
  },
  remove: function(userId, doc) {
    return userId && userId === doc.owner;
  }
});

Queries.allow({
  insert: function(userId, doc) {
    return userId && userId === doc.owner;
  },
  remove: function(userId, doc) {
    return userId && userId === doc.owner;
  }
});
