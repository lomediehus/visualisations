console.log("script is running")

const content = document.getElementById('content');
const overlay = document.getElementById('overlay');
var value;
var buttons;
var points = 0;
const rättsymbol = "&check;";
const felsymbol = "&cross;";
const audio = new Audio("frageljud.mp3");

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
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
            <div id="${data[x].divid}" class="u-paddedTopM">
              <h3 id="rubrik${x+1}" class="ListicleHeading smalfraga u-paddedBottomXXS">${data[x].rubrik}</h3>
              <p class="smalfraga u-paddedBottomXXS">Frågan ser du när du har lyssnat på ljudet. Du kan bara lyssna en gång.</p>
              <button class="Button smalfraga" id="ljudknapp"> Spela ljud</button>
              <p class="smalfraga fragetext u-paddedBottomXXS">${(data[x].fraga)}</p>
              
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox"><span class="fragetext">${data[x].alt1}</span><span class="symbol">  ${(data[x].value1 === "rätt") ? rättsymbol : felsymbol}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox"><span class="fragetext">${data[x].alt2}</span><span class="symbol">  ${(data[x].value2 === "rätt") ? rättsymbol : felsymbol}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value3}' class='checkbox'><span class="fragetext">${data[x].alt3}</span><span class="symbol">  ${(data[x].value3 === "rätt") ? rättsymbol : felsymbol}</span></label><br>
             
              <p class="hidden u-paddedTopXS smalfraga">${data[x].svar}<br</p>
                </div>
            `
            return markup;
          }

         
          data.forEach(fillContent);

          function fillContent(item, index) {
            content.innerHTML += makeMarkup(index);
            informHeight();
          }

          let fragetext = document.querySelectorAll(".fragetext");
          for (i=0; i<fragetext.length; i++) {
            fragetext[i].classList.add("textblur")
          }

          content.innerHTML += "<p class='smalfraga u-paddedBottomXS u-spacingTopM'>Testfrågan har KA fått från Botkyrka, som ett exempel på hur deras språktest kan se ut. Just den här frågan används inte i deras test."
          
          
          //a div with a set height that seems necessary to avoid scrollbars in (some?) browsers
          content.innerHTML += "<div id='workaround'></div>"

          informHeight();

          fragetext = document.querySelectorAll(".fragetext");

          let ljudknapp = document.getElementById("ljudknapp")

          const aftersound = function(){
            for (i=0; i<fragetext.length; i++) {
              fragetext[i].classList.remove("textblur")
            }
            ljudknapp.style.opacity = "0.5";
            ljudknapp.style.pointerEvents = "none";
  

          }

          ljudknapp.addEventListener("click", function(){
            audio.play();
            const myTimeout = setTimeout(aftersound, 8000)
            ljudknapp.disabled = true;
          })

          

          //function for clicking the radiobuttons to answer the questions
          function clickButton() {
            buttons = [...document.getElementsByClassName('checkbox')];

            buttons.forEach((button, i) => {
              buttons[i].addEventListener("click", function(){
                //get the value of the clicked button
                value = this.value;


          //change color the clicked label
            this.parentElement.style.backgroundColor = "#74b2b2";

            //Get the text from the last paragraph of the parent of the clicked button, i.e. the hidden paragraph with the answer.
            var htmlContent = $(this).parent().siblings("p:last-of-type").html();

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
              boxarna[i].nextElementSibling.nextElementSibling.style.visibility = "visible";
              
            //the right and wrong symbols are styled red in the css file, now style the right symbol green
            if (boxarna[i].value === "rätt") {
              boxarna[i].parentElement.style.fontWeight = "bold";
              boxarna[i].nextElementSibling.nextElementSibling.style.color = "green";
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


        