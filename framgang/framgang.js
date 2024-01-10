console.log("Kör testskript")



//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");
var cirkeldata;


//function for clicking the radiobuttons to answer the questions
// (function clickButton() {
// buttons = [...document.getElementsByClassName('checkbox')];

// buttons.forEach((button, i) => {
//   //give the button a value, starting on 1 (not =)
//   button.value = "kat" + String(i+1);
//   buttons[i].addEventListener("click", function(){
//     //get the value of the clicked button
//     value = this.value;
//     console.log(this.value)
//   })
// })
// })();

// clickButton()


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
  

function clicked(d,i) {
  console.log(d3.event)


  // Testar att placera vid klicket

    // var x = d3.event.pageX - 50;
    var x = 10;
    var y = d3.event.pageY;
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
          <a id="kartpopuplink" class="u-textMeta red" target="blank" href="${d.url}">Läs mer här!</a>
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
        d3.select("#loader").classed("spin", false)

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
        .translate([w*1.44, h/2.4]) //translate to center the map in view;

    var bana = d3.geoPath().projection(projection);
    var map = d3.json("sverige.geojson");

    Promise.all([map]).then(function(values) {

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
        var datafile = d3.json("framgang.json");
        Promise.all([datafile]).then(function(values) {
            cirkeldata = values[0];

            //get img urls to preload them
            const imageUrls = [];            
            cirkeldata.forEach(function(item, index){
              // console.log(item.bildurl)
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


            svg
            .selectAll("myCircles")
            .data(values[0])
            .enter()
            .append("circle")
            .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
            .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
            .attr("r", 5)
            .attr("class", function(d){

              switch (d.kategori) {
                case "arbetskläder":
                  return "cirkel blue";
                case "arbetsskor":
                  return "cirkel blue";
                case "arbetstid":
                  return "cirkel pink";
                case "dygnsvila":
                  return "cirkel pink";
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
            // d3.select(this).attr("r", 5).style("fill", "white");
            showTooltip(d)
            })
            .on("mouseout", function(d) {
            // d3.select(this).attr("r", 5).style("fill", "#d00f00");
            hideTooltip()
            });

            d3.selectAll(".checkbox").on("click", function(){
              console.log(this.value)
              var value = this.value;

              d3.selectAll(".cirkel").each(function(d,i) {
                if (value === "alla") {
                  d3.selectAll(".cirkel").style("visibility", "visible")

                }
                if (value === d.kategori) {
                  this.style.visibility = "visible"
                }
                else {
                  this.style.visibility = "hidden"
                }
              })

            })

            d3.select("#loader").on("click", function() {
              console.log("click loader")
              let slumpsiffra = Math.floor(Math.random()*cirkeldata.length)

              
              this.classList.add("spin")

              // Capture the d3.event outside the timer
              console.log(d3.event.pageX + '   ' + d3.event.pageY);
              console.log(cirkeldata[slumpsiffra])

    
              setTimeout(function() {
                clickedSpinner(cirkeldata[slumpsiffra]);
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
                  <a id="kartpopuplink" class="u-textMeta red" target="blank" href="${d.url}">Läs mer här!</a>
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
                  d3.select("#loader").classed("spin", false)          
              })
                      
            }
              
            }); 

      })
     
      informHeight();
});







    
});



