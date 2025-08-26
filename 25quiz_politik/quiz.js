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
  // console.log('den finns på github')
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


          // alt="${data[x].alt-text

          function makeMarkup(x) {
            var boxtype = "radio";
            var markup = `
            <div id="${data[x].divid}" class="fragediv">
              
              <div id="img-container" class="img-container">
                <div class="cirkel">
                  <h1 id="rubrik${x+1}" class="rubrikibild">${data[x].rubrik}</h1>
                </div> 
              <img src="polpic${x+1}.webp" alt="${data[x].alt}" class="smalfraga">
               <div class="BodyImage-caption fraga"> ${data[x].fraga}</div>
            </div>



            <div class="flex-container BodyImage-caption">
                <label class="rb_label"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox">${data[x].alt1}<span class="symbol center">  ${(data[x].value1 === "rätt") ? rättsymbol : felsymbol}</span></label>
                <label class="rb_label"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox">${data[x].alt2}<span class="symbol center">  ${(data[x].value2 === "rätt") ? rättsymbol : felsymbol}</span></label>
                <label class="rb_label"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value3}' class='checkbox'>${data[x].alt3}<span class="symbol center">  ${(data[x].value3 === "rätt") ? rättsymbol : felsymbol}</span></label>
                
                
              </div>
           
            `

              // if (data[x].alt4) {
              //   markup += `<br><label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value4}' class='checkbox'>${data[x].alt4}<span>  ${data[x].symbol4}</span></label>`
              // }
       
              markup += `
              <p class="hidden svar center">${data[x].svar}<br></p>
              <hr class="dotted">
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
          content.innerHTML += "<div id='result' class='hidden u-textMeta smalfraga center'></div>"
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
                <p>Du fick <strong>${points} rätt</strong> av <strong>${data.length} möjliga.</strong></p>
              `;
            //   let resultMarkup2a = `
            //   <p><strong></strong>Följ oss på arbetet.se om du vill bli en hejare på politik!</p>
            //  `;

            //  let resultMarkup2b = `
            //   <p><strong></strong> Här kan man skriva en kommentar om resultatet</p>
            //  `;

            //  let resultMarkup2c = `
            //   <p><strong></strong>Här kan man skriva en kommentar om resultatet</a></p>
            //  `;
            
             
              resultdiv.innerHTML = resultMarkup1;
              
              // // add different text depending on number of points
              // if (points < 3) {
              //   resultdiv.innerHTML += resultMarkup2a;
              // }
              // else if (points < 5) {
              //   resultdiv.innerHTML += resultMarkup2b
              // }
              // else {
              //   resultdiv.innerHTML += resultMarkup2c
              // }


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
          if (this.value === "rätt") {  
            this.parentElement.style.backgroundColor = "green";
            this.parentElement.style.color = "white";
            this.parentElement.style.fontWeight = "bold";
            this.nextElementSibling.style.visibility = "visible";

          }
          else {
            this.parentElement.style.backgroundColor = "red";
            this.parentElement.style.color = "white";
            //style the label with the correct answer green
            let correctLabel = $(this).closest("div.fragediv").find("label input[value='rätt']").parent();
            console.log(correctLabel);
            correctLabel.css("background-color", "green");
            correctLabel.css("color", "white");
            correctLabel.css("font-weight", "bold");
            this.nextElementSibling.style.visibility = "visible";
            let correctSpan = correctLabel.find("span");
            correctSpan.css("visibility", "visible");


          }


            //select the p element inside the parent of the parent of the clicked button, i.e. the paragraph with the answer
            // let svar = $(this).parent().siblings("p:last-of-type")

            let svar = $(this).closest("div.fragediv").find("p:last-of-type");


            //Get the text from the last paragraph of the parent of the clicked button, i.e. the hidden paragraph with the answer.
            // var htmlContent = $(this).parent().siblings("p:last-of-type").html();
            // var htmlContent = svar.html();
           
            //Replace the text with the value of the clicked button. If the answer is wrong, add the collected text.
            if (value==="fel") {
              $(this).parent().siblings("p:last-of-type").html("<span class='u-textStrong'>Rätt svar: </span>" + svar.html())
            } else {
              $(this).parent().siblings("p:last-of-type").html("<span class='u-textStrong'>Ditt svar är " + value + "! </span>" + svar.html())
            }

            //get the image source and remove the .jpg extension
            // var img_source = $(this).parent().siblings().children("img:first-of-type");
            // var img_source_repl = img_source.attr("src").replace(/\.jpg/, '')


            // change image source to an image with the same name, add letter B and .jpg extension
            // $(this).parent().siblings("img:first-of-type").attr("src", img_source + "B.jpg")
            // $(this).parent().siblings().children("img:first-of-type").attr("src", img_source_repl + "B.jpg")


            //Show the paragraph containing the correct answer
            $(this).closest("div.fragediv").find("p:last-of-type").slideDown(300, "swing", function() {
              informHeight();
              // window.scrollBy(0, 100)
            });

               $(this).closest("div.fragediv").find("p:last-of-type").slideDown(300, "swing", function() {
              informHeight();
              // window.scrollBy(0, 100)
            });

            //get the enclosing paragraphs of the labels with buttons
            let enclosingP = this.parentElement.parentElement;

            //collect the checkboxes into an HTML collection, and turn them into an array with the spread operator
            let boxarna = [...enclosingP.getElementsByClassName('checkbox')];
            for (var i = 0; i < boxarna.length; i++) {
              //make the "wrong" and "correct" symbols visible
              // boxarna[i].nextElementSibling.style.visibility = "visible";
              
            //the right and wrong symbols are styled red in the css file, now style the right symbol green
            // if (boxarna[i].value === "rätt") {
            //   boxarna[i].parentElement.style.fontWeight = "bold";
            //   boxarna[i].parentElement.style.color = "white";

            //   boxarna[i].parentElement.style.backgroundColor = "green";

            //   boxarna[i].nextElementSibling.style.color = "green";
            // }

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


const body = document.querySelector('body');

//if todays date is higher than 9 march change background color   
(function() {
  var today = new Date();
  var date = new Date("2025-03-09");
  if (today > date) {
    body.style.backgroundColor = 'rgb(250,249,247)';
  }
  else {
    body.style.backgroundColor = '#fcfaf5'
  }
})();

      