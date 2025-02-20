//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}



const data = [
    { job: "Undersköterska", values: [{ year: 2019, salary: 26382 }, { year: 2024, salary: 29945 }], raise: "13,5%" },
    { job: "Vårdbiträde", values: [{ year: 2019, salary: 23678 }, { year: 2024, salary: 25961 }], raise: "9,6%" },
    // { job: "Stödpedagog", values: [{ year: 2019, salary: null }, { year: 2024, salary: 33908 }], raise: null },
    { job: "Stödassistent", values: [{ year: 2019, salary: 26284 }, { year: 2024, salary: 29888 }], raise: "13,7%" },
    { job: "Vårdbitr-funktionshinder", values: [{ year: 2019, salary: 24117 }, { year: 2024, salary: 26799 }], raise: "11,1%" },
    { job: "Boendestödjare", values: [{ year: 2019, salary: 25977 }, { year: 2024, salary: 29780 }], raise: "14,6%" },
    { job: "Skötare", values: [{ year: 2019, salary: 27038 }, { year: 2024, salary: 30924 }], raise: "14,4%" },
    { job: "Personlig assistent", values: [{ year: 2019, salary: 25090 }, { year: 2024, salary: 28461 }], raise: "13,4%" },
    { job: "Barnskötare", values: [{ year: 2019, salary: 25369 }, { year: 2024, salary: 28503 }], raise: "12,4%" },
    { job: "Elevassistent", values: [{ year: 2019, salary: 25541 }, { year: 2024, salary: 28867 }], raise: "13,0%" },
    { job: "Lärarassistent", values: [{ year: 2019, salary: 27873 }, { year: 2024, salary: 31196 }], raise: "11,9%" },
    { job: "Fritidsledare", values: [{ year: 2019, salary: 27426 }, { year: 2024, salary: 31229 }], raise: "13,9%" },
    { job: "Anläggningsarbetare", values: [{ year: 2019, salary: 28767 }, { year: 2024, salary: 32813 }], raise: "14,1%" },
    { job: "Fordonsförare", values: [{ year: 2019, salary: 27259 }, { year: 2024, salary: 30612 }], raise: "12,3%" },
    { job: "Vaktmästare", values: [{ year: 2019, salary: 26755 }, { year: 2024, salary: 30593 }], raise: "14,3%" },
    { job: "Fastighetsskötare", values: [{ year: 2019, salary: 27235 }, { year: 2024, salary: 31223 }], raise: "14,6%" },
    { job: "Park-trädgård", values: [{ year: 2019, salary: 26985 }, { year: 2024, salary: 30570 }], raise: "13,3%" },
    { job: "Kock", values: [{ year: 2019, salary: 26928 }, { year: 2024, salary: 30795 }], raise: "14,4%" },
    { job: "Måltidspersonal", values: [{ year: 2019, salary: 24365 }, { year: 2024, salary: 27495 }], raise: "12,8%" },
    { job: "Lokalvårdare", values: [{ year: 2019, salary: 24189 }, { year: 2024, salary: 27305 }], raise: "12,9%" },
    { job: "Genomsnitt Sverige", values: [], raise: "15%"},

    // { job: "Renhållningsarbetare", values: [{ year: 2019, salary: null }, { year: 2024, salary: 30662 }], raise: null }
];


const data2 = [
    { job: "Undersköterska", values: [{ year: 2019, salary: 26513 }, { year: 2024, salary: 30129 }], raise: "13,6%" },
    { job: "Barnsköterska", values: [{ year: 2019, salary: 27746 }, { year: 2024, salary: 31304 }], raise: "12,8%" },
    { job: "Ambulanssjukvårdare", values: [{ year: 2019, salary: 28791 }, { year: 2024, salary: 33378 }], raise: "15,9%" },
    { job: "Fotvårdsspecialist", values: [{ year: 2019, salary: 28335 }, { year: 2024, salary: 32973 }], raise: "16,4%" },
    { job: "Skötare", values: [{ year: 2019, salary: 26446 }, { year: 2024, salary: 30204 }], raise: "14,2%" },
    { job: "Biträde", values: [{ year: 2019, salary: 23287 }, { year: 2024, salary: 26679 }], raise: "14,6%" },
    { job: "Fordonsförare", values: [{ year: 2019, salary: 26166 }, { year: 2024, salary: 29542 }], raise: "12,9%" },
    { job: "Vaktmästare", values: [{ year: 2019, salary: 24784 }, { year: 2024, salary: 27898 }], raise: "12,6%" },
    { job: "Kock", values: [{ year: 2019, salary: 27275 }, { year: 2024, salary: 31060 }], raise: "13,9%" },
    { job: "Måltidspersonal", values: [{ year: 2019, salary: 24419 }, { year: 2024, salary: 27599 }], raise: "13,0%" },
    { job: "Lokalvårdare", values: [{ year: 2019, salary: 23919 }, { year: 2024, salary: 26996 }], raise: "12,9%" },
    { job: "Förrådsarbetare", values: [{ year: 2019, salary: 25378 }, { year: 2024, salary: 29143 }], raise: "14,8%" },
    { job: "Genomsnitt Sverige", values: [], raise: "15%"},

    
];

