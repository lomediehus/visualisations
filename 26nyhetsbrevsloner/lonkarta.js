//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "../arbetet_assets/img/favicon2.ico";
}

c("kör skript version ")



// Läs in data
    // fetch("loner.json")
    //   .then(r => r.json())
    //   .then(data => {
    //     alla = data;
    //     // c(alla)
       
    //   });

const select = document.querySelector("select");
c(select.value)
let alla = [];
let loner = {};

const snittText1 = "Genomsnitts-<br>löner 2025.<br>Hela landet: <span class='fet stor'>";
const snittText2 = "</span><br> kr/mån.";

function yrkesnyckel() {
  const v = select.value;
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function laddaLoner() {
  const nyckel = yrkesnyckel();
  loner = {};
  alla.forEach(d => {
    loner[d.Kod.slice(0, 4)] = d[nyckel];
  });
}
const harVarde = v => typeof v === "number" && Number.isFinite(v);

const svg = d3.select("svg");
const tooltip = d3.select("#tooltip").attr("class", "BodyImage-caption");
// const snitt = d3.select("#snitt").attr("class", "BodyImage-caption").text(select.value);

const w = 320;
const h = 435;
svg.attr("viewBox", "0 0 " + w + " " + h)

Promise.all([
  d3.json("Sverige_NUTS2_2024.geojson"),
  d3.json("loner.json")
]).then(([data, lonedata]) => {
  alla = lonedata;
  laddaLoner();
// const projection = d3.geoMercator()
  const projection = d3.geoConicEqualArea()
  .scale(1800)
  // .center([17.2,62.34103687152436]) //projection center
  .center([17.2,62]) //projection center


  .parallels([55.327583999999995,69.059967]) //parallels for conic projection
  .rotate([343.6173436862723]) //rotation for conic projection
  // .translate([432.31469742010825,256.8639471506867]) //translate to center the map in view;
  .translate([w*1.1, h/2.25]); //translate to center the map in view;

  // .fitSize([500, 700], data);

  const path2 = d3.geoPath().projection(projection);

  // const color = d3.scaleSequential(d3.interpolateBlues)
  //   .domain([33000, 39000]);

  // const color = d3.scaleSequential(d3.interpolateBlues);
  const color = d3.scaleSequential(
  d3.interpolateRgbBasis(["#d1edf2", "#00bbdf", "#2e4874"])
);

c(alla[0][select.value])

// let snittTextTotal = snittText1 + "<br>" + snittText2 + " <span class='fet'>" + alla[0][select.value] + "</span> kr/mån."

let snitt = d3.select("#snitt")
              .attr("class", "BodyImage-caption")
              // .html(snittText1 + "<br>" + snittText2 + " <span class='fet'>" + alla[0][select.value] + "</span> kr/mån.");
              .html(snittText1 + alla[0][select.value] + snittText2);
// snitt.textContent = "bla bla";

function faerg() {
    const varden = data.features
      .map(f => loner[f.properties.NUTS_ID])
      .filter(harVarde)
      .filter(v => v !== undefined);
    color.domain(d3.extent(varden));
    svg.selectAll("path")
      .attr("fill", d => harVarde(loner[d.properties.NUTS_ID]) 
        ? color(loner[d.properties.NUTS_ID])
        : "#ccc");
  }

  svg.selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path2)
    // .attr("fill", d => color(loner[d.properties.NUTS_ID]))
    .on("mouseover", visaTooltip)
    .on("mousemove", flyttaTooltip)
    .on("mouseout", () => tooltip.style("display", "none"))
    .on("click", function(d) {
      visaTooltip(d);
      flyttaTooltip();
      d3.event.stopPropagation();
    });

  faerg();
  select.addEventListener("change", () => {
    laddaLoner();
    faerg();
    tooltip.style("display", "none");
    snitt = d3.select("#snitt")
              .attr("class", "BodyImage-caption")
              .html(snittText1 + alla[0][select.value] + snittText2);
  });

  // Tryck utanför kartan stänger tooltipen (pekskärmar)
  d3.select("body").on("click", () => tooltip.style("display", "none"));

  informHeight();

 
});

function visaTooltip(d) {
  const kod = d.properties.NUTS_ID;
  const namn = d.properties.NAME_LATN;
  const lon = loner[kod];

    tooltip
    .style("display", "block")
    // .html(`${select.options[select.selectedIndex].text} i
    //   ${namn}: <b>${harVarde(lon) ? lon.toLocaleString("sv-SE") + " kr/månad" : "uppgift saknas"}</b>`);
      .html(`${namn}: <br>${harVarde(lon) ? lon.toLocaleString("sv-SE") + " kr/mån" : "uppgift saknas"}</b>`);
}

function flyttaTooltip() {
  const bredd = tooltip.node().offsetWidth;
  const x = Math.min(d3.event.pageX + 15, window.innerWidth - bredd - 10);
  tooltip
    .style("left", Math.max(x, 5) + "px")
    .style("top", (d3.event.pageY + 15) + "px");
}

