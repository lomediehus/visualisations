// var btn = document.createElement("BUTTON")
// var btn2 = document.createElement("BUTTON")

var btn = document.getElementById("knapp");
var btn2 = document.getElementById("knapp2");

var land;
var rubbe = document.getElementById('rubbe');
rubbediv = document.getElementById('rubbediv');

var landlista = [
  {
    "Country": "Sweden",
    "Land": "Sverige",
    "Rut": 16947,
    "Asyl": ""
  },
  {
    "Country": "Poland",
    "Land": "Polen",
    "Rut": 4263,
    "Asyl": ""
  },
  {
    "Country": "Thailand",
    "Land": "Thailand",
    "Rut": 1711,
    "Asyl": ""
  },
  {
    "Country": "Bosnia and Herzegovina",
    "Land": "Bosnien-Hercegovina",
    "Rut": 1170,
    "Asyl": ""
  },
  {
    "Country": "Croatia",
    "Land": "Jugoslavien",
    "Rut": 886,
    "Asyl": ""
  },
  {
    "Country": "Serbia",
    "Land": "Serbien",
    "Rut": 608,
    "Asyl": ""
  },
  {
    "Country": "Macedonia",
    "Land": "Jugoslavien",
    "Rut": 886,
    "Asyl": ""
  },
  {
    "Country": "Montenegro",
    "Land": "Jugoslavien",
    "Rut": 886,
    "Asyl": ""
  },
  {
    "Country": "Slovenia",
    "Land": "Jugoslavien",
    "Rut": 886,
    "Asyl": ""
  },
  {
    "Country": "Iraq",
    "Land": "Irak",
    "Rut": 746,
    "Asyl": 1734
  },
  {
    "Country": "Romania",
    "Land": "Rumänien",
    "Rut": 734
  },
  {
    "Country": "Chile",
    "Land": "Chile",
    "Rut": 553
  },
  {
    "Country": "Eritrea",
    "Land": "Eritrea",
    "Rut": 553,
    "Asyl": 1734
  },
  {
    "Country": "Afghanistan",
    "Land": "Afghanistan",
    "Rut": "",
    "Asyl": 9374
  },
  {
    "Country": "Syria",
    "Land": "Syrien",
    "Rut": "",
    "Asyl": 6878
  },
  {
    "Country": "Iran",
    "Land": "Iran",
    "Rut": "",
    "Asyl": 1157
  },
  {
    "Country": "Somalia",
    "Land": "Somalia",
    "Rut": "",
    "Asyl": 987
  },
  {
    "Country": "Ethiopia",
    "Land": "Etiopien",
    "Rut": "",
    "Asyl": 478
  },
  {
    "Country": "Palestine",
    "Land": "Palestina",
    "Rut": "",
    "Asyl": 200
  },
  {
    "Country": "Yemen",
    "Land": "Jemen",
    "Rut": "",
    "Asyl": 187
  },
  {
    "Country": "Sudan",
    "Land": "Sudan",
    "Rut": "",
    "Asyl": 150
  },






]



//Map dimensions (in pixels)
var width = 600,
    height = 600;

//Map projection
var projection = d3.geo.mercator()
    // .scale(91.60207122365671)
    .scale(180)
    .center([0.35,35]) //projection center
    .translate([width/2.4, height/2.9]) //translate to center the map in view

// width = '100%'

