(function () {
    'use strict';

//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

 //array for the bar graph, declared in global scope to be used also from script "brandlon.js"
//array for the bar graph, declared in global scope to be used also from script "brandlon.js"
window.riksYrken = [
  {
    "yrke": "Ambulanssjukvårdare",
    "lön": 32198
  },
  {
    "yrke": "Anläggningsarbetare",
    "lön": 31810
  },
  {
    "yrke": "Barnskötare",
    "lön": 27577
  },
  {
    "yrke": "Barnsköterska",
    "lön": 30326
  },
  {
    "yrke": "Biträde, region",
    "lön": 25752
  },
  {
    "yrke": "Boendestödjare",
    "lön": 28715
  },
  {
    "yrke": "Brandman",
    "lön": 30783
  },
  {
    "yrke": "Elevassistent",
    "lön": 27899
  },
  {
    "yrke": "Fastighetsskötare",
    "lön": 30263
  },
  {
    "yrke": "Fordonsförare",
    "lön": 29530
  },
  {
    "yrke": "Fotvårdsspecialist",
    "lön": 31833
  },
  {
    "yrke": "Fritidsledare",
    "lön": 30141
  },
  {
    "yrke": "Förrådsarbetare",
    "lön": 28143
  },
  {
    "yrke": "Kock",
    "lön": 29780
  },
  {
    "yrke": "Lärarassistent",
    "lön": 30222
  },
  {
    "yrke": "Måltidspersonal",
    "lön": 26628
  },
  {
    "yrke": "Park- och trädgårdsarbetare",
    "lön": 29332
  },
  {
    "yrke": "Personlig assistent",
    "lön": 27602
  },
  {
    "yrke": "Renhållningsarbetare",
    "lön": 29555
  },
  {
    "yrke": "Skötare",
    "lön": 29561
  },
  {
    "yrke": "Städare/Lokalvårdare",
    "lön": 26354
  },
  {
    "yrke": "Stödassistent",
    "lön": 28917
  },
  {
    "yrke": "Stödpedagog",
    "lön": 32800
  },
  {
    "yrke": "Undersköterska",
    "lön": 29035
  },
  {
    "yrke": "Vaktmästare",
    "lön": 28813
  },
  {
    "yrke": "Vårdbiträde",
    "lön": 25125
  },
  {
    "yrke": "Vårdbiträde-funktionshinder",
    "lön": 25958
  }
]

var kommunloner = "kommunloner24.json";
var regionloner = "regionloner24.json";
var sokvagGeografi = "SverigesLan2019.geojson";
var kdata = null;
var rdata = null;
var rad;
var yrkesarray = [];
var bubbla = document.createElement('span');
bubbla.className = 'bubblatext';
var yrke = "Väljyrke";
var regionsnitt;
var kommunsnitt;
var brandsnitt;
var highest, place, highestKommun = 0, highestLandsting = 0, placeKommun = '', placeLandsting = '';
var lowest, place2, lowestKommun = 50000, lowestLandsting = 50000, place2Kommun = '', place2Landsting = '';
//variables for elements from html document
var tabell = document.getElementById('mintabell');
// var sortKommunFall = document.getElementById('sortKommunFall');
// var sortKommunStig = document.getElementById('sortKommunStig');
var sortLonFall = document.getElementById('sortLonFall');
var sortLonStig = document.getElementById('sortLonStig');
var kartpopup = document.getElementById('kartpopup');
var kartpopuprubbe = document.getElementById('kartpopuprubbe');
var brandkartpopup = document.getElementById("brandkartpopup")
var close = document.getElementById("closex");
var yrkesspan = document.getElementById('yrkesspan');
var mintabelldiv = document.getElementById('mintabelldiv');
var overlay = document.getElementById('overlay');
var tabellknappar = document.getElementsByName('tabellknapp');
var yrkesknappar = document.getElementsByName('yrkesknapp');
var valjlandsting = document.getElementById('valjlandsting');
var valjkommun = document.getElementById('valjkommun');
var listLandstingKnapp = document.getElementById('listLandsting');
var listKommunKnapp = document.getElementById('listKommuner');
var selectlista = document.getElementsByTagName('OPTION');
var valjyrke = document.getElementById("valjyrke");
var highlowdiv = document.getElementById('highlowdiv');
var rikssnittp = document.getElementById('rikssnittp');
var semitransparent = document.getElementsByClassName('semitransparent');
var blinkcontainer= document.getElementById("blinkcontainer");
var brandlondiv = document.getElementById("brandlondiv");
var content = document.getElementById("content");

function hittaBrandman(row) {
  if (row.yrke === "Brandman") {
    brandsnitt = row.lön;
  }
}

riksYrken.forEach(hittaBrandman)

$('#highlowdiv').hide();

//Wait for document ready
$(document).ready(function() {

    //choose yrke in list
    valjyrke.addEventListener("change", function() {


      [...semitransparent].forEach(function(element){
        element.style.opacity = 1;
      })
      //resetting variable
      var kommunHasYrke = false;
      yrke = this.value;
      getHighLow(yrke);
      kartpopup.style.display = "none";
      brandkartpopup.style = "none";

      // Select all path elements in your SVG
      let paths = d3.select("#brandkartdiv").selectAll("path");
      paths.nodes().forEach((path) => {       
        //find the yellow paths and turn them green
        if (path.style.fill === "rgb(255, 239, 88)") {
          path.style.fill = "rgb(4, 134, 118)";
        }        
       });

      //Check if yrke is present in file "kdata", if it is, make table from "kdata"
      for (var i = 0; i < kdata.length; i++) {

        if (kdata[i].hasOwnProperty(yrke)) {
          listKommunKnapp.disabled = false;
          listKommunKnapp.checked = true;
          listLandstingKnapp.disabled = true;

          //Sort alphabetically
          kdata.sort(function(a, b){
            var kommunA=a.Kommun.toLowerCase(), kommunB=b.Kommun.toLowerCase();
            if (kommunA < kommunB) //sort string ascending
                return -1;
            if (kommunA > kommunB)
                return 1;
            return 0; //default return value (no sorting)
            })
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

      if (yrke === "Brandman") {
        brandlondiv.style.display = "block";
        content.style.display = "none";
   }
      else {
        brandlondiv.style.display = "none";
        content.style.display = "flex";
        //take away overlay when a selection is made
        if (yrke != "Väljyrke") {
          overlay.style.display = "none";
          blinkcontainer.style.display = "none";
          overlay.style.cursor = "pointer";
          fillHighlowdiv();
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
      }

    //get the number for rikssnitt and put them in place
        if (yrke === "Väljyrke") {
       rikssnittp.innerHTML = '';   
    } 
   
    else if (regionsnitt === undefined && kommunsnitt === undefined) {
      rikssnittp.innerHTML = "<strong class='red big'>" + $.number(brandsnitt, 0, ',', '&#8239;') + ' kr/mån</strong>';
    } else if (regionsnitt === undefined) {
      rikssnittp.innerHTML = "<strong class='red big'>" + $.number(kommunsnitt, 0, ',', '&#8239;') + ' kr/mån</strong>';
    } else if (kommunsnitt === undefined) {
      rikssnittp.innerHTML = "<strong class='red big'>" + $.number(regionsnitt, 0, ',', '&#8239;') + ' kr/mån</strong>';
    }  
    else {
      rikssnittp.innerHTML = "<strong class='red big'>" + $.number(kommunsnitt, 0, ',', '&#8239;') + " kr/mån</strong> (kommun)<br> <strong class='red big'>" + $.number(regionsnitt, 0, ',', '&#8239;') + " kr/mån</strong> (region)";
    }

    //end of change-function
    });

//end of document-ready-function
});

//Comparing values to get the highest and lowest salary
function getHighLow(yrke) {

  highest = 0, lowest = 50000, highestKommun = 0, highestLandsting = 0, placeKommun = '', placeLandsting = '', lowestKommun = 50000, lowestLandsting = 50000, place2Kommun = '', place2Landsting = '';

  rdata.forEach(function(row) {
    //get the rikssnitt, to show in the "rikssnittp". (Has nothing to do with the high-low-values, just found a place in the code where the data was traversed)
    if (row.Region === "RIKSSNITT") {
      regionsnitt = row[yrke];
    }

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
    //get the rikssnitt, to show in the "rikssnittp". (Has nothing to do with the high-low-values, just found a place in the code where the data was traversed)
    if (row.Kommun === "RIKSSNITT") {
      kommunsnitt = row[yrke];
    }

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
    place2 = 'Region Öster\&shy;götland';
  }
  if (place === 'Västra Götalandsregionen'){
    place = 'Västra Götalands\&shy;regionen';
  }
  if (place === 'Region Östergötland'){
    place = 'Region Öster\&shy;götland';
  }
  if (place === 'Oskarshamn'){
    place = 'Oskars\&shy;hamn';
  }
  if (place === 'Kristianstad'){
    place = 'Kristian\&shy;stad';
  }
  if (place === 'Hallstahammar'){
    place = 'Hallsta\&shy;hammar';
  }
  if (place === 'Ljusnarsberg'){
    place = 'Ljusnars\&shy;berg';
  }
  if (place2 === "Söderköping"){
    place2 = 'Söder\&shy;köping';
  }

};

//Putting the result in place
function fillHighlowdiv() {
  if (window.innerWidth > 360) {
    highlowdiv.innerHTML = '<p class="u-textMeta"><strong>Högst: </strong>' + $.number(highest, 0, ',', '&#8239;') + ' kr/mån,  ' + place + '.</p><p class="u-textMeta"><strong>Lägst:</strong> ' + $.number(lowest, 0, ',', '&#8239;') + ' kr/mån, ' + place2 + '.';
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
            makeGraph(riksYrken)
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
// sortKommunFall.addEventListener('click', function() {

//   //check if landsting or kommun is chosen
//   if (getvalue(tabellknappar) === "listKommuner") {
//     kdata.sort(function(a, b){
//       var kommunA=a.Kommun.toLowerCase(), kommunB=b.Kommun.toLowerCase();
//       if (kommunA < kommunB) //sort string ascending
//           return -1;
//       if (kommunA > kommunB)
//           return 1;
//       return 0; //default return value (no sorting)
//       })
//     maketable(kdata, tabell);
//     }

//   else if (getvalue(tabellknappar) === "listLandsting") {
//     rdata.sort(function(a, b){
//       var kommunA=a.Region.toLowerCase(), kommunB=b.Region.toLowerCase();
//       if (kommunA < kommunB) //sort string ascending
//           return -1;
//       if (kommunA > kommunB)
//           return 1;
//       return 0 ;//default return value (no sorting)
//       })
//     maketable(rdata, tabell);
//     }
// });

// sortKommunStig.addEventListener('click', function() {
//   //check if landsting or kommun is chosen
//   if (getvalue(tabellknappar) === "listKommuner") {
//     kdata.sort(function(a, b){
//       var kommunA=a.Kommun.toLowerCase(), kommunB=b.Kommun.toLowerCase();
//       if (kommunA > kommunB) //sort string descending
//           return -1;
//       if (kommunA < kommunB)
//           return 1;
//       return 0; //default return value (no sorting)
//       })
//     maketable(kdata, tabell);
//     }

//   else if (getvalue(tabellknappar) === "listLandsting") {
//     rdata.sort(function(a, b){
//       var kommunA=a.Region.toLowerCase(), kommunB=b.Region.toLowerCase();
//       if (kommunA > kommunB) //sort string descending
//           return -1;
//       if (kommunA < kommunB)
//           return 1;
//       return 0 ;//default return value (no sorting)
//       })
//     maketable(rdata, tabell);
//     }
// });

var fallandeNum = true;
var fallandeAlf = true;

function sortAlphabetical() {
  if (fallandeAlf) {

    if (getvalue(tabellknappar) === "listKommuner") {
      kdata.sort(function(a, b){
        var kommunA=a.Kommun.toLowerCase(), kommunB=b.Kommun.toLowerCase();
        if (kommunA > kommunB) //sort string descending
            return -1;
        if (kommunA < kommunB)
            return 1;
        return 0; //default return value (no sorting)
        })
      maketable(kdata, tabell);
      }
  
    else if (getvalue(tabellknappar) === "listLandsting") {
      rdata.sort(function(a, b){
        var kommunA=a.Region.toLowerCase(), kommunB=b.Region.toLowerCase();
        if (kommunA > kommunB) //sort string descending
            return -1;
        if (kommunA < kommunB)
            return 1;
        return 0 ;//default return value (no sorting)
        })
      maketable(rdata, tabell);
      }

  fallandeAlf = false;

  }
  else if (!fallandeAlf) {

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

    fallandeAlf = true;
  }

}


function sortNumerical() {
  if (fallandeNum) {
    if (getvalue(tabellknappar) === "listKommuner") {
      kdata.sort(function(a, b){
        //Remove empties, otherwise they will be on top
        if (a[yrke] === '' || a[yrke]=== "bort") return 1;
        if (b[yrke] === '' || b[yrke]=== "bort") return -1;
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
    fallandeNum = false;

  }
  else if (!fallandeNum) {
    if (getvalue(tabellknappar) === "listKommuner") {
      kdata.sort(function(a, b){
        // return b[yrke] - a[yrke];
        // console.log("Comparing:", a[yrke], b[yrke]);
        // console.log(typeof a[yrke]);
        if (a[yrke] === '' || a[yrke]=== "bort") return 1;
        if (b[yrke] === '' || b[yrke]=== "bort") return -1;
  
  
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
      fallandeNum = true;
  }

}



// Function for comparing proffessions
// @params 'data' = array of objects loaded from json file with ajax
//         'valdkommun' = kommun or landsting, will be given or chosen from search field or select list
//          index = number indicating at which index to start displaying the proffessions. Needed because the kommun- and landsting files are differently structured
function jamforyrke(data, valdkommun, index) {
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
window.makeGraph = function makeGraph(data1) {
   //start with emptying the chart element
  $("#chart").empty();
   //make new array with filtered data
  var nydata1 = data1.filter(taBortBort);
  //function to remove unwanted items (where the value of "lön" is "bort")
  function taBortBort(value) {
    if (value.lön === "bort") {
      return
    }
    else {
      return value;
    }
  }

  //sort the data
  nydata1.sort(function(x, y){
     return d3.descending(x.lön, y.lön);
  })


  var width = 330,
      barHeight = 25;

  var x = d3.scaleLinear()
      .range([0, width]);

  var chart = d3.select(".chart")
    .attr("width", width);
    
    x.domain([0, d3.max(nydata1, function(d) { return d.lön; })]);

    chart.attr("height", barHeight * nydata1.length);

    var bar = chart.selectAll("g")
        .data(nydata1)
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
        //.html instead of .text here to be able use the html special character '&#8239;' (thin no break space)
        .html(function(d) {
          //using jqery number to put a space as thousands delimiter
          var stringlon = $.number(d.lön, 0, ',', '&#8239;');
          return stringlon; });


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
  kdata.sort(function(a, b){
    var kommunA=a.Kommun.toLowerCase(), kommunB=b.Kommun.toLowerCase();
    if (kommunA < kommunB) //sort string ascending
        return -1;
    if (kommunA > kommunB)
        return 1;
    return 0; //default return value (no sorting)
    })
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

    if (getvalue(yrkesknappar) === "riket") {
      makeGraph(riksYrken)
      //Show which data is chosen
      yrkesspan.innerHTML = 'genomsnitt för hela landet.';
      $('#yrkep').hide().fadeIn();
        //hide the select lists for kommun and landsting
      valjlandsting.style.display = 'none';
      valjkommun.style.display = "none";
      //Show the text ”Välj kommun” in top of the dropdown (associated with value "RIKSSNITT")
      // valjkommun.value = "RIKSSNITT"
    }

    else if (getvalue(yrkesknappar) === "kommuner") {
      //index for kdata is 4 because that is the position of the first proffesion in that array
      jamforyrke(kdata, 'RIKSSNITT', 4);
      //Show which data is chosen
      yrkesspan.innerHTML = 'genomsnitt för alla kommuner.<br>Välj en kommun i listan.';
      $('#yrkep').hide().fadeIn();
      //Show the select list for kommun
      valjkommun.style.display = "block";
      //hide the select list for landsting
      valjlandsting.style.display = 'none';
      //Show the text ”Välj kommun” in top of the dropdown (associated with value "RIKSSNITT")
      valjkommun.value = "RIKSSNITT"
    }

    else if (getvalue(yrkesknappar) === "landsting") {
        //index for rdata is 2 because that is the position of the first proffesion in that array
        jamforyrke(rdata, 'RIKSSNITT', 2);
        //show which data is chosen
        yrkesspan.innerHTML = 'genomsnitt för alla regioner.<p></p>Välj en region i listan:';
        //hide the search filed for kommun
        valjkommun.style.display = "none";
        //show the select list for landsting
        valjlandsting.style.display = 'block';
        //Show the text ”Välj region” in top of the dropdown (associated with value "RIKSSNITT")
        valjlandsting.value = "RIKSSNITT"
        $('#yrkep').hide().fadeIn();
    }
  });
})


//Event for the select list of landsting
valjlandsting.addEventListener("change", function() {

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
  let cell1, cell2;

  data.forEach(function(row) {
    //checking if the passed dataset contains the property "Kommunkod", in which case the file contains kommuner, not landsting
    if (row.hasOwnProperty('Kommunkod')) {
      kommun = true;
    }
   

    if (row.Kommun !== 'RIKSSNITT' && row.Region !== 'RIKSSNITT') {
        rad = tabell.insertRow();
        cell1 = rad.insertCell(0);
        cell2 = rad.insertCell(1);

         
      //if there is a row.Kommun, put the value in cell1, otherwise use the value for row.Region
      row.Kommun ? cell1.innerHTML = row.Kommun : cell1.innerHTML = row.Region;


      //format to number with jquery.number.js plugin.
      //@params: number to convert, decimals to keep, decimal separator, thousands separator
      //(property "yrke" contains salary)
      var yrkeform = $.number(row[yrke], 0, ',', '&#8239;')
      if (yrkeform === '0') {
        yrkeform = '';
      }
      cell2.innerHTML = yrkeform;
    }

    if (row[yrke] === "bort") {
      rad.remove()
    }

  //When to show the yellow bubbles
  bubbelvillkor(row);
  })

  let header = tabell.createTHead();
  let row = header.insertRow(0);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);

  cell1.id = "sortKommunRegion";
  cell2.id = "sortLon"

  if (kommun) {
      cell1.innerHTML = "Kommun<span class='sortpil'>&#8691;</span>";
  }
  else {
    cell1.innerHTML = "Region<span class='sortpil'>&#8691;</span>";
  }

  cell2.innerHTML = "Lön 2023<span class='sortpil'>&#8691;</span>";

  let sortKomReg = document.getElementById("sortKommunRegion")

  sortKomReg.addEventListener("click", function() {
    sortAlphabetical();
  })

  let sortLon = document.getElementById("sortLon");

  sortLon.addEventListener("click", function() {
    sortNumerical()
  })

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

  //Close any open bubbles on clicking anywhere in the document, except for the row that is clicked to show the bubble
  document.addEventListener("click", function() {
    if (!event.target.parentNode.classList.contains('bubbla')){
    // if (event.target.parentNode.classList.contains('bubbla')){

      if (bubble.style.display === "inline") {
      bubble.style.display = "none";
    }
  }
  })
};

function bubbelvillkor(row) {
  if (row.Kommun === 'Sollentuna' && yrke === "Undersköterska") {
    rad.classList.add('bubbla');
    var cl1 = bubbla.cloneNode(true);
    rad.appendChild(cl1);
    cl1.innerHTML = "Då Sollentuna endast har sju anställda undersköterskor, har vi räknat in dem i snittet för Sollentuna AB Solom";
    showhide(rad, cl1);
    }

  else if (row[yrke] === '' ) {
    rad.classList.add('bubbla');
    var cl2 = bubbla.cloneNode(true);
    rad.appendChild(cl2);
    cl2.style.left = '50px';
    cl2.innerHTML = "Uppgift saknas då det finns få eller inga anställda i yrkes&shy;kategorin.";
    showhide(rad, cl2);
    }
  else if (row.Kommun === 'Norrtälje Tiohundra AB') {
    rad.classList.add('bubbla');
    rad.appendChild(bubbla);
    bubbla.innerHTML = "Norrtälje driver omsorg i egen regi genom bolaget Tiohundra AB som ägs av Norrtälje Kommun och Region Stockholm.";
    showhide(rad, bubbla);
    }
  else if (row.Region === 'Norrtälje Tiohundra AB') {
    rad.classList.add('bubbla');
    rad.appendChild(bubbla);
    bubbla.innerHTML = "Siffran avser anställda i hälso- och sjukvården. Bolaget Tiohundra AB ägs av Norrtälje Kommun och Region Stockholm.";
    showhide(rad, bubbla);
    }
  else if (row.Kommun === 'Sollentuna AB Solom' && yrke === "Undersköterska") {
    rad.classList.add('bubbla');
    var cl1 = bubbla.cloneNode(true);
    rad.appendChild(cl1);
    cl1.innerHTML = "Sollentuna driver omsorg i egen regi genom kommunägda bolaget AB Solom. Sju undersköterskor anställda av Sollentuna kommun är inräknade i snittet.";
    showhide(rad, cl1);
    }
  else if (row.Kommun === 'Sollentuna AB Solom') {
    rad.classList.add('bubbla');
    var cl1 = bubbla.cloneNode(true);
    rad.appendChild(cl1);
    cl1.innerHTML = "Sollentuna driver omsorg i egen regi genom kommunägda bolaget AB Solom.";
    showhide(rad, cl1);
    }
 
  else if (row.Kommun === 'Höganäs Omsorg AB') {
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
      .attr("class", "semitransparent")
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
  var lan = d.properties.lan_namn;
  var landsting = d.properties.landsting;
  let cell1, cell2;
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

        if (row[yrke] !== "bort") {        
          if (d.properties.landsting === row.Region) {

            rad = karttabell.insertRow(0);
            cell1 = rad.insertCell(0);
            cell2 = rad.insertCell(1);
            cell1.innerHTML = row.Kommun;
            if (typeof row[yrke] === 'undefined'){
              cell2.innerHTML = '';
              }
            else {

              var yrkeform = $.number(row[yrke], 0, ',', '&#8239;');
              if (yrkeform === '0') {
                yrkeform = '';
              }
              cell2.innerHTML = yrkeform;
              }
            bubbelvillkor(row);
          }

        }  
        // if (row[yrke] === "bort") {
        //   c(rad)
        //   rad.remove()
        // }
      })
    }

    if (rdata[i].hasOwnProperty(yrke)) {
       rdata.forEach(function(row) {
        if (landsting === row.Region) {
          rad = karttabell.insertRow(karttabell.rows.length);
          cell1 = rad.insertCell(0);
          cell2 = rad.insertCell(1);
          cell1.innerHTML = 'Regionanställda';
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

  //Position of kartpopup. If kartpopup is small, position it on the mouseclick position
  if (kartpopup.clientHeight < 200) {
    kartpopup.style.top = (event.offsetY) + 'px';
  }
  //If kartpopup is not that small, position it in the middle of parent div.
  else {
    kartpopup.style.top = (325-kartpopup.clientHeight/2) + 'px';
    //if the position is negative (above parent div), change position to top of parent div
    if (kartpopup.offsetTop <= 0) {
      kartpopup.style.top = "0px"
    }
  }
//end of 'clicked'-function
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


const body = document.querySelector('body');

//if date is higher than today, change background color   
(function() {
  var today = new Date();
  var date = new Date("2025-03-09");
  if (today > date) {
    body.style.backgroundColor = 'rgb(249,249,247)';
  }
  else {
    body.style.backgroundColor = '#fcfaf5'
  }
})();



})();
