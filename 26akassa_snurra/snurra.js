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
let forklaring = document.getElementById("forklaring");
const forklaringRubrik = document.getElementById("forklaringRubrik"); 

// Toggle forklaring popup when clicking forklaringRubrik
if (forklaringRubrik) {
  forklaringRubrik.style.cursor = "pointer";
  forklaringRubrik.addEventListener("click", function() {
    if (forklaring) {
      forklaring.classList.toggle("show");
    }
  });
}

// Här är allt för slidern och ticksen
const range = document.getElementById("daysSlider");
const ticksEl = document.getElementById("ticks");
let fors1;
let fors2;

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
        fors1 = Number(item.Dagar) || 0;
        fors2 = Number(item.Dagar) + Number(item.DagarFler) || 0;
      }
    });
    
    // Calculate initial values
    calculateBenefit();
    renderTicks();
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

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
  c("dagar från facket:", dagar);
  const dagarFler = Number(selectedUnion.DagarFler) || 0;
  const forsakringDagarDefault = dagar;
  const forsakringDagarTillagg = dagar + dagarFler;

  if (days >= 201) {
    percentage = aKassa_300; // 65%
  } else if (days >= 101) {
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
    if (days > forsakringDagarDefault) {
      ceiling = defaultCeiling;
    }  
  }

  if (tillagg === true) {
    ceiling = selectedUnion.TakHogt || ceiling;
    if (days > forsakringDagarTillagg) {
      ceiling = defaultCeiling;
    }  
  }

 
  
  // Calculate benefit with ceiling
  c(percentage, ceiling);
  const calculatedBenefit = salary * percentage;

  const finalBenefit = salary > ceiling ? ceiling * percentage : calculatedBenefit;
  
  akassa.innerHTML = formatSwedishNumber(finalBenefit) + " kr/månad";
  if (calculationInfo) {
    calculationInfo.textContent = info + (finalBenefit < calculatedBenefit ? `, tak: ${formatSwedishNumber(ceiling)} kr` : "");
  } else {
    calculationInfo = document.getElementById("calculationInfo");
    if (calculationInfo) calculationInfo.textContent = info + (finalBenefit < calculatedBenefit ? `, tak: ${formatSwedishNumber(ceiling)} kr` : "");
    else c('warning: calculationInfo element not found');
  }

  let kryssad = tillagg ? "Tillägg är ikryssat.<br>" : "";

  let infoText1 = `Valt fackförbund är ${selectedUnion.Fack}`
  let infoText2 = `Inget fackförbund är valt.`
  let infoText3 = `
  <br>Du har uppgett en lön på ${formatSwedishNumber(salary)} kr.<br>${kryssad}Vid ${days} dagars arbetslöshet är taket ${formatSwedishNumber(ceiling)} kr.<br>Du får ${Math.round(percentage * 100)}% av lönen upp till taket, alltså ${formatSwedishNumber(finalBenefit)} kr/månad.
  `

  if (select.disabled) {
    // forklaring.innerHTML = '';
    forklaring.innerHTML = infoText2 + infoText3;
    return;
  } else {
    // forklaring.innerHTML = '';
    forklaring.innerHTML = infoText1 + infoText3;
  }
  

}



inputLon.addEventListener("keyup", calculateBenefit);

