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
      L.marker(listOfCoordinates[i].coordinates)
        .addTo(map)
        .bindPopup(
          L.popup({"autoClose" : false})
            .setContent(buildPopupElement(listOfCoordinates[i]))
        )
        .openPopup()
    }
  }

  var buildPopupElement = function (popupDetails) {
    var customerElement = document.createElement('p')
    customerElement.innerHTML = popupDetails.customer

    var type = document.createElement('p')
    type.innerHTML = popupDetails.type

    var addBtn = document.createElement('button')
    addBtn.innerHTML = 'Add to Queue'

    var wrapper = document.createElement('div')
    wrapper.setAttribute('id', popupDetails.id)
    wrapper.appendChild(customerElement)
    wrapper.appendChild(type)
    wrapper.appendChild(addBtn)
    addBtn.addEventListener('click', function handler(evt) {
      appendToRoutingTable(popupDetails)
      this.removeEventListener('click', handler)
    })
    return wrapper
  }

  var appendToRoutingTable = function (popupDetails) {
    var routingTable = document.querySelector('#routing_table')
    var tableRow = document.createElement('tr')
    var detailsCell = document.createElement('td')
    var actionsCell = document.createElement('td')
    var removeBtn = document.createElement('button')

    removeBtn.innerHTML = "Remove"
    detailsCell.innerHTML = popupDetails.customer

    removeBtn.addEventListener('click', function() {
      var p = document.querySelector('#'+popupDetails.id)
      p.addEventListener('click', function handler(evt) {
        appendToRoutingTable(popupDetails)
        this.removeEventListener('click', handler)
      })
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
    })

    tableRow.setAttribute('data-marker', popupDetails.id)
    actionsCell.appendChild(removeBtn)
    tableRow.appendChild(detailsCell)
    tableRow.appendChild(actionsCell)
    routingTable.children[1].appendChild(tableRow)
  }

  return {
    init: init,
    addMarkers: addMarkers
  }
})()

app.init()

var coors = [
  {
    "customer": "Customer Name 1",
    "type": "Pickup",
    "id": "customer_name",
    "coordinates": [14.640163, 121.072939],
  },
  {
    "customer": "Customer Name 2",
    "type": "Pickup",
    "id": "customer_name_2",
    "coordinates": [14.641868, 121.069343],
  },
  {
    "customer": "Customer Name 3",
    "type": "Pickup",
    "id": "customer_name_3",
    "coordinates": [14.639061, 121.080365]
  }
]

app.addMarkers(coors)
