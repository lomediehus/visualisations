// Bar charts made with this tutorial: https://www.educative.io/answers/how-to-create-stacked-bar-chart-using-d3

//function to get the correct favicon for the github page
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

const c = console.log.bind(document);



var data1 = [
  { inkomst: "slutlön", lonpension: "21033", tillagg: "0" },
  { inkomst: "46 år i Sverige", lonpension: "15792", tillagg: "0"  },
  { inkomst: "20 år i Sverige", lonpension: "8607", tillagg: "0"  },
  { inkomst: "10 år i Sverige", lonpension: "4599", tillagg: "0"  }
  ];

var dataset1 = d3.layout.stack()(["lonpension", "tillagg"].map(function(fruit) {
  return data1.map(function(d) {
    return {x: d.inkomst, y: +d[fruit]};

    // return {x: d3.time.format("%Y").parse(d.year), y: +d[fruit]};
  });
}));

var data2 = [
  { inkomst: "slutlön", lonpension: "21033", tillagg: "0" },
  { inkomst: "46 år i Sverige", lonpension: "15792", tillagg: "797"  },
  { inkomst: "20 år i Sverige", lonpension: "8607", tillagg: "6685"  },
  { inkomst: "10 år i Sverige", lonpension: "4599", tillagg: "8578"  }
  ];



var dataset2 = d3.layout.stack()(["lonpension", "tillagg"].map(function(fruit) {
  return data2.map(function(d) {
    return {x: d.inkomst, y: +d[fruit]};

    // return {x: d3.time.format("%Y").parse(d.year), y: +d[fruit]};
  });
}));

var data3 = [
  { inkomst: "slutlön", lonpension: "16217", tillagg: "0" },
  { inkomst: "46 år i Sverige", lonpension: "13234", tillagg: "0"  },
  { inkomst: "20 år i Sverige", lonpension: "7478", tillagg: "0"  },
  { inkomst: "10 år i Sverige", lonpension: "4017", tillagg: "0"  }
  ];

var dataset3 = d3.layout.stack()(["lonpension", "tillagg"].map(function(fruit) {
  return data3.map(function(d) {
    return {x: d.inkomst, y: +d[fruit]};

    // return {x: d3.time.format("%Y").parse(d.year), y: +d[fruit]};
  });
}));

var data4 = [
  { inkomst: "slutlön", lonpension: "16217", tillagg: "0" },
  { inkomst: "46 år i Sverige", lonpension: "13234", tillagg: "2716"  },
  { inkomst: "20 år i Sverige", lonpension: "7478", tillagg: "6690"  },
  { inkomst: "10 år i Sverige", lonpension: "4017", tillagg: "9165"  }
  ];

var dataset4 = d3.layout.stack()(["lonpension", "tillagg"].map(function(fruit) {
  return data4.map(function(d) {
    return {x: d.inkomst, y: +d[fruit]};

    // return {x: d3.time.format("%Y").parse(d.year), y: +d[fruit]};
  });
}));

var colors = ["#c9c7c3", "#048676"];


function doAllStuff(){



var margin = 50;
var width = innerWidth - (innerWidth/5);
var height = 250;

// var margin = 50;
// var width = 300;
// var height = 250;



// Allt för Svg1

// create a tooltip
var Tooltip1 = d3.select("#graph1")
  .append("div")
  .style("opacity", 0)
  .style("position", "absolute")
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("width", "60px")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "3px")
  .style("padding", "2px")
  .attr("class", "u-textMeta")
  

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  Tooltip1
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
}

var mousemove = function(d) {
  Tooltip1
    .html(d.y)
    //postion left, mouse position + xScale.rangeBand, which controls the width of the rects. Tootlip is placed at the amount of pixels left of the position of the nearest positioned ancestor, which is the container div for the charts svg.
    .style("left", (d3.mouse(this)[0]) + (xScale.rangeBand()/3) + "px")
    .style("top", (d3.mouse(this)[1])  +  "px")
}
var mouseleave = function(d) {
  Tooltip1
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 1)
}

var svg1 = d3.select("#graph1")
  .append("svg")
  .attr("width", width + margin + 40 )
  .attr("height", height + margin + 100)
  .append("g")
  .attr("transform", "translate(" + (margin) +  "," + margin/2 + ")")
  // .attr("transform", "translate(" + (margin+30)/2 +  "," + margin/2 + ")")