// Sort the data by the "raise" key
data.sort((a, b) => {
    // Convert raise percentage strings to numbers for comparison
    const raiseA = parseFloat(a.raise.replace('%', ''));
    const raiseB = parseFloat(b.raise.replace('%', ''));
    return raiseB - raiseA; // Sort in descending order
  });

// Sort the data by the "raise" key
data2.sort((a, b) => {
    // Convert raise percentage strings to numbers for comparison
    const raiseA = parseFloat(a.raise.replace('%', ''));
    const raiseB = parseFloat(b.raise.replace('%', ''));
    return raiseB - raiseA; // Sort in descending order
  });



const margin = { top: 60, right: 50, bottom: 40, left: 150 }; // Add some spacing and increase left margin for job labels
const width = 360 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

makeBarChart(data, "#kommungraf", "#selectcontainerKommun");
makeBarChart(data2, "#regiongraf", "#selectcontainerRegion");

informHeight();

function makeBarChart(dataArray, divId, selectPlace) {
    // c(dataArray);
    let selectedJob = null;

    // Update the height of the SVG dynamically based on the number of data points
    const barHeight = 20;
    const barPadding = 5;
    const svgHeight = dataArray.length * (barHeight + barPadding) + margin.top + margin.bottom;

    // Create SVG
    const svg = d3.select(divId)
        .append("svg")
        .attr("class", "svg-responsive")
        // .attr("viewBox", `0 0 ${360} ${450}`) 
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${svgHeight}`) // Makes it responsive

        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const y = d3.scaleBand()
        .domain(dataArray.map(d => d.job))
        .range([0, dataArray.length * (barHeight + barPadding)])

        // .range([0, height])
        .padding(0.1);

    const x = d3.scaleLinear()
        .domain([0, d3.max(dataArray, d => parseFloat(d.raise.replace('%', '')))])
        .range([0, width]);

    const swedishLocale = d3.formatLocale({
        decimal: ",",
        thousands: " ",
        grouping: [3],
        currency: ["", " kr"]
    });

    const swedishFormat = swedishLocale.format(",.0f");

    // Y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    let xAxisTicks = [0, 5, 10, 15]; // Define fixed ticks


    // X-axis
    svg.append("g")
        .attr("transform", `translate(0,${svgHeight -100})`)
        .attr("class", "x-axis")
        .call(d3.axisBottom(x).tickValues(xAxisTicks).tickFormat(d => d + "%"));

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid gray")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("display", "none")
        .attr("class", "u-textMeta");

    // Bars
    svg.selectAll(".bar")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("y", d => y(d.job))
    .attr("x", 0)
    .attr("height", "20px")
    .attr("width", d => x(parseFloat(d.raise.replace('%', ''))))
    .attr("fill", function(d) {
        if (d.job === "Genomsnitt Sverige") {
            return "brown";
        } else {
            return "#BEBEBE";
        }
    })
    .attr("opacity", 1)
    .on("mouseover", function(d) {
        if (d3.select(this).attr("fill") !== "orange" && d.job !== "Genomsnitt Sverige") {
            d3.select(this).attr("fill", "#707070");
        }
        const values = d.values || [];
        const salary2019 = values[0] ? swedishFormat(values[0].salary) : "N/A";
        const salary2024 = values[1] ? swedishFormat(values[1].salary) : "N/A";
        tooltip.style("display", "block").html(`
            <strong>${d.job}</strong><br>
        `);

        if (salary2019 !== "N/A" && salary2024 !== "N/A") {
            tooltip.append("div").html(`
                2019: ${salary2019} kr<br>
                2024: ${salary2024} kr<br>
            `);
        }
    })
    .on("mousemove", function() {
        const event = d3.event;
        tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.style("display", "none");

        if (d3.select(this).attr("fill") === "orange") {
            d3.select(this).attr("fill", "orange");
        } else if (d.job === "Genomsnitt Sverige") {
            d3.select(this).attr("fill", "brown");
        } else {
            d3.select(this).attr("fill", "#BEBEBE");
        }
    });


    // Add text labels
    svg.selectAll(".label")
    .data(dataArray)
    .enter()
    .append("text")
    .attr("class", "label u-textMeta")
    .attr("y", d => y(d.job) + barHeight / 2)
    .attr("x", d => x(parseFloat(d.raise.replace('%', ''))) + 5) // Position the text slightly to the right of the bar
    .attr("dy", ".35em") // Vertically center the text
    .text(d => d.raise)
    .attr("fill", "black");

    // Dropdown menu
    const jobSelect = d3.select(selectPlace)
        .append("select")
        .attr("class", "u-textMeta")
        .on("change", function () {
            selectedJob = this.value;

            // Update bar styles
            svg.selectAll(".bar")
                // .attr("fill", d => d.job === selectedJob ? "orange" : "gray")
                //keep the brown color for the average salary
                .attr("fill",function(d) {
                    if (d.job === "Genomsnitt Sverige") {
                        return "brown";
                    } else {
                        return d.job === selectedJob ? "orange" : "#BEBEBE";
                    }
                })

                .attr("opacity", d => d.job === selectedJob ? 1 : 1);
        });

    // Add the "Välj yrke" option
    jobSelect.append("option")
        .attr("value", "")
        .text("Välj yrke");

    // Add jobs to the dropdown menu
    jobSelect.selectAll("option")
        .data(dataArray)
        .enter()
        .append("option")
        .text(d => d.job)
        .attr("value", d => d.job);
}

function renderTable(data, container) {
    const tableContainer = document.getElementById(container);

    let html = `<table border="0" class="u-textMeta">
        <thead>
            <tr>
                <th>Yrke</th>
                <th>Ökning</th>
                <img id="closex" class="closex" src="../ka_assets/closex.png" alt="kryssruta för stängning">
            </tr>
        </thead>
        <tbody>`;

    data.forEach(item => {
        html += `
            <tr>
                <td>${item.job}</td>
                <td>${item.raise ? item.raise : "N/A"}</td>
            </tr>`;
    });

    // data.forEach(item => {
    //     html += `
    //         <tr>
    //             <td>${item.job}</td>
    //             <td>${item.raise ? item.raise : "N/A"}</td>
    //         </tr>`;
    // });


    html += `</tbody></table>`;

    tableContainer.innerHTML += html; // Insert table into the div
}

