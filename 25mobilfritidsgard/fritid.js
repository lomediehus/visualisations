// ...existing code...
console.log("script is running")

const content = document.getElementById('content');

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

// // var map = L.map('map').setView([51.505, -0.09], 13);
// var map = L.map('map').setView([65.670, 21.999], 9);

var map = L.map('map', {
  zoomControl: false,      // hides zoom buttons
  dragging: false,         // disables dragging (panning)
  scrollWheelZoom: false,  // disables zoom with mouse wheel
  doubleClickZoom: false,  // disables zoom on double click
  boxZoom: false,          // disables zoom with box selection
  keyboard: false,         // disables keyboard navigation
  touchZoom: false         // disables zoom on touch devices
}).setView([65.63, 22.12], 9);


L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);



let cirkel_color = "red";
let cirkel_fillColor = "red";
let cirkel_fillOpacity = 0.8;
let cirkel_radius = 1000;


const cities = [
  { name: "LULEÅ",      lat: 65.584, lng: 22.158, labelLat: 65.584, labelLng: 22.158 },
  { name: "Brändön",    lat: 65.697,   lng: 22.332,   labelLat: 65.697, labelLng: 22.332 },
  { name: "Örarna",     lat: 65.7078,  lng: 22.2345, labelLat: 65.7078, labelLng: 22.2345 },
  { name: "Antnäs",     lat: 65.55437, lng: 21.83636, labelLat: 65.55437, labelLng: 21.83636 },
  { name: "Måttsund",   lat: 65.53715, lng: 21.91594, labelLat: 65.53715, labelLng: 21.91594 },
  { name: "Alvik",      lat: 65.56789, lng: 21.77625, labelLat: 65.56789, labelLng: 21.77625 },
  { name: "Avan",       lat: 65.68214, lng: 21.80504, labelLat: 65.68214, labelLng: 21.80504 }
];

var bussIcon = L.icon({
    iconUrl: 'bussikon.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [20, 20], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function addCity(city) {
    city.name === "LULEÅ" ? cirkel_color = "black" : cirkel_color = "red";

    // Add label with extra class for LULEÅ
    let labelClass = "text-below-marker";
    if (city.name === "LULEÅ") {
        labelClass += " highlight";
    }

    // Add label if labelLat/labelLng is provided, otherwise use city position
    if (city.labelLat && city.labelLng) {
        L.marker([city.labelLat, city.labelLng], {
            icon: L.divIcon({
                html: city.name,
                className: labelClass
            })
        }).addTo(map);
    }

    // Add bus marker for the city
    L.marker([city.lat, city.lng], {icon: bussIcon}).addTo(map);
}

// function addCity(city) {
//     city.name === "LULEÅ" ? cirkel_color = "black" : cirkel_color = "red";

//      // Add label with extra class for LULEÅ
//     let labelClass = "text-below-marker";
//     if (city.name === "LULEÅ") {
//         labelClass += " highlight";
//     }
//   }

   
//   // Add label if labelLat/labelLng is provided, otherwise use city position
//   if (city.labelLat && city.labelLng) {
//     L.marker([city.labelLat, city.labelLng], {
//       icon: L.divIcon({
//         html: city.name,
//         className: labelClass
//       })
//     }).addTo(map);
//   }


//   // Add circle marker
//   L.circle([city.lat, city.lng], {
//     color: cirkel_color,
//     fillColor: cirkel_fillColor,
//     fillOpacity: cirkel_fillOpacity,
//     radius: cirkel_radius,
//     interactive: false
//   }).addTo(map);
//     // .bindPopup(city.name);
// }

// L.marker([city.lat, city.lng], {icon: bussIcon}).addTo(map)
// .bindPopup("I am a green bus.");



  // // Add circle marker
  // L.circle([city.lat, city.lng], {
  //   color: cirkel_color,
  //   fillColor: cirkel_fillColor,
  //   fillOpacity: cirkel_fillOpacity,
  //   radius: cirkel_radius,
  //   interactive: false
  // }).addTo(map);
  //   // .bindPopup(city.name);


// Add all cities
cities.forEach(addCity);


// var bussIcon = L.icon({
//     iconUrl: 'bussikon.png',
//     // shadowUrl: 'leaf-shadow.png',

//     iconSize:     [30, 30], // size of the icon
//     // shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     // shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

// L.marker([65.584, 22.158], {icon: bussIcon}).addTo(map)
// .bindPopup("I am a green bus.")
