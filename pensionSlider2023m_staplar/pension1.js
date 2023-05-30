//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);


//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}


var slider = document.getElementById("myRange");
var deltidslon = document.getElementById('lon');
// var minlon = 24000;
var helpension = document.getElementById('helpension');
var procent = document.getElementById('procent');
var semerknapp = document.getElementById('semer');
var forutsattningar = document.getElementById('forutsattningar');
// output.innerHTML = slider.value + "%"; // Display the default slider value
// let output = document.getElementsByTagName("output")[0];
let output = document.getElementById("slidecontainer").querySelector("output");
var close = document.getElementById("closex");
var content = document.getElementById("content");
var diagramdiv = document.getElementById("diagramdiv");

//Show popup on button click
semer.addEventListener("click", function() {
  if (popup.style.display === "block") {
      popup.style.display = "none";
      semer.innerHTML = "Om uträkningen";
      console.log("style none")
  }
  else {
      popup.style.display = "block";
      semer.innerHTML = "Dölj kommentaren";
    console.log("style block")

  }

  //Give "x" in popup closing function
  close.addEventListener("click", function() {
    popup.style.display = "none";
    semer.innerHTML = "Om uträkningen";
  })

  //give div "content" closing function, i.e. close when click beside.
  content.addEventListener("click", function(e) {
    //make exception for the button, otherwise the popup will be hidden
    if (!e.target.classList.contains("Button")) {
      popup.style.display = "none";
      semer.innerHTML = "Om uträkningen";
    }
      })

  informHeight();

  } )


var siffror = {
  100: {
  Premiepension: 2680,
  Inkomstpension: 12440,
  Garantipension: 1720,
  Tjänstepension: 4770
},
95: {
  Premiepension: 2550,
  Inkomstpension: 11820,
  Garantipension: 2050,
  Tjänstepension: 4530
},
90: {
  Premiepension: 2420,
  Inkomstpension: 11200,
  Garantipension: 2380,
  Tjänstepension: 4290
},
85: {
  Premiepension: 2280,
  Inkomstpension: 10570,
  Garantipension: 2690,
  Tjänstepension: 4050
},
80: {
  Premiepension: 2150,
  Inkomstpension: 9950,
  Garantipension: 2870,
  Tjänstepension: 3810
},
75: {
  Premiepension: 2010,
  Inkomstpension: 9330,
  Garantipension: 3010,
  Tjänstepension: 3580
},
70: {
  Premiepension: 1880,
  Inkomstpension: 8710,
  Garantipension: 3140,
  Tjänstepension: 3340
},
65: {
  Premiepension: 1750,
  Inkomstpension: 8090,
  Garantipension: 3450,
  Tjänstepension: 3100
},
60: {
  Premiepension: 1610,
  Inkomstpension: 7460,
  Garantipension: 3780,
  Tjänstepension: 2860
},
55: {
  Premiepension: 1480,
  Inkomstpension: 6840,
  Garantipension: 4110,
  Tjänstepension: 2620
},
50: {
  Premiepension: 1340,
  Inkomstpension: 6220,
  Garantipension: 4440,
  Tjänstepension: 2380
},
45: {
  Premiepension: 1210,
  Inkomstpension: 5600,
  Garantipension: 4770,
  Tjänstepension: 2150
},
40: {
  Premiepension: 1070,
  Inkomstpension: 4970,
  Garantipension: 5110,
  Tjänstepension: 1910
},
35: {
  Premiepension: 940,
  Inkomstpension: 4350,
  Garantipension: 5790,
  Tjänstepension: 1670
},
30: {
  Premiepension: 810,
  Inkomstpension: 3730,
  Garantipension: 6480,
  Tjänstepension: 1430
},
25: {
  Premiepension: 620,
  Inkomstpension: 2270,
  Garantipension: 8030,
  Tjänstepension: 1190
},
20: {
  Premiepension: 470,
  Inkomstpension: 1650,
  Garantipension: 8730,
  Tjänstepension: 950
}
}


deltidslon.value = 26800;
helpension.value = siffror[100].Premiepension + siffror[100].Inkomstpension + siffror[100].Garantipension + siffror[100].Tjänstepension;
procent.value = Math.round((helpension.value/deltidslon.value)*100) + "%";

//Create a data object for the chart
var data = [
  {
  Inkomstslag: "Lön",
  Value: +deltidslon.value
  },
  {
  Inkomstslag: "Pension",
  Value: +helpension.value
  }
]



