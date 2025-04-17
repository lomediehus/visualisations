//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "../ka_assets/favicon2.ico";  
}

// //toggle display of #fotnot p when clicking on the #fotnot link, hidden from start	
// document.querySelector("#fotnot p").classList.toggle("hide");
// document.querySelector("#fotnot a").addEventListener("click", function(e) {
// 	e.preventDefault();
// 	document.querySelector("#fotnot p").classList.toggle("hide");
// 	informHeight();
// });

var w = 280,
		h = 500,
		legendRectSize = 15,
		legendSpacing = 4,
		tooltip;

var svg = d3.select('div#chart').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
var projection = d3.geoConicEqualArea()
    .scale(2000)
    .center([16.382656313727672,62.34103687152436]) //projection center
    .parallels([55.327583999999995,69.059967]) //parallels for conic projection
    .rotate([343.6173436862723]) //rotation for conic projection
    .translate([w*1.4, h/2.4]) //translate to center the map in view;

var path2 = d3.geoPath().projection(projection);

//load the geodata file

// d3.json("SverigesKommuner.geojson").then(function(geodata){
d3.json("SverigesKommuner.geojson").then(function(geodata){

	//load a json data file
	d3.json("underskott.json").then(function(artikeldata){
	// d3.json("kommundata.json").then(function(artikeldata){

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
			kombogrej["Underskott"] = (result[0] !== undefined) ? result[0].Underskott : null;
			kombogrej["Nedskarning"] = (result[0] !==undefined) ? result[0].Nedskarning : null;
			kombogrej["Svarat"] = (result[0] !==undefined) ? result[0].Svarat : null;

		})

		svg.selectAll("path")
			//using the "kombo" array to create map
	      .data(kombo)
	      .enter()
	      .append("path")
	      // .attr("class", "continent")
				.attr("class", quantify)
	      .attr("d", path2)
					.style("stroke", "black")
					.style("stroke-width", 0.5)
						.on("mouseover", mouseover)
						.on("mousemove", mousemove)

						.on("mouseout", mouseout);

		//color and text for the legend. (Addding an extra item to the domain and range arrays will create a new legend item)
		// var color = d3.scaleOrdinal()
		// 		.domain(["Kommuner som gick med underskott 2024"])
		// 		.range(["#ee492e"]);

		// var legend = d3.select("svg")
		// 		.append("g")
		// 		.selectAll("g")
		// 		.data(color.domain())
		// 		.enter()
		// 		.append("g")
		// 			.attr("class", "legend BodyImage-caption")
		// 			// .style("width", "100px")
		// 			//decrease the width of the legend
		// 			.attr("transform", function(d,i) {
		// 				var height = legendRectSize;
		// 				var horz = 0;
		// 				var vert = i * height + 20;
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
					.attr("class", "tooltip BodyImage-caption")
					.style("opacity", 0)

		//Using the number from the "kombo" array to set the colors of the regions. The colors are defined in the css file
		function quantify(d,i) {
			var f;
			f = d.Nedskarning === "ja" ? 1 : 3;
			return "q" + f;
			}
	})


	//hide the loader when the map has been drawn
	document.getElementById('loader').style.display = "none";

})

function mouseover() {
	
	
			tooltip.transition()
				.duration(200)
				.style("opacity", 0.9);
		}
		

function mousemove(d, i) {

	let markup = d.Nedskarning === "ja" ? `<p class='fet no-margin-bottom'>${d.Kommun}</p>` : "";   
	

	tooltip.html(markup)
			// .style("left", (d3.event.pageX) + "px")
			.style("left", function() {

				//on a small screen, place tooltip further to the left on the right side of the screen (making tooltips wider)
				if (d3.event.pageX > window.innerWidth/2) {
					return (d3.event.pageX - 100) + "px";
					}
				else {
					return (d3.event.pageX) + "px";
				}
			})

			.style("top", (d3.event.pageY - 50) + "px");
}

function mouseout() {
		tooltip.transition()
			.duration(200)
			.style("opacity", 0);
}





svg.call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
		 }))
		 //don't zoom on scroll wheel (only touch)
		 .on("wheel.zoom", null);

informHeight();