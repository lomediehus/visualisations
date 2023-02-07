//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

const valjkommun = document.getElementById('valjkommun');
const inforuta = document.getElementById('inforuta');
const strans = [...document.getElementsByClassName('semitransparent')];
let kdata = [];
let overtid2019 = '';
let overtid2022 = '';
let inforuta_fyll = '';

//function to check if a string contains a number. Used in the change-event.
function hasNumber(myString) {
  return /\d/.test(myString);
  }

$.ajax({
        url: "personalbristsiffror.json",

        dataType: "json",
        mimeType: "application/json",
        success: function (data) {
            kdata = data.sort();
            populateKommunDropdown(kdata);
            fillBoxes();
            informHeight();
            },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
})


//function to make the list of select options from a datafile
function populateKommunDropdown(data) {
  //traverse the data, create dom elements and append them
  data.forEach((item, i) => {
      let el = document.createElement("option");
      el.textContent = item.Kommun;
      valjkommun.appendChild(el);
      //disable options that fulfill a condition
      if (item.Svarat === "nej") {
        el.setAttribute("disabled","disabled");
      }

  });
  //Add option "Välj kommun", which will be the first option
  let el = document.createElement("option");
  el.textContent = 'Välj kommun';
  valjkommun.appendChild(el);
};

function fillBoxes() {

  inforuta_fyll = `
    <h2 class="u-textMetaDeca">Kommun</h2>
    <h3>Övertid sommaren 2022?<br><span class="stormager">XXX timmar</span></h3>
    <h3>Ökning/minskning av övertid jämfört med 2019<br><span class="stormager">%</span></h3>
    <h3>Anser kommunen själv att det är personalbrist i äldreomsorgen?<br><span class="stormager">Ja/Nej/Vet ej</span></h3>
  `

  inforuta.innerHTML = inforuta_fyll;

}

valjkommun.addEventListener("change", function(){
  //fill boxes with default text if no kommun is chosen
  if (this.value === 'valjkommun') {
    fillBoxes();

  } else {
  kdata.forEach((item, i) => {

    if (item.Kommun === this.value) {

      let forsta = item['Övertid2019'];
      let andra = item['Övertid2022'];
      let okning; 
      if (typeof(forsta) === "number" && forsta!=0 && typeof(andra) === "number") {
        okning = Math.round(((andra-forsta)/forsta) * 100);
      } else {
        okning = "ingen uppgift";
      }

      let stringOkning;

      // if (okning >0) {
      //   stringOkning = "+" + okning + "%";
      // } else if  (okning <0) {
      //  stringOkning = "-" + okning + "%";
      // } else if (okning === 0 ){
      //   stringOkning = okning + "%";
      // } else {
      //   stringOkning = "ingen uppgift"
      // }

      if (okning >0) {
        stringOkning = "+" + okning + "%";
      } else if  (okning <= 0) {
       stringOkning = okning + "%";
      } else {
        stringOkning = "ingen uppgift"
      }
    
     
      c('blalba' + okning)



      overtid2019 = $.number(item['Övertid2019'], 0, ',', '&#8239;');

      overtid2022 = (item['Övertid2022'] == 0) ? "ingen uppgift" : $.number(item['Övertid2022'], 0, ',', '&#8239;') + " timmar";
      personalbrist = item['Personalbrist?'];
      okat = (item["Ökat?"] == "ökat")? "Ja" : "Nej";

      inforuta_fyll = `
        <h2 class="u-textMetaDeca">${item.Kommun}</h2>
        <h3>Övertid sommaren 2022<br><span class="stormager">${overtid2022}</span></h3>
        <h3>Ökning/minskning av övertid jämfört med 2019<br><span class="stormager">${stringOkning}</span></h3>
        <h3>Anser kommunen själv att det är personalbrist i äldreomsorgen?<br><span class="stormager">${personalbrist}</span></h3>
      `

      inforuta.innerHTML = inforuta_fyll;

      informHeight();

        }
      })
  }

  strans.forEach((item, index) => {
    if (this.value != "valjkommun"){
      item.classList.remove('semitransparent')
      }
    else {
      item.classList.add('semitransparent');
      }
    });

})
