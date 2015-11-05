/* eslint-env meteor */

/* global Queries */

'use strict';

Template.queryHistory.helpers({
  queries: function() {
    return Queries.find();
  }
});

Template.queryHistory.events({
  'click .delete a': function() {
    Queries.remove(this._id);
  }
});
