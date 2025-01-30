// // Dummy data (ersätt med din faktiska data)
// const data = [
//     { job: "Lärare", values: [{ year: 2019, salary: 32000 }, { year: 2024, salary: 37000 }] },
//     { job: "Ingenjör", values: [{ year: 2019, salary: 40000 }, { year: 2024, salary: 46000 }] },
//     { job: "Sjuksköterska", values: [{ year: 2019, salary: 31000 }, { year: 2024, salary: 35000 }] },
// ];

const data = [
    { job: "Undersköterska", values: [{ year: 2019, salary: 26382 }, { year: 2024, salary: 29945 }] },
    { job: "Vårdbiträde", values: [{ year: 2019, salary: 23678 }, { year: 2024, salary: 25961 }] },
    // { job: "Stödpedagog", values: [{ year: 2019, salary: null }, { year: 2024, salary: 33908 }] },
    { job: "Stödassistent", values: [{ year: 2019, salary: 26284 }, { year: 2024, salary: 29888 }] },
    { job: "Vårdbitr-funktionshinder", values: [{ year: 2019, salary: 24117 }, { year: 2024, salary: 26799 }] },
    { job: "Boendestödjare", values: [{ year: 2019, salary: 25977 }, { year: 2024, salary: 29780 }] },
    { job: "Skötare", values: [{ year: 2019, salary: 27038 }, { year: 2024, salary: 30924 }] },
    { job: "Personlig assistent", values: [{ year: 2019, salary: 25090 }, { year: 2024, salary: 28461 }] },
    { job: "Barnskötare", values: [{ year: 2019, salary: 25369 }, { year: 2024, salary: 28503 }] },
    { job: "Elevassistent", values: [{ year: 2019, salary: 25541 }, { year: 2024, salary: 28867 }] },
    { job: "Lärarassistent", values: [{ year: 2019, salary: 27873 }, { year: 2024, salary: 31196 }] },
    { job: "Fritidsledare", values: [{ year: 2019, salary: 27426 }, { year: 2024, salary: 31229 }] },
    { job: "Anläggningsarbetare", values: [{ year: 2019, salary: 28767 }, { year: 2024, salary: 32813 }] },
    { job: "Fordonsförare", values: [{ year: 2019, salary: 27259 }, { year: 2024, salary: 30612 }] },
    { job: "Vaktmästare", values: [{ year: 2019, salary: 26755 }, { year: 2024, salary: 30593 }] },
    { job: "Fastighetsskötare", values: [{ year: 2019, salary: 27235 }, { year: 2024, salary: 31223 }] },
    { job: "Park-trädgård", values: [{ year: 2019, salary: 26985 }, { year: 2024, salary: 30570 }] },
    { job: "Kock", values: [{ year: 2019, salary: 26928 }, { year: 2024, salary: 30795 }] },
    { job: "Måltidspersonal", values: [{ year: 2019, salary: 24365 }, { year: 2024, salary: 27495 }] },
    { job: "Lokalvårdare", values: [{ year: 2019, salary: 24189 }, { year: 2024, salary: 27305 }] },
    // { job: "Renhållningsarbetare", values: [{ year: 2019, salary: null }, { year: 2024, salary: 30662 }] },
];

const data2 = [
    { job: "Undersköterska", values: [{ year: 2019, salary: 26513 }, { year: 2024, salary: 30129 }] },
    { job: "Barnsköterska", values: [{ year: 2019, salary: 27746 }, { year: 2024, salary: 31304 }] },
    { job: "Ambulanssjukvårdare", values: [{ year: 2019, salary: 28791 }, { year: 2024, salary: 33378 }] },
    { job: "Fotvårdsspecialist", values: [{ year: 2019, salary: 28335 }, { year: 2024, salary: 32973 }] },
    { job: "Skötare", values: [{ year: 2019, salary: 26446 }, { year: 2024, salary: 30204 }] },
    { job: "Biträde", values: [{ year: 2019, salary: 23287 }, { year: 2024, salary: 26679 }] },
    { job: "Fordonsförare", values: [{ year: 2019, salary: 26166 }, { year: 2024, salary: 29542 }] },
    { job: "Vaktmästare", values: [{ year: 2019, salary: 24784 }, { year: 2024, salary: 27898 }] },
    { job: "Kock", values: [{ year: 2019, salary: 27275 }, { year: 2024, salary: 31060 }] },
    { job: "Måltidspersonal", values: [{ year: 2019, salary: 24419 }, { year: 2024, salary: 27599 }] },
    { job: "Lokalvårdare", values: [{ year: 2019, salary: 23919 }, { year: 2024, salary: 26996 }] },
    { job: "Förrådsarbetare", values: [{ year: 2019, salary: 25378 }, { year: 2024, salary: 29143 }] },
];


// Dimensioner
const margin = { top: 50, right: 30, bottom: 30, left: 60 };
const width = 340 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;


makeLineGraph(data, "#kommungraf", "#selectcontainerKommun", data);

makeLineGraph(data2, "#regiongraf", "#selectcontainerRegion", data2);

function makeLineGraph(dataArray, divId, selectPlace, yrken){


let selectedJob = null;

// Skapa SVG
const svg = d3.select(divId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
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
    .tickValues([23000,26000,29000,32000])
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
        console.log(d);
        if (!d || !d.values || d.values.length < 2) {
            console.warn("Missing data for tooltip:", d);
            return;
        }

d3.select(this).attr("stroke-width", 5).attr("opacity", 1);
tooltip.style("display", "block").html(`
    <strong>${d.job}</strong><br>
    2019: ${swedishFormat(d.values[0].salary)} kr<br>
    2024: ${swedishFormat(d.values[1].salary)} kr
`);
    })

    // .on("mouseover", function () {
    //     const dataObject = dataArray;
    //     console.log(dataObject);
    //     if (!dataObject || !dataObject.values || dataObject.values.length < 2) {
    //     console.warn("Missing data for tooltip:", dataObject);
    //     return;
    //  }
    //     d3.select(this).attr("stroke-width", 4).attr("opacity", 1);
    //     tooltip.style("display", "block").html(`
    //         <strong>${dataObject.job}</strong><br>
    //         2019: ${dataObject.values[0].salary} kr<br>
    //         2024: ${dataObject.values[1].salary} kr
    //         `);
    // })



    .on("mousemove", function (d) {
        const event = d3.event;
        // console.log(event.pageX);
        tooltip.style("left", (event.pageX + 10) + "px")
               .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", function (d) {
        if (d.job !== selectedJob) {
            d3.select(this).attr("stroke-width", 2).attr("opacity", 0.6);
        }
        // d3.select(this).attr("stroke-width", 6).attr("opacity", 0.6);
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