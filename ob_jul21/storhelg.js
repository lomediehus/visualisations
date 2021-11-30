let filearray = [];
let filearray2 = [];
let kombo = [];

//read data from files into arrays
$.ajax({
        // url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/OBavtal.json",
        url: "OBavtal.json",
        // url: "test.json",

        dataType: "json",
        mimeType: "application/json",
        success: function (data) {
            filearray.push(...data)

            $.ajax({
                    // url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/OBavtal_tillagg.json",
                    url: "OBavtal_tillagg.json",
                    dataType: "json",
                    mimeType: "application/json",
                    success: function (data) {
                        filearray2.push(...data)

                        //when both files are read, run function that does all the rest
                        doStuff()
                        },
                    error: function (/* request, error */) {
                        console.log('Network error has occurred please try again!');
                    }
            })
            //Make the graph that compares proffessions
            },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
})


//function to do everything that's to be done after the data is properly read and stored
function doStuff() {

  function fixUpData() {
    kombo = [...filearray];

    kombo.forEach(function(kombogrej) {
      //turn value yrke from string to array
      kombogrej.yrke = kombogrej.yrke.split(",");
      //turn string digits into numbers
      kombogrej.avtalnr = parseInt(kombogrej.avtalnr);
      kombogrej.branschnr = parseInt(kombogrej.branschnr);

        // filter array for match in both files
        var result = filearray2.filter(function(extradata) {
          return kombogrej.avtalnr === extradata.avtalnr;
        })
      //create new key-value pairs
      kombogrej.helg1 = (result[0] !== undefined) ? result[0].helg1 : null;
      kombogrej.helg2 = (result[0] !== undefined) ? result[0].helg2 : null;
      kombogrej.helg3 = (result[0] !== undefined) ? result[0].helg3 : null;
      kombogrej.helg4 = (result[0] !== undefined) ? result[0].helg4 : null;
      kombogrej.helg5 = (result[0] !== undefined) ? result[0].helg5 : null;
      kombogrej.helg6 = (result[0] !== undefined) ? result[0].helg6 : null;
    })

  }

  fixUpData()


  //for storing the value in the first input field
  var inpValue = '';
  //variable for dynamically choosing the right property from the objects in the file "avtalen.js"
  var helgnr = "1";
  //will change to true on a search hit
  var hittad = false;
  //for storing value in input field
  var siffra;
  //for storing the data-divisor attribute
  var divisorAttr =  [];
  //for storing target element;
  var target;
  //for storing max-value
  var tak;
  //for storing result of calculation
  var mathResult;
  //storing value to use in headline
  var valtYrke;
  //to storing value of helgvarre unless its null
  var sparvarre;

  //just getting a lot of html elements
  var sokYrkeKnapp = document.getElementById("sokYrkeKnapp");
  var searchButton = document.getElementById('searchButton');
  var messagediv = document.getElementById('messagediv');
  var modebuttonLeft = document.getElementById('modebuttonLeft');
  var modebuttonRight = document. getElementById('modebuttonRight');
  var sokYrke = document.getElementById('sokYrkeWrapper');
  var allaAvtal = document.getElementById('allaAvtalWrapper');
  var bottom = document.getElementById('bottom');
  var header = document.getElementById('header');
  var mc = document.getElementById('mainContent');
  var [helgknapp1, helgknapp2, helgknapp3, helgknapp4, helgknapp5, helgknapp6] = [document.getElementById('helg1'), document.getElementById('helg2'), document.getElementById('helg3'), document.getElementById('helg4'), document.getElementById('helg5'), document.getElementById('helg6')];
  var mainContent = document.getElementById('mainContent');
  var helgwrapper = document.getElementsByClassName("helg-wrapper");
  var helgbild = document.getElementById('helgbild');

  // NEW variables for text in document
  var overskrift, rubrik, text, extraxtext1, extratext2, extratext3, extratext4 = '';
  //Replaces any
  const patt = new RegExp('[0-9]+(,[0-9]+)*' + '\\s' + 'kr/tim', 'g');
  let flag;


  var knapp = `
    <p><input class="pengar u-textMeta" type="text" name="pengar" placeholder="Månadslön"><button type="button" id="countButton" class="u-textMeta u-textStrong Button countButton lessPadding">Räkna ut</button></p>
    `;
  var helgvarre;

  //Setting initial position of the div mainContent
  mainContent.style.marginTop = helgwrapper[0].clientHeight + 20 + 'px';

  //Changing the position of mainContent if user resizes window
  window.onresize = function() {
    mainContent.style.marginTop = helgwrapper[0].clientHeight + 20 + 'px';
  }

  //Variable for current date
  var date = new Date();
  //variables for set dates
  var nyarsdatum = new Date("December 27 2021");
  var trettonhelgsdatum = new Date("January 2 2022");
  var paskdatum = new Date("April 14 2021");
  var pingstdatum = new Date("June 02 2021");
  var midsommardatum = new Date("June 09 2021");

  //Variable for current date
  var date = new Date();
  //variables for set dates
  var nyarsdatum = new Date("December 27 2021");
  var trettonhelgsdatum = new Date("January 2 2022");
  var paskdatum = new Date("February 12 2021");
  var pingstdatum = new Date("April 15 2021");

  //handling dates:
  //Check if current date is after nyar;
  if (date.getTime() > nyarsdatum.getTime()) {
    //if current date is also after trettondagen
    if (date.getTime() > trettonhelgsdatum.getTime()) {
      document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/midsommar.svg';
      goActive(helgknapp3);
      helgnr = "3";
    }
    else {
      document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/pask.svg';
      goActive(helgknapp2);
      helgnr = "2";
    }
  }
  else {
    document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/trettonhelg.svg';
    goActive(helgknapp1);
    helgnr = "1";
  }


  //clicks for helgknapps
  helgknapp1.addEventListener('click', function(){
    // NEW change source of helgnr
    helgnr = "1";
    helgknapp(this);
    document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/jul.svg';
  });

  helgknapp2.addEventListener('click', function(){
    // NEW change source of helgnr
    helgnr = "2";
    helgknapp(this);
     document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/nyar.svg';
  });

  helgknapp3.addEventListener('click', function(){
    helgnr = "3";
    helgknapp(this);
    document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/trettonhelg.svg';
  });

  helgknapp4.addEventListener('click', function(){
    helgnr = "4"
    helgknapp(this);
    document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/pask.svg';
  });

  helgknapp5.addEventListener('click', function(){
    helgnr = "5";
    helgknapp(this);
    document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/pingst.svg';
  });

  helgknapp6.addEventListener('click', function(){
    helgnr = "6";
    helgknapp(this);
    document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/midsommar.svg';
  });

  //function for actions of the helgknapps
  function helgknapp(clicked) {
    goActive(clicked);
    if (inpValue != '') {
      valueToDiv();
    }
    if (hasClass(modebuttonRight, 'passive')) {
    }
    else {
      avtalstext(helgnr);
    }
  }

  //style active button
  function goActive(knappen) {
    var knappar = document.getElementsByClassName('hscrollbutton');
    var arr = Array.prototype.slice.call(knappar);
    arr.forEach(function(entry) {
        entry.classList.add('passive');
    });
    knappen.classList.remove('passive');
  }

  //Autocomplete code from https://www.w3schools.com/howto/howto_js_autocomplete.asp
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        inpValue = '';
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete con tainer:*/
        this.parentNode.appendChild(a);

        function addClick() {
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;

              //assign the value to a global variable to reach it from outside the function
              inpValue = this.getElementsByTagName("input")[0].value;

              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
              resultdiv.innerHTML = '';
              messagediv.innerHTML = '';
          });
        }

        /*for each item in the array...*/
        for (i = 0; i < arr.length; i+=1) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            addClick();
            a.appendChild(b);
          }
        }
    });

    /*execute a function presses a key on  the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) {
          x = x.getElementsByTagName("div");
        }
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {

          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) {
              x[currentFocus].click();
            }
          }
          inpValue = $(this).val().toLowerCase();
          valueToDiv();
          blur(inp);
        }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) {
        return false;
      }
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) {
        currentFocus = 0;
      }
      if (currentFocus < 0) {
        currentFocus = (x.length - 1);
      }
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/


      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

  //complete list of yrken
  var yrken = [ "administratör", "aktiveringsassistent", "aktiveringspedagog", "aktivitetsledare", "ambulanssjukvårdare", "anläggningsarbetare", "arbetshandledare", "arbetsledare", "assistent/församlingsarbete", "avbytare", "badmästare", "badpersonal", "banarbetare", "barnskötare", "barnsköterska", "barntimmeledare", "behandlare", "behandlingsassistent", "biträden", "boendeassistent", "boendehandledare", "boendestödjare", "brandman", "buss övriga", "bussförare", "butikspersonal", "chaufför", "diakoniassistent", "djurskötare", "driftsledare", "ekonomibiträde", "elevassistent", "fastighetsskötare", "fordonsförare", "fotvårdare", "fritidsledare", "fältarbetare", "fönsterputsare", "förrådsarbetare", "församlingshemsvärd", "garagepersonal", "habiliteringsassistent", "habiliteringsbiträde", "habiliteringspedagog", "habiliteringspersonal", "handledare", "husmor", "hästskötare", "instruktör", "internlärare", "kock", "kokerska", "kontorsvaktmästare", "kundtjänstmedarbetare", "kyrkogårdsarbetare", "kyrkogårdsföreståndare", "kyrkvaktmästare", "köksbiträde", "kökspersonal", "laboratoriebiträde", "lagerarbetare", "lantarbetare", "ledsagare", "logopedassistent", "lokalvårdare", "maskinförare", "maskinskötare", "medlevare", "mekaniker", "montör", "motorfordonsmekaniker", "måltidspersonal", "obduktionstekniker", "omsorgsassistent", "park- och trädgårdsarbetare", "personlig assistent", "receptionist", "renhållningsarbetare", "reparatör", "ridlärare", "serveringsbiträde", "servicevärd", "sjukgymnastassistent", "skötare", "socialpedagog", "spårvagnsförare", "städare", "stödassistent", "stödbiträde", "stödpedagog", "stödpersonal", "teamledare", "traktorförare", "tvätteribiträde", "tvätterimedarbetare", "tvättmaskinskötare", "undersköterska", "ungdomsassistent", "ungdomsledare", "vaktmästare", "verkstadspersonal", "vård- och omsorgspersonal", "vårdare", "vårdbiträde"]



  //invoke autocomplete function
  autocomplete(sokYrkeKnapp, yrken);

  //add click to search button
    searchButton.addEventListener('click', function(){
      inpValue = sokYrkeKnapp.value.toLowerCase();
      //handle search result
      valueToDiv();
    })

  //Add text to page after search
  function valueToDiv() {
    matchaYrke(inpValue, helgnr);
    resultdiv.innerHTML = '';
    var node = document.createElement('DIV');
      if (hittad === true) {
        node.innerHTML = '<p></p><p class="paddingBottom10 paddingTop10 u-textMetaDeca caps">Avtal för ' + valtYrke + '</p>';
      }
      //give error message
      else {
        messagediv.innerHTML ='';
        var mailBody = 'Jag%20saknar%20yrkestiteln%20' + inpValue + '.';
        node.innerHTML = '<p class="paddingTop10">Vi hittade inte yrket du sökte. Tycker du att yrket ska finnas med? Mejla oss yrkestiteln så kollar vi på det. Men Kommunal har så många yrken och avtal att vi tyvärr inte kan ha med alla.</p><a class="homestyled u-textMeta u-textStrong" target="_parent" href="mailto:elin.steen@ka.se?Subject=Saknad%20yrkestitel&body=' + mailBody + '">Skicka mejl</a>' ;
      }
    document.getElementById('resultdiv').appendChild(node);
    informHeight();
  }

  //kollar om det sökta yrket finns med i avtalsobjektten och lägger i så fall till yrket i listan 'message'
  function matchaYrke(yrke, text) {
    hittad = false;
    if (yrke.startsWith('usk')|| yrke.startsWith('uska')) {
      yrke = 'undersköterska';
    }
    messagediv.innerHTML = '';
    for (var i = 0; i < kombo.length; i++) {
      for (var j = 0; j < kombo[i].yrke.length; j++) {
        //använder "startsWith" för att användare ska få träff även om de skriver in ett mellanslag efter yrkestiteln
        if (yrke.startsWith(kombo[i].yrke[j])) {
          hittad = true;
          valtYrke = kombo[i].yrke[j];

          rubrik = `
            <h3 class="u-textMetaDeca" style="font-weight: bold">  ${kombo[i].avtalsrubrik} </h3>
          `

          let textvarre;

          switch (helgnr) {
            case '1':
              textvarre = kombo[i].jul;
              helgvarre = kombo[i].helg1;
              break;
            case '2':
              textvarre = kombo[i].nyar;
              helgvarre = kombo[i].helg2;
              break;
            case '3':
              textvarre = kombo[i].trettonhelg;
              helgvarre = kombo[i].helg3;
              break;
            case '4':
              textvarre = kombo[i].pask;
              helgvarre = kombo[i].helg4;
              break;
            case '5':
              textvarre = kombo[i].pingst;
              helgvarre = kombo[i].helg5;
              break;
            case '6':
              textvarre = kombo[i].midsommar;
              helgvarre = kombo[i].helg6;
              break;
          }

          if (helgvarre !== null) {
              sparvarre = helgvarre;
          }

          textvarre = textvarre.replace(/100 procent/g, "<strong>100 procent</strong>");
          textvarre = textvarre.replace(/\r\n/g, "<br>");

          text = `
            <p>${textvarre.replace(patt, '<span class="fetLon">$&</span>')}</p>
          `;

          //stay blank if content is null;
          if (helgvarre && helgvarre.fall1) {
            extratext1 = `
            <div class="inFrame counter"><p>${helgvarre.fall1.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
            `;
            }
            else extratext1 = '';


          if (helgvarre && helgvarre.fall2) {
            extratext2 = `
            <div class="inFrame counter"><p>${helgvarre.fall2.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
            `;
            }
            else extratext2 = '';

          if (helgvarre && helgvarre.fall3) {
            extratext3 = `
            <div class="inFrame counter"><p>${helgvarre.fall3.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
            `;
            }
            else extratext3 = '';

          if (helgvarre && helgvarre.fall4) {
            extratext4 = `
            <div class="inFrame counter"><p>${helgvarre.fall4.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
            `
            }
            else extratext4 = '';


          messagediv.innerHTML += rubrik + text;

          if (kombo[i].knapp === 'ja') {
            messagediv.innerHTML += knapp;
          }

          messagediv.innerHTML +=  extratext1 + extratext2 + extratext3 + extratext4;
        }
      }
    }
    // var string = message.join('');
    if (hittad === true) {
      messagediv.innerHTML += '<h3 class="u-textMetaDeca paddingTop10" style="font-weight: bold">Finns inte ditt avtal?</h3><p>Finns ditt yrke i listan men ditt avtal kommer inte upp? Mejla oss din yrkestitel och vilket avtal du tillhör så kollar vi på det.</p><a class="homestyled u-textMeta u-textStrong" target="_parent" href="mailto:elin.steen@ka.se?Subject=Saknat%20avtal">Skicka mejl</a>';
    }

    // messagediv.innerHTML = string;
    $('#messagediv').hide().fadeIn();
    // informHeight();
  }

  // adding event listener on dynamically added html
  // this one for writing the input field
  document.addEventListener('input', function (e) {
      if (hasClass(e.target, 'pengar')) {
      }
  }, false);

  //event to give variable 'siffra' the correct number for use in the click function on submit button 'räkna ut'. Has to be "keyup" to include last digit
  document.addEventListener('keyup', function (e) {
      if (hasClass(e.target, 'pengar')) {
        siffra = e.target.value;

        //if enter is pressed
        if (e.keyCode == 13) {
          checkInput(siffra, target);
        }
      }
  }, false);

  //event for the submit button 'räkna ut'
  document.addEventListener('click', function (e) {
    target = e.target;
    //because 'contButton' is added dynamically you cannot give it a click function from start. This if-statment fires whenever you click anything, but no action unless target has a certain class.
    if (hasClass(e.target, 'countButton')) {
        checkInput(siffra, target);
    }
  }, false);

  //function used in event listeners for dynamically added stuff
  function hasClass(elem, className) {
      return elem.classList.contains(className);
  }

  //check if input is number
  function checkInput(input, target) {

    var counter = document.getElementsByClassName('counter');



    divisorAttr.push(sparvarre.fall1divisor, sparvarre.fall2divisor, sparvarre.fall3divisor, sparvarre.fall4divisor);
    tak = sparvarre.tak;


    //if input is a number and also not null (which would be handled as zero)
    if (!isNaN(input) && input != null) {
      // siffra = parseInt(input);
      siffra = Number(input);
      if (siffra >= tak) {
        siffra = tak;
      }
      //if input is number, divide it. The function dividedToDiv is invoked from within the divideSalary function.
      divideSalary(divisorAttr);
    }
    else if (isNaN(input)) {
      input = 'tom';
      //if input is not a number, skip division and move directly to the function dividedToDiv. Will give error message.
      dividedToDiv(input);
    }
    siffra = null;
  }

  //dividing the number from input field
  function divideSalary(divisor) {
    var stringResult = [];
    for (let i = 0; i < divisor.length; i++) {
      if (!divisor[i]) {
      }
      else mathResult = siffra/divisor[i];

      //OBS TILLFÄLLIG FIX FÖR AVRUNDNINGSFEL JUST DETTA ÅR
      if (mathResult = 108.145) mathResult = 108.15;

      stringResult.push(mathResult.toFixed(2))
    }
    dividedToDiv(stringResult);
  }

  //Appending a textnode with the calculated result in a div, also checking if its a number
  function dividedToDiv(nodecontent) {
    var dividedResultHere = document.getElementsByClassName('counter');
    for (let i = 0; i < nodecontent.length; i++) {
      var tobedeleted = document.getElementById('div' + i)
      if (tobedeleted !== null) {
        tobedeleted.parentNode.removeChild(tobedeleted)
      }
      // var elem = dividedResultHere[i].lastElementChild;
      var node  = document.createElement('DIV');
      node.setAttribute("class", "Label");
      node.setAttribute("id", "div" + i)
      var textnode;

      if (nodecontent === 'tom') {
        textnode = document.createTextNode('Nåt blev fel, prova att skriva din lön igen.');
      }
      else {
        textnode = document.createTextNode("Ditt ob-tillägg blir " + nodecontent[i] + " kronor i timmen.");
      }
      node.appendChild(textnode)

      //append child if there dividedResultHere has content ( is true )
      if (dividedResultHere[i]) { dividedResultHere[i].appendChild(node); }

      //empty array before next round
      divisorAttr = [];
      //resize visualistion frame
      informHeight();
    }
  }

  //NEW update of function: fill the div allaAvtalWrapper with text from array "kombo"
  function avtalstext(text){
    allaAvtal.innerHTML = '';

    kombo.forEach ( (item, index) => {
      overskrift = `
        <p class="u-paddedBottomXXS u-spacingTopM u-textMetaDeca caps">${item.bransch}</p>
          `;
      rubrik = `
        <h3 class="u-textMetaDeca" style="font-weight: bold">  ${item.avtalsrubrik} </h3>
      `;


      let textvarre;

      switch (helgnr) {
        case '1':
          textvarre = item.jul;
          helgvarre = item.helg1;
          break;
        case '2':
          textvarre = item.nyar;
          helgvarre = item.helg2;
          break;
        case '3':
          textvarre = item.trettonhelg;
          helgvarre = item.helg3;
          break;
        case '4':
          textvarre = item.pask;
          helgvarre = item.helg4;
          break;
        case '5':
          textvarre = item.pingst;
          helgvarre = item.helg5;
          break;
        case '6':
          textvarre = item.midsommar;
          helgvarre = item.helg6;
          break;
      }

      if (helgvarre !== null) {
          sparvarre = helgvarre;
      }

      textvarre = textvarre.replace(/100 procent/g, "<strong>100 procent</strong>");
      textvarre = textvarre.replace(/\r\n/g, "<br>")

      text = `
        <p>${textvarre.replace(patt, '<span class="fetLon">$&</span>')}</p>
      `;

      //stay blank if content is null;
      if (helgvarre && helgvarre.fall1) {
        extratext1 = `
        <div class="inFrame counter"><p>${helgvarre.fall1.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
        `;
        }
        else extratext3 = '';



      if (helgvarre && helgvarre.fall2) {
        extratext2 = `
        <div class="inFrame counter"><p>${helgvarre.fall2.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
        `;
        }
        else extratext2 = '';

      if (helgvarre && helgvarre.fall3) {
        extratext3 = `
        <div class="inFrame counter"><p>${helgvarre.fall3.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
        `;
        }
        else extratext3 = '';

      if (helgvarre && helgvarre.fall4) {
        extratext4 = `
        <div class="inFrame counter"><p>${helgvarre.fall4.replace(patt, '<span class="fetLon">$&</span>')}</p></div>
        `
        }
        else extratext4 = '';

      if (item.bransch !== flag) {
        allaAvtal.innerHTML += overskrift;
      }

      allaAvtal.innerHTML += rubrik + text;

      //adding the "knapp" only if theres information in the field "knapp"
      if (item.knapp === 'ja') {
        allaAvtal.innerHTML += knapp;
      }

      if (helgvarre !== null) {
        allaAvtal.innerHTML += extratext1 + extratext2 + extratext3 + extratext4;
      }
      //the flag is used to check if the "bransch" is new or if it is the same as in the last item
      flag = item.bransch;



    })

  }


  function replaceHorses(element) {
      element = element.replace("Hästskötare och övrig personal hos trav- och galopptränare:\r\n100 procent", "<strong>Hästskötare och övrig personal hos trav- och galopptränare:\r\n100 procent</strong>")
      console.log('bytte hästar')
  }

  //Event listener for Sök avtal efter yrke
  modebuttonLeft.addEventListener('click', function() {
    sokYrke.style.display = "block";
    allaAvtal.style.display = "none";
    modebuttonRight.classList.add('passive');
    modebuttonLeft.classList.remove('passive');
    window.scrollTo(0, 0);
  })

  //Event listener for Alla avtal
  modebuttonRight.addEventListener('click', function() {
    avtalstext(helgnr);


    //checks when DOM has finished updating
    window.requestAnimationFrame(informHeight);


    sokYrke.style.display = "none";
    allaAvtal.style.display = "block";
    modebuttonLeft.classList.add('passive');
    modebuttonRight.classList.remove('passive');
  })

  //function to blur i.e. remove focus from element
  function blur(element) {
    element.blur();
  }

  //Workaround for ios, removes focus from input field, which makes it possible to register a click outside input field. Needed to be able to click an alternative in the autocomplete suggestions list
  function removeFocus() {
      document.activeElement.blur();
    }
  document.body.addEventListener("touchstart", removeFocus);

  //set focus on input field
  document.getElementById('sokYrkeKnapp').focus();

//end of doStuff-function
}
