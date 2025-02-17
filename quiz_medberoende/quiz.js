console.log("script is running")



const content = document.getElementById('content');
const questions = document.getElementById('questions');
const result = document.getElementById('result');
const submitButton = document.getElementById("submitButton");
const reloadButton = document.getElementById("reloadButton");
submitButton.style.opacity = "0.4";


const overlay = document.getElementById('overlay');
var diven;
let value = 0;
var buttons;
var points = 0;
let klar = false;



//object that will collect the values when clicking answer buttons
var poang = {
  fraga1: 0,
  fraga2: 0,
  fraga3: 0,
  fraga4: 0,
  fraga5:0
}

//Text for the result div
const resultMarkupGreen = `
<h2 class=u-spacingBottomXS'>Resultat</h2>
<br>
  <p><span class='circle green'></span><span class='circle yellow semitransparent'></span><span class='circle red semitransparent'></span></p>
  <p><strong>Grönt ljus</strong></p>
  <p>Det verkar som att du kan sätta gränser så att du får en sund distans till ditt jobb. Ta hand om dig själv och se till att du får återhämtning. Mindfulness kan vara en metod att prova om du känner att du vill göra en förändring.</p>
`;
const resultMarkupYellow = `
<h2>Resultat</h2>
  <p><span class='circle green semitransparent'></span><span class='circle yellow'></span><span class='circle red semitransparent'></span></p>
  <p><strong>Gult ljus</strong></p>
  <p>Det finns risk för att jobbet slukar för mycket av dig och att du tar för stort ansvar på din arbetsplats. Var rädd om dig och hitta strategier för att ta hand om dig själv och som ger bra återhämtning. Mindfulness kan vara en metod att prova.</p>
  <p>Prata med chefen eller ditt skyddsombud om situationen och se till att få hjälp med att sätta gränser om du behöver det.
  Böcker om medberoende kan ge dig fler insikter kring hur jobbet kan bli som ett medberoende, exempelvis <i>Res dig! Läk ditt medberoende</i> av Madeleine Swartz och <i>De tolv stegen: en utväg – en andlig väg till känslomässig läkning</i>.
  </p>
`;

const resultMarkupRed = `
<h2>Resultat</h2>
  <p><span class='circle green semitransparent'></span><span class='circle yellow semitransparent'></span><span class='circle red'></span></p>
  <p><strong>Rött ljus</strong></p>
  <p>Det verkar som att jobbet slukar dig alldeles för mycket och att du tar för stort ansvar på din arbetsplats. Prata med din chef eller ditt skyddsombud om situationen och se till att få hjälp med att sätta gränser. Det är viktigt att dina egna behov tillgodoses! Träna på medkänsla med dig själv och hitta bra sätt att återhämta dig. Mindfulness kan vara en metod att prova.</p>
  <p>Böcker om medberoende kan ge dig fler insikter kring hur jobbet har blivit som ett medberoende, exempelvis <i>Res dig! Läk ditt medberoende</i> av Madeleine Swartz och <i>De tolv stegen: en utväg – en andlig väg till känslomässig läkning</i>.</p>
`;

//function to get the correct favicon for the github page
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

//function to add upp values from an object
const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

//To hide overlay ("svara på alla frågor"), click anywhere but on the submitButton
document.addEventListener("click", function()  {
  if (!event.target.classList.contains("doNotHideOverlay")) {
    $("#overlay").hide();
  }
})


//reading a json file
$.ajax({
        url: "fragor.json",
        // contentType: "application/json",
        dataType: 'json',
        success: function (data) {

          //making text from the json file
          function makeMarkup(x) {
            const markup = `
            <div id="${data[x].divid}" class="u-paddedBottomXL">
              <h3 id="rubrik${x+1}" class="u-textMetaDeca bold u-spacingBottomXS">${data[x].rubrik}</h3>
              <p class="u-textMetaDeca">${data[x].fraga}</p>

              ${/*<img src="bild${x+1}.png" width="400"> //image element, commented out */''}
              <label class="u-textMetaDeca"><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox">${data[x].alt1}<span class='symbol'>  ${data[x].symbol1}</span></label><br>
              <label class="u-textMetaDeca"><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox">${data[x].alt2}<span class='symbol'>  ${data[x].symbol2}</span></label><br>
              <label class="u-textMetaDeca"><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value3}" class="checkbox">${data[x].alt3}<span class='symbol'>  ${data[x].symbol2}</span></label>
              <p class="u-textMeta hidden u-paddedTopXS">${data[x].svar}</p>
              <hr class="ContentDivider">
              </div>
            `
            return markup;
          }

          //put the question text in place
          data.forEach(fillContent);
          submitButton.style.display = "inline-block";

          function fillContent(item, index) {
            questions.innerHTML += makeMarkup(index);
            }

          //adjust iframe height on host
          informHeight();


          //now here's what happens when you submit
          submitButton.addEventListener("click", function(){
            points = sumValues(poang);
            console.log('summa: ' + points)

            if (klar) {
              if (points<5){
                result.innerHTML = resultMarkupGreen;
              }
              else if (points>=5&&points<=12) {
                result.innerHTML = resultMarkupYellow;
              }
              else {
                  result.innerHTML = resultMarkupRed;
              }

              submitButton.style.display = "none";

              //show result div with stunning slidedown-effect
              $( "#result" ).slideDown(1000, "swing", function() {
                // window.scrollBy(0,800);
                //show reload button
                reloadButton.classList.remove('hidden');
                informHeight();

              });
            }
            else {
              $("#overlay").show();
                }

            })

            reloadButton.addEventListener("click", function() {
              location.reload()
              console.log('klickade reload')

            })

          function clickButton() {
            buttons = [...document.getElementsByClassName('checkbox')];
            buttons.forEach((button, i) => {
              buttons[i].addEventListener("click", function(){

                //assigning the value from the clicked button to the corresponding item in object "poang"
                poang[this.name] = parseInt(this.value);

                //get the name of the radiobuttons that belong to the clicked question ("fraga 1" ond so on)
                let nameOfButton = this.name;

                //Get radiobuttons with the same name as the clicked button
                let theseButtons = document.getElementsByName(nameOfButton);

                //first give all buttons the "unclicked" color
                for (let i = 0; i < theseButtons.length; i++) {
                  theseButtons[i].parentElement.style.backgroundColor = "#dcebe5";
                }

                //change color the clicked label
                this.parentElement.style.backgroundColor = "#74b2b2";

                //Check if all questions are answered (number of checked boxes is the same as number of questions)
                //If they are, change color of the button and change boolean "klar" to "true"
                if ((document.querySelectorAll('input[type="radio"]:checked').length) === data.length) {
                // if ((document.querySelectorAll('input[type="radio"]:checked').length) === 1) {

                  console.log('likalånga')
                  klar = true;
                  submitButton.style.opacity = "1";
                };
              });
            });
          }

          clickButton();

        },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
        });
        
const body = document.querySelector('body');

//if todays date is higher than 9 march change background color   
(function() {
  var today = new Date();
  var date = new Date("2025-03-09");
  if (today > date) {
    body.style.backgroundColor = 'rgb(249,249,247)';
  }
  else {
    body.style.backgroundColor = '#fcfaf5'
  }
})();
