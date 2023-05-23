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

var colors = ["#c9c7c3", "#048676"];

var dataset1 = d3.layout.stack()(["lonpension", "tillagg"].map(function(fruit) {
  return data1.map(function(d) {
    return {x: d.inkomst, y: +d[fruit]};

    // return {x: d3.time.format("%Y").parse(d.year), y: +d[fruit]};
  });
}));



var margin = 50;
var width = 300;
var height = 250;

//NY    
var svg1 = d3.select("body")
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

//NY  
svg1.append("g")
  .attr("class", "x axis u-textMeta")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
    .attr("dx", "-.5em")
    .attr("dy", ".1em")
    .attr("transform", "rotate(-45)");;

// X label
// svg1.append('text')
//   .attr('x', width/2)
//   .attr('y', height + 30)
//   .attr('text-anchor', 'middle')
//   .style('font-family', 'Helvetica')
//   .style('font-size', 12)
//   .text('Year');
    
// Y label
svg1.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(25,' + -4 + ')rotate(0)')
  // .attr('transform', 'translate(-30,' + height/2 + ')rotate(-90)')

  // .style('font-family', 'Helvetica')
  // .style('font-size', 12)
  .attr("class", "u-textMeta")

  .text('kronor');



var groups1 = svg1.selectAll("g.bars")
.data(dataset1)
  .enter().append("g")
  .attr("class", "bars")
  .style("fill", function(d, i) { 
    // c(d)
    return colors[i]; });
  // .style("stroke", "#000");


//NY
var rect1 = groups1.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
    .attr("x", function(d) { 
    return xScale(d.x); })
    .attr("y", function(d) { return yScale(d.y0 + d.y); })
    .attr("height", function(d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
    .attr("width", xScale.rangeBand())   
    .append("svg:title")
    .text(function(d) { return d.y; });
  
  //NY
  groups1.selectAll("rect")
    .filter("rect:first-of-type")
      .attr("class","fillrect")


  



  // Här kommer en text
d3.select("body")
  .append("h4")
  .html("Tillägg kan jämna ut skillnaden")
  
d3.select("body")
  .append("p")
  .attr("class", "u-textMeta")
  .html("Den som har låg pension kan ansöka om bostadstillägg  och äldreförsörjningsstöd, som jämnar ut skillnaden. Den gröna delen av stapeln består av dessa tillägg. Långt ifrån alla med låg pension kan dock få tilläggen.")
  



  // Allt för svg2

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
  
  
  
  var margin = 50;
      var width = 600;
          height = 300;
      
 
  

  var svg2 = d3.select("body")
  .append("svg")
  .attr("width", width + margin + 40 )
  .attr("height", height + margin + 20)
  .append("g")
  .attr("transform", "translate(" + (margin) +  "," + margin/2 + ")")
  // .attr("transform", "translate(" + (margin+30)/2 +  "," + margin/2 + ")")



var xScale = d3.scale.ordinal()
  .domain(dataset2[0].map(function(d) { return d.x; }))
  .rangeRoundBands([0, width], 0.5);

var yScale = d3.scale.linear()
  .domain([0, 25000])
  .range([height, 0]);


  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(6)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );
  // .tickFormat( function(d) { return "kr " + d } );


var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  // .tickFormat(d3.time.format("%Y"));

svg2.append("g")
  .attr("class", "y axis u-textMeta")
  // .attr("class", "u-textMeta")
  .call(yAxis);

svg2.append("g")
  .attr("class", "x axis u-textMeta")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

// X label
// svg2.append('text')
//   .attr('x', width/2)
//   .attr('y', height + 30)
//   .attr('text-anchor', 'middle')
//   .style('font-family', 'Helvetica')
//   .style('font-size', 12)
//   .text('Year');
    
// Y label
svg2.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(25,' + -4 + ')rotate(0)')

  // .attr('transform', 'translate(-30,' + height/2 + ')rotate(-90)')
  // .style('font-family', 'Helvetica')
  .attr("class", "u-textMeta")
  // .style('font-size', 12)
  .text('kronor');



var groups2 = svg2.selectAll("g.bars")
.data(dataset2)
  .enter().append("g")
  .attr("class", "bars")
  .style("fill", function(d, i) { 
      return colors[i]});

//   d3.select(".bars")
  
// .style("fill", "orange");


 
  //     d3.selectAll(".bars")
  //   .filter(":last-child")
  //   .filter(function(d,i) {
  //     c(d[i])
  //     return d = (d[i].y);
  //   })
  // .style("fill", "orange");

    

  // .style("stroke", "#000");

var rect2 = groups2.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return xScale(d.x); })
  .attr("y", function(d) { return yScale(d.y0 + d.y); })
  .attr("height", function(d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
  .attr("width", xScale.rangeBand())
  .append("svg:title")
  .text(function(d) { return d.y; });


  groups2.selectAll("rect")
  .filter("rect:first-of-type")
    .attr("class", "fillrect");


informHeight();
