//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

const container = document.getElementById('container');
const lucka_content = document.getElementById('lucka_content');
const closex = document.getElementById("closex");
const dagenscontainer = document.getElementById("dagenscontainer")


const numbers = [ 16, 17, 21, 2, 8, 11, 1, 13, 18, 19, 20, 5, 15, 14, 9, 24, 12, 23, 22, 10, 7, 3, 6, 4]

// Get the current date
const currentDate = new Date();

const currentDay = currentDate.getDate(); // Get the day of the month
const currentMonth = currentDate.getMonth() + 1; // Get the current month (January is 1, February is 2, and so on)
var christmas = new Date("December 24 2023");

let dagensgrejs = ``;


// c("datum " + currentDate + "dag " + currentDay + "månad " + currentMonth)

const jsonFileUrl = "julkalender.json";

fetch(jsonFileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json();
    })
    .then(data => {
       
      // Loop to create divs with shuffled numbers and IDs
      for (let i = 0; i < numbers.length; i++) {
        // Create a new div element
        const div = document.createElement('div');

        // Set the innerHTML to the shuffled number
        div.innerHTML = numbers[i];

        // Generate a unique ID for each div (e.g., div1, div2, div3, ...)
        div.id = 'div' + numbers[i];

        // Assign a class to the div elements
        div.classList.add('lucka', 'Teaser-Heding', 'centered-text'); 

        // Append the div to the container
        container.appendChild(div);

        div.addEventListener("click", function(event){
          lucka_content.style.visibility = "visible";

          if (currentDate.getTime() > christmas.getTime() || (currentDay >= numbers[i]) && (currentMonth > 11)) {
          // if (currentDay >= 0) {

            let lucknummer = "lucka" + numbers[i];



          //Check if the object has a property 'iframe', which means it has a movie clip, and fill accordingly
          if (data[lucknummer].hasOwnProperty("iframe")) {
          dagensgrejs = `
          <div id="dagens-img-container" class="dagens-flex">
            ${data[lucknummer].iframe}
          </div>
          <div id="dagens-text-container" class="dagens-flex">  
            <h3>${data[lucknummer].rubrik}</h3> 
            <p>${data[lucknummer].text}<span class="bildtext"></span></p>
            <h3><span class="bokstav">${data[lucknummer].bokstav}</span></h3>
          </div>
          `;
          }

          // Check if "href" exists before adding the image
          if (data[lucknummer].hasOwnProperty("href")) {
            dagensgrejs = `
              <div id="dagens-img-container" class="dagens-flex">
                <img src="${data[lucknummer].href}" class="luckbild">
              </div>
              <div id="dagens-text-container" class="dagens-flex">
                <h3>${data[lucknummer].rubrik}</h3> 
                <p>${data[lucknummer].text}<span class="bildtext"></span></p>
                <h3><span class="bokstav">${data[lucknummer].bokstav}</span></h3>
              </div>
            `;
          }
            
          } else {
            dagensgrejs =  `
            <div id="dagens-img-container" class="dagens-flex">
            <img src="peek.jpg" class="luckbild">
            </div>
            <div id="dagens-text-container class="dagens-flex">
            <h3>Inte tjuvkika!</h3> 
            <p>Luckan går inte att öppna förrän ${numbers[i]} december!<span class="bildtext"></span></p>
            </div>
            `;
          }
          dagenscontainer.innerHTML = dagensgrejs;
          let imgToStyle = document.getElementById("dagens-img-container").firstElementChild;

          if (numbers[i] === 24) {
            imgToStyle.style.objectPosition = 'center bottom'
          } else {
            imgToStyle.style.objectPosition = 'center'
          }

        })        
      }

      const containerHeight = container.offsetHeight;
      lucka_content.style.height = containerHeight + 'px';
      informHeight();       
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

//  // Create an array of numbers from 1 to 24
//  const numbers = Array.from({ length: 24 }, (_, i) => i + 1);

//  // Shuffle the array using the Fisher-Yates shuffle algorithm
//  for (let i = numbers.length - 1; i > 0; i--) {
//    const j = Math.floor(Math.random() * (i + 1));
//    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//  }


 closex.addEventListener("click", function() {
  lucka_content.style.visibility = "hidden";
 })



 