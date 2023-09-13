console.log("script is running")

const content = document.getElementById('content');
const overlay = document.getElementById('overlay');
var value;
var buttons;
var points = 0;
const rättsymbol = "&check;";
const felsymbol = "&cross;";

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

//click almost anywhere in document to hide overlay ("Du måste svara på alla frågrona…") Only submit button has exception
document.addEventListener("click", function(e)  {
  if (!e.target.classList.contains("doNotHideOverlay")) {
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
            var boxtype = "radio";
            var markup = `
            <div id="${data[x].divid}" class="u-paddedBottomM">
              <h3 id="rubrik${x+1}" class="ListicleHeading smalfraga">${data[x].rubrik}</h3>
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox">${data[x].alt1}<span class="symbol">  ${(data[x].value1 === "rätt") ? rättsymbol : felsymbol}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox">${data[x].alt2}<span class="symbol">  ${(data[x].value2 === "rätt") ? rättsymbol : felsymbol}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value3}' class='checkbox'>${data[x].alt3}<span class="symbol">  ${(data[x].value3 === "rätt") ? rättsymbol : felsymbol}</span></label>
            `

              // if (data[x].alt4) {
              //   markup += `<br><label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value4}' class='checkbox'>${data[x].alt4}<span>  ${data[x].symbol4}</span></label>`
              // }
       
              markup += `
              <p class="hidden u-paddedTopXS smalfraga">${data[x].svar}</p>
                </div>`
            return markup;
          }

          data.forEach(fillContent);

          function fillContent(item, index) {
            content.innerHTML += makeMarkup(index);
            informHeight();
          }
          
          // add submit button, class "doNotHideOverlay" is needed because the button is there to show the overlay
          content.innerHTML += "<button id='submitButton' class='Button doNotHideOverlay smalfraga'>Se ditt resultat</button>";
          //add div that shows result
          content.innerHTML += "<div id='result' class='hidden u-textMetaDeca smalfraga'></div>"
          //a div with a set height that seems necessary to avoid scrollbars in (some?) browsers
          content.innerHTML += "<div id='workaround'></div>"

          informHeight();

          //click event for submit button
          var submitButton = document.getElementById("submitButton");
          submitButton.addEventListener("click", function(){
            var klar = false;
            //traverse buttons, and check if they are disabled. If all are disabled, all questions are answered
            for (var i = 0; i < buttons.length; i++) {
              if (!buttons[i].getAttribute("disabled")) {
                klar = false;
                break;
              }
              else {
                klar = true;
              }
            }
            if (klar) {
              const resultdiv = document.getElementById('result');
              let resultMarkup1 = `
              <h2>Resultat</h2>
                <p><strong>Du fick ${points} rätt av ${data.length} möjliga. </strong></p>
              `;
              let resultMarkup2a = `
              <p>Kortslutning?</p>
             `;
              let resultMarkup2b = `
              <p>Inte världsklass, men du kanske är nyanställd? Eller kanske bara sladdade in här utan att veta vilken tidning det är…</p>
             `;

             let resultMarkup2c = `
              <p>Väl genomfört! Du verkar ha bra kontakt med elbranschen!</p>
             `;

             let resultMarkup2d = `
              <p>Lysande! Du är förmodligen en pensionerad lysmask som varit med om många inkilningar i futten.</a></p>
             `;
            
             console.log(points)
             
              resultdiv.innerHTML = resultMarkup1;
              
              //add different text depending on number of points
              if (points < 1) {
                resultdiv.innerHTML += resultMarkup2a;
              }
              else if (points < 4) {
                resultdiv.innerHTML += resultMarkup2b
              }
              else if (points < 9) {
                resultdiv.innerHTML += resultMarkup2c
              }
              else {
                resultdiv.innerHTML += resultMarkup2d
              }


              //make result div visible with a slide down effekt
              $( "#result" ).slideDown(300, "swing", function() {
                informHeight();
                window.scrollBy(0,500);
                submitButton.style.display = "none";
              });
            }
            //show overlay with text that you have to answer all questions
            else {
              $("#overlay").show();
                }

            })

          //function for clicking the radiobuttons to answer the questions
          function clickButton() {
            buttons = [...document.getElementsByClassName('checkbox')];

            buttons.forEach((button, i) => {
              buttons[i].addEventListener("click", function(){
                //get the value of the clicked button
                value = this.value;


          //change color the clicked label
            this.parentElement.style.backgroundColor = "#00a698";
            console.log(this.nextElementSibling.textContent)

            //Get the text from the last paragraph of the parent of the clicked button, i.e. the hidden paragraph with the answer.
            var htmlContent = $(this).parent().siblings("p:last-of-type").html();

            // console.log($(this).parent().siblings("img:first-of-type").attr("src"))

            //Replace the text with the value of the clicked button. If the answer is wrong, add the collected text.
            if (value==="fel") {
              $(this).parent().siblings("p:last-of-type").html("<span class='u-textStrong'>Rätt svar: </span>" + htmlContent)
            } else {
              $(this).parent().siblings("p:last-of-type").html("<span class='u-textStrong'>Ditt svar är " + value + "! </span>" + htmlContent)
            }

            //Show the paragraph containing the correct answer
            $(this).parent().siblings("p:last-of-type").slideDown(300, "swing", function() {
              informHeight();
              // window.scrollBy(0, 100)
            });

            //get the enclosing paragraphs of the labels with buttons
            let enclosingP = this.parentElement.parentElement;

            //collect the checkboxes into an HTML collection, and turn them into an array with the spread operator
            let boxarna = [...enclosingP.getElementsByClassName('checkbox')];
            for (var i = 0; i < boxarna.length; i++) {
              //make the "wrong" and "correct" symbols visible
              boxarna[i].nextElementSibling.style.visibility = "visible";
              
            //the right and wrong symbols are styled red in the css file, now style the right symbol green
            if (boxarna[i].value === "rätt") {
              boxarna[i].parentElement.style.fontWeight = "bold";
              boxarna[i].nextElementSibling.style.color = "green";
            }

          }

            if (value === "rätt") points++;

            //disable buttons of the question after one click
            var radioName = $(this).attr("name"); //Get radio name
            $(":radio[name='"+radioName+"']").attr("disabled", true);
          });
        });

          }

          clickButton();

        },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
        });


        