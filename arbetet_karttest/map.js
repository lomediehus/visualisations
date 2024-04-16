let map;

function updateMap(kommunnamn) {
    if (map != undefined) { map.remove(); }
    map = L.map('map').fitBounds(L.geoJson(kommunnamn).getBounds());

//map.zoomIn(0.5);
let  geojson;
let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.geoJson(kommunnamn).addTo(map);

map.fitBounds(L.geoJson(kommunnamn).getBounds());

function getColor(d) {
    return d > 650 ? '#800026' :
           d > 600  ? '#BD0026' :
           d > 500  ? '#E31A1C' :
           d > 400  ? '#FC4E2A' :
           d > 300   ? '#FD8D3C' :
           d > 200  ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.year_2022),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

L.geoJson(kommunnamn, {style: style}).addTo(map);

function highlightFeature(e) {
    resetHighlight()
    map.fitBounds(e.target.getBounds());

    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle();
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        click: highlightFeature
    });
}

geojson = L.geoJson(kommunnamn, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Inkomstklyforna</h4>' +  (props ?
        '<b>' + props.regso + '</b><br />' + props.year_2022 + " 000 i medianinkomst"
        : 'x');
};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 200, 200, 300, 400, 500, 600, 650],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
}
