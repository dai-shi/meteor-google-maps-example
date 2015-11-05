/* eslint-env meteor */

/* global Foursquare */

Foursquare.init({
  id: Meteor.settings.FOURSQUARE_CLIENT_ID,
  secret: Meteor.settings.FOURSQUARE_CLIENT_SECRET,
  authOnly: false
});
