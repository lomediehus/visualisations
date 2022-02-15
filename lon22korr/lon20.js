(function () {
    'use strict';

// var kommunloner = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/kommunloner20.json";
var kommunloner = "kommunloner20.json";
var regionloner = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/regionloner20.json";
// var regionloner = "regionloner20.json";
var sokvagGeografi = "SverigesLan2019.geojson";


var kdata = null;
var rdata = null;
// var html = '';
var rad, cell1, cell2;
var landsting;
var yrkesarray = [];
var bubbla = document.createElement('span');
bubbla.className = 'bubblatext';
var yrke = "Väljyrke";

//variables for elements from html document
var lonlista = document.getElementById("lonlista");
var tabell = document.getElementById('mintabell');
var yrken = document.getElementById("yrken");
var yrkestabell = document.getElementById('yrkestabell')
var sortKommun = document.getElementById('sortKommun');
var sortLonFall = document.getElementById('sortLonFall');
var sortLonStig = document.getElementById('sortLonStig');
var lonlista = document.getElementById('lonlista');
var visaLista = document. getElementById('visaLista');
var kartdiv = document.getElementById('kartdiv');
var kartpopup = document.getElementById('kartpopup');
var kartpopuprubbe = document.getElementById('kartpopuprubbe');
var close = document.getElementById("closex");
var yrkesspan = document.getElementById('yrkesspan');
var mintabelldiv = document.getElementById('mintabelldiv');
var overlay = document.getElementById('overlay');
var tabellknappar = document.getElementsByName('tabellknapp');
var yrkesknappar = document.getElementsByName('yrkesknapp');
var valjlandsting = document.getElementById('valjlandsting');
var valjkommun = document.getElementById('valjkommun');
var sokyrke = document.getElementById('sokyrke');
var listLandstingKnapp = document.getElementById('listLandsting');
var listKommunKnapp = document.getElementById('listKommuner');
var selectlista = document.getElementsByTagName('OPTION');
var valjyrke = document.getElementById("valjyrke");
var highlowdiv = document.getElementById('highlowdiv');
var rikssnittp = document.getElementById('rikssnittp');
var highest, place, highestKommun = 0, highestLandsting = 0, placeKommun = '', placeLandsting = '';
var lowest, place2, lowestKommun = 50000, lowestLandsting = 50000, place2Kommun = '', place2Landsting = '';
var semitransparent = document.getElementsByClassName('semitransparent');
var blinkcontainer= document.getElementById("blinkcontainer");


$('#highlowdiv').hide();


//Wait for document ready
$(document).ready(function() {

    //choose yrke in list
    valjyrke.addEventListener("change", function() {
      //resetting variable
      var kommunHasYrke = false;
      yrke = this.value;
      getHighLow(yrke);
      kartpopup.style.display = "none";

      //Check if yrke is present in file "kdata", if it is, make table from "kdata"
      for (var i = 0; i < kdata.length; i++) {
        if (kdata[i].hasOwnProperty(yrke)) {
          listKommunKnapp.disabled = false;
          listKommunKnapp.checked = true;
          listLandstingKnapp.disabled = true;
          maketable(kdata, tabell);
          kommunHasYrke = true;

          //Check if yrke is also present in "rdata", if it is, enable the visaLandsting button
          for (var i = 0; i < rdata.length; i++) {
            if (rdata[i].hasOwnProperty(yrke)) {
              listLandstingKnapp.disabled = false;
              break;
              }
            }
            break;
          }
        }

      //If yrke is not present in the file "kdata" (kommunHasYrke is set to false), make a table from "rdata"
      if (kommunHasYrke === false) {
        for (var i = 0; i < rdata.length; i++) {
          if (rdata[i].hasOwnProperty(yrke)) {
            listLandstingKnapp.disabled = false;
            listKommunKnapp.disabled = true;
            listLandstingKnapp.checked = true;
            maketable(rdata, tabell);
            break;
            }
          }
        }

      //Make the text grey in the label for a disabled button
      for (var i = 0; i < tabellknappar.length; i++) {
        if (tabellknappar[i].disabled) {
          tabellknappar[i].nextSibling.style.color = "#E8E8E8";
        }
        else {
          tabellknappar[i].nextSibling.style.color = "black";
        }
      }

      //take away overlay when a selection is made
      if (yrke != "Väljyrke") {
        overlay.style.display = "none";
        blinkcontainer.style.display = "none";
        overlay.style.cursor = "pointer";
        fillHighlowdiv();
        [...semitransparent].forEach(function(element){
          element.style.opacity = 1;
        })
      }
      else if (yrke === "Väljyrke") {
        overlay.style.display = "block";
        blinkcontainer.style.display = "block";
        $('#highlowdiv').hide();
        tabell.innerHTML = '';
        rikssnittp.innerHTML = '';
        [...semitransparent].forEach(function(element){
            element.style.opacity = 0.3;
            // element.classList.add('semitransparent');
          })
      }
    //end of change-function
    });
//end of document-ready-function
});


//Comparing values to get the highest and lowest salary
function getHighLow(yrke) {

  highest = 0, lowest = 50000, highestKommun = 0, highestLandsting = 0, placeKommun = '', placeLandsting = '', lowestKommun = 50000, lowestLandsting = 50000, place2Kommun = '', place2Landsting = '';

  rdata.forEach(function(row) {
    if (row[yrke] > highestLandsting) {
      highestLandsting = row[yrke];
      placeLandsting = row.Region;
    }
    if (row[yrke] < lowestLandsting && row[yrke] > 0) {
      lowestLandsting = row[yrke];
      place2Landsting = row.Region;
    }
  })

  kdata.forEach(function(row) {
    if (row[yrke] > highestKommun) {
      highestKommun = row[yrke];
      placeKommun = row.Kommun;
    }
    if (row[yrke] < lowestKommun && row[yrke] > 0) {
      lowestKommun = row[yrke];
      place2Kommun = row.Kommun;
    }
  })

  highestKommun > highestLandsting ? (highest = highestKommun, place = placeKommun) : (highest = highestLandsting, place = placeLandsting);
  lowestKommun < lowestLandsting ? (lowest = lowestKommun, place2 = place2Kommun) : (lowest = lowestLandsting, place2 = place2Landsting);


  if (place2 === 'Västra Götalandsregionen') {
    place2 = 'Västra Götalands\&shy;regionen';
  }
  if (place2 === 'Region Östergötland') {
    console.log("Det är ju Östergötland")
    place2 = 'Region Öster\&shy;götland';
  }
  if (place === 'Västra Götalandsregionen'){
    place = 'Västra Götalands\&shy;regionen';
  }
  if (place === 'Region Östergötland'){
    place = 'Region Öster\&shy;götland';
  }

};

//Putting the result in place
function fillHighlowdiv() {
  if (window.innerWidth > 360) {
    highlowdiv.innerHTML = '<p class="u-textMeta"><strong>Högst: </strong>' + $.number(highest, 0, ',', '\&nbsp;') + ' kr/mån,  ' + place + '.</p><p class="u-textMeta"><strong>Lägst:</strong> ' + $.number(lowest, 0, ',', '\&nbsp;') + ' kr/mån, ' + place2 + '.';
    $('#highlowdiv').hide().fadeIn();
  }
  else {
    $('#highlowdiv').hide();
  }
}


//Always start with first item in list selected
selectlista[0].setAttribute("selected", "selected");


//Give "x" in kartpopup closing function
close.addEventListener("click", function() {
  kartpopup.style.display = "none";
  overlay.classList.remove("blacknollfyra");
  overlay.style.display = "none";
})


//load the file of kommuner into variable kdata and draw the table
$.ajax({
        url: kommunloner,
        dataType: "json",
        mimeType: "application/json",
        success: function (data) {
            kdata = data;

            //Make the graph that compares proffessions
            jamforyrke(kdata, 'RIKSSNITT', 4);
            populateKommunDropdown();
            },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
})

// load the file of regioner and landsting into variable rdata
$.ajax({
        url: regionloner,
        dataType: "json",
        mimeType: "application/json",
        success: function (data) {
            rdata = data;
            },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
})


//Add click to button, sort by kommun/landsting and create the table
sortKommun.addEventListener('click', function() {
  //check if landsting or kommun is chosen
  if (getvalue(tabellknappar) === "listKommuner") {
    kdata.sort(function(a, b){
      var kommunA=a.Kommun.toLowerCase(), kommunB=b.Kommun.toLowerCase();
      if (kommunA < kommunB) //sort string ascending
          return -1;
      if (kommunA > kommunB)
          return 1;
      return 0; //default return value (no sorting)
      })
    maketable(kdata, tabell);
    }

  else if (getvalue(tabellknappar) === "listLandsting") {
    rdata.sort(function(a, b){
      var kommunA=a.Region.toLowerCase(), kommunB=b.Region.toLowerCase();
      if (kommunA < kommunB) //sort string ascending
          return -1;
      if (kommunA > kommunB)
          return 1;
      return 0 ;//default return value (no sorting)
      })
    maketable(rdata, tabell);
    }
});


//Add click to button, sort by salary (ascending) and create the table
sortLonStig.addEventListener('click', function() {
  if (getvalue(tabellknappar) === "listKommuner") {
    kdata.sort(function(a, b){
      if (a[yrke] === '') return 1;
      if (b[yrke] === '') return -1;
      return a[yrke] < b[yrke] ? -1 : 1;
      })
    maketable(kdata, tabell);
  }
  else if (getvalue(tabellknappar) === "listLandsting") {
      rdata.sort(function(a, b){
        if (a[yrke] === '') return 1;
        if (b[yrke] === '') return -1;
        return a[yrke] < b[yrke] ? -1 : 1;
        })
    maketable(rdata, tabell);
    }
});

//Add click to button, sort by salary (descending) and create the table
sortLonFall.addEventListener('click', function() {
  // tabell.getElementsByTagName("tbody")[0].innerHTML = tabell.rows[0].innerHTML;
  if (getvalue(tabellknappar) === "listKommuner") {
    kdata.sort(function(a, b){
      return b[yrke] - a[yrke];
      })
    maketable(kdata, tabell);
  }
  else if (getvalue(tabellknappar) === "listLandsting") {

    rdata.sort(function(a, b){
      return b[yrke] - a[yrke];
      })
      maketable(rdata, tabell);
    }
});


// Function for comparing proffessions
// @params 'data' = array of objects loaded from json file with ajax
//         'valdkommun' = kommun or landsting, will be given or chosen from search field or select list
//          index = number indicating at which index to start displaying the proffessions. Needed because the kommun- and landsting files are differently structured
function jamforyrke(data, valdkommun, index) {


  //start with emptying the chart element
  $("#chart").empty();

  //empty array that will collect the chosen proffessions
  yrkesarray = [];
  //empty object for yrke
  var yrke;

  //Building the array 'yrkessarray'
  data.forEach(function(row) {

    if (row.Kommun === valdkommun || row.Region === valdkommun) {
      for (var x = index; x < Object.keys(row).length; x++) {
        //start with emptying the object
        yrke = {};
        //Build an object with properties 'lön' and yrke
        yrke['yrke'] = Object.keys(row)[x];
        yrke['lön'] = Object.values(row)[x];
        if (yrke['lön'] != ''){
          yrkesarray.push(yrke);
          }
        }
      }
    });


    //make a bar chart with d3
    makeGraph(yrkesarray);
};

// make a bar chart with d3
function makeGraph(data1) {

  //sort the data
  data1.sort(function(x, y){
    // console.log(x.lön + '   '  + y.lön)
     return d3.descending(x.lön, y.lön);
  })


  var width = 330,
      barHeight = 25;

  var x = d3.scaleLinear()
      .range([0, width]);

  var chart = d3.select(".chart")
      .attr("width", width);


    x.domain([0, d3.max(data1, function(d) { return d.lön; })]);

    chart.attr("height", barHeight * data1.length);

    var bar = chart.selectAll("g")
        .data(data1)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight +  ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(d.lön); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d.lön) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .classed("u-textMeta", true)
        .text(function(d) {
          //using jqery number to put a space as thousands delimiter
          d.lön = $.number(d.lön, 0, ',', ' ');

          return d.lön; });


    bar.append("text")
        .attr("x", 5)
        .style("text-anchor", "start")
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        // .attr("textLength", "50%")
        .classed("u-textMeta", true)
        .classed("bartext", true)
        .text(function(d) {
          //using regex to replace underscore with space
          d.yrke = d.yrke.replace(/_/g, ' ');
          //shorten long strings
          if (d.yrke.length > 20) {
            d.yrke = d.yrke.substring(0,19) + "...";
          }
          return d.yrke; });
}



//handling input in search field
$("input").on("keydown",function search(e) {
    var data = kdata;
    //index for kommun is 4, because that is the position of the first proffession in the array
    var index = 4;
    //key 13 is "enter"
    if(e.keyCode == 13) {
      let count = 0;
      var sokt = $(this).val();
      //traverse the data file
      data.forEach(function(row) {
        //find i match, in lowercase
        if (row.Kommun.toLowerCase() === sokt.toLowerCase()){
          //build the array and make the graph
          jamforyrke(data, row.Kommun, index);
          //Show the name of the chosen kommun
          yrkesspan.innerHTML = 'löner för ' + row.Kommun + '.';
          $('#yrkep').hide().fadeIn();
        }
        else {
          count++;
          if (count > data.length-1) {
          }
      }
    })
    }
});

//Check the third radiobutton on loading page, to make the Kommun choice default
function checkfromstart(radiobuttons) {
  radiobuttons[0].checked = true;
}

checkfromstart(yrkesknappar);


//Getting the value of the checked radiobutton
function getvalue(radiobuttons) {
  for (var i = 0; i < radiobuttons.length; i++) {
    if (radiobuttons[i].checked === true) {
      return radiobuttons[i].value;
      }
  }
};

//Action for the radiobuttons tabellknappar, choose Kommun or Landsting
[...tabellknappar].forEach(function(element) {
  element.addEventListener('click', function() {
    if (getvalue(tabellknappar) === 'listKommuner') {
        tabell.innerHTML = '';
        maketable(kdata, tabell);
    }
    else if (getvalue(tabellknappar) === 'listLandsting') {
      tabell.innerHTML = '';
      maketable(rdata, tabell);
    }
  })
});


function populateKommunDropdown() {
  kdata.forEach((item, i) => {
    if (item.Kommun != "RIKSSNITT") {
      let el = document.createElement("option");
      el.textContent = item.Kommun;
      valjkommun.appendChild(el);
    }
  });
  //Add option "Välj kommun", which will be the first option
  let el = document.createElement("option");
  el.textContent = 'Välj kommun';
  valjkommun.appendChild(el);
};


[...yrkesknappar].forEach(function(element) {
  element.addEventListener('click', function() {

    if (getvalue(yrkesknappar) === "kommuner") {

      //index for kdata is 4 because that is the position of the first proffesion in that array
      jamforyrke(kdata, 'RIKSSNITT', 4);
      //Show which data is chosen
      yrkesspan.innerHTML = 'genomsnitt för alla kommuner.<br>Välj en kommun i listan.';
      $('#yrkep').hide().fadeIn();
      //Show the search field for kommun
      valjkommun.style.display = "block";
      //hide the select list for landsting
      valjlandsting.style.display = 'none';

    }
    else if (getvalue(yrkesknappar) === "landsting") {


        //index for rdata is 1 because that is the position of the first proffesion in that array
        jamforyrke(rdata, 'RIKSSNITT', 2);
        //show which data is chosen
        yrkesspan.innerHTML = 'genomsnitt för alla regioner.<p></p>Välj en region i listan:';
        //hide the search filed for kommun
        valjkommun.style.display = "none";
        //show the select list for landsting
        valjlandsting.style.display = 'block';
        $('#yrkep').hide().fadeIn();
    }
  });
})





//Event for the select list of landsting
valjlandsting.addEventListener("change", function() {

  landsting = this.value;
  //Build the array (and make the graph) from the chosen data
  //argument 'this.value' = the chosen landsting
  jamforyrke(rdata, this.value, 2);
  if (this.value === "RIKSSNITT") {
    //show which value is chosen
    yrkesspan.innerHTML = 'genomsnitt för alla regioner.<br>Välj en region i listan:';
    $('#yrkep').hide().fadeIn();

  }
  else {
    //show which value is chosen
    yrkesspan.innerHTML = 'löner för ' + this.value + '.';
    $('#yrkep').hide().fadeIn();
  }

});


valjkommun.addEventListener("change", function() {
  if (this.value === "RIKSSNITT") {
    //show which value is chosen
    yrkesspan.innerHTML = 'genomsnitt för alla kommuner.<br>Välj en kommun i listan:';
    $('#yrkep').hide().fadeIn();

  }
  else {
    //show which value is chosen
    yrkesspan.innerHTML = 'löner för ' + this.value + '.';
    $('#yrkep').hide().fadeIn();
  }
  jamforyrke(kdata, this.value, 4)
});



//Add table rows of sorted data
function maketable(data, tabell) {
  tabell.innerHTML = '';

  //variable used to check wich dataset is passed
  let kommun = false;

  data.forEach(function(row) {
    //checking if the passed dataset contains the property "Kommunkod", in which case the file contains kommuner, not landsting
    if (row.hasOwnProperty('Kommunkod')) {
      kommun = true;
    }
    if (row.Kommun !== 'RIKSSNITT' && row.Region !== 'RIKSSNITT' ) {
      rad = tabell.insertRow();
      cell1 = rad.insertCell(0);
      cell2 = rad.insertCell(1);
      //if there is a row.Kommun, put the value in cell1, otherwise use the value for row.Region
      row.Kommun ? cell1.innerHTML = row.Kommun : cell1.innerHTML = row.Region;

      //format to number with jquery.number.js plugin.
      //@params: number to convert, decimals to keep, decimal separator, thousands separator
      //(property "yrke" contains salary)
      var yrkeform = $.number(row[yrke], 0, ',', '&nbsp;')
      if (yrkeform === '0') {
        yrkeform = '';
      }
      cell2.innerHTML = yrkeform;
    }

  else {
    //if there is a row.Kommun use the value in rikssnittp, otherwise use the value for row.Region
    row.Kommun ? rikssnittp.innerHTML = row.Kommun + ' ' + $.number(row[yrke], 0, ',', '&nbsp;') + ' kr/mån' : rikssnittp.innerHTML = row.Region + ' ' + $.number(row[yrke], 0, ',', '&nbsp;') + ' kr/mån'
  }

  //When to show the yellow bubbles
  bubbelvillkor(row);
  })

  let header = tabell.createTHead();
  let row = header.insertRow(0);
  if (kommun) {
      row.insertCell(0).innerHTML = "Kommun";
  }
  else {
    row.insertCell(0).innerHTML = "Region";
  }

  row.insertCell(1).innerHTML = "Lön 2019";
  informHeight();

};


//function to show and hide bubbla
function showhide(row, bubble) {
  let bubblor = document.getElementsByClassName('bubblatext');
  rad.addEventListener("click", function() {
    if (bubble.style.display === "inline") {
    bubble.style.display = "none";
    }
  //First hide other bubbles that may be visible, then show the active bubble
    else {
      for (var i = 0; i < bubblor.length; i++) {
        bubblor[i].style.display = "none";
        bubble.style.display = "inline";
      }
    }
  })

  //Close any open bubbles on clicking anywhere in the document, except for the row that is ckicked to show the bubble
  document.addEventListener("click", function() {
    if (!event.target.parentNode.classList.contains('bubbla')){
      if (bubble.style.display === "inline") {
      bubble.style.display = "none";
    }
  }
  })

};






function bubbelvillkor(row) {

  if (row[yrke] === '') {
    rad.classList.add('bubbla');
    var cl2 = bubbla.cloneNode(true);
    rad.appendChild(cl2);
    cl2.style.left = '50px';
    cl2.innerHTML = "Uppgift saknas då det finns få eller inga anställda i yrkes&shy;kategorin.";
    // hide(rad);
    showhide(rad, cl2);
    if (row.Kommun === 'Norrtälje Tiohundra AB') {
      cl2.innerHTML += " Bolaget Tiohundra AB ägs av Norrtälje Kommun och Stockholms Läns Landsting.";
      }
    if (row.Kommun === 'Sollentuna AB Solom') {
      cl2.innerHTML += " Sollentuna driver omsorg i egen regi genom kommunägda bolaget AB Solom.";
      }
    if (row.Kommun === 'Höganäs Omsorg AB') {
      cl2.innerHTML += " Höganäs driver omsorg i egen regi genom kommunägda bolaget Höganäs Omsorg AB.";
      }
    }


  else if (row.Kommun === 'Norrtälje Tiohundra AB') {
    rad.classList.add('bubbla');
    rad.appendChild(bubbla);
    bubbla.innerHTML = "Bolaget Tiohundra AB ägs av Norrtälje Kommun och Stockholms Läns Landsting.";
    showhide(rad, bubbla);
    }
  else if (row.Kommun === 'Sollentuna AB Solom') {
    rad.classList.add('bubbla');
    var cl1 = bubbla.cloneNode(true);
    rad.appendChild(cl1);
    cl1.innerHTML = "Sollentuna driver omsorg i egen regi genom kommunägda bolaget AB Solom.";
    showhide(rad, cl1);
    }
  else if (row.Kommun === 'Höganäs Omsorg AB ') {
    rad.classList.add('bubbla');
    var cl1 = bubbla.cloneNode(true);
    rad.appendChild(cl1);
    cl1.innerHTML = "Höganäs driver omsorg i egen regi genom kommunägda bolaget Höganäs Omsorg AB.";
    showhide(rad, cl1);
    }
}


//Nedan kommer allt som har med kartan att göra

var w = 264;
var h = 450;
var svg = d3.select('div#lansdiv').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
var projection = d3.geoConicEqualArea()
    // .scale(2365.51882004263)
    .scale(1800)
    .center([16.382656313727672,62.34103687152436]) //projection center

    .parallels([55.327583999999995,69.059967]) //parallels for conic projection
    .rotate([343.6173436862723]) //rotation for conic projection
    // .translate([432.31469742010825,256.8639471506867]) //translate to center the map in view;

    .translate([w*1.4, h/2.4]) //translate to center the map in view;

var bana = d3.geoPath().projection(projection);

var map = d3.json(sokvagGeografi);

Promise.all([map]).then(function(values) {
  svg.selectAll("path")
      .data(values[0].features)
      .enter()
      .append("path")
      // .attr("class", "continent")
      .attr("d", bana)
      .on("mouseover",showTooltip)
      .on("mousemove",moveTooltip)
      .on("mouseout",hideTooltip)
      .on("click", clicked);
});




// Click-function for kartpopup
// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
function clicked(d,i) {
  hideTooltip;
  karttabell.innerHTML = '';
  kartpopuprubbe.innerHTML = '';
  if (yrke === 'Väljyrke') {

    karttabell.innerHTML = "<p class=\"u-textMeta\">Du måste välja ett yrke i listan först</p>";
  }


  var lan = d.properties.lan_namn;
  var landsting = d.properties.landsting;
  //Show kartpopup on click
  kartpopup.style.display = "block";
  //show semitransparent overlay under kartpopup, to make everything under kartpopup look faded
  overlay.style.display = 'block';
  overlay.classList.add("blacknollfyra");
  //Sort by lön, ascending
  kdata.sort(function(a, b){
    return a[yrke]-b[yrke]
    })

  //Check if yrke is present in file "kdata" and "rdata", one round is enough to know
  for (var i = 0; i < 1; i++) {
    if (kdata[i].hasOwnProperty(yrke)) {
      //Add rows from file "kdata"
      kdata.forEach(function(row) {

        if (d.properties.landsting === row.Region) {

          rad = karttabell.insertRow(0);
          cell1 = rad.insertCell(0);
          cell2 = rad.insertCell(1);
          // console.log(row.Kommun)
          cell1.innerHTML = row.Kommun;
          if (typeof row[yrke] === 'undefined'){
            cell2.innerHTML = '';
            }
          else {

            var yrkeform = $.number(row[yrke], 0, ',', '&nbsp;');
            if (yrkeform === '0') {
              yrkeform = '';
            }
            cell2.innerHTML = yrkeform;
            // cell2.innerHTML = row[yrke];
            }
          bubbelvillkor(row);
        }
      })
    }

    if (rdata[i].hasOwnProperty(yrke)) {

      rdata.forEach(function(row) {
        if (landsting === row.Region) {
          rad = karttabell.insertRow(karttabell.rows.length);
          cell1 = rad.insertCell(0);
          cell2 = rad.insertCell(1);
          cell1.innerHTML = 'Regionen';
          //formatted variable for lön with space as thousand separator, will be a string
          var yrkeform = $.number(row[yrke], 0, ',', '&nbsp;');
          //changing zero to blanks
          if (yrkeform === '0') {
            yrkeform = '';
            }
          cell2.innerHTML = yrkeform;
          rad.classList.add('bold');

          if (row[yrke] === '') {
            var cl4 = bubbla.cloneNode(true);
            rad.appendChild(cl4);
            cl4.innerHTML = 'Uppgift om lön saknas då det finns få eller inga anställda i yrket.';
            showhide(rad, cl4);
            rad.classList.add('bubbla');
            }
          }
        })
    }
}

  //Create the headline
  var rub = document.createElement('H3');
  var rubtext = document.createTextNode(lan);
  rub.appendChild(rubtext);
  kartpopuprubbe.appendChild(rub);
  if (karttabell.innerHTML === '') {
    karttabell.innerHTML = '<p>Uppgift saknas då det finns för få eller inga anställda i yrkeskategorin.</p>';
  }
}

//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");

//Position of the tooltip relative to the cursor
var tooltipOffset = {x: 5, y: -25};

//Create a tooltip, hidden at the start
function showTooltip(d) {
  moveTooltip();
  if (window.innerWidth > 768) {
    tooltip.style("display","block")
        .text(d.properties.lan_namn);

  }
  }

//Move the tooltip to track the mouse
function moveTooltip() {
  tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
      .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
}

//Create a tooltip, hidden at the start
function hideTooltip() {
  tooltip.style("display","none");
}


})();
