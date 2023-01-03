const c = console.log.bind(document);

//just getting the right favicon
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}


var w = 264,
		h = 500,
		legendRectSize = 18,
		legendSpacing = 4,
		tooltip;

var svg = d3.select('div#chart').append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + w + " " + h).classed("svg-content", true);
var projection = d3.geoConicEqualArea()
    .scale(1800)
    .center([16.382656313727672,62.34103687152436]) //projection center
    .parallels([55.327583999999995,69.059967]) //parallels for conic projection
    .rotate([343.6173436862723]) //rotation for conic projection
    .translate([w*1.3, h/2.1]) //translate to center the map in view;

var path2 = d3.geoPath().projection(projection);

//load the geodata file

d3.json("SverigesKommuner.geojson").then(function(geodata){
	// d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/SverigesKommuner.geojson").then(function(geodata){




	//load a json data file
	// d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/kommundata.json").then(function(artikeldata){
	d3.json("kommundata_test.json").then(function(artikeldata){


		//make a new array out of the feature part of the geodata
		let kombo =[...geodata.features];
		//loop the new array of geodata
		kombo.forEach(function(kombogrej) {


			//filter array by a common item ( do a lookup ). "Result" will be an array with one item, which will be an object containing all the text from the json file.
			var result = artikeldata.filter(function(regiondata) {

				return regiondata.Kod.toString() === kombogrej.properties.KNKOD.toString();
			})


			// var skott = result[0].Skott;
			// skott = skott.toString().replace(/,/g, '.')
			// skott = parseFloat(skott);



			// Create new items in the array. Value pairs from "result" are stored with new keys in the "kombo" array, which will now contain both the geodata and the selected data from the json file.

			kombogrej["Kommun"] = (result[0] !== undefined) ? result[0].Kommun : null;
			kombogrej["Övertid2022"] = (result[0] !==undefined) ? result[0].Övertid2022 : null;
			kombogrej["Ökat?"] = (result[0] !==undefined) ? result[0]["Ökat?"] : null;
      kombogrej["Ökning_pga_personalbrist"] = (result[0] !==undefined) ? result[0].Ökning_pga_personalbrist : null;
      kombogrej["Personalbrist?"] = (result[0] !==undefined) ? result[0].Personalbrist : null;
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
		var color = d3.scaleOrdinal()
				.domain(["Här ökade övertiden", "Här ökade inte övertiden", "Oklart/ingen uppgift"])
				.range(["#e00f00", "#f5cc00", "#d8d8d8"]);

		var legend = d3.select("svg")
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

		tooltip = d3.select("section")
				.append("div")
					.attr("class", "tooltip u-textMeta")
					.style("opacity", 0)

		//Using the number from the "kombo" array to set the colors of the regions. The colors are defined in the css file
		function quantify(d,i) {
			var f;
			// var f = d.Siffra;
      c(d["Ökat?"])

      switch(d["Ökat?"]) {
        case "ökat":
        f = 1;
        break;
        case "ej ökat":
        f = 2;
        break;
        default:
        f = 3;
      }
      c(f)

			// return "q" + Math.min(8, ~~((f-250) / 150)) + "-9";
			// console.log(d.Siffra);
			return "q" + f;


			}
	})


	//hide the loader when the map has been drawn
	document.getElementById('loader').style.display = "none";

})

function mouseover() {
	tooltip.transition()
		.duration(200)
		.style("opacity", .9);
}



function mousemove(d, i) {

	let markup = `
		<p class='fet no-margin-bottom'>${d.Kommun}</p>
		<p class='no-margin-bottom'>Övertidstimmar juni-augusti 2022: ${d.Övertid2022}</p>
	`



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
		 .on("zoom", null);
