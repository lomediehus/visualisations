//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

// Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "../ka_assets/favicon2.ico";
  c("Jag hittade den! Den var på github!")
}


var cirkeldata;
// var loader = document.getElementById("loader");

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
  
  d3.select("#hjulimg")
    .classed("spin", false)
    .classed("noclick", false);
  //Get all cirkels, turn them into an array and remove the "pulse" class
  let cirklar = document.getElementsByClassName("cirkel");
  cirklar = [...cirklar];
  cirklar.forEach(function(item, index) {
    item.classList.remove("pulse")
    })
}
  
function clicked(d,i) {
  // var clickedCirle = d3.select(this).select("cirlce");
  // clickedCirle.style.fill = "red";
  window.open(d.url, '_blank').focus();

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


  // kartpopup.style.display = "block";
  // overlay.style.display = "block";
  
  let markup = `
    <div id="kartpopuprubbe" class="u-textMeta fet">${d.ort}</div>
    <div id="kartpopuptext" class="u-textMetaDeca"><img id="artikelbild" width="300" src="${d.bildurl}">${d.ort}</div>
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
    <div class="close"><img id="closex" class="closex" src="../arbetet_assets/img/closex_svart.png"></img></div>
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
    var h = 230;
    var svg = d3.select('div#kartdiv').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("id","svgel").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
    var projection = d3.geoConicEqualArea()
        .scale(3000)
        .center([5.382656313727672,57]) //projection center
        // .center([16.382656313727672,62.34103687152436]) //projection center

        .parallels([55.327583999999995,69.059967]) //parallels for conic projection
        .rotate([343.6173436862723]) //rotation for conic projection
        .translate([w*0.8, h/0.36]) //translate to center the map in view;

    var bana = d3.geoPath().projection(projection);
    var map = d3.json("SverigesLan2019.geojson");
    var windowWidth = window.innerWidth;
    //circle radius should be a bit bigger on small screens (since you use small screens with your fat fingers)
    var radius = windowWidth > 500 ? 7 : 5;

    const FillNorrbotten = function(feature) {
      return feature.properties.lan_namn === "Norrbottens län" ? "#807f7d" : "#cccccc";
    }

    Promise.all([map]).then(function(values) {

        svg.selectAll("path")
            .data(values[0].features)
            .enter()
            .append("path")
            // .attr("class", "semitransparent")
            // .attr("fill", FillNorrbotten)
            .attr("fill", "#bbbbbb")

            .attr("d", bana)
            .attr("class","shadow")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", "0.7");
   
        //Nesting the circle-drawing to ensure they are drawn after the map is drawn.
        var datafile = d3.json("labbuskor.json");

     

        Promise.all([datafile]).then(function(values) {
            cirkeldata = values[0];
            c(cirkeldata);

          
             cirkeldata.forEach(function(d) {
                d.long = +d.long;
                d.lat = +d.lat;
                d.datum = new Date(d.datum);
                // d.kategori = d.kategori.trim();
            });

            //the datafile items that match the date criteria in function checkDates
            const result = cirkeldata;
            c("Filtered result count:", result.length);
            c("Result data:", result);

            //Checks if the the date is lower the the date in 'const date'. Change the value of the constant manually to choose which items are shown in the visualization.
            function checkDatesCategories(item){
            //  item.datum = new Date(Date.parse(item.datum))  

              // Set the date from which you want the items shown. 
              // Set the date like this: 
              // const date = new Date("2023-01-01");
              // If you don't want to filter by dates, set the value to "null
              const date = new Date("2021-01-01");

              //Set the category you want to show, like this: 
              // const category = 'arbetstid'
              // If you don't want to filter by category, set the value to 'null'
              const category = null;

              //Checks if there is a valid date. Returns true if date/category is 'null', meaning it will not filter out any dates/categories.
              const dateMatches = date ? item.datum > date : true;
              const categoryMatches = category ? item.kategori === category : true;



              // return item.datum > date && item.kategori == category
              return dateMatches && categoryMatches;
             }
            
            //get img urls to preload them
            const imageUrls = [];      
            result.forEach(function(item) {        
              imageUrls.push(item.bildurl)
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

         

            //Add thecircles, give them the class "cirkel" and a class for color depending on the value of d.kategori
            svg
            .selectAll("myCircles")
            .data(result)
            // .data(values[0])
            .enter()
            .append("circle")
            .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
            .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
            .attr("r", radius)
            .attr("class", "cirkel")
            .attr("fill", "#e74c3c")
            .on("click", clicked)
            // .on("mouseover", showTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseout", hideTooltip);

            // Add labels with "ort" and "citat" for each circle
            svg
            .selectAll("myLabels")
            .data(result)
            .enter()
            .append("text")
            .attr("x", function(d){ return projection([d.long, d.lat])[0] + radius + 3; })
            .attr("y", function(d){ return projection([d.long, d.lat])[1] + 4; })
            .attr("class", "label-ort BodyImage-caption")
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style("fill", "#333")
            .text(function(d) { return d.ort; });

            // Add text above the circle with "ort": "Sverige"

            // if (specificCircle) {
            //   svg
            //     .append("text")
            //     .attr("x", function() {
            //       return projection([specificCircle.long, specificCircle.lat])[0] + 150;
            //     })
            //     .attr("y", function() {
            //       return projection([specificCircle.long, specificCircle.lat])[1] - radius - 5; // Adjust the position above the circle
            //     })
            //     .attr("text-anchor", "start")
            //     .text("Hela landet")
            //     .attr("class", "sverige u-textMetaDeca"); // Add a class for styling if needed
            // }




            //Get the elements with class "checkbox", they are defined in the html file. Assign their value to the var "value"            
          

            

      })
     
      informHeight();
      // Show and position the radiobuttons only after kartdiv has a non-zero height
      // Only show the radiobuttons after SVG/layout is ready
      const radiobuttons = document.getElementById('radiobuttons');
      if (radiobuttons) {
        setTimeout(function() {
          radiobuttons.style.display = 'block';
          radiobuttons.style.position = 'static'; // Ensure normal flow
          radiobuttons.style.left = '';
          radiobuttons.style.right = '';
          radiobuttons.style.bottom = '';
          radiobuttons.style.width = '';
          radiobuttons.style.zIndex = '';
          informHeight();
        }, 500); // Delay in milliseconds
      }

});

  
});

const body = document.querySelector('body');
  // Ensure #kartdiv always matches the SVG's height, even if SVG is absolutely positioned
function setKartdivHeightToSVG() {
  const kartdiv = document.getElementById('kartdiv');
  const svg = kartdiv ? kartdiv.querySelector('svg') : null;
  if (kartdiv && svg) {
    const svgRect = svg.getBoundingClientRect();
    kartdiv.style.height = svgRect.height-5 + 'px';
  }
}

// Run after SVG is created and on window resize
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(setKartdivHeightToSVG, 10); // Delay to ensure SVG is rendered
  window.addEventListener('resize', setKartdivHeightToSVG);
});

