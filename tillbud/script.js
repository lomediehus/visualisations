var elem = document.getElementById("animate");
var pos = -200;
var noder = document.getElementsByClassName('animate-content');
var kartpopup = document.getElementById("kartpopup");
var overlay = document.getElementById("overlay");
var kartpopuprubbe = document.getElementById("kartpopuprubbe");
var jsondata;


function close() {
  kartpopup.style.display = "none";
  overlay.style.display = "none";
}

overlay.addEventListener("click", function() {
  close();
});


// Stuff for the Map

//Map dimensions (in pixels)
var width = 350,
height = 830;

//Map projection
var projection = d3.geo.conicEqualArea()
.scale(3300)
.center([13,66]) //projection center
.parallels([55.33916500000001,69.0603]) //parallels for conic projection
.rotate([343.73689396511037]) //rotation for conic projection
.translate([470,150]); //translate to center the map in view




//Generate paths based on projection
var path2 = d3.geo.path()
.projection(projection);

//Create an SVG
var svg = d3.select("#kartdiv").append("svg")
.attr("width", width)
.attr("height", height);

//Group for the map features
var features = svg.append("g")
.attr("class","features")
.attr("fill", "#74b2b2")

//Create zoom/pan listener
//Change [1,Infinity] to adjust the min/max zoom scale
var zoom = d3.behavior.zoom()
.scaleExtent([1, Infinity])
// .on("zoom",zoomed);

// svg.call(zoom);

//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");



//read the file of cities
d3.json("tillbud.json", function(error, data)
{
  jsondata = data;

  //add circles
  svg
  .selectAll("myCircles")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d){ return projection([d.Long, d.Lat])[0] })
  .attr("cy", function(d){ return projection([d.Long, d.Lat])[1] })
  .attr("r", 5)
  // .style("fill", "#e00f00")
  .style("fill", function(d) {
    if (d.KommunNamn === "ESUNA" || d.KommunNamn === "STOLM") {

    // if (d.Antal === "failed") {
      return "#539DC2"
    }
    else return "#e00f00"
  })
  .attr("stroke", "#ffffff")
  .attr("stroke-width", 0.5)
  // .attr("class", "cirkel")
  .on("click",clicked)
  .on("mouseover", function(d) {
    d3.select(this).attr("r", 5).style("fill", "white");
    showTooltip(d)
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("r", 5).style("fill", "#e00f00");
    hideTooltip()
  })

}

);


// d3.json("sverige.geojson",function(error,geodata) {
d3.json("sverige.geojson",function(error,geodata) {


  if (error) return console.log(error); //unknown error, check the console

  //Create a path for each map feature in the data
  features.selectAll("path")
  .data(geodata.features)
  .enter()
  .append("path")
  .attr("d",path2);




});

// Add optional onClick events for features here
// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
function clicked(d,i,data) {
  let counter = 0;
  let privatcounter = 0;
  let kommunalcounter = 0;

   jsondata.forEach((item, i) => {
     if (item.KommunNamn === d.KommunNamn) {
       counter++;

       // if ((item.AnstalldesOrgnamn.indexOf("KOMMUN") !== -1) || (item.AnstalldesOrgnamn.indexOf("REGION") !== -1)) {
      if (item.AnstalldesOrgnr.toString().startsWith("212")) {
         kommunalcounter++;
       }
       else {
         privatcounter++;
       }
     }

   });

  let result;

  if  (counter < 2) {
      result = 'händelse'
    }
    else {
      result = 'händelser'
    }

  console.log(event.clientY)
  console.log(event.pageY)


  kartpopup.style.display = "block";
  overlay.style.display = "block";

  // kartpopup.style("top",(d3.event.pageY-40)+"px")
  // .style("left",(d3.event.pageX-30)+"px");

 //Style with conditional to keep the lowest popups from disappearing under the screen
  kartpopup.style.top = (event.pageY < 700) ? (event.clientY + "px") : ((event.clientY - 100) + "px");
  kartpopup.style.left = "30px";

  let markup = `
  <div id="kartpopuprubbe" class="u-textMeta fet">${d.KommunNamn}</div>
  <div id="kartpopupdatum" class="u-textMeta red">${counter} ${result}</div>
  <div id="kartpopuptext" class="u-textMeta">varav ${kommunalcounter} från kommunal verksamhet och ${privatcounter} från privat.</div>


  <div class="close"><img id="closex" class="closex" src="closex.png"></img></div>
  `

  kartpopup.innerHTML = markup;
  closex.addEventListener("click", function() {
    close();
  })

}


//Update map on zoom/pan
function zoomed() {
  features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
  .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px" );
}


//Position of the tooltip relative to the cursor
var tooltipOffset = {x: 5, y: -25};

//Create a tooltip, hidden at the start
function showTooltip(d) {
  moveTooltip();

  tooltip.style("display","block")
  .text(d.KommunNamn)
  // .attr("class", "caps");
}

//Move the tooltip to track the mouse
function moveTooltip() {
  // tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")

  tooltip.style("top",(d3.event.pageY-40)+"px")
  // .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
  .style("left",(d3.event.pageX-30)+"px");

}

//Create a tooltip, hidden at the start
function hideTooltip() {
  tooltip.style("display","none");
}


setTimeout(informHeight(), 2000)

const body = document.querySelector('body');

//if todays date is higher than 9 march change background color   
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