renderTable(data, "tableContainer"); // Call once when page loads
renderTable(data2, "tableContainer2"); // Call once when page loads

const kommunKnapp = document.getElementById("kommunbutton");
const regionKnapp = document.getElementById("regionbutton");

// Show and hide tables on button click
kommunKnapp.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click from propagating to the document
    document.getElementById("tableContainer").style.display = "block";
    document.getElementById("tableContainer2").style.display = "none";
});

regionKnapp.addEventListener("click", function (event) { 
    event.stopPropagation(); // Prevent the click from propagating to the document
    document.getElementById("tableContainer").style.display = "none";
    document.getElementById("tableContainer2").style.display = "block";
});

// Hide tables when clicking outside of them
document.addEventListener("click", function (event) {
    const tableContainer = document.getElementById("tableContainer");
    const tableContainer2 = document.getElementById("tableContainer2");

    if (!tableContainer.contains(event.target) && !tableContainer2.contains(event.target)) {
        tableContainer.style.display = "none";
        tableContainer2.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const closex = document.getElementsByClassName("closex");
    for (let i = 0; i < closex.length; i++) {
        closex[i].addEventListener("click", function () {
            document.getElementById("tableContainer").style.display = "none";
            document.getElementById("tableContainer2").style.display = "none";
        });
    }
});

const body = document.querySelector('body');

//if date is higher than today, change background color   
(function() {
  var today = new Date();
  var date = new Date("2025-03-09");
  if (today > date) {
    body.style.backgroundColor = 'rgb(249,249,247)';
  }
  else {
    body.style.backgroundColor = '#fcfaf5';
  }
})();