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

tooltip.style("top","80px")
  .style("left","40px")
  .style("right","40px");

// Flag to check if event listeners have been added
var listenersAdded = false;

// Add event listeners to the tooltip's parent element using event delegation
document.body.addEventListener("click", function(event) {
  if (event.target.id === "spanclose" || event.target.classList.contains("closex")) {
    hideTooltip();
  }
});

document.body.addEventListener("touchstart", function(event) {
  if (event.target.id === "spanclose" || event.target.classList.contains("closex")) {
    hideTooltip();
  }
});



//read the file of cities
d3.json("lonkarta.json", function(error, data) {
  if (error) {
    console.error("Error loading data:", error);
    return;
  }

  // Debugging log
  console.log("Data loaded:", data);

    // Remove existing circles to prevent duplicates
    svg.selectAll("circle").remove();

   // Add circles
   let circles = svg
   .selectAll("myCircles")
   .data(data)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
     return projection([d.lng, d.lat])[0];
   })
   .attr("cy", function(d) {
     return projection([d.lng, d.lat])[1];
   })
   .attr("r", 15)
   .style("fill", "#e00f00")
   .attr("stroke", "#ffffff")
   .attr("stroke-width", 0.5)
   .attr("class", "map-circle") // Added a class for easy CSS targeting
   .attr("pointer-events", "all") // Ensure clickability

   // Mouseover: Highlight circle and show tooltip
   .on("mouseover", function(d) {
     console.log("Mouseover on:", d.city);
     d3.select(this).attr("stroke-width", 1);
     showTooltip(d, "mouseover");
   })

   // Mouseout: Reset circle style
   .on("mouseout", function(d) {
    let relatedTarget = event.relatedTarget;
    if (relatedTarget && relatedTarget.tagName === "circle") {
      return; // Don't hide the tooltip if moving between circles
    }
    
    console.log("Mouseout on:", d.city);
    // d3.select(this).attr("r", 15).style("fill", "#e00f00");
    d3.select(this).attr("stroke-width", 0.5);

    hideTooltip();
   })

   // Click and Touchstart: Show tooltip
   .on("click touchstart", function(d) {
     console.log("Circle tapped/clicked:", d.city);
     showTooltip(d, "click/touchstart");
     d3.event.stopPropagation(); // Prevent conflicts
   });

 // Move circles to the top layer to prevent blocking
 d3.selectAll("circle").each(function() {
  this.parentNode.appendChild(this); // Move circles to the top layer
});

 // Ensure circles are visible and clickable
 d3.selectAll("circle").attr("pointer-events", "all");

 // Debugging log: Check if circles exist
 console.log("Circles added:", d3.selectAll("circle").size());
 

  // Add text labels
  svg
    .selectAll("myLabels")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function(d) {
      return d.labelPosition === "left"
        ? projection([d.lng, d.lat])[0] - 20
        : projection([d.lng, d.lat])[0] + 20;
    })
    .attr("y", function(d) {
      return projection([d.lng, d.lat])[1] + 5;
    })
    .text(function(d) {
      return d.city;
    })
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

//Create a tooltip, hidden at the start
function showTooltip(d, eventType) {
  console.log(`Tooltip shown by: ${eventType || "unknown"} | City: ${d.city}`);

  tooltip.style("display", "block")
    .node().innerHTML = "<strong>" + d.city + "</strong><span id='spanclose' class='right'><img src='closex.png' class='closex'></span><br>" + d.text;

  // Add event listeners after the tooltip content is set, if not already added
  if (!listenersAdded) {
    document.getElementById("spanclose").addEventListener("click", hideTooltip);
    document.getElementById("spanclose").addEventListener("touchstart", hideTooltip);
    listenersAdded = true;
  }
}





//hide tooltip
function hideTooltip() {
  tooltip.style("display", "none");
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

// setTimeout(() => {
//   d3.selectAll("circle").on("click", function(d) {
//     console.log("Circle was clicked:", d.city);
//     showTooltip(d);
//   });
// }, 3000);

// svg.selectAll("circle").attr("pointer-events", "all");

// svg.selectAll("circle").each(function () {
//   this.parentNode.appendChild(this);
// });

// setTimeout(() => {
//   console.log("Circles found:", d3.selectAll("circle").size());
// }, 1000);

setTimeout(() => {
  d3.selectAll("circle").on("click touchstart", function(d) {
    console.log("Circle tapped/clicked (delayed bind):", d.city);
    showTooltip(d, "click/touchstart");
    d3.event.stopPropagation();
  });
}, 500); // Small delay to ensure everything is loaded

