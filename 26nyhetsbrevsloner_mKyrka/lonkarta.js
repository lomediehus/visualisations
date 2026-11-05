//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "../arbetet_assets/img/favicon2.ico";
}

c("kör skript version ")


// Vilken karta varje yrke använder (nycklarna = value i <select> = nycklar i loner.json)
const yrken = {
  Anlagg:            { karta: "nuts" },
  Renhall:           { karta: "nuts" },
  Park:              { karta: "nuts" },
  Kyrkvaktmastare:   { karta: "stift" },
  Kyrkogardsarbetare: { karta: "stift" }
};

// Hur regionernas id och namn hittas i respektive geojson
const kartinfo = {
  nuts:  { id: f => f.properties.NUTS_ID, namn: f => f.properties.NAME_LATN },
  stift: { id: f => f.properties.namn,    namn: f => f.properties.namn }
};
let kartor = {};
const aktuellKarta = () => kartinfo[yrken[select.value].karta];

const select = document.querySelector("select");
c(select.value)
let alla = [];
let loner = {};

const regionStift = document.querySelector("#region_stift");
function uppdateraRegionStift(text) {
  if (select.value === "Kyrkogardsarbetare" || select.value === "Kyrkvaktmastare") {
    regionStift.innerHTML = "Kartan visar Sveriges 13 stift.";
  } else {
    regionStift.innerHTML = "Kartans visar regionindelning enligt EU:s NUTS-system";
  }
 
}

const snittText1 = "Hela landet: <span class='fet stor'>";
const snittText2 = "</span><br> kr/mån.";

