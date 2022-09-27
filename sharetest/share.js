console.log("script is running")

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

const knappEtt = document.querySelector('[name="Ett"]');
const knappTva = document.querySelector('[name="Två"]');
// let title = document.querySelector('meta[property="og:title"]').content;
let title = document.querySelector('meta[property="og:title"]');



let value = 0;

function addClick(el) {
      el.addEventListener("click", function() {
    value = this.value;
    console.log(value);
    changeTitle();
    console.log(title)
    console.log(document.querySelector('meta[property="og:title"]').content);

  })
}

function changeTitle() {
  if (value == 1) {
    title.content = "Jag fick en poäng"
  }
  else if (value == 2) {
    title.content = "Jag fick två poäng";
  }
  else {
    title.content = "Jag fick inga poäng";
  }
}

addClick(knappEtt);
addClick(knappTva);
// console.log(document.querySelector('meta[property="og:title"]').content);


// document.querySelector('meta[property="og:title"]').content = "en tredje titel"

// console.log(document.querySelector('meta[property="og:title"]').content);

// if (2 > 1) {
//   document.querySelector('meta[property="og:title"]').content = "en fjärde titel"
//
// }

// console.log(document.querySelector('meta[property="og:title"]').content);
