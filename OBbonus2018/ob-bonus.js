			// d3.json(window.sokvagGeo, draw);
			d3.json("SverigesLan2018.geojson", draw);
			function draw(geo_data) {
			  "use strict";
			  var width = 440,
			      height = 700,
			      scale = 2365.51882004263,
						translateX = 432.31469742010825,
						translateY = 300.8639471506867,
						legendRectSize = 18,
          	legendSpacing = 4,
						data;

				var zoom = d3.behavior.zoom()
					.scaleExtent([1, 12])
					.on("zoom", zoomhandler);

				function zoomhandler() {
					svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
				}

			  var projection = d3.geo.conicEqualArea()
						.center([16.382656313727672,62.34103687152436]) //projection center
						.parallels([55.327583999999995,69.059967]) //parallels for conic projection
						.rotate([343.6173436862723]) //rotation for conic projection
			      .scale(scale)
			      .translate( [translateX, translateY]);

			  var path = d3.geo.path().projection(projection);

			  var svg = d3.select("#chart")
			      .append("svg")
			        .attr("width", width)
			        .attr("height", height)
			        .attr("class", "map")


			  var map = svg.selectAll("path")
			      .data(geo_data.features)
			      .enter()
			      .append("path")
			        .attr("d", path)
			        // .style("fill", "lightBlue")
			        .style("stroke", "black")
			        .style("stroke-width", 0.5)
								.on("mouseover", mouseover)
								.on("mousemove", mousemove)
								.on("mouseout", mouseout);



				var color = d3.scale.ordinal()
						.domain(["Sjuksköterskor får mer", "Sjuksköterskor och undersköterskor får lika", "Ingen får utöver avtal"])
						.range(["#730700", "#74b2b2", "#f5cc00",]);


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
					.attr("class", "u-textMeta")
					.text(function(d) {return d; });

				var tooltip = d3.select("section")
						.append("div")
							.attr("class", "tooltip u-textMeta")
							.style("opacity", 0)




				d3.json("ob_landsting2018.json", function(json){
				  data = json;
				  svg.selectAll("path")
				    .attr("class", quantify)
				});

				function quantify(d,i) {
					var f;
					var f = data[i].sifferniva;
					// return "q" + Math.min(8, ~~((f-250) / 150)) + "-9";
					return "q" + f;
					}

				function mouseover() {
					tooltip.transition()
						.duration(200)
						.style("opacity", .9);
				}

				function mousemove(d, i) {

						tooltip.html("<b>" + d.properties.landsting + "</b>"+ "<br/>" + data[i].fritext)
							.style("left", (d3.event.pageX) + "px")
							.style("top", (d3.event.pageY - 50) + "px");

				}

				function mouseout() {
						tooltip.transition()
							.duration(200)
							.style("opacity", 0);
				}

				console.log('slutet av draw-funktionen');
				document.getElementById('loader').style.display = "none";


			};
