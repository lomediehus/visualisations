

function updateMap(kommunnamn) {
    if (map != undefined) { map.remove(); }
    map = L.map('map', {zoomControl: false}).fitBounds(L.geoJson(kommunnamn).getBounds());

    L.control.zoom({
        position: 'bottomleft'
    }).addTo(map);
//map.zoomIn(0.5);
let  geojson;
let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


L.geoJson(kommunnamn).addTo(map);

map.fitBounds(L.geoJson(kommunnamn).getBounds());

kommunnamn.max_2022 = parseInt(kommunnamn.max_2022)/12;
kommunnamn.min_2022 = parseInt(kommunnamn.min_2022)/12;


let max_2022 = Math.ceil(Number(kommunnamn.max_2022)/10)*10;
let min_2022 = Math.floor(Number(kommunnamn.min_2022)/10)*10;
if (max_2022-min_2022 < 30) {
    max_2022 += 10;
    min_2022 -= 10;
}
let colorSpan = [min_2022, max_2022];



function getColor(d, colorSpan) {
    let highest = colorSpan[1]
    let lowest = colorSpan[0]
    let midhigh = colorSpan[0] + (((colorSpan[1] - colorSpan[0]) / 4) * 3)
    let mid = colorSpan[0] + (((colorSpan[1] - colorSpan[0]) / 4) * 2)
    let midlow = colorSpan[0] + ((colorSpan[1] - colorSpan[0]) / 4)
    console.log("hej")
    return d > highest ? '#800026' :
           d > midhigh  ? '#d7301f' :
           d > mid  ? '#fc8d59' :
           d > midlow  ? '#fdcc8a' :
           d > lowest   ? "#fef0d9" :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(parseInt(feature.properties.year_2022)/12, colorSpan),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.6
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


var formatPercent = wNumb({
    decimals: 1,
    suffix: ' procent',
    mark: ","
})

var formatKronor = wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: ' kr',
    mark: ","
})


function inkomstMatte(props) {
    let year_2022 = Math.round(parseInt(props.year_2022)/12)*1000;
    let year_2019 = Math.round(parseInt(props.year_2019)/12)* 1000;
    let skillnad = (parseInt(year_2022) - parseInt(year_2019));
    let procentSkillnad = Math.round((skillnad/parseInt(year_2022)) * 100);

    let inkomstString = '<h4>' + props.kommunnamn + " (" + props.regso +')</h4><br>' + "<b>Disponibel inkomst 2022:</b> " + formatKronor.to(year_2022) + "<br><b>Skillnad sedan 2019:</b> " + formatKronor.to(skillnad) + "<br><b>Skillnad i procent:</b> " + String(procentSkillnad)
    
    return inkomstString
}


// method that we will use to update the control based on feature properties passed
info.update = function (props) {



    this._div.innerHTML = (props ? inkomstMatte(props)
        : '<h4>Klicka på en stadsdel</h4>');
};




info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [colorSpan[0], colorSpan[0] + ((colorSpan[1] - colorSpan[0]) / 4), colorSpan[0] + (((colorSpan[1] - colorSpan[0]) / 4) * 2),  colorSpan[0] + (((colorSpan[1] - colorSpan[0]) / 4) * 3), colorSpan[1]]
        console.log(grades)
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval

    for (var i = 0; i < grades.length -1; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1, colorSpan) + '"></i> ' +
            grades[i] *1000 + (grades[i + 1] ? '&ndash;' + grades[i + 1] * 1000 + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
}
