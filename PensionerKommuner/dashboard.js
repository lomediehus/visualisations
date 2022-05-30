const valjkommun = document.getElementById('valjkommun');
// const data = '';
const [aldreomsorgen, seniorer, forklaring] = [document.getElementById('aldreomsorgen'),  document.getElementById('seniorer'), document.getElementById('forklaring')];


const strans = [...document.getElementsByClassName('semitransparent')];

let kdata = [];

let andel_aldre = '';
// let aldre_andel_gs = '';
let uppsagd_aldre = '';
// let aldre_skillnad_gs = '';

let andel_barn = '';
// let seniorer_andel_gs = '';
let uppsagd_barn = '';
// let seniorer_skillnad_gs = '';

let aldreomsorg_fyll = '';
let barnomsorg_fyll = '';




$.ajax({
        url: "pensionssiffror.json",
        dataType: "json",
        mimeType: "application/json",
        success: function (data) {
            kdata = data;

            //Make the graph that compares proffessions
            // jamforyrke(kdata, 'RIKSSNITT', 4);
            populateKommunDropdown();
            fillBoxes();
            informHeight();
            },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
})



function populateKommunDropdown() {
  // kdata.sort((a, b) => a.Kommun.localeCompare(b.Kommun))
  // console.log(kdata)

  kdata.forEach((item, i) => {
      let el = document.createElement("option");
      el.textContent = item.Kommun;

      valjkommun.appendChild(el);
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

  // aldre_andel_gs = kdata[0]['Äldreomsorg 2020'];
  // aldre_skillnad_gs = kdata[0]['Äldreomsorg 2002-2020'];


  aldreomsorg_fyll = `
    <h3>Andel 64 år och äldre:<br><span class="storfet">XX%</span></h3>
    <hr class='rounded -spacingBottomXS'>
    <h3>Har 62-65-åringar sagt upp sig?<br><span class="storfet"> XX%</span></h3>
  `

  aldreomsorgen.innerHTML = aldreomsorg_fyll;

  // seniorer_andel_gs = kdata[0]["65+ år 2020"];
  // seniorer_skillnad_gs = kdata[0]["Andel 65+ 2002-2020"];

  seniorer_fyll = `
    <h3>Andel 64 år och äldre:<br><span class="storfet">XX%</span></h3>
    <hr class='rounded -spacingBottomXS'>
    <h3>Har 62-65-åringar sagt upp sig?<br><span class="storfet"> XX%</span></h3>
  `

  seniorer.innerHTML = seniorer_fyll;
  forklaring.innerHTML = '';
}




valjkommun.addEventListener("change", function(){
  let num = 0;
  if (this.value === 'valjkommun') {
    fillBoxes();

  } else {

  kdata.forEach((item, i) => {

    if (item.Kommun === this.value) {

      andel_aldre = item['AndelAldreomsorg'];
      uppsagd_aldre = item['UppsagningAldreomsorg'];
      // aldre_skillnad = item['Äldreomsorg 2002-2020'];
      // aldre_skillnad_gs = kdata[0]['Äldreomsorg 2002-2020'];
      andel_barn = item['AndelBarnomsorg'];
      uppsagd_barn = item['UppsagningBarnomsorg'];

      aldreomsorgen.innerHTML = '';

      // alde_andel_gs = kdata.Samtliga
      aldreomsorg_fyll = `
        <h3>Andel 64 år och äldre:<br><span class="storfet">${$.number(andel_aldre, 1, ',', '&nbsp;')}%</span></h3>
        <hr class='rounded u-spacingBottomXS'>
        <h3>Har 62-65-åringar sagt upp sig?<br><span class="storfet"> ${uppsagd_aldre}</span></h3>
      `

      aldreomsorgen.innerHTML = aldreomsorg_fyll;

      seniorer_fyll = `
        <h3>Andel 64 år och äldre::<br><span class="storfet">${$.number(andel_barn, 1, ',', '&nbsp;')}%</span></h3>
        <hr class='rounded u-spacingBottomXS'>
        <h3>Har 62-65-åringar sagt upp sig?<br><span class="storfet">${uppsagd_barn}</span></h3>
      `

      seniorer.innerHTML = seniorer_fyll;


      // let kommunnamn = item.Kommun;
      // let andel1 = (aldre_andel > aldre_andel_gs ? 'större' : 'mindre');
      // let skillnad1 = (aldre_skillnad >= 0 ? 'ökat' : 'minskat');
      // let andel2 = (seniorer_andel > seniorer_andel_gs ? 'större' : 'mindre');
      // let skillnad2 = (seniorer_skillnad >= 0 ? 'ökat' : 'minskat');
      //
      // let forklaring_fyll = `
      // <p class='u-textMeta'>I ${kommunnamn} går en ${andel1} andel av budgeten till äldreomsorgen än genomsnittet för Sverige. Andelen har ${skillnad1} sedan 2002.<br>Andelen seniorer är ${andel2} än genomsnittet för Sverige. Andelen har ${skillnad2} sedan 2002.</p>
      // `
      //
      // forklaring.innerHTML = forklaring_fyll;



      informHeight();

    }


      // if (item["Äldreomsorg 2002-2020"] < 0 && item["Andel 65+ 2002-2020"] > 0) {
      //
      //   console.log(item.Kommun)
      //   console.log(num)
      //     num++;
      // }






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

// window.onresize = function() {
//   console.log('content ' + document.getElementById('content').offsetWidth)
//   console.log('window ' + window.innerWidth)
//
// }
