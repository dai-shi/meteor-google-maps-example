/* eslint-env meteor, browser */

/* global Venues, exportcsv */

'use strict';

Template.searchResults.helpers({
  venues: function() {
    return Venues.find();
  }
});

Template.searchResults.events({
  'click .export button': function() {
    var filename = 'download.csv';
    var results = Venues.find({}).fetch().map(function(item) {
      return {
        'Name': item.name,
        'City': item.location.city || '',
        'Street Address': item.location.address || '',
        'Latitude': item.location.lat,
        'Longitude': item.location.lng
      }
    });
    var content = exportcsv.exportToCSV(results);
    var blob = new Blob([content], {
      type: 'text/plain; charset=utf-8'
    });
    window.saveAs(blob, filename);
  }
});