var xScale = d3.scale.ordinal()
  .domain(dataset1[0].map(function(d) { return d.x; }))
  .rangeRoundBands([0, width], 0.3);

var yScale = d3.scale.linear()
  .domain([0, 25000])
  .range([height, 0]);


  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(6)
  .tickSize(-width, 0, 0)
  // .tickFormat( function(d) { return "kr " + d } );
  .tickFormat( function(d) { return d } );


var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  // .tickFormat(d3.time.format("%Y"));

svg1.append("g")
  .attr("class", "y axis u-textMeta")
  .call(yAxis);

svg1.append("g")
  .attr("class", "x axis u-textMeta")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
    .attr("dx", "-.5em")
    .attr("dy", ".1em")
    .attr("transform", "rotate(-45)");
    
// Y label
svg1.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(25,' + -4 + ')rotate(0)')
  .attr("class", "u-textMeta")
  .text('kronor');


var groups1 = svg1.selectAll("g.bars")
.data(dataset1)
  .enter().append("g")
  .attr("class", "bars")
  .style("fill", function(d, i) { 
    return colors[i]; });

var rect1 = groups1.selectAll("rect")
  .data(function(d) {     
    return d; })
  .enter()
  .append("rect")

    .attr("x", function(d) { 
       return xScale(d.x); })
    .attr("y", function(d) { return yScale(d.y0 + d.y); })
    .attr("height", function(d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
    .attr("width", xScale.rangeBand())   
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
  
  
  groups1.selectAll("rect")
    .filter("rect:first-of-type")
      .attr("class","fillrect")


  // Här kommer en text
d3.select("#graph1")
  .append("h4")
  .html("Tillägg kan jämna ut skillnaden")
  
d3.select("#graph1")
  .append("p")
  .attr("class", "u-textMeta")
  .style("padding-bottom", "10px")
  .html("Den som har låg pension kan ansöka om bostadstillägg  och äldreförsörjningsstöd, som jämnar ut skillnaden. Den gröna delen av stapeln består av dessa tillägg. Långt ifrån alla med låg pension kan dock få tilläggen.")
  

// Allt för svg2

// create a tooltip
var Tooltip2 = d3.select("#graph2")
.append("div")
.style("opacity", 0)
.style("position", "absolute")
.attr("class", "tooltip")
.style("background-color", "white")
.style("width", "60px")
.style("border", "solid")
.style("border-width", "1px")
.style("border-radius", "3px")
.style("padding", "2px")
.attr("class", "u-textMeta")

// Three functions that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
Tooltip2
  .style("opacity", 1)
d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
}

var mousemove = function(d) {
Tooltip2
  .html(d.y)
  //postion left, mouse position + xScale.rangeBand, which controls the width of the rects. Tootlip is placed at the amount of pixels left of the position of the nearest positioned ancestor, which is the container div for the charts svg.
  .style("left", (d3.mouse(this)[0]) + (xScale.rangeBand()/3) + "px")
  .style("top", (d3.mouse(this)[1])  +  "px")
}

var mouseleave = function(d) {
Tooltip2
  .style("opacity", 0)
d3.select(this)
  .style("stroke", "none")
  .style("opacity", 1)
}

    
var svg2 = d3.select("#graph2")
  .append("svg")
  .attr("width", width + margin + 40 )
  .attr("height", height + margin + 100)
  .append("g")
  .attr("transform", "translate(" + (margin) +  "," + margin/2 + ")")


svg2.append("g")
  .attr("class", "y axis u-textMeta")
  // .attr("class", "u-textMeta")
  .call(yAxis);

svg2.append("g")
.attr("class", "x axis u-textMeta")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll("text")
.style("text-anchor", "end")
  .attr("dx", "-.5em")
  .attr("dy", ".1em")
  .attr("transform", "rotate(-45)");

    
// Y label
svg2.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(25,' + -4 + ')rotate(0)')
  .attr("class", "u-textMeta")
  .text('kronor');

var groups2 = svg2.selectAll("g.bars")
.data(dataset2)
  .enter().append("g")
  .attr("class", "bars")
  .style("fill", function(d, i) { 
      return colors[i]});


var rect2 = groups2.selectAll("rect")
.data(function(d) { return d; })
.enter()
.append("rect")
  .attr("x", function(d) { 
  return xScale(d.x); })
  .attr("y", function(d) { return yScale(d.y0 + d.y); })
  .attr("height", function(d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
  .attr("width", xScale.rangeBand())   
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)

groups2.selectAll("rect")
  .filter("rect:first-of-type")
    .attr("class","fillrect")

// Här kommer en text
d3.select("#graph2")
  .append("h4")
  .html("Deltidsarbetande 75%")
  
d3.select("#graph2")
  .append("p")
  .style("padding-bottom", "10px")
  .attr("class", "u-textMeta")
  .html("Så här blir det för en som jobbat deltid, 75 procent. Slutlönen blir då 20100 kronor, vilket blir 16217 kronor efter skatt. ")


// Allt för svg3
// create a tooltip
var Tooltip3 = d3.select("#graph3")
  .append("div")
  .style("opacity", 0)
  .style("position", "absolute")
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("width", "60px")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "3px")
  .style("padding", "2px")
  .attr("class", "u-textMeta")
  

// Three functions that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  Tooltip3
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
}

