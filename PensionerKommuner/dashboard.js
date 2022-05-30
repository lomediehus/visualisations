const valjkommun = document.getElementById('valjkommun');
const [aldreomsorgen, barnomsorgen, forklaring] = [document.getElementById('aldreomsorgen'),  document.getElementById('barnomsorgen'), document.getElementById('forklaring')];
const strans = [...document.getElementsByClassName('semitransparent')];
let kdata = [];
let andel_aldre = '';
let uppsagd_aldre = '';
let andel_barn = '';
let uppsagd_barn = '';
let aldreomsorg_fyll = '';
let barnomsorg_fyll = '';

//function to check if a string contains a number. Used in the change-event.
function hasNumber(myString) {
  return /\d/.test(myString);
  }

$.ajax({
        url: "pensionssiffror.json",
        dataType: "json",
        mimeType: "application/json",
        success: function (data) {
            kdata = data;
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

  aldreomsorg_fyll = `
    <h3>Andel 64 år och äldre:<br><span class="stormager">XX%</span></h3>
    <hr class='rounded -spacingBottomXS'>
    <h3>Har 62–65-åringar sagt upp sig?<br><span class="stormager"></span></h3>
  `

  aldreomsorgen.innerHTML = aldreomsorg_fyll;

  barnomsorg_fyll = `
    <h3>Andel 64 år och äldre:<br><span class="stormager">XX%</span></h3>
    <hr class='rounded -spacingBottomXS'>
    <h3>Har 62–65-åringar sagt upp sig?<br><span class="stormager></span></h3>
  `

  barnomsorgen.innerHTML = barnomsorg_fyll;
}

valjkommun.addEventListener("change", function(){
  //fill boxes with default text if no kommun is chosen
  if (this.value === 'valjkommun') {
    fillBoxes();

  } else {
  kdata.forEach((item, i) => {

    if (item.Kommun === this.value) {
      andel_aldre = item['AndelAldreomsorg'];
      uppsagd_aldre = item['UppsagningAldreomsorg'];
      andel_barn = item['AndelBarnomsorg'];
      uppsagd_barn = item['UppsagningBarnomsorg'];

      aldreomsorg_fyll = `
        <h3>Andel 64 år och äldre:<br><span class="stormager">${(hasNumber(andel_aldre)) ? $.number(andel_aldre, 1, ',', '&nbsp;') + "%" : "Svar saknas."}</span></h3>
        <hr class='rounded u-spacingBottomXS'>
        <h3>Har 62–65-åringar sagt upp sig?<br><span class="stormager"> ${uppsagd_aldre}.</span></h3>
      `

      aldreomsorgen.innerHTML = aldreomsorg_fyll;

      barnomsorg_fyll = `
        <h3>Andel 64 år och äldre:<br><span class="stormager">${(hasNumber(andel_barn)) ? $.number(andel_barn, 1, ',', '&nbsp;') + "%" : "Svar saknas."}</span></h3>
        <hr class='rounded u-spacingBottomXS'>
        <h3>Har 62–65-åringar sagt upp sig?<br><span class="stormager">${uppsagd_barn}.</span></h3>
      `

      barnomsorgen.innerHTML = barnomsorg_fyll;

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
