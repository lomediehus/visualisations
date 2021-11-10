console.log("script is running")

let content = document.getElementById('content');
var overlay = document.getElementById('overlay');
//content.innerHTML = "Här skarebli ett quiz";
var diven;
var value;
var buttons;
var points = 0;


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
              <h3 id="rubrik${x+1}" class="u-textMetaDeca bold">${data[x].rubrik}</h3>
              <p class="u-textMetaDeca">${data[x].fraga}</p>
              <img src="bild${x+1}.png" width="400">
              <label class="u-textMetaDeca"><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox">${data[x].alt1}<span>  ${data[x].symbol1}</span></label><br>
              <label class="u-textMetaDeca"><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox">${data[x].alt2}<span>  ${data[x].symbol2}</span></label>
              <p class="u-textMeta hidden u-paddedTopXS">${data[x].svar}</p>
              </div>
            `
            return markup;
          }

          data.forEach(fillContent);

          function fillContent(item, index) {
            content.innerHTML += makeMarkup(index);

            }
          //add submit button
          content.innerHTML += "<button id='submitButton' class='Button doNotHideOverlay'>Se ditt resultat</button>";
          content.innerHTML += "<div id='result' class='hidden u-textMeta'></div>"

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
                <p>Här går det att fylla på med en massa text, kanske vill man vara lite folkbildande och förklara lite extra. Här går det att fylla på med en massa text, kanske vill man vara lite folkbildande och förklara lite extra. Här går det att fylla på med en massa text, kanske vill man vara lite folkbildande och förklara lite extra. Här går det att fylla på med en massa text, kanske vill man vara lite folkbildande och förklara lite extra. Här går det att fylla på med en massa text, kanske vill man vara lite folkbildande och förklara lite extra.</p>
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

                //Get the text from the last paragraph of the parent of the clicked button
                var textContent = $(this).parent().siblings("p:last-of-type").text();
                //Replace the text with the value of the clicked button and the text that was collected
                $(this).parent().siblings("p:last-of-type").html("Ditt svar är " + value + "! " + textContent)


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
