console.log("Kör testskript")



//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
// let host = window.location.host;
// if (host.includes("github")) {
//   document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
// }



//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");
var cirkeldata;
var loader = document.getElementById("loader");


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
    var clickedCirle = d3.select(this).select("cirlce");
    console.log(clickedCirle)
    clickedCirle.style.fill = "red";
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
        kartpopup.style.display = "none";
        overlay.style.display = "none";

    })
    closex.addEventListener("click", function() {
    //   close();
        loader.classList.remove("noclick")

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

            d3.select("#loader").on("click", function() {
              console.log("click loader")
              let slumpsiffra = Math.floor(Math.random()*cirkeldata.length)

              this.classList.add("spin")
              this.classList.add("noclick")

              let selectedData = cirkeldata[slumpsiffra];

              // Identify the circle with the corresponding data
              let selectedCircle = d3.selectAll("circle") 
                .filter(function(d) {
                    //d represents the data bound to each circle
                    return d === selectedData;
                });

              // Add a class to the selected circle
              // selectedCircle.classed("red", true); // 'highlighted-circle' is the name of the class you want to add

    
              setTimeout(function() {
                clickedSpinner(cirkeldata[slumpsiffra]);
                selectedCircle.classed("pulse", true); // 'highlighted-circle' is the name of the class you want to add
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
                  kartpopup.style.display = "none";
                  overlay.style.display = "none";
                  loader.classList.remove("noclick")
                  loader.classList.remove("spin")

                  let cirklar = document.getElementsByClassName("cirkel");
                  cirklar = [...cirklar];
                  cirklar.forEach(function(item, index) {
                    item.classList.remove("pulse")
                    
                    })
          
              })
              closex.addEventListener("click", function() {
                c("closefunk rad 308")
                //make the loader clickable again  
                loader.classList.remove("noclick")

                kartpopup.style.display = "none";
                overlay.style.display = "none";
                d3.select("#loader").classed("spin", false)   
                
                
                let cirklar = document.getElementsByClassName("cirkel");
                cirklar = [...cirklar];
                cirklar.forEach(function(item, index) {
                  item.classList.remove("pulse")
                  
                  })
              })

             

                      
            }
              
            }); 

          

      })
     
      informHeight();
});







    
});



