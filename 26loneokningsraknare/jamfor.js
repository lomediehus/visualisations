//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "../arbetet_assets/img/favicon2.ico";
}

c("kör skript version ")

// Genomsnittslöner per yrke läses in från jamfor.json
    let loner = {};
    let alla = [];

    const ar = document.querySelector("#ar");
    const yrke = document.querySelector("#yrke");
    const startlon = document.querySelector("#startlon");
    const slutlon = document.querySelector("#slutlon");

    const formatKr = n =>
      Math.round(n).toLocaleString("sv-SE");

    const formatProcent = n =>
      n.toFixed(1).replace(".", ",") + " %";

    // Fyll årsmenyn utifrån valt yrke (behåller vald årsvärde om möjligt)
    function fyllAr() {
      const tidigare = ar.value;
      loner = alla.find(d => d.yrke === yrke.value) || {};
      ar.innerHTML = "";
      Object.keys(loner).forEach(year => {
        if (year === "yrke" || year == 2025) return;
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        ar.appendChild(option);
      });
      if (tidigare && loner[tidigare]) ar.value = tidigare;
    }

    // Beräkna och uppdatera grafiken
    function uppdatera() {
      const startAr = Number(ar.value);
      const startLon = Number(startlon.value);
      const slutLon = Number(slutlon.value);

      if (startLon <= 0 || slutLon <= 0) {
        document.querySelector("#resultat").style.display = "none";
        return;
      }

      document.querySelector("#resultat").style.display = "block";
      document.querySelector("#genomsnittLon").textContent =
      formatKr(loner[startAr]) + " kr/mån";
      document.querySelector("#genomsnittLonSlut").textContent =
      formatKr(loner[2025]) + " kr/mån";
      // document.querySelector("#yrkeText").textContent = yrke.options[yrke.selectedIndex].text.toLowerCase();
     

      const faktor = loner[2025] / loner[startAr];
      const jamforelseLon = startLon * faktor;

      const egenOkning = (slutLon / startLon - 1) * 100;
      const snittOkning = (faktor - 1) * 100;
      const skillnad = slutLon - jamforelseLon;

      // Skriv ut procent
      document.querySelector("#egenProcent").textContent =
        formatProcent(egenOkning);

      document.querySelector("#snittProcent").textContent =
        formatProcent(snittOkning);

      // Rita staplar (längsta positiva stapeln = 100 %)
      // const max = Math.max(egenOkning, snittOkning, 1);

      // document.querySelector("#egenStapel").style.width =
      //   Math.max(0, egenOkning / max * 100) + "%";

      // document.querySelector("#snittStapel").style.width =
      //   Math.max(0, snittOkning / max * 100) + "%";

      // Skriv slutsats
      let text = "";

      if (Math.abs(skillnad) < 0.5) {
        text = "Din lön har följt genomsnittets utveckling.";
      } else if (skillnad > 0) {
        text = "Din lön har ökat mer än genomsnittet.";
      } else {
        text = "Din lön har ökat mindre än genomsnittet.";
      }

      text += " Om din lön hade följt genomsnittet " +
        "skulle du ha tjänat " +
        formatKr(jamforelseLon) +
        " kr/mån 2025.";

      document.querySelector("#jamforelse").textContent = text;
    }

    // Uppdatera när användaren ändrar något
    [ar, startlon, slutlon].forEach(element => {
      element.addEventListener("input", uppdatera);
    });

    [startlon, slutlon].forEach(element => {
      element.addEventListener("input", () => {
        element.classList.remove("initial-value");
      });
    });

    yrke.addEventListener("input", () => {
      fyllAr();
      uppdatera();
    });

    // Läs in data och rita första gången
    fetch("jamfor.json")
      .then(r => r.json())
      .then(data => {
        alla = data;
        fyllAr();
        uppdatera();
        informHeight();
      });
