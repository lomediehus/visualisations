//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

 // Get the container div
 const container = document.getElementById('container');
 const lucka_content = document.getElementById('lucka_content');
 const closex = document.getElementById("closex")


 const numbers = [ 16, 17, 21, 2, 8, 11, 1, 13, 18, 19, 20, 5, 15, 14, 9, 24, 12, 23, 22, 10, 7, 3, 6, 4]

 // Get the current date
 const currentDate = new Date();
 const currentDay = currentDate.getDate(); // Get the day of the month
 const currentMonth = currentDate.getMonth() + 1; // Get the current month (January is 1, February is 2, and so on)

c("datum " + currentDate + "dag " + currentDay + "månad " + currentMonth)

//  // Create an array of numbers from 1 to 24
//  const numbers = Array.from({ length: 24 }, (_, i) => i + 1);

//  // Shuffle the array using the Fisher-Yates shuffle algorithm
//  for (let i = numbers.length - 1; i > 0; i--) {
//    const j = Math.floor(Math.random() * (i + 1));
//    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//  }
//  c(numbers)

 // Loop to create divs with shuffled numbers and IDs
 for (let i = 0; i < numbers.length; i++) {
   // Create a new div element
   const div = document.createElement('div');

   // Set the innerHTML to the shuffled number
   div.innerHTML = numbers[i];

   // Generate a unique ID for each div (e.g., div1, div2, div3, ...)
   div.id = 'div' + numbers[i];

  // Assign a class to the div elements
  div.classList.add('lucka', 'Teaser-Heding', 'centered-text'); // You can replace 'custom-class' with your desired class name
  // div.classList.add("Teaser-heading")

   // Append the div to the container
   container.appendChild(div);

   div.addEventListener("click", function(event){
    c("klickade " + div.id)
    if (currentDay >= numbers[i]) {
      c("nu är luckan öppen")
      lucka_content.style.visibility = "visible";
     
    } else {
      c("Nu är luckan stängd")
    }
   })

   
 }

 const containerHeight = container.offsetHeight;

 lucka_content.style.height = containerHeight + 'px';

 informHeight();


 closex.addEventListener("click", function() {
  lucka_content.style.visibility = "hidden";
 })



 