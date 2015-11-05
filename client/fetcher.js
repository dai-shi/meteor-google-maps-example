/* eslint-env meteor, browser */

/* global Fetcher:true, Foursquare, Venues, Queries */

function getRadiusFromZoom(zoom) {
  return Math.pow(2, 14 - zoom) * 1609.34 * 2; // the last "* 2" is a magic number for more results
}

Fetcher = {};

Fetcher.search = function(lat, lng, zoom, query) {
  var radius = getRadiusFromZoom(zoom);
  Queries.insert({
    query: query,
    lat: lat,
    lng: lng,
    radius: radius,
    createdAt: new Date(),
    owner: Meteor.userId()
  });
  Foursquare.find({
    ll: '' + lat + ',' + lng,
    radius: radius,
    query: query,
    limit: 50
  }, function(err, result) {
    if (err) return window.alert('failed to fetch venues [1]');
    if (!result || !result.response || !result.response.venues) return window.alert('failed to fetch veneus [2]');
    // better way to replace the whole collection?
    Venues.find({}).fetch().forEach(function(item) {
      Venues.remove(item._id);
    });
    result.response.venues.forEach(function(item) {
      item.owner = Meteor.userId();
      Venues.insert(item);
    });
  });
};
