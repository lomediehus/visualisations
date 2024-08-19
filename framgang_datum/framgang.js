//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

// Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  c("Jag hittade den! Den var på github!")
}

var cirkeldata;
var loader = document.getElementById("loader");

//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");

//Show tooltip
function showTooltip(d) {
    moveTooltip(); 
    tooltip.style("display","block")
    .text(d.ort);
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

function close(){
  kartpopup.style.display = "none";
  overlay.style.display = "none";
  //Take away class "spin". The class "spin" is added when the wheel is clicked, and it spins only once when the class is added.  You must remove it on close, so it can be added again. 
  // Also take away class "noclick". It is added in the click function so you can't click it again while the wheel spins.
  d3.select("#hjulimg")
    .classed("spin", false)
    .classed("noclick", false);
  let cirklar = document.getElementsByClassName("cirkel");
  cirklar = [...cirklar];
  cirklar.forEach(function(item, index) {
    item.classList.remove("pulse")
    })
}
  
function clicked(d,i) {
  // var clickedCirle = d3.select(this).select("cirlce");
  // clickedCirle.style.fill = "red";

  //get the height and width of the svg as it is rendered at the moment
  let bbcl= document.getElementById("svgel").getBoundingClientRect();
  let svgHeight = bbcl.height;
  let svgWidth = bbcl.width;
  
  let x;
  
  //The x position is related to the width of the svg on large screens, and has a static position on small screens.
  (svgWidth >= 500) ? x = svgWidth/5 : x=10;
  
  //maxY is related to the svg height. y is first declared as the vertical position of the clicked point, then changed to the lowest value of maxY and the clickpoint.
  let maxY = svgHeight - 300;
  let y = d3.event.pageY;
  y = Math.min(y, maxY);

  kartpopup.style.left = x + "px";
  kartpopup.style.top = y + "px";


  kartpopup.style.display = "block";
  overlay.style.display = "block";
  
  let markup = `
    <div id="kartpopuprubbe" class="u-textMeta fet">${d.ort}</div>
    <div id="kartpopuptext" class="u-textMetaDeca"><img src="${d.bildurl}">${d.rubrik}</div>
    ${(() => {
      if (d.url != "") {
        return `
        <a id="kartpopuplink" class="u-textMeta link" target="blank" href="${d.url}">Läs mer här!</a>
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

  overlay.addEventListener("click", function(){
    close()
    })
  closex.addEventListener("click", function() {
      close();
   })  
  }

document.addEventListener("DOMContentLoaded", function() {

    var w = 264;
    var h = 450;
    var svg = d3.select('div#kartdiv').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("id","svgel").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
    var projection = d3.geoConicEqualArea()
        .scale(1800)
        .center([16.382656313727672,62.34103687152436]) //projection center
        .parallels([55.327583999999995,69.059967]) //parallels for conic projection
        .rotate([343.6173436862723]) //rotation for conic projection
        .translate([w*1.44, h/2.4]) //translate to center the map in view;

    var bana = d3.geoPath().projection(projection);
    var map = d3.json("sverige.geojson");
    var windowWidth = window.innerWidth;
    //circle radius should be a bit bigger on small screens (since you use small screens with your fat fingers)
    var radius = windowWidth > 500 ? 5 : 7;

    Promise.all([map]).then(function(values) {

        svg.selectAll("path")
            .data(values[0].features)
            .enter()
            .append("path")
            // .attr("class", "semitransparent")
            .attr("fill", "#87b8b8")
            .attr("d", bana)
   
        //Nesting the circle-drawing to ensure they are drawn after the map is drawn.
        var datafile = d3.json("framgang.json");
        Promise.all([datafile]).then(function(values) {
            cirkeldata = values[0];
            // c(values)
            
            //the datafile items that match the date criteria in function checkDates
            const result = cirkeldata.filter(checkDates);
            c(result.length)
            c(' här är result' + result)
            result.forEach((item) => c(item));

            //Checks if the the date is lower the the date in 'const date'. Change the value of the constant manually to choose which items are shown in the visualization.
            function checkDates(item){
             item.datum = new Date(Date.parse(item.datum))  
              // c(item.datum)
              const date = new Date("2023-01-01");
              c(item.datum > date)
              return item.datum > date
             }
            
            // const dateString = "2022/01/31";
            // const dateObject = new Date(Date.parse(dateString));

            //get img urls to preload them
            const imageUrls = [];      
            result.forEach(function(item) {
            // cirkeldata.forEach(function(item, index){
              // console.log(item.bildurl)
              imageUrls.push(item.bildurl)
              // c(item.datum)
            })

            function preloadImages(urls) {
              urls.forEach(url => {
                  const img = new Image();  // Create new Image object
                  img.src = url;            // Set the src to the image URL
              });
            }

            
          
            // Call the function to preload the images when your page loads
            window.onload = function() {
                preloadImages(imageUrls);
            };

            svg
            .selectAll("myCircles")
            .data(result)
            // .data(values[0])
            .enter()
            .append("circle")
            .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
            .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
            .attr("r", radius)
            .attr("class", function(d){

              switch (d.kategori) {
                case "arbetskläder":
                  return "cirkel blue";
                case "arbetsskor":
                  return "cirkel blue";
                case "arbetstid":
                  return "cirkel green";
                case "dygnsvila":
                  return "cirkel lila";
                case "schema":
                  return "cirkel pink";
                case "minutstyrning":
                  return "cirkel pink";
                case "utbildning":
                  return "cirkel orange";
                case "yrkesbevis":
                  return "cirkel orange";
                case "språkproblem":
                  return "cirkel darkgreen";
                case "arbetsvillkor":
                  return "cirkel darkgreen";
                case "lön":
                  return "cirkel turkos";
              }

            })
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 0.5)
            // .attr("class", "cirkel")
            .on("click",clicked)
            .on("mouseover", function(d) {
              showTooltip(d)
              })
            .on("mouseout", function(d) {
            // d3.select(this).attr("r", 5).style("fill", "#d00f00");
            hideTooltip()
            });

            d3.selectAll(".checkbox").on("click", function(){
              var value = this.value;

              d3.selectAll(".cirkel").each(function(d,i) {
                d3.select(".red").classed("inactive", false)
                if (value === "alla") {
                  d3.selectAll(".cirkel").style("visibility", "visible")
                  d3.select(".red").classed("inactive", true)
                }
                if (value === d.kategori) {
                  this.style.visibility = "visible";
                }
                else {
                  this.style.visibility = "hidden";
                }
              })

            })

            d3.select("#hjulimg").on("click", function() {
              document.getElementById("hjulljud").play()
              //Get a random number within the lengt of the cirkeldata array
              let slumpsiffra = Math.floor(Math.random()*cirkeldata.length)
              //Wheel spins one round when the class is added
              this.classList.add("spin")
              //Add class "noclick"  to prevent user from clicking more than once (otherwise shows popupwindow every time it's clicked). Class is removed in the "close" function, then you can click again.
              this.classList.add("noclick")
              //the item in the cirkeldata that corresponds to the chosen random number
              let selectedData = cirkeldata[slumpsiffra];

              // Identify the circle with the corresponding data
              let selectedCircle = d3.selectAll("circle") 
                .filter(function(d) {
                    //d represents the data bound to each circle
                    return d === selectedData;
                });

    
              setTimeout(function() {
                clickedSpinner(cirkeldata[slumpsiffra]);
                selectedCircle.classed("pulse", true); 
            }, 1800);


          function clickedSpinner(d,i) {
         
            //manuell position eftersom jag inte kan få klick-position in i timer-funktionen
            var x = 10;
            var y = 150;
            kartpopup.style.left = x + "px";
            kartpopup.style.top = y + "px";
            kartpopup.style.display = "block";
            overlay.style.display = "block";
          
            let markup = `
              <div id="kartpopuprubbe" class="u-textMeta fet">${d.ort}</div>
              <div id="kartpopuptext" class="u-textMetaDeca"><img src="${d.bildurl}">${d.rubrik}</div>
              ${(() => {
                if (d.url != "") {
                  return `
                  <a id="kartpopuplink" class="u-textMeta link" target="blank" href="${d.url}">Läs mer här!</a>
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
          
              overlay.addEventListener("click", function(){
                  close()
          
              })
              closex.addEventListener("click", function() {
                close()
              })

            }
              
            }); 

      })
     
      informHeight();
});

    
});



