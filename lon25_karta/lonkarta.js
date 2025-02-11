//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

var kartpopup = document.getElementById("kartpopup");
var kartpopuprubbe = document.getElementById("kartpopuprubbe");

// Stuff for the Map

//Map dimensions (in pixels)
var width = 350,
height = 800;

//Map projection
var projection = d3.geo.conicEqualArea()
.scale(3000)
.center([14,66]) //projection center
.parallels([55.33916500000001,69.0603]) //parallels for conic projection
.rotate([343.73689396511037]) //rotation for conic projection
.translate([480,150]); //translate to center the map in view

//Generate paths based on projection
var path2 = d3.geo.path()
.projection(projection);

//Create an SVG
var svg = d3.select("#kartdiv").append("svg")
.attr("width", width)
.attr("height", height);

//Group for the map features
var features = svg.append("g")
.attr("class","features");

//Create zoom/pan listener
//Change [1,Infinity] to adjust the min/max zoom scale
var zoom = d3.behavior.zoom()
.scaleExtent([1, Infinity])
.on("zoom",zoomed);

// svg.call(zoom);

//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");



//read the file of cities
// d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/protester_orter.json", function(error, data)
d3.json("lonkarta.json", function(error, data)
{

  //add circles
  svg
    .selectAll("myCircles")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return projection([d.lng, d.lat])[0] })
    .attr("cy", function(d){ return projection([d.lng, d.lat])[1] })
    .attr("r", 15)
    .style("fill", "#e00f00")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 0.5)
    // .attr("class", "cirkel")
    // .on("click",clicked)
    .on("mouseover", function(d) {
      d3.select(this).attr("r", 15).style("fill", "white");
      showTooltip(d)
    })
    .on("mouseout", function(d) {
      d3.select(this).attr("r", 15).style("fill", "#d00f00");
      hideTooltip()
    });

    // Add text labels
    svg
    .selectAll("myLabels")
    .data(data)
    .enter()
    .append("text")
    // .attr("x", function(d){ return projection([d.lng, d.lat])[0] + 20 })
    .attr("x", function(d) {
      return d.labelPosition === "left"
        ? projection([d.lng, d.lat])[0] - 20
        : projection([d.lng, d.lat])[0] + 20;
    })
    
    // Adjust the position as needed
    .attr("y", function(d){ return projection([d.lng, d.lat])[1] })
    .text(function(d){ return d.city })
    .attr("font-size", "12px")
    .attr("fill", "black")
    .attr("class", "u-textMeta u-textStrong")
    .attr("text-anchor", function(d) {
      return d.labelPosition === "left" ? "end" : "start";
    });
  });

// d3.json("sverige.geojson",function(error,geodata) {
d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/sverige.geojson",function(error,geodata) {

  if (error) return console.log(error); //unknown error, check the console

  //Create a path for each map feature in the data
  features.selectAll("path")
    .data(geodata.features)
    .enter()
    .append("path")
    .attr("d",path2);
    informHeight();


});


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
    .html("<strong>" + d.city + "</strong><br>" + d.text)
}

//Move the tooltip to track the mouse
function moveTooltip() {
  tooltip.style("top",(d3.event.pageY-40)+"px")
  .style("left",(d3.event.pageX-30)+"px");

}

//Create a tooltip, hidden at the start
function hideTooltip() {
  tooltip.style("display","none");
}


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

