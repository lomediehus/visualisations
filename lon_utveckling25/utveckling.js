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
    { job: "Förrådsarbetare", values: [{ year: 2019, salary: 25378 }, { year: 2024, salary: 29143 }], raise: "14,8%" }
];


// Dimensioner
// const margin = { top: 50, right: 30, bottom: 30, left: 60 };
// const width = 340 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

const closex = document.getElementById("closex");

const margin = { top: 60, right: 20, bottom: 40, left: 50 }; // Add some spacing

const width = 360 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;


makeLineGraph(data, "#kommungraf", "#selectcontainerKommun", data);

makeLineGraph(data2, "#regiongraf", "#selectcontainerRegion", data2);

informHeight();

function makeLineGraph(dataArray, divId, selectPlace, yrken){


let selectedJob = null;

// Skapa SVG
const svg = d3.select(divId)
    .append("svg")
    .attr("class", "svg-responsive")
    // .attr("viewBox", `0 0 ${width} ${height}`) // Makes it responsive, works but needs margins
    .attr("viewBox", `0 0 ${360} ${450}`) // Makes it responsive
    


    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Skalor
const x = d3.scaleLinear()
    .domain([2019, 2024])
    .range([0, width]);

const y = d3.scaleLinear()
    // .domain([
    //     d3.min(dataArray, d => d3.min(d.values, v => v.salary)) - 500,
    //     d3.max(dataArray, d => d3.max(d.values, v => v.salary)) + 500
    // ])
    .domain([23000, 33000])
    .range([height, 0]);

// Axlar
// Custom format function for Swedish thousand separator
// const SweNum = new Intl.NumberFormat('sv-SE', {
//     maximumFractionDigits: 0
// })

const swedishLocale = d3.formatLocale({
    decimal: ",",
    thousands: " ",
    grouping: [3],
    currency: ["", " kr"]
});

const swedishFormat = swedishLocale.format(",.0f");


svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .attr("class", "x-axis") // Add class for x-axis

    .call(d3.axisBottom(x)
    .tickValues([2019,2024])
    .tickFormat(d3.format("d")));
svg.append("g")
    .attr("class", "y-axis") // Add class for y-axis
    .call(d3.axisLeft(y)
    .tickValues([23000,25000,27000,29000,31000,33000])


    .tickFormat(swedishFormat))
    .style("stroke-width", "0.5px"); // Adjust to desired thinness;

// Linje-generator
const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.salary));

// Tooltip-element
const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid gray")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("display", "none")
    .attr("class", "u-textMeta");

// Lägg till alla linjer
const lines = svg.selectAll(".line-group")
    .data(dataArray)
    .enter()
    .append("g")
    .attr("class", "line-group");

lines.append("path")
    .attr("class", "line")
    .attr("d", d => line(d.values))
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("opacity", 0.6)

    .on("mouseover", function (d) {
        if (!d || !d.values || d.values.length < 2) {
            console.warn("Missing data for tooltip:", d);
            return;
        }

        d3.select(this).attr("stroke-width", 5).attr("opacity", 1);
        tooltip.style("display", "block").html(`
            <strong>${d.job}</strong><br>
            2019: ${swedishFormat(d.values[0].salary)} kr<br>
            2024: ${swedishFormat(d.values[1].salary)} kr<br>
            Ökning: ${d.raise}
        `);
    })


    .on("mousemove", function (d) {
        const event = d3.event;
        tooltip.style("left", (event.pageX + 10) + "px")
               .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", function (d) {
        if (d.job !== selectedJob) {
            d3.select(this).attr("stroke-width", 2).attr("opacity", 0.6);
        }
        tooltip.style("display", "none");
    });

// Dropdown-meny
const jobSelect = d3.select(selectPlace)
    .append("select")
    .attr("class", "u-textMeta")
    .on("change", function () {
        selectedJob = this.value;

        // Uppdatera linjernas stil
        svg.selectAll(".line")
            .attr("stroke", d => d.job === selectedJob ? "orange" : "gray")
            .attr("stroke-width", d => d.job === selectedJob ? 6 : 2)
            .attr("opacity", d => d.job === selectedJob ? 1 : 0.3);

        // Flytta vald linje överst genom att rita om den
        svg.selectAll(".line-group")
            .sort((a, b) => (a.job === selectedJob ? 1 : b.job === selectedJob ? -1 : 0));
    });

// Add the "Välj yrke" option
jobSelect.append("option")
    .attr("value", "")
    .text("Välj yrke");

// Lägga till yrken i dropdown-menyn
jobSelect.selectAll("option")
    .data(yrken)
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
                 <img id="closex" class="closex" src="closex.png" alt="kryssruta för stängning">
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
    // const closex = document.getElementById("closex");
    const closex = document.getElementsByClassName("closex");
    for (let i = 0; i < closex.length; i++) {
        closex[i].addEventListener("click", function () {
            document.getElementById("tableContainer").style.display = "none";
            document.getElementById("tableContainer2").style.display = "none";
        });
    }
});