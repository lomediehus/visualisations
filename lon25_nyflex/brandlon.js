;(function() {

  //make it possible to console log with c(tobelogged)
  const c = console.log.bind(document);

  window.setTimeout(setFire, 2000)

  //Delay all actions 2 seconds. Means everything will be loaded and drawn while user is looking att the start screen. Works well because it takes more than 2 seconds for user to choose "brandman" from the menu, and when the user does choose "brandman" everything will be ready to be shown.
  function setFire(){
    var lonefil;
    var tabell = document.getElementById('brandtabell');
    var rensaknapp = document.getElementById('rensaknapp');
    var rensaElement = document.getElementsByClassName('invisible');
    var brandkartpopup = document.getElementById('brandkartpopup');
    var popuptext = document. getElementById('popuptext');
    var close = document.getElementById("brandclosex");
   
    //close the popup by clicking the "x"
    close.addEventListener("click", function() {
      brandkartpopup.style.display = "none";
    })

    //Reading a file
    $.ajax({
            url: "brandlon24.json",
            dataType: "json",
            mimeType: "application/json",
            success: function (data) {
                lonefil = data;
                maketable(lonefil)
                makeMap(lonefil)
                // informHeight();
                },
            error: function (/* request, error */) {
                console.log('Network error has occurred please try again!');
            }
    })


    //Function to make a table from loaded data
    function maketable(data) {
      tabell.innerHTML = '';
      data.forEach(function(row) {
        let lonform;
        //format number and assign result to variable "lonform", if there is a number to format. Otherwise lonform will be assigned the value "*"
        // row.Lon === 0 ? lonform = '*' : lonform = $.number(row.Lon, 0, ',', "&#8239;");
        lonform = (row.Lon === 0 || row.Lon === '') ? lonform = '*' : lonform = $.number(row.Lon, 0, ',', "&#8239;");

        //make a string out of array Kommunlista
        // c(Array.isArray(row.Kommunlista))
        let kommunerna = row.Kommunlista.join(', ');
        //create the table
        let rad = tabell.insertRow();
        let cell1 = rad.insertCell(0);
        let cell2 = rad.insertCell(1);
        

        // if there is a Fotnot or more than one kommun in Kommunlista, add an arrow and a p tag with the array Kommunlista turned into a string
        (row.Fotnot !='' || row.Kommunlista.length > 1) ? cell1.innerHTML = "<span class='pil'>\u25BA  </span>" + row.Raddningstjanst : cell1.innerHTML = row.Raddningstjanst;

        //Text to add if there is more then one kommun
        if (row.Kommunlista.length > 1) {
          cell1.innerHTML += "<p class='tabellkommuner'>Kommuner som ingår: " + kommunerna + ".</p>";
        }

        //Text to add if there is a note
        if (row.Fotnot != '') {
          cell1.innerHTML += "<p class='tabellkommuner'>(" + row.Fotnot + ")</p>"
        }

        //html for the second table cell
        cell2.innerHTML = lonform;


      })

      //hide the p element that contains the string of kommuner
      $(".tabellkommuner").hide();
      //hide the kartpopup (because you probably don't need to see it when you focus on the table, and it looks messy to leave it visible)
      brandkartpopup.style.display = "none";


      //Create and insert the table head and give the headers the classes needed to make clickable, thereby sorting the table
      let header = tabell.createTHead();
      let row = header.insertRow(0);
      let cell1 = row.insertCell(0);
      cell1.classList.add('alfabetisk');
      cell1.innerHTML = "Räddningstjänst<span class='sortpil alfabetisk'>&#8691;</span>";
      let cell2 = row.insertCell(1);
      cell2.classList.add('numerisk');
      cell2.innerHTML = "Lön<span class='sortpil numerisk'>&#8691;</span>";
    }

    var fallandeAlf = true;
    var fallandeNum = true;

    function sortNumerical() {    
      if (fallandeNum) {

        lonefil.sort(function(a, b){
          //dealing with the blanks and sort them to the end
          if (a["Lon"] === '') return 1;
          if (b["Lon"] === '') return -1;
          //sorting with ternary operator
          return a["Lon"] > b["Lon"] ? -1 : 1;
          })
        maketable(lonefil);  
        fallandeNum = false;
    
      }

      else if (!fallandeNum) {
        lonefil.sort(function(a, b){
          //dealing with the blanks and sort them to the end
          if (a["Lon"] === '') return 1;
          if (b["Lon"] === '') return -1;
          //sorting with ternary operator
          return a["Lon"] < b["Lon"] ? -1 : 1;
          })
          maketable(lonefil);
          fallandeNum = true;        
        }
    }

    function sortAlphabetical() {    
      if (fallandeAlf) {

        lonefil.sort(function(a, b){
          //sorting with ternary operator
          return a["Raddningstjanst"] < b["Raddningstjanst"] ? -1 : 1;
          })
    
          maketable(lonefil, tabell);
               
      fallandeAlf = false;
    
      }
      else if (!fallandeAlf) {

        lonefil.sort(function(a, b){
          //sorting with ternary operator
          return a["Raddningstjanst"] > b["Raddningstjanst"] ? -1 : 1;
          })
        maketable(lonefil, tabell);
    
        fallandeAlf = true;
     
      }
        
    }

    //add a click function to the entire table
    $("#brandtabell").click(function(event) {
      brandkartpopup.style.display = "none";
       //prevent propagation of event handlers to parent elements
       event.stopPropagation();

       var $target = $(event.target);

       //check if the clicked part of the table has a certain class, then sort and make table
       if ($(event.target).hasClass('alfabetisk')) {
        sortAlphabetical()
       
           maketable(lonefil);
       }
       if ($(event.target).hasClass('numerisk')) {

        sortNumerical()
        maketable(lonefil);
       }


       //look for the p element closest to the target and toggle a slide
       $target.closest("tr").find("p").slideToggle(100, "swing", function() {
         //check if the p element is invisible (has display: none) and if it is change the right arrow to a down arrow. Using unicode encoding because it seems to prevent conversion to special android and iphone icons
         if ($target.closest("tr").find(".tabellkommuner").css("display") === "none") {
            $target.closest("tr").find(".pil").text('\u25BA ');
         }
         //if the p element is visible, change the down arrow to a right arrow
         else {
           $target.closest("tr").find(".pil").text('\u25BC ');
         }
       });

    });


    //handling input in search field
    $("input").on("keydown",function search(e) {
        let data = lonefil;
        let searchdata = [];
        //key 13 is "enter"
        if (e.keyCode == 13) {

          let rawsearch = this.value;
          let trimmedsearch = rawsearch.trim()
          
          let sokt = trimmedsearch.toLowerCase();
          // let sokt = $(this).val().toLowerCase();


          //traverse the data file
          data.forEach(function(row) {
            //check if value from search field is in the array Kommunlista for each row, if it is "result" will be more than -1
            let result = row.Kommunlista.findIndex(item => sokt.toLowerCase() === item.toLowerCase());
            if (result > -1) {
              searchdata.push(row);
              maketable(searchdata)
              //make a button visible. The button clears the search result and makes a complete table. (the button is the only content of a p tag with the class invisible, which is stored in the variable rensaElement)
              rensaElement[0].style.display = "inline";
            }
          })
        }

      if (e.keyCode == 8) {
        //hide the button
        rensaElement[0].style.display = "none";
        //make the table again, from the complete lonlist
        maketable(lonefil);
      }

        

    });

    //click function for button
    rensaknapp.addEventListener("click", function() {
      //hide the button
      rensaElement[0].style.display = "none";
      //restore placeholder text in search field
      document.querySelector('#searchfield').value = '';
      //make the tabla again, from the complete lonlist
      maketable(lonefil);
    })



    function makeMap(data) {
      //set the size for the map and the legened
      var w = 264;
      var h = 550;
      var legendRectSize = 18;
      var legendSpacing = 4;

      //append svg element, give classes and set up the viewBox
      var svg = d3.select('div#brandkartdiv').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
      //set up projection of map
      var projection = d3.geoConicEqualArea()
          // .scale(2365.51882004263)
          .scale(1950)
          .center([16.382656313727672,62.34103687152436]) //projection center
          .parallels([55.327583999999995,69.059967]) //parallels for conic projection
          .rotate([343.6173436862723]) //rotation for conic projection
          .translate([w*1.5, h/2.6]) //translate to center the map in view;

      var bana = d3.geoPath().projection(projection);

      //read the file, which is specific data joined with a file of sveriges kommuner
      var map = d3.json("brandlon_karta.geojson");
      // var map = d3.json("https://assets.codepen.io/2076398/brandlon_karta.geojson");

      //Create a tooltip, hidden at the start
      var tooltip = d3.select("body").append("div").attr("class","tooltip u-textMeta");

      //Position of the tooltip relative to the cursor
      var tooltipOffset = {x: 5, y: -25};



      Promise.all([map]).then(function(values) {
        svg.selectAll("path")
            .data(values[0].features)
            .enter()
            .append("path")
            .attr("d", bana)
            //make the paths grey if they don't have a number for lön
            .style('fill', function(d){
              if (d.properties.Lön === 0) {
                return "#9a9a9a"
              }
              //otherwise make them bluegreen
              else return '#048676';
            })
            .on("mouseover",showTooltip)
            .on("mousemove",moveTooltip)
            .on("mouseout",hideTooltip)
            .on("click", clicked)



          //color and text for the legend. (Addding an extra item to the domain and range arrays will create a new legend item)
            var color = d3.scaleOrdinal()
                .domain(["Här finns löneuppgifter", "Uppgift saknas"])
                .range(["#048676", "#9a9a9a"]);

            // var legend = d3.select("svg")
            var legend = d3.select("#brandkartdiv").select("svg")

                .append("g")
                .selectAll("g")
                .data(color.domain())
                .enter()
                .append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d,i) {
                    var height = legendRectSize;
                    var horz = 0;
                    var vert = i * height;
                    return "translate(" + horz + "," + vert + ")";
                  })

            legend.append("rect")
                .attr("width", legendRectSize)
                .attr("height", legendRectSize)
                .style("fill", color)
                .style("stroke", color);

            legend.append("text")
              .attr("x", legendRectSize + legendSpacing)
              .attr("y", legendRectSize - legendSpacing)
              .attr("class", "u-textMeta legend")
              .text(function(d) {return d; });

      });

      //this is what happens when you click a certain kommun.
      function clicked(d,i) {
        //store the property Räddningstjänst of the clicked element
        let grupp = d.properties.Räddningstjänst;
        //Conditional to assign a value to "lon". if there is a lön, i.e. not 0 in the field, format the lön and assign it. Otherwise assign an string to explain why there is no lön.
        let lon = (d.properties.Lön != 0) ? $.number(d.properties.Lön, 0, ',', "&#8239;" ) + ' kr/mån': 'Lönen visas inte eftersom räddningstjänsten har färre än fem anställda.';
        let kommungrupp = d.properties.Kommunlista;


        d3.selectAll('path')
            .style('fill', function(d) {
              //check all the paths to see if they have the same value for Räddningstjänst as the clicked path. If they do, color them yellow
              if (d.properties.Räddningstjänst === grupp){
                return '#ffef58';
                }
              //otherwise just give them the same colors they had from start
              else if (d.properties.Lön === 0) {
                return "#9a9a9a"
              }
              else return '#048676';
              });

          //show the kartopup
          brandkartpopup.style.display = "block";

          //using urdinary javascript to style since d3.js doesnt have the innerHTML
          let html = `
            <h3 class="u-textMeta">${d.properties.Räddningstjänst}</h3>

            <p class='u-textMetaDeca nomargin'>${lon}<p>
            <p class='u-textMeta nomargin'><strong>Kommuner som ingår:</strong> ${kommungrupp.join(', ')}.</p>
          `
          // if (d.properties.Fotnot != '') {
          if (d.properties.Fotnot) {

            html += `
            <p class='u-textMeta'>(${d.properties.Fotnot})</p>
            `
            }

          popuptext.innerHTML = html;
          //variable that stores the vertical position of the clicked path
          let ev = d3.event.pageY;
          //variable that stores the vertical position of the containing div
          let divpos = $('#brandkartdiv').offset().top

          //Styling only top position, left is styled in the CSS
          //vertical position is a relation betwwen path position and containing div position, previously stored in variables
          d3.select('#brandkartpopup').style("top",(ev-divpos+30)+"px")
      }

        function showTooltip(d,i) {
          moveTooltip();
          //showing tooltip on hover only on larger screens
          if (window.innerWidth > 500) {
            tooltip.style("display","block")
                .text(d.properties.Räddningstjänst);
          }
        }

        //tooltip follows mouse movements
        function moveTooltip(d,i) {
          tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
              .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
        }

        function hideTooltip(d,i) {
          tooltip.style("display","none");
        }
    //end of makemap function
    }
 
    //uses function in main script file to make the graph that compares professions
    makeGraph(riksYrken);
    // informHeight()
  }


})(window);
