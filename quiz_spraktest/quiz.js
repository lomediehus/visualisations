console.log("script is running")

let content = document.getElementById('content');
var overlay = document.getElementById('overlay');
//content.innerHTML = "Här skarebli ett quiz";
var diven;
var value;
var buttons;
var points = 0;

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}


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
              var boxtype = "radio";
              // var boxtype = data[x].type==="enval" ? "radio" : "checkbox";

            var markup = `
            <div id="${data[x].divid}" class="u-paddedBottomM">
              <h2 id="introrubrik${x+1}">${data[x].introrubrik}</h2>
              <p>${data[x].introtext}</p>
              <h3 id="rubrik${x+1}" class="u-textMetaDeca smalfraga">${data[x].rubrik}</h3>
              <p class="u-textMeta smalfraga">${data[x].fraga}</p>
              <img src="bild${x+1}.jpg" class="smalfraga">
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox">${data[x].alt1}<span>  ${data[x].symbol1}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox">${data[x].alt2}<span>  ${data[x].symbol2}</span></label><br>
              <label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value3}' class='checkbox'>${data[x].alt3}<span>  ${data[x].symbol3}</span></label>

            `

              if (data[x].alt4) {
                markup += `<br><label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value4}' class='checkbox'>${data[x].alt4}<span>  ${data[x].symbol4}</span></label>`
              }
              if (data[x].alt5) {
                markup += `<br><label class="smalfraga"><input type=${boxtype} name='fraga${(x+1).toString()}' value='${data[x].value5}' class='checkbox'>${data[x].alt5}<span>  ${data[x].symbol5}</span></label>`
              }

              markup += `
              <p class="u-textMeta hidden u-paddedTopXS smalfraga">${data[x].svar}</p>
                </div>`
            return markup;
          }

          data.forEach(fillContent);

          function fillContent(item, index) {
            content.innerHTML += makeMarkup(index);

            }
          //add submit button
          content.innerHTML += "<button id='submitButton' class='Button doNotHideOverlay smalfraga'>Se ditt resultat</button>";
          content.innerHTML += "<div id='result' class='hidden u-textMeta smalfraga'></div>"

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
                <p>Frågorna är en liten del av ett större test. Ditt resultat här avgör därför inte om dina språkkunskaper är tillräckliga för att arbeta inom äldreomsorgen. Detta är bara ett exempel på hur språktest för äldreomsorgen kan vara utformade. Olika kommuner/arbetsgivare använder olika tester.</p>
              `;
              result.innerHTML = resultMarkup;


              // result.innerHTML = 'Du fick ' + points + ' rätt av ' + data.length + ' möjliga.'
              $( "#result" ).slideDown(300, "swing", function() {
                informHeight();
                window.scrollBy(0,500);
                submitButton.style.display = "none";
              });
              // window.alert('Du fick ' + points + ' rätt av ' + data.length + ' möjliga.')
            }
            else {
              $("#overlay").show();
                }



            })
          // })


          function clickButton() {
            buttons = [...document.getElementsByClassName('checkbox')];

            buttons.forEach((button, i) => {
              buttons[i].addEventListener("click", function(){
                //get the value of the clicked button
                value = this.value;


               //change color the clicked label
                this.parentElement.style.backgroundColor = "#74b2b2";

                //Get the text from the last paragraph of the parent of the clicked button, i.e. the hidden paragraph with the answer.
                var textContent = $(this).parent().siblings("p:last-of-type").text();

                //Replace the text with the value of the clicked button. If the answer is wrong, add the collected text.
                if (value==="fel") {
                  $(this).parent().siblings("p:last-of-type").html("Ditt svar är " + value + "! " + textContent)
                } else {
                  $(this).parent().siblings("p:last-of-type").html("Ditt svar är " + value + "! ")
                }


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
