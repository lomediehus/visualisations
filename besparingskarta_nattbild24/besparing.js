//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}


//Variables for map size and projection
var w = 264,
		h = 540,
		legendRectSize = 18,
		legendSpacing = 4,
		tooltip;

var svg = d3.select('div#chart').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
var projection = d3.geoConicEqualArea()
	// .scale(1800)

    .scale(2200)
    .center([16.382656313727672,62.34103687152436]) //projection center
    .parallels([55.327583999999995,69.059967]) //parallels for conic projection
    .rotate([343.6173436862723]) //rotation for conic projection
	// .translate([w*1.3, h/3]) //translate to center the map in view;
	.translate([w*1.6, h/2.3]) //translate to center the map in view;



var thepath = d3.geoPath().projection(projection);

//load the geodata file
d3.json("SverigesKommuner.geojson").then(function(geodata){
	//load a json data file
	d3.json("spardata.json").then(function(artikeldata){
		//make a new array out of the feature part of the geodata
		let kombo =[...geodata.features];
		//loop the new array of geodata
		kombo.forEach(function(kombogrej) {

			//filter array by a common item ( do a lookup ). "Result" will be an array with one item, which will be an object containing all the text from the json file.
			var result = artikeldata.filter(function(regiondata) {
				return regiondata.Kod.toString() === kombogrej.properties.KNKOD.toString();
			})

			// Create new items in the array. Value pairs from "result" are stored with new keys in the "kombo" array, which will now contain both the geodata and the selected data from the json file.
			kombogrej["Kommun"] = (result[0] !== undefined) ? result[0].Kommun : null;
			kombogrej["Raddningstjanst"] = (result[0] !== undefined) ? result[0].Raddningstjanst : null;
			kombogrej["Besparing"] = (result[0] !== undefined) ? result[0].Besparing : null;
			kombogrej["Kommentar"] = (result[0] !== undefined) ? result[0].Kommentar : null;
			kombogrej["Label"] = (result[0] !== undefined) ? result[0].Label : null

		})



		svg.selectAll("path")
				//using the "kombo" array to create map
	      .data(kombo)
	      .enter()
	      .append("path")
        //use the quantify function to color map areas by info in data file
				.attr("class", quantify)
	      .attr("d", thepath)
					.style("stroke", "black")
					.style("stroke-width", 0.2)
						.on("mouseover", mouseover)
						.on("mousemove", mousemove)
						.on("mouseout", mouseout);


			// svg.selectAll("text")
			// .data(kombo)
			// .enter()
			// .filter(function(d) {
			// 	// Filter only the features that represent highlighted areas
			// 	return d.Uppsagning === "Ja";
			// })
			// .append("text")
			// .attr("x", function(d) {
			// 	// Adjust the x-coordinate of the label to position it correctly
			// 	return thepath.centroid(d)[0];
			// })
			// .attr("y", function(d) {
			// 	// Adjust the y-coordinate of the label to position it correctly
			// 	return thepath.centroid(d)[1];
			// })
			// .attr("text-anchor", "middle") // Center-align the text
			// .attr("dy", "0.35em") // Adjust the vertical alignment of the text
			// .text(function(d) {
			// 	// Set the text content of the label
			// 	return (d.Label == "ja") ? d.Raddningstjanst : "" // You can adjust this to display any relevant information
			// })
			// .attr("class", "label"); // Add a class to style the labels
			
			
					  
	

		//color and text for the legend. (Addding an extra item to the domain and range arrays will create a new legend item)
		// var color = d3.scaleOrdinal()
		// 		.domain(["Här drar man ner på natten"])
		// 		.range(["#e00f00"]);
			

		// var legend = d3.select("svg")
		// 		.append("g")
		// 		.selectAll("g")
		// 		.data(color.domain())
		// 		.enter()
		// 		.append("g")
		// 			.attr("class", "legend")
		// 			.attr("transform", function(d,i) {
		// 				var height = legendRectSize;
		// 				var horz = 0;
		// 				var vert = i * height + 150;
		// 				return "translate(" + horz + "," + vert + ")";
		// 			})

		// legend.append("rect")
		// 		.attr("width", legendRectSize)
		// 		.attr("height", legendRectSize)
		// 		.style("fill", color)
		// 		.style("stroke", color);


		// legend.append("text")
		// 	.attr("x", legendRectSize + legendSpacing)
		// 	.attr("y", legendRectSize - legendSpacing)
		// 	.attr("class", "u-textMeta legend")
		// 	.text(function(d) {return d; });

		tooltip = d3.select("section")
				.append("div")
					.attr("class", "tooltip u-textMeta")
					.style("opacity", 0)
					


					


		//Set up colors for the map regions using data from the "kombo" array. Returns a class name. The colors are defined in the css file

		
	function quantify(d,i) {
		var f = 1;

		switch(d["Besparing"]) {
			case "Ja":
			f = 1;
			break;
			//  case "ej ökat":
			//  f = 2;
			//  break;
			default:
			f = 3;
		}
			return "q" + f;
			}
		})


//hide the loader when the map has been drawn
// document.getElementById('loader').style.display = "none";
//Set the iframe height, using function in external lomediehus script
informHeight();

})

function mouseover(d, i) {
	tooltip.transition()
		.duration(200)
		.style("opacity", function(){
			// c(d.Kommun)
			if (d.Besparing === null){
				return 0;
			} else {
				return 0.9
			}
			}
			);
}


function mousemove(d, i) {

  let textÖkning = "";

	let markup = `
		<p class='fet no-margin-bottom'>${d.Besparing == "Ja" ? d.Kommun : ""}</p>
		<p class='no-margin-bottom'>${d.Kommentar !== null ? d.Kommentar : ""}</p>  
	`

	tooltip.html(markup)
			// .style("left", (d3.event.pageX) + "px")
			.style("left", "20px")
			// .style("left", function() {

			// 	//on a small screen, place tooltip further to the left on the right side of the screen (making tooltips wider)
			// 	if (d3.event.pageX > window.innerWidth/2) {
			// 		c
			// 		return (d3.event.pageX - 300) + "px";
			// 		}
			// 	else {
			// 		return (d3.event.pageX-300) + "px";
			// 	}
			// })

			.style("top", (d3.event.pageY - 50) + "px");
}



function mouseout() {
		tooltip.transition()
			.duration(50)
			.style("opacity", 0);
}

var container_width = document.querySelector("#chart");
var container_height = document.querySelector("#chart").getBoundingClientRect().height;
var relX = container_width.offsetWidth;
var background = document.querySelector("#background");
c(background)
c(relX);
var duration = 0;
if (relX > 800) {
	duration = 300; 
} 
else {
	duration = 150;
}

// background.style.minHeight = container_height + 80 + "px";
background.style.minHeight = container_height + (0.06 * container_height) + "px";


var moonwalk = gsap.to("#moon-container", { x: relX, duration: duration, ease: "linear"} );
moonwalk.repeat(-1);