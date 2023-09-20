console.log("script is running")

const content = document.getElementById('content');

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

// var map = L.map('map').setView([51.505, -0.09], 13);
var map = L.map('map').setView([63.108, 15.345], 7);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let cirkel_color = "red";
let cirkel_fillColor = "red";
let cirkel_fillOpacity = 0.8;
let cirkel_radius = 1000;


var loos = L.circle([61.756, 15.173], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

loos.bindPopup("Loos");


var tandsjoborg = L.circle([61.710, 14.716], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

tandsjoborg.bindPopup("Tandsjöborg");

var ljusdal = L.circle([61.829, 16.108], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

ljusdal.bindPopup("Ljusdal");


var alvros = L.circle([62.046, 14.654], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

alvros.bindPopup("Älvros");


var naggen = L.circle([62.277, 15.994], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

naggen.bindPopup("Naggen");


var kolsillre = L.circle([62.398, 15.208], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

kolsillre.bindPopup("Kölsillre");

var ytterhogdal = L.circle([62.175, 14.941], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

ytterhogdal.bindPopup("Ytterhogdal");


var ange = L.circle([62.524, 15.654], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

ange.bindPopup("Ånge");


var svenstavik = L.circle([62.766, 14.434], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

svenstavik.bindPopup("Svenstavik");

var ostavall = L.circle([62.425, 15.478], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

ostavall.bindPopup("Östavall");

var kalarne = L.circle([62.981, 16.089], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

kalarne.bindPopup("Kälarne");


var bispgarden = L.circle([63.027, 16.624], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

bispgarden.bindPopup("Bispgården");


var hammarstrand = L.circle([63.112, 16.344], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

hammarstrand.bindPopup("Hammarstrand");

var hammarstrand_ortsnamn = L.marker([63.112, 16.344],{
  icon: L.divIcon({
    html: "Hammarstrand",
    className: 'text-below-marker',
})
});
hammarstrand_ortsnamn.addTo(map);


console.log(map.getZoom())

map.on('zoomend' , function (e) {
  var geo = map.getCenter();
  console.log(map.getZoom());
  if (map.getZoom()<9)
  {
    hammarstrand_ortsnamn.addTo(map);
    console.log("la till")
  }else {
      hammarstrand_ortsnamn.remove();
      console.log("tog bort")
  }
});

var ullanger = L.circle([63.012, 18.185], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

ullanger.bindPopup("Ullånger");


var solleftea = L.circle([63.172, 17.249], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

solleftea.bindPopup("Sollefteå");

var borgvattnet = L.circle([63.424, 15.823], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

borgvattnet.bindPopup("Borgvattnet");


var hammerdal = L.circle([63.591, 15.355], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

hammerdal.bindPopup("Hammerdal");


var hoting = L.circle([64.114, 16.203], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

hoting.bindPopup("Hoting");


var junsele = L.circle([63.696, 16.878], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

junsele.bindPopup("Junsele");

var rosson = L.circle([63.921, 16.339], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

rosson.bindPopup("Rossön");

63.81127695983636, 16.40767115220841

var backe = L.circle([63.811, 16.407], {
  color: cirkel_color,
  fillColor: cirkel_fillColor,
  fillOpacity: cirkel_fillOpacity,
  radius: cirkel_radius
}).addTo(map);

backe.bindPopup("Backe");

informHeight();

