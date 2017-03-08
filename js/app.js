var app = (function() {
  var map = L.map('map_div').setView([14.640131,121.0748274], 16)
  var init = function() {
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      }
    ).addTo(map);
  }

  var addMarkers = function (listOfCoordinates) {
    for(var i = 0; i < listOfCoordinates.length; i++) {
      L.marker(listOfCoordinates[i]).addTo(map)
    }
  }

  return {
    init: init,
    addMarkers: addMarkers
  }
})()

app.init()

var coors = [
  [14.640163, 121.072939],
  [14.641868, 121.069343],
  [14.639061, 121.080365]
]

app.addMarkers(coors)