function draw() {

d3.select("svg").remove();

btn.style.visibility = "hidden";

rubbe.innerHTML = ""

// $(rubbe).fadeOut().fadeIn();
rubbe.style.opacity = 0;
$(rubbe).fadeTo(500,1)

// $(rubbe).fadeIn();
rubbe.innerHTML = "De här länderna kommer flest Rut-arbetare ifrån…";
console.log(rubbediv.offsetHeight)


//Generate paths based on projection
var path = d3.geo.path()
    .projection(projection);

//Create an SVG
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", "0 0 " + width + " " + height )
    .attr("preserveAspectRatio", "xMinYMin");


//Group for the map features
var features = svg.append("g")
    .attr("class","features");

// add tooltip
var tooltip = d3.select("body")
    .append("div")
      .attr("class", "tooltip u-textMeta")
      .style("opacity", 0)

// Create zoom/pan listener
// Change [1,Infinity] to adjust the min/max zoom scale
var zoom = d3.behavior.zoom()
    .scaleExtent([1, Infinity])
    .on("zoom",zoomed);

svg.call(zoom);



d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/custom.geo.json",function(error,geodata) {
  if (error) return console.log(error); //unknown error, check the console

  //Create a path for each map feature in the data
  features.selectAll("path")
    .data(geodata.features)
    .enter()
    .append("path")
      .attr("d",path)
      .attr('class', function(d) {
        if (d.properties.name === "Iraq" || d.properties.name === "Eritrea") {
          return "common"}

        else {return "uncommon"}
      })
    .attr('fill', '#d3d3d3')

    // .attr('fill', function(d) {
    //   if(d.properties.name === "Sweden") {
    //     return '#d3d3d3'}
    //
    //   else {return '#d3d3d3'}
    //
    // })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)

    // .attr("d",path)
    //   .style("stroke", "black")
    //   .style("stroke-width", 0.5)
    //     .on("mouseover", mouseover)
    //     .on("mousemove", mousemove)
    //     .on("mouseout", mouseout)



    .on("click",clicked);

    function mouseover(d, i) {
      land = d.properties.name;
      //make tooltip visible only on countries in landlista
      landlista.forEach(function(item, d) {
        if (land === item.Country) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        }
      })


      // tooltip.transition()
      //   .duration(200)
      //   .style("opacity", .9);
    }

    function mousemove(d, i) {

        // tooltip.html("<p><span class='fet versal'>" + d.properties.landsting + "</span></br><span class='fet'>Undersköterskor:</span>	 " + data[i]["Undersköterskor*"]+ "</br><span class='fet'>Sjuksköterskor:</span> " + data[i]["Sjuksköterskor**"]+ '</p>')

          // .style("left", (d3.event.pageX) + "px")
          // .style("top", (d3.event.pageY - 50) + "px");

          // tooltip.html('Land: xxxx. Antal: xxxxx.')
          land = d.properties.name;
          // tooltip.html(d.properties.name)
          tooltip.html(function(d) {
            var tt;
            var tt2 = "";
            var tt3 = "";

            landlista.forEach(function(item, d) {
              if (land === item.Country) {

              if (item.Rut === "") {
                tt2 = "";
              }
              else {
                tt2 = '<br>Rutarbetare: ' + item.Rut;
              }
              if (item.Asyl === "") {
                tt3 = "";
              }
              else {
                tt3 = '<br>Fått asyl: ' + item.Asyl;
              }
              tt = item.Land + tt2 + tt3;
              }
            })
            return tt;
          }
        )

          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 50) + "px");
    }

    function mouseout() {
        tooltip.transition()
          .duration(200)
          .style("opacity", 0);
    }


    function farg() {
      var color;




      features.selectAll("[fill='#d3d3d3']")



      .transition()
        // .duration(3000)
        .attr('fill', function(d) {
          // land = d.properties.name;
          //
          // landlista.forEach(function(item) {
          //   if (item.Country === land) {
          //     color = 'red'
          //   }
          //   else {color =  '#d3d3d3'}
          //
          // })
          //
          // return color;
          if(d.properties.name === landlista[0].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[1].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[2].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[3].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[4].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[5].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[6].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[7].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[8].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[9].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[10].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[11].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[12].Country) {return '#f5cc00'}








          else {return '#d3d3d3'}
        });
        // debugger;
        setTimeout(farg2, 3000)

      }

    function farg2() {
      var rubbe = document.getElementById('rubbe')
      rubbe.innerHTML = "";

      // $(rubbe).fadeOut(5);
      rubbe.style.opacity = 0;
      $(rubbe).fadeTo(500,1);
      rubbe.innerHTML = "…och de här länderna kommer flest flyktingar ifrån"


      features.selectAll('path')
      // .attr('class', 'common')
      .transition()
        .duration(500)
        .attr('fill', function(d) {
          if(d.properties.name === landlista[0].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[1].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[2].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[3].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[4].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[5].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[6].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[7].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[8].Country) {return '#f5cc00'}
          // else if(d.properties.name === landlista[9].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[10].Country) {return '#f5cc00'}
          else if(d.properties.name === landlista[11].Country) {return '#f5cc00'}
          // else if(d.properties.name === landlista[12].Country) {return '#f5cc00'}


          else if(d.properties.name === landlista[13].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[14].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[9].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[12].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[15].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[16].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[17].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[18].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[19].Country) {return '#74b2b2'}
          else if(d.properties.name === landlista[20].Country) {return '#74b2b2'}









          else {return '#d3d3d3'}
        });

      setTimeout(farg3, 3000)
      }


      function farg3() {
        console.log(document.getElementsByClassName('common'))
        console.log(document.getElementsByClassName('uncommon'))
        var rubbe = document.getElementById('rubbe')
        rubbe.innerHTML = "";

        // $(rubbe).fadeOut(5);
        rubbe.style.opacity = 0;

        $(rubbe).fadeTo(500,1);
        rubbe.innerHTML = "Bara två länder sammanfaller"

        features.selectAll('path').transition()
          .duration(3000)
          .attr("transform", "translate(" + -900 + "," + -600 + ")scale(" +3 + ")translate(" + [30,30] + ")")

        setTimeout(farg4, 3000)
        }

        function farg4() {
          features.selectAll(".common")
            .attr('fill', "#80800a")
            setTimeout(farg5, 2000)


        }

        function farg5() {

          btn.style.visibility = "visible";
          btn2.style.visibility = "visible";

          // btn.setAttribute("id", "knapp");
          // btn.setAttribute("class", "Button");
          // btn.innerHTML = "Spela igen"
          // document.body.appendChild(btn);

            // knapp.style.visibility = 'visible';
            btn.addEventListener('click', function() {
              btn2.style.visibility = "hidden";
              btn.style.visibility = "hidden";
              draw()
            })

            // btn2.setAttribute("id", "knapp2");
            // btn2.setAttribute("class", "Button");
            // btn2.innerHTML = "Zooma ut"
            // document.body.appendChild(btn2);

              // knapp.style.visibility = 'visible';
              btn.addEventListener('click', function() {
                draw()
              })

              btn2.addEventListener('click', function() {
                features.selectAll('path').transition()
                  .duration(2000)
                  // .attr("transform", "translate(" + -1100 + "," + -600 + ")scale(" +3 + ")translate(" + [30,30] + ")")
                  .attr("transform", "translate(" + +0 + "," + 0 + ")scale(" + 1 + ")translate(" + [0,0] + ")")

              btn2.style.visibility = "hidden";


              })

        }
      farg()




});

}

draw();




// Add optional onClick events for features here
// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
function clicked(d,i) {
  if (d.properties.name == "Sweden")
{

}
}




//Update map on zoom/pan
function zoomed() {
  features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
      .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px" );
}
