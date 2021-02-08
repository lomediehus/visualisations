console.log("script is running")

let content = document.getElementById('content')
//content.innerHTML = "Här skarebli ett quiz";
var diven;
var value;
var buttons;
var points = 0;

//reading a json file
$.ajax({
        url: "fragor.json",
        // contentType: "application/json",
        dataType: 'json',
        success: function (data) {
          // console.log(data)

          function makeMarkup(x) {
            const markup = `
            <div id="${data[x].divid}" class="u-paddedBottomM">
              <h3 id="rubrik${x+1}"" class="u-textMetaDeca">${data[x].rubrik}</h3>
              <p class="u-textMeta">${data[x].fraga}</p>
              <img src="bild${x+1}.jpg" width="400">
              <label><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value1}" class="checkbox">${data[x].alt1}<span>  ${data[x].symbol1}</span></label><br>
              <label><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value2}" class="checkbox">${data[x].alt2}<span>  ${data[x].symbol2}</span></label><br>
              <label><input type="radio" name="fraga${(x+1).toString()}" value="${data[x].value3}" class="checkbox">${data[x].alt3}<span>  ${data[x].symbol3}</span></label>
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
          content.innerHTML += "<button id='submitButton' class='Button'>Se ditt resultat</button>";

          informHeight();

          var submitButton = document.getElementById("submitButton");
          submitButton.addEventListener("click", function(){
            var klar = false;
            console.log('klickade submit')
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
            console.log(klar)
            if (klar) {
              window.alert('Du fick ' + points + ' rätt av ' + data.length + ' möjliga.')
            }
            else window.alert('du måste svara på alla frågor')



            })
          // })


          function clickButton() {
            buttons = [...document.getElementsByClassName('checkbox')];

            buttons.forEach((button, i) => {
              buttons[i].addEventListener("click", function(){
                //get the value of the clicked button
                value = this.value;
                if (value === "rätt") points++;
                console.log(points)


               //change color the clicked label
                this.parentElement.style.backgroundColor = "#74b2b2";

                //Get the text from the last paragraph of the parent of the clicked button
                var textContent = $(this).parent().siblings("p:last-of-type").text();
                //Replace the text with the value of the clicked button and the text that was collected
                $(this).parent().siblings("p:last-of-type").html("Ditt svar är " + value + "! " + textContent)


                //Show the paragraph containing the correct answer
                $(this).parent().siblings("p:last-of-type").slideDown(300, "swing", function() {
                  informHeight();
                });

                //get the enclosing paragraphs of the labels with buttons
                let enclosingP = this.parentElement.parentElement;

                //div needed for addAnswer function, might not use it
                diven = enclosingP.parentElement;
                // console.log(diven)

                //collect the checkboxes into an HTML collection, and turn them into an array with the spread operator
                let boxarna = [...enclosingP.getElementsByClassName('checkbox')];
              for (var i = 0; i < boxarna.length; i++) {
                //make the "wrong" and "correct" symbols visible
                boxarna[i].nextElementSibling.style.visibility = "visible";
                }
                // addAnswer();

                //disable buttons of the question after one click
                var radioName = $(this).attr("name"); //Get radio name
                $(":radio[name='"+radioName+"']").attr("disabled", true);
              });
            });


          }

          clickButton();

          // function addAnswer() {
          //   console.log('addAnswer')
          //   console.log(diven);
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
