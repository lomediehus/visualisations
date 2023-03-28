var elem = document.getElementById("animate");
var pos = -200;
var noder = document.getElementsByClassName('animate-content');
var kartpopup = document.getElementById("kartpopup");
var overlay = document.getElementById("overlay");
var kartpopuprubbe = document.getElementById("kartpopuprubbe");

function myMove() {
  var count = 0;
  var id = setInterval(frame, 5);
  function frame() {
    if (count == 160) {
      if (elem.offsetLeft > -400) {
        elem.appendChild(noder[0]);
        elem.style.left = pos - 165 + "px";
        pos = pos - 165;
      }
      clearInterval(id);
    } else {
        pos++;
        count++;
        elem.style.left = pos + "px";
    }
  }
  // console.log('pos ' + pos + 'offsetLeft' + elem.offsetLeft)

}

var repeat = setInterval(myMove, 2000);


function close() {
  kartpopup.style.display = "none";
  overlay.style.display = "none";
}

overlay.addEventListener("click", function() {
  close();
});


// Stuff for the Map

//Map dimensions (in pixels)
var width = 200,
height = 600;

//Map projection
var projection = d3.geo.conicEqualArea()
.scale(1800)
.center([14,66]) //projection center
.parallels([55.33916500000001,69.0603]) //parallels for conic projection
.rotate([343.73689396511037]) //rotation for conic projection
.translate([270.51918016849845,180]); //translate to center the map in view

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


d3.json("protester_orter.json", function(error, data) {
  // d3.json("protester_orter.json", function(error, data) {



  d3.select("#animate")
  .selectAll("div")
  .data(data).enter()
  // .append("div").text(function(d) {return d.Stad})
  .append("div").html(function(d) {

    var html = `
    <p class="u-textMeta tunn">${d.Stad}<br><span class="fet">${d.Rubrik}</span><br><span class="u-textMeta red">${d.Datum}
    </span></p></div>
    `;
    return html;

  })

  .attr("class", "animate-content")
  .on("click", clicked);
}
);




//read the file of cities
d3.json("protester_orter.json", function(error, data)
// d3.json("protester_orter.json", function(error, data)

{


  //add circles
  svg
  .selectAll("myCircles")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d){ return projection([d.Long, d.Lat])[0] })
  .attr("cy", function(d){ return projection([d.Long, d.Lat])[1] })
  .attr("r", 5)
  .style("fill", "#e00f00")
  .attr("stroke", "#ffffff")
  .attr("stroke-width", 0.5)
  // .attr("class", "cirkel")
  .on("click",clicked)
  .on("mouseover", function(d) {
    d3.select(this).attr("r", 5).style("fill", "white");
    showTooltip(d)
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("r", 5).style("fill", "#d00f00");
    hideTooltip()
  });
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
function clicked(d,i) {
  console.log(d.Url)
  kartpopup.style.display = "block";
  overlay.style.display = "block";

  let markup = `
  <div id="kartpopuprubbe" class="u-textMeta fet">${d.Stad}</div>
  <div id="kartpopupdatum" class="u-textMeta red">${d.Datum}</div>
  <div id="kartpopuptext" class="u-textMeta">${d.Text}</div>
  ${(() => {
    if (d.Url != "") {
      return `
      <a id="kartpopuplink" class="u-textMeta red" target="blank" href="${d.Url}">Läs mer här!</a>
      `
    }
    else {
      return`
      `
    }
  })()}
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
  .text(d.Stad);
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
