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
const avtalstabellBody = avtalstabell.querySelector("tbody");
const kommuntabell = document.getElementById("kommuntabell");
const kommuntabellBody = kommuntabell.querySelector("tbody")

const valjkommun = document.getElementById("valjkommun");
let a_rad, a_cell1, a_cell2, k_rad, k_cell1, k_cell2;

let sortItem;
let sortedItem;
let firstObject = {};

const yrkeKnapp = document.getElementById("yrke");
const yrkeLonKnapp = document.getElementById("yrkeLon");
const kommunKnapp = document.getElementById("kommun");
const kommunLonKnapp = document.getElementById("kommunLon")
let vilkenKnapp;

let yrkeFallande = true;
let yrkeLonFallande = true;
let kommunFallande = true;
let kommunLonFallande = true;

const sortpilYrke = document.getElementsByClassName("sortpilYrke");
const sortpilKommun = document.getElementsByClassName("sortpilKommun");

const popup = document.getElementById("popup");
const anm = document.getElementById("anm");
const close = document.getElementById("close");


anm.addEventListener("click", function()
{
    // popup.classList.add("invisible");
    popup.style.display = "block";
})

close.addEventListener("click", function()
{
    popup.style.display = "none";
})

yrkeKnapp.addEventListener("click", function(event){
    vilkenKnapp = event.target.id;
    yrkeFallande = !yrkeFallande;
    maketableKommun()
})

yrkeLonKnapp.addEventListener("click", function(event) {

    vilkenKnapp = event.target.id
    yrkeLonFallande = !yrkeLonFallande;
    maketableKommun();
})

kommunKnapp.addEventListener("click", function(event){
    vilkenKnapp = event.target.id;
    //toggles the value from true to false and back again
    kommunFallande = !kommunFallande;
    maketableYrke()
})

kommunLonKnapp.addEventListener("click", function(event){
    vilkenKnapp = event.target.id;
    kommunLonFallande = !kommunLonFallande;
    maketableYrke()
})



valjyrke.addEventListener("change", function(){
    maketableYrke();
    if (valjyrke.value !== "Väljyrke") {
        sortpilYrke[0].classList.remove("invisible")
        sortpilYrke[1].classList.remove("invisible")
    } else {
        sortpilYrke[0].classList.add("invisible")
        sortpilYrke[1].classList.add("invisible")
    }
})

