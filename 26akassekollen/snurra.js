//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}



document.addEventListener('DOMContentLoaded', function() {

// var lon = document.getElementById("lon");
var akassa = document.getElementById("akassa");
const stunningText = document.querySelector("p.stunningText");
const resultEl = stunningText || akassa;

function clearResultText() {
  if (stunningText) stunningText.innerHTML = "";
  if (akassa && akassa !== stunningText) akassa.innerHTML = "";
}

function setResultText(html) {
  if (resultEl) resultEl.innerHTML = html;
}

// var aKassa2 = document.getElementById("akassa2");
var inputLon = document.getElementById("inputLon");
// var shoot = document.getElementById("calculate");
let select = document.getElementById("fack");
let daysSlider = document.getElementById("daysSlider");
let daysValue = document.getElementById("daysValue");
let calculationInfo = document.getElementById("calculationInfo");
if (!calculationInfo) {
  // Safe fallback: create a hidden `calculationInfo` element so
  // later code can write to it without causing warnings.
  calculationInfo = document.createElement('div');
  calculationInfo.id = 'calculationInfo';
  calculationInfo.style.display = 'none';
  if (akassa && akassa.parentNode) {
    akassa.parentNode.insertBefore(calculationInfo, akassa.nextSibling);
  } else {
    document.body.appendChild(calculationInfo);
  }
}
let fackData = [];
let selectedUnion = null;
let lastSelectedUnionIndex = 0;
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

function cleanHiddenChars(value) {
  return String(value).replace(/[\uFEFF\u200B-\u200D\u2060]/g, '');
}

function normalizeObjectKey(key) {
  return cleanHiddenChars(key).trim();
}

function normalizeText(value) {
  return cleanHiddenChars(value).trim();
}

function normalizeUnionItem(item) {
  if (!item || typeof item !== 'object') return {};

  const normalized = {};
  Object.keys(item).forEach((key) => {
    const normalizedKey = normalizeObjectKey(key);
    if (!(normalizedKey in normalized)) {
      const rawValue = item[key];
      normalized[normalizedKey] = typeof rawValue === 'string' ? normalizeText(rawValue) : rawValue;
    }
  });

  return normalized;
}

function getUnionName(item) {
  if (!item || typeof item !== 'object') return '';

  if (typeof item.Fack === 'string' && item.Fack.trim()) {
    return normalizeText(item.Fack);
  }

  // Fallback: hitta nyckel som motsvarar "Fack" även med osynliga tecken.
  for (const key of Object.keys(item)) {
    if (normalizeObjectKey(key).toLowerCase() === 'fack') {
      const value = item[key];
      if (typeof value === 'string' && value.trim()) {
        return normalizeText(value);
      }
    }
  }

  // Sista fallback: första icke-numeriska textvärdet i objektet.
  for (const value of Object.values(item)) {
    if (typeof value !== 'string') continue;
    const text = normalizeText(value);
    if (!text) continue;
    if (!/^\d+$/.test(text)) return text;
  }

  return '';
}

function getFirstSelectableUnionIndex() {
  if (!select || select.options.length === 0) return -1;
  const firstValue = Number(select.options[0].value);
  return Number.isFinite(firstValue) ? firstValue : -1;
}

// Put the text "nonsense" in the a-kassa input field
if (akassa) akassa.value = "nonsense";

// räknekonstanter

const aKassa_100 = 0.80; //80 procent av lönen
const aKassa_200 = 0.70; //70 procent av lönen
const aKassa_300 = 0.65; //65 procent av lönen
const aKassa_400 = 0.60; //65 procent av lönen
const MIN_SALARY = 11000;


// Load JSON data and populate select options
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    fackData = (Array.isArray(data) ? data : []).map(normalizeUnionItem);
    
    // Clear existing options
    select.innerHTML = '';
    
    // Populate select with data from JSON
    fackData.forEach((item, index) => {
      const fackName = getUnionName(item);

      const option = document.createElement('option');
      option.value = index;
      option.textContent = fackName;
      select.appendChild(option);
    });

    const firstSelectableIndex = getFirstSelectableUnionIndex();
    if (firstSelectableIndex >= 0) {
      // Force visible default in all environments/browsers.
      select.value = String(firstSelectableIndex);
      if (select.selectedIndex < 0) {
        select.selectedIndex = 0;
      }

      selectedUnion = fackData[firstSelectableIndex];
      i1 = Number(selectedUnion.Tak) || 0;
      fors1 = Number(selectedUnion.Dagar) + 1 || 0;
      fors2 = Number(selectedUnion.Dagar) + Number(selectedUnion.DagarFler) + 1 || 0;
      lastSelectedUnionIndex = firstSelectableIndex;
    }
    
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

// const minSalaryText = formatSwedishNumber(MIN_SALARY);
const minSalaryText = MIN_SALARY.toString();

const minSalaryMessage = `Ange minst ${minSalaryText} kr i lön för att få ett resultat.`;

if (inputLon) {
  inputLon.placeholder = ` Minst ${minSalaryText} kr`;
  inputLon.title = minSalaryMessage;
  if (inputLon.type === "number") {
    inputLon.min = String(MIN_SALARY);
  }
}

// Calculate benefit based on salary, days, and union
function calculateBenefit(event) {
  const rawSalaryInput = inputLon.value || "";
  const trimmedInput = rawSalaryInput.trim();
  // Only allow pure digits, no spaces or other characters
  const hadNonNumericInput =
    (rawSalaryInput !== "" && !/^\d+$/.test(trimmedInput));
  const salary = Number(trimmedInput); // Only digits allowed, so no need to replace spaces
  const days = Number(daysSlider.value) || 0;
  let tillagg = false;

  const isDeleteAction =
    event &&
    event.type === "input" &&
    (event.inputType === "deleteContentBackward" ||
     event.inputType === "deleteContentForward" ||
     event.inputType === "deleteByCut");

  if (!selectedUnion || isNaN(salary) || salary <= 0) {
    clearResultText();

    // Undantag: skriv INTE tillbaka feltext när användaren raderar
    if (hadNonNumericInput && !isDeleteAction) {
      inputLon.value = "Skriv bara siffror!";
    }

    if (hadNonNumericInput && forklaring) {
      forklaring.textContent = "Nåt blev fel. Kolla att du skrivit en riktig siffra för lönen.";
    }

    if (calculationInfo) calculationInfo.textContent = "";
    return;
  }

  if (salary < MIN_SALARY) {
    clearResultText();
    if (calculationInfo) calculationInfo.textContent = minSalaryMessage;
    if (forklaring) forklaring.innerHTML = minSalaryMessage;
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

  if (days >= 301) {
    percentage = aKassa_400; // 60%
  } else if (days >= 201) {
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
  const calculatedBenefit = salary * percentage;

  const finalBenefit = salary > ceiling ? ceiling * percentage : calculatedBenefit;
  
   if (!hadNonNumericInput) {
    setResultText(formatSwedishNumber(finalBenefit) + " kr/månad");
  }

  if (percentage === aKassa_400 && resultEl) {
    resultEl.innerHTML += "<span class='aktivitetstod-info'>Efter 300 dagar är a-kassan slut och man kan istället få aktivitetsstöd. Klicka härunder för att läsa mer.</span>";
  }
  if (calculationInfo) {
    calculationInfo.textContent = info + (finalBenefit < calculatedBenefit ? `, tak: ${formatSwedishNumber(ceiling)} kr` : "");
  } else {
    calculationInfo = document.getElementById("calculationInfo");
    if (calculationInfo) calculationInfo.textContent = info + (finalBenefit < calculatedBenefit ? `, tak: ${formatSwedishNumber(ceiling)} kr` : "");
    else c('warning: calculationInfo element not found');
  }

const akassaLimitDay =
  days <= 100 ? 100 :
  days <= 200 ? 200 :
  300;

const insuranceLimitDay = tillagg ? forsakringDagarTillagg : forsakringDagarDefault;
const currentLimitDay = Number(ceiling) === defaultCeiling
  ? 300
  : (days <= insuranceLimitDay ? insuranceLimitDay : akassaLimitDay);

  const afterDay300InfoText = "Aktivitetsstödet är först 60% av inkomsten upp till taket, och trappas sedan ner med fem procentenheter var hundrade dag. Lägsta ersättningen är 365 kr/dag. Övergångsregler kan gälla.";
  if (days > 300) {
    forklaring.innerHTML = afterDay300InfoText;
    return;
  }

  let kryssad = tillagg ? "Du har kryssat i tilläggsförsäkring.<br>" : "";

  let infoText1 = `Valt fackförbund är ${selectedUnion.Fack}.`
  let infoText2 = `Inget fackförbund är valt.`
  let infoText3 = `
  <br>Din lön är ${formatSwedishNumber(salary)} kr.<br>${kryssad}Du får ${Math.round(percentage * 100)} % av din lön (upp till taket) alltså ${formatSwedishNumber(finalBenefit)}&nbsp;kr/månad. Taket är ${formatSwedishNumber(ceiling)} kr till och med dag ${currentLimitDay}*.<br>
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



// inputLon.addEventListener("keydown", calculateBenefit);
inputLon.addEventListener("input", calculateBenefit);


select.addEventListener("change", function(){
  const index = Number(this.value);
  selectedUnion = fackData[index];
  if (!isNaN(index) && index >= 0 && index < fackData.length) {
    lastSelectedUnionIndex = index;
  }
  
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
    
    // fors1 = 0;
    // fors2 = 0;
  } else {
    // Otherwise use the union's values
    fors1 = Number(selectedUnion.Dagar) + 1 || 0;
    fors2 = Number(selectedUnion.Dagar) + Number(selectedUnion.DagarFler) + 1 || 0;
  }
  
  renderTicks();
  calculateBenefit();
});

// Add checkbox event listener once, outside calculateBenefit
const tillaggCheckbox = document.getElementById("tillagg");
if (tillaggCheckbox) {
  tillaggCheckbox.addEventListener("change", function() {
    renderTicks();
    calculateBenefit();
  });
}

// Add checkbox event listener for "ejmedlem"
const ejmedlemCheckbox = document.getElementById("ejmedlem");
if (ejmedlemCheckbox) {
  ejmedlemCheckbox.addEventListener("change", function() {
    if (this.checked && selectedUnion) {
      const currentIndex = Number(select.value);
      if (!isNaN(currentIndex) && currentIndex >= 0 && currentIndex < fackData.length) {
        lastSelectedUnionIndex = currentIndex;
      }

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
      select.value = ""; // Clear select when not a member
      tillaggCheckbox.disabled = true; // Disable tillagg checkbox when not a member
      tillaggCheckbox.checked = false; // Uncheck tillagg when not a member
      
      // fors1 = 0;
      // fors2 = 0;
    } else if (selectedUnion) {
      select.disabled = false; // Enable select when member
      if (fackData.length > 0) {
        const fallbackIndex = getFirstSelectableUnionIndex();
        const restoreIndex = (lastSelectedUnionIndex >= 0 && lastSelectedUnionIndex < fackData.length)
          ? lastSelectedUnionIndex
          : fallbackIndex;
        const hasRestoreOption = restoreIndex >= 0 && !!select.querySelector(`option[value="${restoreIndex}"]`);

        if (hasRestoreOption) {
          select.value = String(restoreIndex);
          selectedUnion = fackData[restoreIndex];
        } else if (fallbackIndex >= 0) {
          select.value = String(fallbackIndex);
          selectedUnion = fackData[fallbackIndex];
        }
      }

      // Restore original values for the newly selected union if needed
      if (selectedUnion) {
        if (selectedUnion._originalTak !== undefined) selectedUnion.Tak = selectedUnion._originalTak;
        if (selectedUnion._originalDagar !== undefined) selectedUnion.Dagar = selectedUnion._originalDagar;
        if (selectedUnion._originalTakHogt !== undefined) selectedUnion.TakHogt = selectedUnion._originalTakHogt;
        if (selectedUnion._originalDagarFler !== undefined) selectedUnion.DagarFler = selectedUnion._originalDagarFler;

        fors1 = Number(selectedUnion.Dagar) + 1 || 0;
        fors2 = Number(selectedUnion.Dagar) + Number(selectedUnion.DagarFler) + 1 || 0;
      }

      tillaggCheckbox.disabled = false; // Enable tillagg checkbox when member
    }
    renderTicks();
    calculateBenefit();
  });
}

// Function to update label position based on slider value
function getSliderThumbSizePx() {
  const thumbSizeRaw = getComputedStyle(document.documentElement)
    .getPropertyValue("--slider-thumb-size")
    .trim();
  const thumbSize = Number.parseFloat(thumbSizeRaw);
  return Number.isFinite(thumbSize) ? thumbSize : 35;
}

function sliderValueToPx(value) {
  const min = Number(daysSlider.min) || 0;
  const max = Number(daysSlider.max) || 100;
  const sliderWidth = daysSlider.offsetWidth || 0;

  if (max <= min) return 0;

  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const thumbSize = getSliderThumbSizePx();
  const usableWidth = Math.max(0, sliderWidth - thumbSize);
  return thumbSize / 2 + ratio * usableWidth;
}

function updateLabelPosition() {
  const value = Number(daysSlider.value);

  // Update label position
  const label = document.querySelector('label[for="daysSlider"]');
  if (label) {
    const sliderWidth = daysSlider.offsetWidth || 0;
    const labelWidth = label.offsetWidth || 0;
    const halfLabel = labelWidth / 2;
    const rawLeft = sliderValueToPx(value);
    const clampedLeft = Math.min(sliderWidth - halfLabel, Math.max(halfLabel, rawLeft));
    label.style.left = `${clampedLeft}px`;
    label.style.transform = 'translateX(-50%)';
  }
}

window.addEventListener("resize", function() {
  updateLabelPosition();
  renderTicks();
});

daysSlider.addEventListener("input", function(){
  const value = Number(this.value);
  daysValue.textContent = value;
  document.getElementById("daysText").textContent = value === 1 ? "dag*" : "dagar*";
  updateLabelPosition();
  calculateBenefit();
});

// Also listen for "change" to ensure final slider value (e.g. max) is handled
daysSlider.addEventListener("change", function(){
  const value = Number(this.value);
  daysValue.textContent = value;
  document.getElementById("daysText").textContent = value === 1 ? "dag*" : "dagar*";
  updateLabelPosition();
  calculateBenefit();
});

const body = document.querySelector('body');

// Bygg ticks
function renderTicks() {
  ticksEl.innerHTML = "";

  const min = Number(range.min);
  const max = Number(range.max);
  const tillaggCheckbox = document.getElementById("tillagg");
  const ejmedlemCheckbox = document.getElementById("ejmedlem");
  const isNotMember = !!(ejmedlemCheckbox && ejmedlemCheckbox.checked);
  const showFors2 = !isNotMember && !!(tillaggCheckbox && tillaggCheckbox.checked);
  const showFors1 = !isNotMember && !showFors2;
  
  // Bara vissa markers (måste ligga inom min..max)
  // Visa fors1 från start (om värde finns), visa fors2 endast om tillägg är ikryssad.
  // När fors2 visas döljs fors1.
  const markers = [
    { value: 0, insurance: false },
    { value: 101, insurance: false },
    { value: 201, insurance: false },
    { value: 301, insurance: false },
    { value: showFors1 ? fors1 : null, insurance: true },
    { value: showFors2 ? fors2 : null, insurance: true }
  ].filter(m => m.value !== undefined && m.value !== null && !isNaN(m.value));

  // Slå ihop eventuella dubbletter på samma dag.
  // Om en försäkringsmarkör finns på samma värde prioriteras insurance=true.
  const markerByValue = new Map();
  for (const marker of markers) {
    const existing = markerByValue.get(marker.value);
    if (!existing || marker.insurance) {
      markerByValue.set(marker.value, marker);
    }
  }

  for (const { value: v, insurance } of markerByValue.values()) {
    if (v < min || v > max) continue;

    const tick = document.createElement("div");
    tick.className = "tick";
    
    tick.style.left = `${sliderValueToPx(v)}px`;
    tick.dataset.value = String(v);

    const label = document.createElement("div");
    label.className = "tick__label";
    
    // Add special class for insurance period markers
    if (insurance) {
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

