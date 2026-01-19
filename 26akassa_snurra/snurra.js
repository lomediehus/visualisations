//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

c("kör skript version ")

document.addEventListener('DOMContentLoaded', function() {

// var lon = document.getElementById("lon");
var akassa = document.getElementById("akassa");
var aKassa2 = document.getElementById("akassa2");
var inputLon = document.getElementById("inputLon");
// var shoot = document.getElementById("calculate");
let select = document.getElementById("fack");
let daysSlider = document.getElementById("daysSlider");
let daysValue = document.getElementById("daysValue");
let calculationInfo = document.getElementById("calculationInfo");
let fackData = [];
let selectedUnion = null;
// const i2 = 415.15;
let i1 = 0;
// let result;
// let result2;
let testresultat = document.getElementById("testresultat");

// Put the text "nonsense" in the a-kassa input field
if (akassa) akassa.value = "nonsense";

// räknekonstanter

const aKassa_100 = 0.80; //80 procent av lönen
const aKassa_200 = 0.70; //70 procent av lönen
const aKassa_300 = 0.65; //65 procent av lönen

// Load JSON data and populate select options
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    fackData = data;
    
    // Clear existing options
    select.innerHTML = '';
    
    // Populate select with data from JSON
    data.forEach((item, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = item.Fack;
      select.appendChild(option);
      
      // Set first value as default
      if (index === 0) {
        selectedUnion = item;
        i1 = Number(item.Tak);
      }
    });
    
    // Calculate initial values
    calculateBenefit();
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

// shoot.addEventListener("click", function() {
//   c("shoot")
//   c(inputYear.value)
//   // lon.value = inputYear.value * 2;
//   lon.value = Math.round(i2/i1 * inputYear.value);
// })

// Format number with Swedish thousand separator (space)
function formatSwedishNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
}

// Calculate benefit based on salary, days, and union
function calculateBenefit() {
  const salary = Number(inputLon.value);
  const days = Number(daysSlider.value);
  
  if (!selectedUnion || isNaN(salary) || salary <= 0) {
    akassa.value = salary && isNaN(salary) ? "Skriv bara siffror" : "";
    if (calculationInfo) {
      calculationInfo.textContent = "";
    } else {
      calculationInfo = document.getElementById("calculationInfo");
      if (calculationInfo) calculationInfo.textContent = "";
      else c('warning: calculationInfo element not found');
    }
    return;
  }
  
  let percentage = aKassa_100; // 80%
  let defaultCeiling = 34000; // Default ceiling
  let ceiling = defaultCeiling;
  let info = `${Math.round(percentage * 100)}% av lön`;
  
  // Determine percentage and ceiling based on days
  const dagar = Number(selectedUnion.Dagar) || 0;
  const dagarFler = Number(selectedUnion.DagarFler) || 0;
  const forsakringDagarDefault = dagar;
  const forsakringDagarTillagg = dagar + dagarFler;

  

  if (days >= 200) {
    percentage = aKassa_300; // 65%
  } else if (days >= 100) {
    percentage = aKassa_200; // 70 %
  } else {
    percentage = aKassa_100; // 80%
  }

  // let tillagg = false;
  const tillaggCheckbox = document.getElementById("tillagg");
  if (tillaggCheckbox) {
    tillagg = tillaggCheckbox.checked;
  }


  // Om tillägg är true: selectedUndion.TakHogt används som tak.
  // Om tillägg är false: default tak 34000 används.
  if (tillagg === false) {
    ceiling = selectedUnion.Tak || ceiling;
    if (days >= forsakringDagarDefault) {
      ceiling = defaultCeiling;
    }  
  }

  if (tillagg === true) {
    ceiling = selectedUnion.TakHogt || ceiling;
    if (days > forsakringDagarTillagg) {
    ceiling = defaultCeiling;
    }  
  }

  
  // if (days <= forsakringDagarTillagg && dagarFler > 0) {
  //  if (days <= forsakringDagarDefault) {
  //   // percentage = aKassa_200; // 70%
  //   ceiling = selectedUnion.TakHogt || ceiling;
  //   info = `${Math.round(percentage * 100)}% av lön (efter ${days} dagar)`;
  // } else if (days <= forsakringDagarTillagg) {
  //   // percentage = aKassa_300; // 65%
  //   ceiling = selectedUnion.TakHogt || ceiling;
  //   info = `${Math.round(percentage * 100)}% av lön (efter ${days} dagar)`;
  // // } else if (days <= forsakringDagarDefault && dagar > 0) {
  // }
  
  // Calculate benefit with ceiling
  const calculatedBenefit = salary * percentage;
  const finalBenefit = ceiling && calculatedBenefit > ceiling ? ceiling * percentage: calculatedBenefit;
  
  akassa.innerHTML = formatSwedishNumber(finalBenefit) + " kr/månad";
  if (calculationInfo) {
    calculationInfo.textContent = info + (finalBenefit < calculatedBenefit ? `, tak: ${formatSwedishNumber(ceiling)} kr` : "");
  } else {
    calculationInfo = document.getElementById("calculationInfo");
    if (calculationInfo) calculationInfo.textContent = info + (finalBenefit < calculatedBenefit ? `, tak: ${formatSwedishNumber(ceiling)} kr` : "");
    else c('warning: calculationInfo element not found');
  }

  let kryssad = tillagg ? "Tillägg är ikryssat.<br>" : "";
  
  testresultat.innerHTML = `Förutsättningar för beräkningen:<br>Valt fackförbund är ${selectedUnion.Fack}.<br>Uppgiven lön är ${formatSwedishNumber(salary)} kr.<br>${kryssad}Vid ${days} dagars arbetslöshet är taket ${formatSwedishNumber(ceiling)} kr.<br>Ersättningen blir ${Math.round(percentage * 100)}% av lönen upp till taket.<br>Ersättningen blir alltså → ${formatSwedishNumber(finalBenefit)} kr`;
}

inputLon.addEventListener("keyup", calculateBenefit);

select.addEventListener("change", function(){
  const index = Number(this.value);
  selectedUnion = fackData[index];
  c("Selected union:", selectedUnion);
  calculateBenefit();
});

// Add checkbox event listener once, outside calculateBenefit
const tillaggCheckbox = document.getElementById("tillagg");
if (tillaggCheckbox) {
  tillaggCheckbox.addEventListener("change", function() {
    c("Tillägg är nu:", this.checked);
    c(this.checked);
    calculateBenefit();
  });
}

daysSlider.addEventListener("input", function(){
  daysValue.textContent = this.value;
  calculateBenefit();
});

// Also listen for "change" to ensure final slider value (e.g. max) is handled
daysSlider.addEventListener("change", function(){
  daysValue.textContent = this.value;
  calculateBenefit();
});

const body = document.querySelector('body');



informHeight();

});

