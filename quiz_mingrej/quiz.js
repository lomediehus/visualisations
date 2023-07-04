console.log("script is running")

let content = document.getElementById('content');
var overlay = document.getElementById('overlay');
//content.innerHTML = "Här skarebli ett quiz";
var diven;
var value;
var buttons;
var points = 0;
var rättsymbol = "&check;";
var felsymbol = "&cross;";
var body = document.getElementsByTagName("body")[0];

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  // body.style.overflow = "hidden";
  console.log('den finns på github')
}
else {
  // body.style.overflow = "auto";
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
              <div id="img-container">
              <img src="bild${x+1}.jpg" class="smalfraga">
						  <p class="bottomright"><span class="bildtext">${data[x].foto}</span></p>
              </div>
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox">${data[x].alt1}<span class="symbol">  ${(data[x].value1 === "rätt") ? rättsymbol : felsymbol}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox">${data[x].alt2}<span class="symbol">  ${(data[x].value2 === "rätt") ? rättsymbol : felsymbol}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value3}' class='checkbox'>${data[x].alt3}<span class="symbol">  ${(data[x].value3 === "rätt") ? rättsymbol : felsymbol}</span></label>

            `

              // if (data[x].alt4) {
              //   markup += `<br><label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value4}' class='checkbox'>${data[x].alt4}<span>  ${data[x].symbol4}</span></label>`
              // }
       
              markup += `
              <p class="hidden u-paddedTopXS smalfraga">${data[x].svar}<br><a href="${data[x].href}" target="_blank")>Här kan du läsa mer!</a></p>
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
          //add div that show result
          content.innerHTML += "<div id='result' class='hidden u-textMeta smalfraga'></div>"
        
          //a div with a set height that seems necessary to avoid scrollbars in (some?) browsers
          content.innerHTML += "<div id='workaround'></div>"

          informHeight();


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
              var resultdiv = document.getElementById('result');
              var resultMarkup = `
              <h2>Resultat</h2>
                <p><strong>Du fick ${points} rätt av ${data.length} möjliga.</strong></p>
                <p>Är du kommunalare och använder någon ovanlig eller fiffig sak i ditt arbete får du gärna skriva och berätta om det. Mejla <a class="homestyled u-textMeta u-textStrong" target="_parent" href="mailto:mingrej@ka.se">mingrej@ka.se</a></p>
              `;
              result.innerHTML = resultMarkup;


              // result.innerHTML = 'Du fick ' + points + ' rätt av ' + data.length + ' möjliga.'
              $( "#result" ).slideDown(300, "swing", function() {
                informHeight();
                window.scrollBy(0,500);
                submitButton.style.display = "none";
              });
            }
            else {
              $("#overlay").show();
                }



            })
          // })


          function clickButton() {
            buttons = [...document.getElementsByClassName('checkbox')];
            // let symboler = document.getElementsByClassName("symbol");

            

            buttons.forEach((button, i) => {
              buttons[i].addEventListener("click", function(){
                //get the value of the clicked button
                value = this.value;


               //change color the clicked label
                this.parentElement.style.backgroundColor = "#74b2b2";
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

                //get the image source and remove the .jpg extension
                // var img_source = $(this).parent().siblings("img:first-of-type").attr("src").replace(/\.jpg/, '');
                console.log($(this).parent().siblings().children("img:first-of-type").attr(("src").replace(/\.jpg/, '')))
                var img_source = $(this).parent().siblings().children("img:first-of-type");
                // console.log(img_source)
                var img_source_repl = img_source.attr("src").replace(/\.jpg/, '')



                // change image source to an image with the same name, add letter B and .jpg extension
                // $(this).parent().siblings("img:first-of-type").attr("src", img_source + "B.jpg")
                $(this).parent().siblings().children("img:first-of-type").attr("src", img_source_repl + "B.jpg")



                //Show the paragraph containing the correct answer
                $(this).parent().siblings("p:last-of-type").slideDown(300, "swing", function() {
                  informHeight();
                  // window.scrollBy(0, 100)
                });

                //get the enclosing paragraphs of the labels with buttons
                let enclosingP = this.parentElement.parentElement;

                //div needed for addAnswer function, might not use it
                diven = enclosingP.parentElement;

                //collect the checkboxes into an HTML collection, and turn them into an array with the spread operator
                let boxarna = [...enclosingP.getElementsByClassName('checkbox')];
              for (var i = 0; i < boxarna.length; i++) {
                //make the "wrong" and "correct" symbols visible
                boxarna[i].nextElementSibling.style.visibility = "visible";
                

                // console.log(boxarna[i].value)
                if (boxarna[i].value === "rätt") {
                  boxarna[i].parentElement.style.fontWeight = "bold";
                  boxarna[i].nextElementSibling.style.color = "green";

                }


                }

                if (value === "rätt") points++;
                // console.log(points)

                // addAnswer();

                //disable buttons of the question after one click
                var radioName = $(this).attr("name"); //Get radio name
                $(":radio[name='"+radioName+"']").attr("disabled", true);
              });
            });


          }

          clickButton();


          // function addAnswer() {
          //   let text = "Ditt svar är " + value + "!";
          //   let text2 = data[1].svar;
          //   var para = document.createElement("p");
          //   var node = document.createTextNode(text);
          //   var para2 = document.createElement("p");
          //   var node2 = document.createTextNode(text2);
          //   para.appendChild(node);
          //   para2.appendChild(node2)
          //   diven.appendChild(para);
          //   diven.appendChild(para2);
          // }

        },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
        });


        