//Function for the slider and bar chart, the funtion is called once when document loads, and after window is resized in the executeAfterResize function
function doAllStuff(){


  //Function to control the range slider and thumb  
  function modifyOffset() {
    var el, newPoint, newPlace, offset, siblings, k;
    width  = this.offsetWidth;

    newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
    // was originally -1, changed to -5 to push starting point to left
    offset   = -5;
    if (newPoint < 0) { newPlace = 0;  }
    else if (newPoint > 1) { newPlace = width; }
    else { newPlace = width * newPoint + offset; offset -= newPoint;}
    siblings = this.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        sibling = siblings[i];
        if (sibling.id == this.id) { k = true; }
        if ((k == true) && (sibling.nodeName == "OUTPUT")) {
            outputTag = sibling;
        }
    }
    outputTag.style.left       = newPlace + "px";
    outputTag.style.marginLeft = offset + "%";
    outputTag.innerHTML        = slider.value + "%";


    helpension.value = siffror[this.value].Premiepension + siffror[this.value].Inkomstpension + siffror[this.value].Garantipension + siffror[this.value].Tjänstepension;
    deltidslon.value = (26800 * this.value) / 100;
    procent.value = Math.round((helpension.value/deltidslon.value)*100) + "%";
    output.innerHTML = slider.value + "%";

    // Update the data objecgt
    data[0].Value = +deltidslon.value;
    data[1].Value = +helpension.value;
    animate();
    
    }

    //Function to control the range slider and thumb  
    function modifyInputs() {
      slider.oninput = modifyOffset;
      const event = new Event("input");
      slider.addEventListener(
      "input",
      (e) => {
      },
      false
      );
      slider.dispatchEvent(event);
    }

    //Below is all the code for the bar chart


    //setting local variables, used on y-axis
    locale = d3.formatLocale({
    decimal: ",",
    thousands: "\u00a0",
    grouping: [3],
    currency: ["", ""],
    minus: "\u2212",
    percent: "\u202f%"
    })



    // set the dimensions and margins of the graph, width calculated on parent divs width, making it responsive
    var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = diagramdiv.offsetWidth - margin.left - margin.right,
    // width = 350 - margin.left - margin.right,

    height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#diagramdiv")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



    // Parse the Data
    // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {
    // d3.json(data, function(data) {


    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Inkomstslag; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "axisfat")
    .call(d3.axisBottom(x))
    .selectAll("text")
        // .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("transform", "translate(-10,0)")
        .style("text-anchor", "center");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 27000])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y)
        .ticks(4)
        //make the thousands separator a space instead of a comma, using the formate.locale
        .tickFormat(locale.format('$,.0f')))

    .attr("class", "axis")

    // Create a variable for the bars. They need to be placed inside a "g" element, because text labels cannot be placed inside "rect" elements.
    var bars = svg.selectAll("mybar")
    .data(data)
    .enter().append("g");

    var xbandwidth = x.bandwidth();

    bars.append("rect")
    .attr("x", function(d) { return x(d.Inkomstslag); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    .attr("y", function(d) { return y(d.Value); })
    .attr("height", function(d) { return height - y(d.Value); })
    //append the labels, text content is added later in the animate function
    bars.append("text")
      .attr("class", "label")
      .style("text-anchor", "left")
      //place horisontally where d.Inkomstslag is the placement of the rect and xbandwidth is a variable with av value of halt the width of the rect. Then subtract about half the width of the text element, which varies a bit. Makes the label roughly centered on different screen sizes.
      .attr("x", function(d) { return x(d.Inkomstslag) + xbandwidth/2 -27; })
      //place vertically
      .attr("y", height - 15)


    function animate(d,i) {
    // Animation
    bars.selectAll("rect")
        .transition()
        .duration(400)
        .attr("y", function(d) { return y(d.Value); })
        .attr("height", function(d) { return height - y(d.Value); })
        .delay(function(d,i){ return(i*100)})
    bars.select("text")
         //Update label text, format with thousands separator space and return
        .text(function(d,i) { 
        return locale.format('$,.0f') (data[i].Value);
        })
    }

    modifyInputs();
    informHeight();

}

//Render slider and bar chart for the first time
doAllStuff();

// Change size of charts on resizeBy, from here: https://www.tutorialspoint.com/how-to-wait-resize-end-event-and-then-perform-an-action-using-javascript

// function to execute JavaScript code after the window resize event completes. Without the setTimeout it would update continuously when resizing, a behaviour that makes for a poor user experience
function executeAfterResize() {
  document.getElementById("diagramdiv").innerHTML = '';
  doAllStuff();
}
var timeId = null;
window.addEventListener('resize', () => {
  clearTimeout(timeId);
  timeId = setTimeout(executeAfterResize, 300);
});


// Source code animated bar chart: https://d3-graph-gallery.com/graph/barplot_animation_start.html