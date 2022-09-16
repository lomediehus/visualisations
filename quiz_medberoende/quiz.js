console.log("script is running")

// $("#favicon").attr("href","favicon2.ico");
// document.getElementById('favicon').setAttribute('href','favicon2.ico')

// document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";


var host = window.location.host


if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

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

//function to add upp values from an object
const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

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

          const resultMarkupGreen = `
          <h2 class=u-spacingBottomXS'>Resultat</h2>
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
            Böcker om medberoende kan ge dig fler insikter kring hur jobbet kan bli som ett medberoende, exempelvis ”Res dig! Läk ditt medberoende” av Madeleine Swartz och ”De tolv stegen: en utväg – en andlig väg till känslomässig läkning”.
            </p>
          `;

          const resultMarkupRed = `
          <h2>Resultat</h2>
            <p><span class='circle green semitransparent'></span><span class='circle yellow semitransparent'></span><span class='circle red'></span></p>
            <p><strong>Rött ljus</strong></p>
            <p>Det verkar som att jobbet slukar dig alldeles för mycket och att du tar för stort ansvar på din arbetsplats. Prata med din chef eller ditt skyddsombud om situationen och se till att få hjälp med att sätta gränser. Det är viktigt att dina egna behov tillgodoses! Träna på medkänsla med dig själv och hitta bra sätt att återhämta dig. Mindfulness kan vara en metod att prova.</p>
            <p>Böcker om medberoende kan ge dig fler insikter kring hur jobbet har blivit som ett medberoende, exempelvis ”Res dig! Läk ditt medberoende” av Madeleine Swartz och ”De tolv stegen: en utväg – en andlig väg till känslomässig läkning”.</p>
          `;

          data.forEach(fillContent);
          submitButton.style.display = "inline-block";

          function fillContent(item, index) {
            questions.innerHTML += makeMarkup(index);

            }
          //add submit button
          // content.innerHTML += "<button id='submitButton' class='Button doNotHideOverlay'>Se ditt resultat</button>";
          // content.innerHTML += "<div id='result' class='hidden u-textMeta'></div>"

          informHeight();





          submitButton.addEventListener("click", function(){


            //add upp points
            points = sumValues(poang);
            console.log('summa: ' + points)

            // var resultdiv = document.getElementById('result');


            if (klar) {
              if (points<2){
                result.innerHTML = resultMarkupGreen;
              }
              else if (points>=2&&points<3) {
                result.innerHTML = resultMarkupYellow;
              }
              else {
                  result.innerHTML = resultMarkupRed;
              }

              questions.style.display = "none";
              submitButton.style.display = "none";



              // result.innerHTML = 'Du fick ' + points + ' rätt av ' + data.length + ' möjliga.'
              $( "#result" ).slideDown(1000, "swing", function() {
                informHeight();
                window.scrollBy(0,500);
                // reloadButton.style.display = "none";
                reloadButton.classList.remove('hidden');

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

                let nameOfButton = this.name;

                //Get  radiobuttons with the same name as the clicked button
                let theseButtons = document.getElementsByName(nameOfButton);

                for (let i = 0; i < theseButtons.length; i++) {
                  theseButtons[i].parentElement.style.backgroundColor = "#dcebe5";
                }

               //change color the clicked label
                this.parentElement.style.backgroundColor = "#74b2b2";



                //get the enclosing paragraphs of the labels with buttons
                // let enclosingP = this.parentElement.parentElement;

                //div needed for addAnswer function, might not use it
                // diven = enclosingP.parentElement;

                //collect the checkboxes into an HTML collection, and turn them into an array with the spread operator
                // let boxarna = [...enclosingP.getElementsByClassName('checkbox')];

                //Check if all questions are answered (number of checked boxes is the same as number of questions)
                if ((document.querySelectorAll('input[type="radio"]:checked').length) === 1) {

                // if ((document.querySelectorAll('input[type="radio"]:checked').length) === data.length) {
                  console.log('likalånga')
                  klar = true;
                  submitButton.style.opacity = "1";
                };
                // console.log(data.length)

              });
            });



          }

          clickButton();




        },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
        });
