/* eslint-env meteor */

/* global Venues, Fetcher, GoogleMaps */

'use strict';

Session.setDefault('centerLat', 35.681128);
Session.setDefault('centerLng', 139.767551);
Session.setDefault('zoom', 13);

GoogleMaps.config({
  markerAttrs: {
    lat: 'location.lat',
    lng: 'location.lng'
  },
  helpers: {
    isInfoWindowOpen: function() {
      return false;
    }
  }
});


Template.searchMap.helpers({
  centerLat: function() {
    return Session.get('centerLat');
  },
  centerLng: function() {
    return Session.get('centerLng');
  },
  zoom: function() {
    return Session.get('zoom');
  },
  venues: function() {
    return Venues.find({});
  }
});

Template.searchMap.events({
  'center_changed .map-area': function(event) {
    var center = event.originalEvent.detail.center;
    Session.set('centerLat', center.lat);
    Session.set('centerLng', center.lng);
  },
  'zoom_changed .map-area': function(event) {
    var zoom = event.originalEvent.detail.zoom;
    Session.set('zoom', zoom);
  },
  'submit .form-area form': function(event) {
    event.preventDefault();
    var query = event.target.query.value;
    event.target.query.value = '';
    Fetcher.search(Session.get('centerLat'), Session.get('centerLng'), Session.get('zoom'), query);
  }
});
