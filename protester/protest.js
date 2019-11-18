var elem = document.getElementById("animate");
elem.style.bottom = -400 + "px";
// console.log(elem.offsetTop)
  var pos = -400;

var noder = document.getElementsByClassName('animate-content')
// console.log(noder)

function myMove() {
  var count = 0;
  var id = setInterval(frame, 5);
  function frame() {
    if (count == 125) {
      if (elem.offsetTop < -100) {
        elem.appendChild(noder[0])
        elem.style.bottom = pos -120 + "px";
        pos = pos -125;
      }

      //Fattar inte om denna behövs?
      clearInterval(id);
    } else {
      pos++;
      count++;
      elem.style.bottom = pos + "px";
      // console.log('pos ' + pos + 'offsetTop' + elem.offsetTop)


    }
  }
  // console.log('pos ' + pos + 'offsetTop' + elem.offsetTop)

}

var repeat = setInterval(myMove, 1000);



// myMove()
// Stuff for the Map

//Map dimensions (in pixels)
var width = 200,
    height = 500;

//Map projection
var projection = d3.geo.conicEqualArea()
    .scale(1600)
    .center([14,66]) //projection center
    .parallels([55.33916500000001,69.0603]) //parallels for conic projection
    .rotate([343.73689396511037]) //rotation for conic projection
    .translate([256.51918016849845,150]) //translate to center the map in view

//Generate paths based on projection
var path = d3.geo.path()
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

svg.call(zoom);

//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip");



//read the file of cities
d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/protester_orter.json", function(error, data)
  {
    //add circles
    svg
      .selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 8)
        .style("fill", "#e00f00")
        // .attr("stroke", "#69b3a2")
        // .attr("stroke-width", 3)
        // .attr("fill-opacity", .4)
        .on("click",clicked)
        .on("mouseover",showTooltip)
        .on("mousemove",moveTooltip)
        .on("mouseout",hideTooltip)

    // console.log(data)
  }
);

d3.json("sverige.geojson",function(error,geodata) {
  if (error) return console.log(error); //unknown error, check the console

  //Create a path for each map feature in the data
  features.selectAll("path")
    .data(geodata.features)
    .enter()
    .append("path")
    .attr("d",path);


});

// Add optional onClick events for features here
// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
function clicked(d,i) {
  console.log(d.Stad)
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
      .text(d.Stad);
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
