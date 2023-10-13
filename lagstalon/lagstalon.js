//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

c("running script.js")

const valjyrke = document.getElementById("valjyrke");
var lagstloner = [];
const avtalstabell = document.getElementById("avtalstabell");
const kommuntabell = document.getElementById("kommuntabell");
const valjkommun = document.getElementById("valjkommun");
let a_rad, a_cell1, a_cell2, k_rad, k_cell1, k_cell2;

valjyrke.addEventListener("change", function(){

    avtalstabell.innerHTML = '';
       lagstloner.forEach(item => {
        a_rad = avtalstabell.insertRow();
        a_cell1 = a_rad.insertCell(0);
        a_cell2 = a_rad.insertCell(1);
        a_cell1.innerHTML = item.Kommun;
        if (valjyrke.value === "Väljyrke") {
            a_cell2.innerHTML = '';
        } else {
            a_cell2.innerHTML = item[valjyrke.value];
        }
        
    })
    let a_header = avtalstabell.createTHead();
    let a_row = a_header.insertRow(0);
      a_row.insertCell(0).innerHTML = "Kommun";
      a_row.insertCell(1).innerHTML = "Lägstalön"
})


valjkommun.addEventListener("change", function(){

    kommuntabell.innerHTML = '';

    if (valjkommun.value === "valjkommun") {
        for (const key in lagstloner[0]){
     
            k_rad = kommuntabell.insertRow();
            k_cell1 = k_rad.insertCell(0);
            k_cell2 = k_rad.insertCell(1);
            if (key != "Kommun") {
                k_cell1.innerHTML = key;
                k_cell2.innerHTML = '';
            }    
         }
    } else {
           lagstloner.forEach(item => {  
            if (item.Kommun === valjkommun.value) {

                    for (const key in item){
                        k_rad = kommuntabell.insertRow();
                        k_cell1 = k_rad.insertCell(0);
                        k_cell2 = k_rad.insertCell(1);
                        if (key != "Kommun") {
                            k_cell1.innerHTML = key;
                            k_cell2.innerHTML = item[key];
                           }            
                        }    
                    }
             })
    }
   
  
    let k_header = kommuntabell.createTHead();
    let k_row = k_header.insertRow(0);
      k_row.insertCell(0).innerHTML = "Yrke";
      k_row.insertCell(1).innerHTML = "Lägstalön"
})


const jsonFileUrl = "lagstalon.json";

fetch(jsonFileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json();
    })
    .then(data => {
        // console.log(data)
        lagstloner = data;
        populateKommunDropdown()
        data.forEach(item => {
            a_rad = avtalstabell.insertRow();
            a_cell1 = a_rad.insertCell(0);
            a_cell2 = a_rad.insertCell(1);
            a_cell1.innerHTML = item.Kommun;
            a_cell2.innerHTML = '          ';
        });


        let a_header = avtalstabell.createTHead();
        let a_row = a_header.insertRow(0);
          a_row.insertCell(0).innerHTML = "Kommun";
          a_row.insertCell(1).innerHTML = "Lägstalön"

        for (const key in lagstloner[0]){
          
            k_rad = kommuntabell.insertRow();
            k_cell1 = k_rad.insertCell(0);
            k_cell2 = k_rad.insertCell(1);
            if (key != "Kommun") {
                k_cell1.innerHTML = key;
                k_cell2.innerHTML = '';
            }
            
        }

    let k_header = kommuntabell.createTHead();
    let k_row = k_header.insertRow(0);
      k_row.insertCell(0).innerHTML = "Yrke";
      k_row.insertCell(1).innerHTML = "Lägstalön"
        
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });



    function populateKommunDropdown() {

         //Add option "Välj kommun", which will be the first option
        //  let el = document.createElement("option");
        //  el.textContent = "Annars";
        //  valjkommun.appendChild(el);


        lagstloner.sort(function(a, b){
          var kommunA=a.Kommun.toLowerCase(), kommunB=b.Kommun.toLowerCase();
          if (kommunA < kommunB) //sort string ascending
              return -1;
          if (kommunA > kommunB)
              return 1;
          return 0; //default return value (no sorting)
          })
        lagstloner.forEach((item, i) => {
             let el = document.createElement("option");
            el.textContent = item.Kommun;
            valjkommun.appendChild(el);          
        });
       
      };