var mousemove = function(d) {

  Tooltip3
    
    .html(d.y)
    //postion left, mouse position + xScale.rangeBand, which controls the width of the rects. Tootlip is placed at the amount of pixels left of the position of the nearest positioned ancestor, which is the container div for the charts svg.
    .style("left", (d3.mouse(this)[0]) + (xScale.rangeBand()/3) + "px")
    .style("top", (d3.mouse(this)[1])  +  "px")

}
var mouseleave = function(d) {
  Tooltip3
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 1)
}


var svg3 = d3.select("#graph3")
  .append("svg")
  .attr("width", width + margin + 40 )
  .attr("height", height + margin + 100)
  .append("g")
  .attr("transform", "translate(" + (margin) +  "," + margin/2 + ")")


var xScale = d3.scale.ordinal()
  .domain(dataset1[0].map(function(d) { return d.x; }))
  .rangeRoundBands([0, width], 0.3);

var yScale = d3.scale.linear()
  .domain([0, 25000])
  .range([height, 0]);


  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(6)
  .tickSize(-width, 0, 0)
  // .tickFormat( function(d) { return "kr " + d } );
  .tickFormat( function(d) { return d } );


var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  // .tickFormat(d3.time.format("%Y"));

svg3.append("g")
  .attr("class", "y axis u-textMeta")
  .call(yAxis);

svg3.append("g")
  .attr("class", "x axis u-textMeta")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
    .attr("dx", "-.5em")
    .attr("dy", ".1em")
    .attr("transform", "rotate(-45)");

// X label
// svg1.append('text')
//   .attr('x', width/2)
//   .attr('y', height + 30)
//   .attr('text-anchor', 'middle')
//   .style('font-family', 'Helvetica')
//   .style('font-size', 12)
//   .text('Year');
    
// Y label
svg3.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(25,' + -4 + ')rotate(0)')
  // .attr('transform', 'translate(-30,' + height/2 + ')rotate(-90)')

  // .style('font-family', 'Helvetica')
  // .style('font-size', 12)
  .attr("class", "u-textMeta")

  .text('kronor');



var groups3 = svg3.selectAll("g.bars")
.data(dataset3)
  .enter().append("g")
  .attr("class", "bars")
  .style("fill", function(d, i) { 
    // c(d)
    return colors[i]; });
  // .style("stroke", "#000");


var rect3 = groups3.selectAll("rect")
  .data(function(d) {     
    return d; })
  .enter()
  .append("rect")

    .attr("x", function(d) { 
    return xScale(d.x); })
    .attr("y", function(d) { return yScale(d.y0 + d.y); })
    .attr("height", function(d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
    .attr("width", xScale.rangeBand())   
    // .append("svg:title")
    // .text(function(d) { return d.y; })

    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
  
  
  groups3.selectAll("rect")
    .filter("rect:first-of-type")
      .attr("class","fillrect")

  // Här kommer en text
  d3.select("#graph3")
  .append("h4")
  .html("Deltidsarbetande 75% med tillägg")
  
// d3.select("#graph3")
//   .append("p")
//   .attr("class", "u-textMeta")
//   .html("Så här blir det för en som jobbat deltid, 75 procent. Slutlönen blir då 20100 kronor, vilket blir 16217 kronor efter skatt. ")


// Allt för svg4

// create a tooltip
var Tooltip4 = d3.select("#graph4")
  .append("div")
  .style("opacity", 0)
  .style("position", "absolute")
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("width", "60px")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "3px")
  .style("padding", "2px")
  .attr("class", "u-textMeta")
  


// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  Tooltip4
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)

}

