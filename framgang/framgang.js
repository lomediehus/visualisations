console.log("Kör testskript")

//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");

//Show tooltip
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
  
  //Hide tooltip
  function hideTooltip() {
    tooltip.style("display","none");
  }
  

function clicked(d,i) {
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
      <div class="close"><img id="closex" class="closex" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/closex.png"></img></div>
      `
  
    kartpopup.innerHTML = markup;

    overlay.addEventListener("click", function(){
        kartpopup.style.display = "none";
        overlay.style.display = "none";

    })
    closex.addEventListener("click", function() {
    //   close();
        kartpopup.style.display = "none";
        overlay.style.display = "none";
    })
  
  }

document.addEventListener("DOMContentLoaded", function() {

    var w = 264;
    var h = 450;
    var svg = d3.select('div#kartdiv').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
    var projection = d3.geoConicEqualArea()
        .scale(1800)
        .center([16.382656313727672,62.34103687152436]) //projection center
        .parallels([55.327583999999995,69.059967]) //parallels for conic projection
        .rotate([343.6173436862723]) //rotation for conic projection
        .translate([w*1.4, h/2.4]) //translate to center the map in view;

    var bana = d3.geoPath().projection(projection);
    var map = d3.json("sverige.geojson");

    Promise.all([map]).then(function(values) {

        console.log(values)
        svg.selectAll("path")
            .data(values[0].features)
            .enter()
            .append("path")
            // .attr("class", "semitransparent")
            .attr("fill", "#87b8b8")
            .attr("d", bana)
            
        //       .on("mouseover",showTooltip)
        //       .on("mousemove",moveTooltip)
        //       .on("mouseout",hideTooltip)
        //       .on("click", clicked);
    
        //Nesting the circle-drawing to ensure they are drawn after the map is drawn.
        var datafile = d3.json("protester_orter.json");
        Promise.all([datafile]).then(function(values) {
            console.log(values)


            svg
            .selectAll("myCircles")
            .data(values[0])
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
      })



});



       
     



    
});



