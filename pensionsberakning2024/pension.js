//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

// Ladda in JSON-data (här ersätter vi med en plats att läsa in JSON-data)


// read data from files into arrays
// $.ajax({
//     url: "OBavtal.json",
//     // url: "test2.json",

//     dataType: "json",
//     mimeType: "application/json",
//     success: function (data) {
//         filearray.push(...data)

//         $.ajax({
//                 url: "OBavtal_tillagg.json",
//                 dataType: "json",
//                 mimeType: "application/json",
//                 success: function (data) {
//                     filearray2.push(...data)

//                     //when both files are read, run function that does all the rest
//                     doStuff()
//                     },
//                 error: function (/* request, error */) {
//                     console.log('Network error has occurred please try again!');
//                 }
//         })
//         //Make the graph that compares proffessions
//         },
//     error: function (/* request, error */) {
//         console.log('Network error has occurred please try again!');
//     }
// })

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

// fetch('pensionsdata.json')
//     .then(response => response.json())
//     .then(data => {
//         const pensionData = data;
//         console.log(pensionData); // Kontrollera att datan laddas korrekt
        
//     })
//     .catch(error => console.error('Error loading JSON data:', error));


// const pensionData = [
//     // Din JSON-data från Grunddata_converted.json kommer att läsas in här
//     // Till exempel:
//     {
//         "Årskull": 1965,
//         "Pensionsålder": 65,
//         "Deltid": 0,
//         "Sjukskriven": 0,
//         "Inkomst- och tilläggspension": 12415,
//         "Premiepension": 2354,
//         "Tjänstepension": 4340,
//         "Inkomst brutto": 19109,
//         "Disponibel inkomst": 13913.92
//     }
//     // Fler objekt från JSON-data...
// ];

// console.log(pensionData);


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

        const tillagg = result["Tillägg"];
        const tillaggText = tillagg === 0 
            ? "" 
            : `I exemplet ingår ${SweNum.format(tillagg)} kronor i bostadstillägg, äldreförsörjningsstöd med mera i den disponibla inkomsten. Tilläggets storlek beror på din bostadskostnad och om du är ensamstående eller sambo/gift.`;

        document.getElementById('result').innerHTML = `
            <p class="stor_text">Disponibel inkomst:<br> ${SweNum.format(result["Disponibel inkomst"])} kr</p>
            <p>Inkomst före skatt: ${SweNum.format(result["Inkomst brutto"])} kr</p>
            <p class="fetare">Inkomsten består av följande delar:</p>
            <p>Inkomst och tilläggspension: ${SweNum.format(result["Inkomst- och tilläggspension"])} kr</p>
            <p>Premiepension: ${SweNum.format(result.Premiepension)} kr</p>
            <p>Tjänstepension: ${SweNum.format(result.Tjänstepension)} kr</p>
            <p>Garantipension & Pensionstillägg (ITP): ${SweNum.format(result["Garanti"])} kr</p>
            <p class="u-textMeta">${tillaggText}</p>

        `;
    } else {
        document.getElementById('result').textContent = 'Ingen data hittades för dina val.';
    }
}

// HTML-struktur för användarinteraktion
// const appHTML = `
//     <label for="ageCohort">Årskull:</label>
//     <select id="ageCohort">
//         <option value="1965">1965</option>
//         <option value="1962">1962</option>
//         <!-- Lägg till fler årskullar baserat på data -->
//     </select>

//     <label for="pensionAge">Pensionsålder:</label>
//     <select id="pensionAge">
//         <option value="64">64</option>
//         <option value="65">65</option>
//         <option value="66">66</option>
//         <!-- Lägg till fler pensionsåldrar -->
//     </select>

//     <label>
//         <input type="checkbox" id="partTime"> Jobbat deltid
//     </label>

//     <label for="sickLeave">Sjukskriven antal år:</label>
//     <input type="number" id="sickLeave" min="0" max="10" value="0">

//     <button onclick="calculatePension()">Beräkna pension</button>
//     <div id="result"></div>
// `;

// // Lägg till HTML till sidan
// document.body.innerHTML = appHTML;