var mousemove = function(d) {

  Tooltip4
    
    .html(d.y)
    //postion left, mouse position + xScale.rangeBand, which controls the width of the rects. Tootlip is placed at the amount of pixels left of the position of the nearest positioned ancestor, which is the container div for the charts svg.
    .style("left", (d3.mouse(this)[0]) + (xScale.rangeBand()/3) + "px")
    .style("top", (d3.mouse(this)[1])  +  "px")

}
var mouseleave = function(d) {
  Tooltip4
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 1)
}


var svg4 = d3.select("#graph4")
  .append("svg")
  .attr("width", width + margin + 40 )
  .attr("height", height + margin + 100)
  .append("g")
  .attr("transform", "translate(" + (margin) +  "," + margin/2 + ")")
  // .attr("transform", "translate(" + (margin+30)/2 +  "," + margin/2 + ")")


var xScale = d3.scale.ordinal()
  .domain(dataset4[0].map(function(d) { return d.x; }))
  .rangeRoundBands([0, width], 0.3);

var yScale = d3.scale.linear()
  .domain([0, 25000])
  .range([height, 0]);


  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(6)
  .tickSize(-width, 0, 0)
  // .tickFormat( function(d) { return "kr " + d } );
  .tickFormat( function(d) { return d } );


var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  // .tickFormat(d3.time.format("%Y"));

svg4.append("g")
  .attr("class", "y axis u-textMeta")
  .call(yAxis);

svg4.append("g")
  .attr("class", "x axis u-textMeta")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
    .attr("dx", "-.5em")
    .attr("dy", ".1em")
    .attr("transform", "rotate(-45)");

// X label
// svg1.append('text')
//   .attr('x', width/2)
//   .attr('y', height + 30)
//   .attr('text-anchor', 'middle')
//   .style('font-family', 'Helvetica')
//   .style('font-size', 12)
//   .text('Year');
    
// Y label
svg3.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(25,' + -4 + ')rotate(0)')
  // .attr('transform', 'translate(-30,' + height/2 + ')rotate(-90)')

  // .style('font-family', 'Helvetica')
  // .style('font-size', 12)
  .attr("class", "u-textMeta")

  .text('kronor');



var groups4 = svg4.selectAll("g.bars")
.data(dataset4)
  .enter().append("g")
  .attr("class", "bars")
  .style("fill", function(d, i) { 
    // c(d)
    return colors[i]; });
  // .style("stroke", "#000");


var rect4 = groups4.selectAll("rect")
  .data(function(d) {     
    return d; })
  .enter()
  .append("rect")

    .attr("x", function(d) { 
    return xScale(d.x); })
    .attr("y", function(d) { return yScale(d.y0 + d.y); })
    .attr("height", function(d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
    .attr("width", xScale.rangeBand())   
    // .append("svg:title")
    // .text(function(d) { return d.y; })

    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
  
  
  groups4.selectAll("rect")
    .filter("rect:first-of-type")
      .attr("class","fillrect")


informHeight();

//end of doAllStuff-function
};

doAllStuff();



// Change size of charts on resizeBy, from here: https://www.tutorialspoint.com/how-to-wait-resize-end-event-and-then-perform-an-action-using-javascript

// function to execute JavaScript code after the window resize event completes
function executeAfterResize() {
  document.getElementById("graph1").innerHTML = '';
  document.getElementById("graph2").innerHTML = '';
  document.getElementById("graph3").innerHTML = '';
  document.getElementById("graph4").innerHTML = '';


  doAllStuff();
}
var timeId = null;
window.addEventListener('resize', () => {
  clearTimeout(timeId);
  timeId = setTimeout(executeAfterResize, 500);
});

