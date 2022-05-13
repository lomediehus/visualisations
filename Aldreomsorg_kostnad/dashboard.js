const valjkommun = document.getElementById('valjkommun');
// const data = '';
const [aldreomsorgen, seniorer, forklaring, forsorjningskvot] = [document.getElementById('aldreomsorgen'),  document.getElementById('seniorer'), document.getElementById('forklaring'), document.getElementById('forsorjningskvot')];


const strans = [...document.getElementsByClassName('semitransparent')];

let kdata = [];

let artal = "2002";
let artal2 = "2002";

let aldre_andel = '';
let aldre_andel_gs = '';
let aldre_skillnad = '';
let aldre_skillnad_gs = '';

let seniorer_andel = '';
let seniorer_andel_gs = '';
let seniorer_skillnad = '';
let seniorer_skillnad_gs = '';

let aldreomsorg_fyll = '';
let seniorer_fyll = '';

let forsorjningskvot_fyll;
let fkvot_snitt;




$.ajax({
        url: "kommunsiffror.json",
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
  kdata.forEach((item, i) => {
    if (item.Kommun != "Samtliga") {
      let el = document.createElement("option");
      el.textContent = item.Kommun;
      valjkommun.appendChild(el);
    }

  });
  //Add option "Välj kommun", which will be the first option
  let el = document.createElement("option");
  el.textContent = 'Välj kommun';
  valjkommun.appendChild(el);
};

function fillBoxes() {

  aldre_andel_gs = kdata[0]['Äldreomsorg 2020'];
  aldre_skillnad_gs = kdata[0]['Äldreomsorg 02-20'];
  fkvot_snitt = kdata[0]['Försörjningskvot 2020'];


  aldreomsorg_fyll = `
    <h3>Andel av budgeten 2020:<br><span class="storfet">XX%</span></h3>
    <p>Genomsnitt för Sverige: ${$.number(aldre_andel_gs, 1, ',', '&nbsp;')}%</p>
    <hr class='rounded -spacingBottomXS'>
    <h3>Skillnad mot ${artal}:<br><span class="storfet"> XX</span></h3>
    <p>Genomsnitt för Sverige: ${aldre_skillnad_gs > 0 ? '+' + $.number(aldre_skillnad_gs, 1, ',', '&nbsp;') : $.number(aldre_skillnad_gs, 1, ',', '&nbsp;')}</p>
  `

  aldreomsorgen.innerHTML = aldreomsorg_fyll;

  seniorer_andel_gs = kdata[0]["65+ år 2020"];
  seniorer_skillnad_gs = kdata[0]["65+ år 2002-2020"];

  seniorer_fyll = `
    <h3>Andel av befolkningen 2020:<br><span class="storfet">XX%</span></h3>
    <p>Genomsnitt för Sverige: ${$.number(seniorer_andel_gs, 1, ',', '&nbsp;')}%</p>
    <hr class='rounded -spacingBottomXS'>
    <h3>Skillnad mot ${artal2}:<br><span class="storfet"> XX</span></h3>
    <p>Genomsnitt för Sverige: ${seniorer_skillnad_gs > 0 ? '+' + $.number(seniorer_skillnad_gs, 1, ',', 'nbsp;') : $number(seniorer_skillnad_gs, 1, ',', '&nbsp;')}</p>
  `

  forsorjningskvot_fyll = `
    <h3>2020:<br><span class="storfet">X,XX</span></h3>
      <p>Genomsnitt för Sverige: ${$.number(fkvot_snitt, 2, ',', '&nbsp;')}%</p>
      <hr class='rounded u-spacingBottomXS'>

  `;


  seniorer.innerHTML = seniorer_fyll;
  forklaring.innerHTML = '';
  forsorjningskvot.innerHTML = forsorjningskvot_fyll;
}




valjkommun.addEventListener("change", function(){

  let undernollsex = [];
  let nollsextillnollsju;
  let nollsjutillnollatta;
  let nollattatillnollnio;
  let nollniotillett;
  let etttillettett;
  let etttilletttva;



  let num = 0;
  if (this.value === 'valjkommun') {
    fillBoxes();

  } else {

  kdata.forEach((item, i) => {



    if (item.Kommun === this.value) {

      // console.log(item['Försörjningskvot 2020'])

      aldre_andel = item['Äldreomsorg 2020'];

      if (item['Äldreomsorg 02-20'] != '') {
        aldre_skillnad = item['Äldreomsorg 02-20'];
        artal = "2002";
      } else if (item['Äldreomsorg 03-20'] != '') {
        aldre_skillnad = item['Äldreomsorg 03-20'];
        artal = '2003';
        console.log(artal)
      } else if (item['Äldreomsorg 04-20'] != '') {
        aldre_skillnad = item['Äldreomsorg 04-20'];
        artal = "2004";
      } else if (item['Äldreomsorg 09-20'] != '') {
        aldre_skillnad = item['Äldreomsorg 09-20'];
        artal = "2009";
      }



      seniorer_andel = item['65+ år 2020'];
      seniorer_skillnad = item['65+ år 2002-2020'];

      console.log(aldre_skillnad === '')


      aldreomsorgen.innerHTML = '';

      // if (item.Kommun === "Knivsta") {
      //   artal = "2006";
      //
      // } else {
      //   artal = "2002"
      //
      // }

      aldreomsorg_fyll = `
        <h3>Andel av budgeten 2020:<br><span class="storfet">${$.number(aldre_andel, 1, ',', '&nbsp;')}%</span></h3>
        <p>Genomsnitt för Sverige: ${$.number(aldre_andel_gs, 1, ',', '&nbsp;')}%</p>
        <hr class='rounded u-spacingBottomXS'>
        <h3>Skillnad mot ${artal}:<br><span class="storfet"> ${aldre_skillnad > 0 ? '+' + $.number(aldre_skillnad, 1, ',', '&nbsp;') : $.number(aldre_skillnad, 1, ',', '&nbsp;')}</span></h3>
        <p>Genomsnitt för Sverige: ${aldre_skillnad_gs > 0 ? '+' + $.number(aldre_skillnad_gs, 1, ',', '&nbsp;') : $.number(aldre_skillnad_gs, 1, ',', '&nbsp;')}</p>
      `

      seniorer_fyll = `
        <h3>Andel av befolkningen 2020:<br><span class="storfet">${$.number(seniorer_andel, 1, ',', '&nbsp;')}%</span></h3>
        <p>Genomsnitt för Sverige: ${$.number(seniorer_andel_gs, 1, ',', '&nbsp;')}%</p>
        <hr class='rounded u-spacingBottomXS'>
        <h3>Skillnad mot 2002:<br><span class="storfet">${seniorer_skillnad > 0 ? '+' + $.number(seniorer_skillnad, 1, ',', '&nbsp;') : $.number(seniorer_skillnad, 1, ',', '&nbsp;')}</span></h3>
        <p>Genomsnitt för Sverige: ${seniorer_skillnad_gs > 0 ? '+' + $.number(seniorer_skillnad_gs, 1, ',', '&nbsp;') : $.number(seniorer_skillnad_gs, 1, ',', '&nbsp;')}</p>
      `





      aldreomsorgen.innerHTML = aldreomsorg_fyll;
      seniorer.innerHTML = seniorer_fyll;


      let kommunnamn = item.Kommun;
      let andel1 = (aldre_andel > aldre_andel_gs ? 'större' : 'mindre');
      let skillnad1 = (aldre_skillnad >= 0 ? 'ökat' : 'minskat');
      let andel2 = (seniorer_andel > seniorer_andel_gs ? 'större' : 'mindre');
      let skillnad2 = (seniorer_skillnad >= 0 ? 'ökat' : 'minskat');
      let fkvot = item['Försörjningskvot 2020'];
      fkvot_snitt = kdata[0]['Försörjningskvot 2020'];

      let forklaring_fyll = `
      <p>I ${kommunnamn} går en ${andel1} andel av budgeten till äldreomsorgen än genomsnittet för Sverige. Andelen har ${skillnad1} sedan ${artal === '2002' ? artal : artal + '*'}.</p><p>Andelen seniorer är ${andel2} än genomsnittet för Sverige. Andelen har ${skillnad2} sedan ${artal2}.</p>
      `;

      if (artal != "2002") {
        forklaring_fyll = `
        <p>I ${kommunnamn} går en ${andel1} andel av budgeten till äldreomsorgen än genomsnittet för Sverige. Andelen har ${skillnad1}. Skillnaden för Sverige är sedan 2002. För ${kommunnamn} saknas den siffran, därför visas istället skillnaden sedan ${artal}.</p><p>Andelen seniorer är ${andel2} än genomsnittet för Sverige. Andelen har ${skillnad2} sedan ${artal2}.</p>
        `;


      }

      forsorjningskvot_fyll = `
        <h3>2020:<br><span class="storfet">${$.number(fkvot, 2, ',', '&nbsp;')}%</span></h3>
          <p>Genomsnitt för Sverige: ${$.number(fkvot_snitt, 2, ',', '&nbsp;')}%</p>
          <hr class='rounded u-spacingBottomXS'>
          <p>Försörjningskvoten kan förklaras som att en person i arbetsför ålder har  ${$.number(fkvot, 2, ',', '&nbsp;')} barn och gamla att försörja. (Summan av alla 0-19 och över 64 år, delat i antal personer 20-64 år.)</p>
      `;


      // if (kommunnamn === "Knivsta") {
      //   forklaring_fyll += "<p class='u-textMeta'>(För Knivsta visas 2006 som startår, eftersom kommunen inte fanns 2002.)</p>"
      // }

      forklaring.innerHTML = forklaring_fyll;

      forsorjningskvot.innerHTML = forsorjningskvot_fyll;


      // visamerknapp.style.display = "inline";



      informHeight();

    }


      if (item["Äldreomsorg 2002-2020"] < 0 && item["65+ år 2002-2020"] > 0) {
        // console.log(item.Kommun)
        // console.log(num)
        //   num++;
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

let visamer = document.getElementById('visamer');
// let visamerknapp = document.getElementById('visamerknapp');



// visamerknapp.addEventListener('click', function(){
//
//
//   if (visamer.style.display === "flex") {
//     visamer.style.display = "none";
//   } else {
//     visamer.style.display = "flex";
//   }
//
// })


// window.onresize = function() {
//   console.log('content ' + document.getElementById('content').offsetWidth)
//   console.log('window ' + window.innerWidth)
//
// }