function yrkesnyckel() {
  const v = select.value;
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function laddaLoner() {
  const nyckel = yrkesnyckel();
  loner = {};
  alla.forEach(d => {
    loner[d.Kod] = d[nyckel];               // stift: hela namnet
    loner[d.Kod.slice(0, 4)] = d[nyckel];   // NUTS: "SE11 Stockholm" -> "SE11"
  });
}
const harVarde = v => typeof v === "number" && Number.isFinite(v);

const svg = d3.select("svg");
const tooltip = d3.select("#tooltip").attr("class", "BodyImage-caption");

const w = 200;
const h = 435;
svg.attr("viewBox", "0 0 " + w + " " + h)

Promise.all([
  d3.json("Sverige_NUTS2_2024.geojson"),
  d3.json("Sveriges_stift_land.geojson"),
  d3.json("loner.json")
]).then(([nuts, stift, lonedata]) => {
  alla = lonedata;
  kartor = { nuts, stift };
  laddaLoner();
// const projection = d3.geoMercator()
  const projection = d3.geoConicEqualArea()
  .scale(1800)
  // .center([17.2,62.34103687152436]) //projection center
  .center([17.2,62]) //projection center


  .parallels([55.327583999999995,69.059967]) //parallels for conic projection
  .rotate([343.6173436862723]) //rotation for conic projection
  // .translate([432.31469742010825,256.8639471506867]) //translate to center the map in view;
  .translate([w*1.7, h/2.25]); //translate to center the map in view;

  // .fitSize([500, 700], data);

  // Stiftskartan: samma konprojektion, men skala/position räknas ut så att kartan fyller viewboxen
  const projectionStift = d3.geoConicEqualArea()
    .parallels([55.327583999999995,69.059967])
    .rotate([343.6173436862723])
    .fitExtent([[5, 5], [w - 5, h - 5]], stift);

  const pathNuts = d3.geoPath().projection(projection);
  const pathStift = d3.geoPath().projection(projectionStift);

  // const color = d3.scaleSequential(d3.interpolateBlues);
  // const color = d3.scaleSequential(
  // d3.interpolateRgbBasis(["#d1edf2", "#00bbdf", "#2e4874"])

  const color = d3.scaleThreshold()
  .domain([29000,30000,31000,32000,33000,34000])
  .range(d3.quantize(
    d3.interpolateRgbBasis(["#d1edf2", "#00bbdf", "#2e4874"]),
    7
  ));


  // Alternativ färgskala med färre steg
  // const color = d3.scaleThreshold()
  // .domain([31000, 33000])
  // .range(d3.quantize(
  //   d3.interpolateRgbBasis(["#d1edf2", "#00bbdf", "#2e4874"]),
  //   3
  // ));

// Hämta gränsvärdena (31000, 33000, 35000) från färgskalan, så att legenden alltid stämmer med kartan och du bara behöver ändra på ett ställe
const granser = color.domain();

// Hjälpfunktion som skriver tal på svenskt vis: 31000 -> "31 000"
const format = v => v.toLocaleString("sv-SE");

// Skapa en lista med ett objekt per färg: { farg: "#...", etikett: "text" }
// color.range() är listan med färgerna, i är färgens index
const legendData = color.range().map((farg, i) => {
  let etikett;

  if (i === 0) {
    // Första färgen: allt under den lägsta gränsen
    etikett = `Under ${format(granser[0])}`;
  } else if (i === color.range().length - 1) {
    // Sista färgen: allt från den högsta gränsen och uppåt
    etikett = `${format(granser[i - 1])} eller mer`;
  } else {
    // Färgerna emellan: från förra gränsen till (men inte med) nästa
    etikett = `${format(granser[i - 1])} till <${format(granser[i])}`;
  }

  return { farg, etikett };
});

// Extra rad för områden som saknar uppgift (grå, som på kartan)
legendData.push({ farg: "#ccc", etikett: "Uppgift saknas" });

// Skapa en div per post i legendData inuti <div id="legend">
const legend = d3.select("#legend")
  .selectAll(".legend-item")   // väljer (ännu icke existerande) rader
  .data(legendData)            // koppla datan till raderna
  .enter()                     // ett element per dataobjekt som saknar rad
  .append("div")
  .attr("class", "legend-item");


// Färgrutan i varje rad, färgad med objektets färg
legend.append("span")
  .attr("class", "legend-swatch")
  .style("background-color", d => d.farg);

// Texten bredvid färgrutan
legend.append("span")
  .text(d => d.etikett);

informHeight();

const snitt = d3.select("#snitt").attr("class", "BodyImage-caption");

// Visas bara om det finns ett riksvärde för yrket (raden "SE Riket" i loner.json)
function visaSnitt() {
  const v = alla[0][select.value];
  snitt.style("display", v ? "block" : "none")
       .html(snittText1 + v + snittText2);
}

function faerg() {
    const info = aktuellKarta();
    svg.selectAll("path")
      .attr("fill", d => harVarde(loner[info.id(d)])
        ? color(loner[info.id(d)])
        : "#ccc");
  }

  function ritaKarta() {
    const data = kartor[yrken[select.value].karta];
    svg.selectAll("path").remove();
    svg.selectAll("path").data(data.features).enter().append("path")
      .attr("d", yrken[select.value].karta === "nuts" ? pathNuts : pathStift)
        .on("mouseover", visaTooltip)
      .on("mousemove", flyttaTooltip)
      .on("mouseout", () => tooltip.style("display", "none"))
      .on("click", function(d) {
        visaTooltip(d);
        flyttaTooltip();
        d3.event.stopPropagation();
      });
    faerg();
}

  // svg.selectAll("path")
  //   .data(data.features)
  //   .enter()
  //   .append("path")
  //   .attr("d", path2)
  //   // .attr("fill", d => color(loner[d.properties.NUTS_ID]))
  //   .on("mouseover", visaTooltip)
  //   .on("mousemove", flyttaTooltip)
  //   .on("mouseout", () => tooltip.style("display", "none"))
  //   .on("click", function(d) {
  //     visaTooltip(d);
  //     flyttaTooltip();
  //     d3.event.stopPropagation();
  //   });

  select.addEventListener("change", () => {
    laddaLoner();
    ritaKarta();
    tooltip.style("display", "none");
    visaSnitt();
    uppdateraRegionStift("Kartan visar Sveriges 13 stift.");
  });

  ritaKarta();
  visaSnitt();

  // Tryck utanför kartan stänger tooltipen (pekskärmar)
  d3.select("body").on("click", () => tooltip.style("display", "none"));

  requestAnimationFrame(informHeight);

  

 
});

function visaTooltip(d) {
  const info = aktuellKarta();
  const kod = info.id(d);
  const namn = info.namn(d);
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
    .style("top", (d3.event.pageY - 10) + "px");
    // .style("top", (d3.event.pageY + 15) + "px");

}

