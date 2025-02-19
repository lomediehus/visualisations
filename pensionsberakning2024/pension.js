//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}



let pensionData = []; // Global variabel för att lagra JSON-data

// Ladda JSON-data asynkront
fetch('pensionsdata.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        pensionData = data; // Spara datan i den globala variabeln
        console.log("Data loaded successfully:", pensionData);
    })
    .catch(error => console.error('Error loading JSON data:', error));

    
    const ageCohortSelector = document.getElementById('ageCohort');
    const specialOption = document.getElementById("specialOption");
    const pensionAgeSelector = document.getElementById('pensionAge');

    

    // Add event listener to birth year selector
    ageCohortSelector.addEventListener("change", function() {
        const selectedYear = ageCohortSelector.value;
        // const selectedYear = ageCohortSelector.value;
        console.log(selectedYear);
        // console.log
        
        // if (selectedYear === "1962") {
        //     // Add the special option if it's not already present
        //     if (!Array.from(pensionAgeSelector.options).some(opt => opt.value === "63")) {
        //         pensionAgeSelector.add(specialOption, pensionAgeSelector.options[0]); // Add at the top
        //     }
        // } else {
        //     // Remove the special option if it exists
        //     if (pensionAgeSelector.contains(specialOption)) {
        //         pensionAgeSelector.removeChild(specialOption);
        //     }

        //     // If the removed option is currently selected, reset pensionAge
        //     if (pensionAgeSelector.value === "63") {
        //         pensionAgeSelector.value = ""; // Reset pensionAge
        //     }
       
        // }


        if (selectedYear === "1962") {
            // Add the special option if it's not already present
            if (!Array.from(pensionAgeSelector.options).some(opt => opt.value === "63")) {
                pensionAgeSelector.add(specialOption, pensionAgeSelector.options[0]); // Add at the top
            }
        } else {
            // Remove the special option if it exists
            const specialOptionIndex = Array.from(pensionAgeSelector.options).findIndex(opt => opt.value === "63");
            if (specialOptionIndex !== -1) {
                pensionAgeSelector.remove(specialOptionIndex);
            }
        }


    });

// Initialize on page load to handle default selection
ageCohortSelector.dispatchEvent(new Event("change"));
    var pensionAge = parseInt(document.getElementById('pensionAge').value);




// Funktion för att filtrera pensionsdata baserat på användarens val
function calculatePension() {
    // Hämta användarens val från HTML-formuläret
   
    const ageCohort = parseInt(document.getElementById('ageCohort').value);
    const pensionAge = parseInt(document.getElementById('pensionAge').value);
    const partTime = document.getElementById('partTime').checked ? 1 : 0;
    // const sickLeave = parseInt(document.getElementById('sickLeave').value);
    const sickLeave = document.getElementById('sickLeave').checked ? 1 : 0;



  

    

    // Filtrera data för att hitta rätt rad
    const result = pensionData.find(row => 
        row.Årskull === ageCohort &&
        row.Pensionsålder === pensionAge &&
        row.Deltid === partTime &&
        row.Sjukskriven === sickLeave
    );
    
    //format number to swedish format, narrow space as thousand separator and comma as decimal separator
    const SweNum = new Intl.NumberFormat('sv-SE', {
        maximumFractionDigits: 0
    })

    // Visa resultatet i HTML
    if (result) {

        // const tillagg = result["Tillägg"];
        // const tillaggText = tillagg === 0 
        //     ? "" 
        //     : `I exemplet ingår ${SweNum.format(tillagg)} kronor i bostadstillägg, äldreförsörjningsstöd med mera i den disponibla inkomsten. Tilläggets storlek beror på din bostadskostnad och om du är ensamstående eller sambo/gift.`;

        document.getElementById('result').innerHTML = `
            <p class="stor_text">Inkomst efter skatt:<br> ${SweNum.format(result["Inkomst efter skatt"])} kr *</p>
            <p>Inkomst före skatt: ${SweNum.format(result["Inkomst brutto"])} kr</p>
            <p class="fetare">Inkomsten består av följande delar:</p>
            <p>Inkomst och tilläggspension: ${SweNum.format(result["Inkomst- och tilläggspension"])} kr</p>
            <p>Premiepension: ${SweNum.format(result.Premiepension)} kr</p>
            <p>Tjänstepension: ${SweNum.format(result.Tjänstepension)} kr</p>
            <p>Garantipension & Pensionstillägg (ITP): ${SweNum.format(result["Garanti"])} kr</p>
            <p class="liten_text">*Det kan finnas möjlighet att få bostadstillägg. Då kan man få lite mer pengar än den angivna inkomsten efter skatt.</p>
            

        `;
    } else {
        document.getElementById('result').textContent = 'Ingen data hittades för dina val.';
    }
    informHeight();
}

const body = document.querySelector('body');

  //if todays date is higher than 9 march change background color   
  (function() {
    var today = new Date();
    var date = new Date("2025-03-23");
    if (today > date) {
      body.style.backgroundColor = 'rgb(249,249,247)';
    }
    else {
      body.style.backgroundColor = '#fcfaf5'
    }
  })();