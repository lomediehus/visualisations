//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

c("kör skript version ")

var lon23 = document.getElementById("lon23");
var inputYear = document.getElementById("inputYear");
var shoot = document.getElementById("calculate");
let select = document.getElementById("years")
const i2 = 403.7;
let i1 = Number(select.value);
let result;


// shoot.addEventListener("click", function() {
//   c("shoot")
//   c(inputYear.value)
//   // lon23.value = inputYear.value * 2;
//   lon23.value = Math.round(i2/i1 * inputYear.value);
// })

inputYear.addEventListener("keyup", function() {
  result = Math.round(i2/i1 * inputYear.value);
  if (isNaN(result)) {
    lon23.value = "Skriv bara siffror"
  }
  else {
    lon23.value = result;
  }
})

select.addEventListener("change", function(){
  i1 = Number(this.value);
  result = Math.round(i2/i1 * inputYear.value);

  if (isNaN(result)) {
    lon23.value = "Skriv bara siffror"
  }
  else {
    lon23.value = result;
  }
})