function maketableYrke(){

    avtalstabellBody.innerHTML = '';

    if (vilkenKnapp === "kommun") {
        lagstloner.sort().reverse();
    }
        
    const mappedArray = lagstloner.map((item) => {
        return { kommun: item.Kommun, lon: item[valjyrke.value]}
    });

    const sortedArray = mappedArray.sort((a, b) => {
        if (typeof a.lon === "number" && typeof b.lon === "number" && kommunLonFallande === true) {
            return b.lon - a.lon; // Compare numeric values for a descending order. Reverse for ascending order.
        } else if (typeof a.lon === "number" && typeof b.lon === "number" && kommunLonFallande === false) {
            return a.lon - b.lon; // Compare numeric values for a ascending order. Reverse for descending order.
        } 
        else if (typeof a.lon === "number") {
            return -1; // Numeric values come before non-numeric values
        } else if (typeof b.lon === "number") {
            return 1; // Non-numeric values come after numeric values
        } else {
            // return a[0].localeCompare(b[0]); // Compare non-numeric values alphabetically
        }
    });

    if (vilkenKnapp === "kommunLon") {
        avtalstabellBody.innerHTML = '';
        sortedArray.forEach(item => {

            a_rad = avtalstabellBody.insertRow();
            a_cell1 = a_rad.insertCell(0);
            a_cell2 = a_rad.insertCell(1);
            a_cell1.innerHTML = item.kommun;
            a_cell2.innerHTML = $.number(item.lon, 0, ',', '&#8239;');

            if (valjyrke.value === "Väljyrke") {
                a_cell2.innerHTML = '';
            } else if (item.lon === '') {
                a_cell2.innerHTML = '';
            }           
            else {
                a_cell2.innerHTML = $.number(item.lon, 0, ',', '&#8239;');
                    
            }   
        })

   
    } else {
        let counter = 0;

        lagstloner.forEach(item => {

            a_rad = avtalstabellBody.insertRow();
            a_cell1 = a_rad.insertCell(0);
            a_cell2 = a_rad.insertCell(1);
            a_cell1.innerHTML = item.Kommun;
            if (valjyrke.value === "Väljyrke") {
                a_cell2.innerHTML = '';
            } else {
                if (item[valjyrke.value] != '') {
    
                    a_cell2.innerHTML = $.number(item[valjyrke.value], 0, ',', '&#8239;');
                }            
            }   
        })
    }
    informHeight();
   }

   function maketableKommun() {
    kommuntabellBody.innerHTML = '';

    if (valjkommun.value === "valjkommun") {
        yrkeFallande = true;
        sortObject(firstObject)

        for (const key in sortedItem){
     
            k_rad = kommuntabellBody.insertRow();
            k_cell1 = k_rad.insertCell(0);
            k_cell2 = k_rad.insertCell(1);
            if (key != "Kommun") {
                k_cell1.innerHTML = key;
                k_cell2.innerHTML = '';
            }    
         }

    } else {
        // Iterate lagstloner to find the chosen kommun
        lagstloner.forEach(item => {  
 
        if (item.Kommun === valjkommun.value) {
            c(valjkommun.value)

            //Make an array of the object for the chosen Kommun, filtering out the key "Kommun"
            const dataArray = Object.entries(item).filter(([key, value]) => key !== 'Kommun');

            //if user clicked on "Yrke" sort alphabetically
            if (vilkenKnapp === "yrke") {
                if (yrkeFallande) {
                    dataArray.sort();
                } else {
                    dataArray.sort().reverse();
                }
            }
            //if user clicked "Kr/mån" sort numerically
            else {
                dataArray.sort((a, b) => {
                    const valueA = a[1];
                    const valueB = b[1];
                
                    if (typeof valueA === "number" && typeof valueB === "number" && yrkeLonFallande === true) {
                        return valueB - valueA; // Compare numeric values for a descending order. Reverse for ascending order.
                    } else if (typeof valueA === "number" && typeof valueB === "number" && yrkeLonFallande === false) {
                        return valueA - valueB; // Compare numeric values for a ascending order. Reverse for descending order.
                    } 
                    else if (typeof valueA === "number") {
                        return -1; // Numeric values come before non-numeric values
                    } else if (typeof valueB === "number") {
                        return 1; // Non-numeric values come after numeric values
                    } else {
                        return a[0].localeCompare(b[0]); // Compare non-numeric values alphabetically
                    }
                });
            }

            
            const sortedArray = dataArray.map(([key, value]) => ({ key, value }));

            sortedArray.forEach((item, i) => {

               k_rad = kommuntabellBody.insertRow();
               k_cell1 = k_rad.insertCell(0);
               k_cell2 = k_rad.insertCell(1);

                   k_cell1.innerHTML = item.key;
                   c(item.value)
                   
                    if (item.value != '') {
                        k_cell2.innerHTML = $.number(item.value, 0, ',', '&#8239;');
                     }  
                 
                 });

                }
            })    
        }
        informHeight();
   }


valjkommun.addEventListener("change", function(){
    maketableKommun();     
    if (valjkommun.value !== "valjkommun") {
        sortpilKommun[0].classList.remove("invisible")
        sortpilKommun[1].classList.remove("invisible")
    } else {
        c("gör else-satsen")
        sortpilKommun[0].classList.add("invisible")
        sortpilKommun[1].classList.add("invisible")
    }

})

function sortObject(objectToSort) {

    // delete objectToSort.Kommun;

    if (yrkeFallande) {
        sortItem = (objectToSort) => {
            return Object.keys(objectToSort).sort().reduce((acc, key) => {
                acc[key] = objectToSort[key];
                return acc;
            }, {});
        };

    } else {
        sortItem = (objectToSort) => {
            return Object.keys(objectToSort).sort().reverse().reduce((acc, key) => {
                acc[key] = objectToSort[key];
                return acc;
            }, {});
        };
    }

   sortedItem = sortItem(objectToSort);
    
    return sortedItem;
}



const jsonFileUrl = "lagstalon.json";

fetch(jsonFileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json();
    })
    .then(data => {
        lagstloner = data;
        firstObject = lagstloner[0];
        populateKommunDropdown()
        maketableYrke();
 
        sortObject(firstObject)

        for (const key in sortedItem){
          
            k_rad = kommuntabellBody.insertRow();
            k_cell1 = k_rad.insertCell(0);
            k_cell2 = k_rad.insertCell(1);
            if (key != "Kommun") {
                k_cell1.innerHTML = key;
                k_cell2.innerHTML = '';
            }
          
        }
        informHeight();

    // let k_header = kommuntabell.createTHead();

        
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });



    function populateKommunDropdown() {

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
       informHeight();
      };

      const body = document.querySelector('body');

      //if todays date is higher than 9 march change background color   
      (function() {
        var today = new Date();
        var date = new Date("2025-03-23”);
        if (today > date) {
          body.style.backgroundColor = 'rgb(249,249,247)';
        }
        else {
          body.style.backgroundColor = '#fcfaf5'
        }
      })();