select.addEventListener("change", function(){
  const index = Number(this.value);
  selectedUnion = fackData[index];
  c("Selected union:", selectedUnion);
  
  // Check if "ejmedlem" is checked
  const ejmedlemCheckbox = document.getElementById("ejmedlem");
  if (ejmedlemCheckbox && ejmedlemCheckbox.checked) {
    // If not a member, store original values and set to null
    selectedUnion._originalTak = selectedUnion.Tak;
    selectedUnion._originalDagar = selectedUnion.Dagar;
    selectedUnion._originalTakHogt = selectedUnion.TakHogt;
    selectedUnion._originalDagarFler = selectedUnion.DagarFler;
    
    selectedUnion.Tak = null;
    selectedUnion.Dagar = null;
    selectedUnion.TakHogt = null;
    selectedUnion.DagarFler = null;
    
    fors1 = 0;
    fors2 = 0;
  } else {
    // Otherwise use the union's values
    fors1 = Number(selectedUnion.Dagar) || 0;
    fors2 = Number(selectedUnion.Dagar) + Number(selectedUnion.DagarFler) || 0;
  }
  
  renderTicks();
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

// Add checkbox event listener for "ejmedlem"
const ejmedlemCheckbox = document.getElementById("ejmedlem");
if (ejmedlemCheckbox) {
  ejmedlemCheckbox.addEventListener("change", function() {
    if (this.checked && selectedUnion) {
      // Store original values
      selectedUnion._originalTak = selectedUnion.Tak;
      selectedUnion._originalDagar = selectedUnion.Dagar;
      selectedUnion._originalTakHogt = selectedUnion.TakHogt;
      selectedUnion._originalDagarFler = selectedUnion.DagarFler;
      
      // Set to null
      selectedUnion.Tak = null;
      selectedUnion.Dagar = null;
      selectedUnion.TakHogt = null;
      selectedUnion.DagarFler = null;

      select.disabled = true; // Disable select when not a member
      tillaggCheckbox.disabled = true; // Disable tillagg checkbox when not a member

     
      
      fors1 = 0;
      fors2 = 0;
    } else if (selectedUnion) {
      // Res ore original values
      selectedUnion.Tak = selectedUnion._originalTak;
      selectedUnion.Dagar = selectedUnion._originalDagar;
      selectedUnion.TakHogt = selectedUnion._originalTakHogt;
      selectedUnion.DagarFler = selectedUnion._originalDagarFler;
      
      fors1 = Number(selectedUnion.Dagar) || 0;
      fors2 = Number(selectedUnion.Dagar) + Number(selectedUnion.DagarFler) || 0;

      select.disabled = false; // Enable select when member
      tillaggCheckbox.disabled = false; // Enable tillagg checkbox when member
      c(tillagg.disabled);
    }
    renderTicks();
    calculateBenefit();
  });
}

// Function to update label position based on slider value
function updateLabelPosition() {
  const value = daysSlider.value;
  const min = daysSlider.min || 0;
  const max = daysSlider.max || 100;
  
  // Calculate percentage position
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Update label position
  const label = document.querySelector('label[for="daysSlider"]');
  if (label) {
    label.style.left = `calc(${percentage}% + ${(8 - percentage * 0.15)}px)`;
    label.style.transform = 'translateX(-50%)';
  }
}

daysSlider.addEventListener("input", function(){
  const value = Number(this.value);
  daysValue.textContent = value;
  document.getElementById("daysText").textContent = value === 1 ? "dag" : "dagar";
  updateLabelPosition();
  calculateBenefit();
});

// Also listen for "change" to ensure final slider value (e.g. max) is handled
daysSlider.addEventListener("change", function(){
  const value = Number(this.value);
  daysValue.textContent = value;
  document.getElementById("daysText").textContent = value === 1 ? "dag" : "dagar";
  updateLabelPosition();
  calculateBenefit();
});

const body = document.querySelector('body');

// Bygg ticks
function renderTicks() {
  ticksEl.innerHTML = "";

  const min = Number(range.min);
  const max = Number(range.max);
  
  // Bara vissa markers (måste ligga inom min..max)
  const markerValues = [0, 100, fors1, 200, fors2, 300].filter(v => v !== undefined && v !== null && !isNaN(v));

  for (const v of markerValues) {
    if (v < min || v > max) continue;

    const pct = ((v - min) / (max - min)) * 100;

    const tick = document.createElement("div");
    tick.className = "tick";
    
    tick.style.left = `${pct}%`;
    tick.dataset.value = String(v);

    const label = document.createElement("div");
    label.className = "tick__label";
    
    // Add special class for insurance period markers
    if (v === fors1 || v === fors2) {
      label.classList.add("tick__label--insurance");
    }
    
    label.textContent = v;

    tick.appendChild(label);
    ticksEl.appendChild(tick);
  }
}

// Snap till steg (om marker inte är exakt på ett steg)
function snapToStep(v) {
  const min = Number(range.min);
  const step = Number(range.step) || 1;
  const n = Math.round((v - min) / step);
  return min + n * step;
}
// Initialize label position
updateLabelPosition();
ticksEl.addEventListener("click", (e) => {
  const tick = e.target.closest(".tick");
  if (!tick) return;

  const v = Number(tick.dataset.value);
  range.value = String(snapToStep(v));

  // trigga som om användaren dragit
  range.dispatchEvent(new Event("input", { bubbles: true }));
});

range.addEventListener("input", () => {
  // här gör du vad du vill med värdet
  // console.log(Number(range.value));
});

informHeight();

});

