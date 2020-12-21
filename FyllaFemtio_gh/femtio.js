//for storing the value in the first input field
var inpValue = '';

//variable for dynamically choosing the right property from the objects in the file "avtalen.js"
var helgtext = "avtalstext1";


//will change to true on a search hit
var hittad = false;
//for storing value in input field
var siffra;
//for storing result of calculation
var mathResult;

//storing value to use in headline
var valtYrke;

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



// //Setting initial position of the div mainContent
// mainContent.style.marginTop = helgwrapper[0].clientHeight + 20 + 'px';
//
// //Changing the position of mainContent if user resizes window
// window.onresize = function() {
//   mainContent.style.marginTop = helgwrapper[0].clientHeight + 20 + 'px';
// }



// //Variable for current date
// var date = new Date();
// //variables for set dates
// var nyarsdatum = new Date("December 27 2018");
// var trettonhelgsdatum = new Date("January 2 2019");
// var paskdatum = new Date("April 1 2019");
// var pingstdatum = new Date("April 22 2019");
// var midsommardatum = new Date("June 11 2019");
//
//
// //handling dates:
// //Check if current date is after easter;
// if (date.getTime() > paskdatum.getTime()) {
//
//   //if current date is also after pingst
//   if (date.getTime() > midsommardatum.getTime()) {
//     document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/midsommar.svg';
//     goActive(helgknapp6);
//     helgtext = "avtalstext6";
//   }
//
//   //if current date is after easter but not after pingst
//   else if (date.getTime() > pingstdatum.getTime()) {
//     document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/pingst.svg';
//     goActive(helgknapp5);
//     helgtext = "avtalstext5";
//   }
//
// }



//clicks for helgknapps
// helgknapp1.addEventListener('click', function(){
//   helgtext = "avtalstext1";
//   helgknapp(this);
//   document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/jul.svg';
// });
//
// helgknapp2.addEventListener('click', function(){
//   helgtext = "avtalstext2";
//   helgknapp(this);
//    document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/nyar.svg';
// });
//
// helgknapp3.addEventListener('click', function(){
//   helgtext = "avtalstext3";
//   helgknapp(this);
//   document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/trettonhelg.svg';
// });
//
// helgknapp4.addEventListener('click', function(){
//   helgtext = "avtalstext4"
//   helgknapp(this);
//   document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/pask.svg';
// });
//
// helgknapp5.addEventListener('click', function(){
//   helgtext = "avtalstext5";
//   helgknapp(this);
//   document.getElementById("helgbild").src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/pingst.svg';
// });
//
// helgknapp6.addEventListener('click', function(){
//   helgtext = "avtalstext6";
//   helgknapp(this);
//   document.getElementById("helgbild").src = 'bilder/midsommar.svg';
// });



//function for actions of the helgknapps
function helgknapp(clicked) {
  goActive(clicked);
  if (inpValue != '') {
    valueToDiv();
  }

  if (hasClass(modebuttonRight, 'passive')) {
  }
  else {
    avtalstext(helgtext);
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
// var yrken = ["administratör", "aktiveringsassistent", "aktiveringspedagog", "aktivitetsledare", "ambulanssjukvårdare", "anläggningsarbetare", "arbetshandledare", "arbetsledare", "assistent/församlingsarbete", "avbytare", "badmästare", "badpersonal", "banarbetare", "barnskötare", "barnsköterska", "barntimmeledare", "behandlingsassistent", "biträden", "boendeassistent", "boendehandledare", "boendestödjare", "brandman", "bussförare", "butikspersonal", "chaufför", "diakoniassistent", "djurskötare", "driftsledare", "ekonomibiträde", "elevassistent", "fastighetsskötare", "fordonsförare", "fotvårdare", "fritidsledare", "fältarbetare", "fönsterputsare", "förrådsarbetare", "församlingshemsvärd", "garagepersonal", "habiliteringsassistent", "habiliteringsbiträde", "habiliteringspedagog", "habiliteringspersonal", "handledare", "husmor", "hästskötare", "instruktör", "internlärare", "kock", "kock/kokerska", "kokerska", "kontorsvaktmästare", "kundtjänstmedarbetare", "kyrkogårdsarbetare", "kyrkogårdsföreståndare", "kyrkvaktmästare", "köksbiträde", "kökspersonal", "laboratoriebiträde", "lagerarbetare", "lantarbetare", "ledsagare", "logopedassistent", "lokalvårdare", "maskinförare", "maskinskötare", "medlevare", "mekaniker", "montör", "motorfordonsmekaniker", "måltidspersonal", "obduktionstekniker", "omsorgsassistent", "park- och trädgårdsarbetare", "personlig assistent", "receptionist", "renhållningsarbetare", "reparatör", "ridlärare", "serveringsbiträde", "servicevärd", "sjukgymnastassistent", "skötare", "socialpedagog", "spårvagnsförare", "städare", "stödassistent", "stödbiträde", "stödpedagog", "stödpersonal", "teamledare", "traktorförare", "tvätteribiträde", "tvätterimedarbetare", "tvättmaskinskötare", "undersköterska", "ungdomsassistent", "ungdomsledare", "vaktmästare", "verkstadspersonal", "vård- och omsorgspersonal", "vårdare", "vårdbiträde"];

//complete list of yrken
var yrken = ["administratör", "aktiveringsassistent", "aktiveringspedagog", "aktivitetsledare", "ambulanssjukvårdare", "anläggningsarbetare", "arbetshandledare", "arbetsledare", "assistent/församlingsarbete", "avbytare", "badmästare", "badpersonal", "barnskötare", "barnsköterska", "barntimmeledare", "behandlingsassistent", "biträden", "boendeassistent", "boendehandledare", "boendestödjare", "brandman", "bussförare", "chaufför", "diakoniassistent", "djurskötare", "driftsledare", "ekonomibiträde", "elevassistent", "fastighetsskötare", "fordonsförare", "fotvårdare", "fritidsledare", "fönsterputsare", "förrådsarbetare", "församlingshemsvärd", "garagepersonal", "habiliteringsassistent", "habiliteringsbiträde", "habiliteringspedagog", "habiliteringspersonal", "handledare", "husmor", "instruktör", "internlärare", "kock", "kock/kokerska", "kokerska", "kontorsvaktmästare", "kundtjänstmedarbetare", "kyrkogårdsarbetare", "kyrkogårdsföreståndare", "kyrkvaktmästare", "köksbiträde", "kökspersonal", "laboratoriebiträde", "lagerarbetare", "lantarbetare", "ledsagare", "logopedassistent", "lokalvårdare", "maskinförare", "maskinskötare", "medlevare", "mekaniker", "montör", "motorfordonsmekaniker", "måltidspersonal", "obduktionstekniker", "omsorgsassistent", "park- och trädgårdsarbetare", "personlig assistent", "receptionist", "renhållningsarbetare", "reparatör",  "serveringsbiträde", "servicevärd", "sjukgymnastassistent", "skötare", "socialpedagog", "spårvagnsförare", "städare", "stödassistent", "stödbiträde", "stödpedagog", "stödpersonal", "teamledare", "traktorförare", "tvätteribiträde", "tvätterimedarbetare", "tvättmaskinskötare", "undersköterska", "ungdomsassistent", "ungdomsledare", "vaktmästare", "verkstadspersonal", "vård- och omsorgspersonal", "vårdare", "vårdbiträde"];

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
  matchaYrke(inpValue, helgtext);
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
}


//kollar om det sökta yrket finns med i avtalsobjektten och lägger i så fall till yrket i listan 'message'
function matchaYrke(yrke, text) {
  hittad = false;
  var message = [];
  for (var i = 0; i < avtalen.length; i++) {
    for (var j = 0; j < avtalen[i].yrke.length; j++) {
      // if (avtalen[i].yrke[j] === yrke) {

      //använder "startsWith" för att användare ska få träff även om de skriver in ett mellanslag efter yrkestiteln
      if (yrke.startsWith(avtalen[i].yrke[j])) {
        hittad = true;
        valtYrke = avtalen[i].yrke[j];
        message.push(avtalen[i].avtalsrubrik + avtalen[i][text]);
      }
    }
  }
  var string = message.join('');
  if (hittad === true) {
    string += '<h3 class="u-textMetaDeca paddingTop10">Finns inte ditt avtal?</h3><p>Finns ditt yrke i listan men ditt avtal kommer inte upp? Mejla oss din yrkestitel och vilket avtal du tillhör så kollar vi på det.</p><a class="homestyled u-textMeta u-textStrong" target="_parent" href="mailto:elin.steen@ka.se?Subject=Saknat%20avtal">Skicka mejl</a>';
  }

  messagediv.innerHTML = string;
  $('#messagediv').hide().fadeIn();
}


// adding event listener on dynamically added html'
// this one for writing the input field
document.addEventListener('input', function (e) {
    if (hasClass(e.target, 'pengar')) {
    }
}, false);


//event to give variable 'siffra' the correct number for use in the click function on submit button 'räkna ut'. Has to be "keyup" to include last digit
document.addEventListener('keyup', function (e) {
    if (hasClass(e.target, 'pengar')) {
      siffra = e.target.value;
    }
}, false);

//event for the submit button 'räkna ut'
document.addEventListener('click', function (e) {
  //because 'contButton' is added dynamically you cannot give it a click function from start. This if-statment fires whenever you click anything, but no action unless target has a certain class.
  if (hasClass(e.target, 'countButton')) {
      checkInput(siffra);
  }
}, false);

//function used in event listeners for dynamically added stuff
function hasClass(elem, className) {
    return elem.classList.contains(className);
}

// //check if input is number
// function checkInput(input) {
//   if (!isNaN(input)) {
//     siffra = parseInt(input);
//     if (siffra >= 20488) {
//       siffra = 20488;
//     }
//     //if input is number, divide it. The function dividedToDiv is invoked from within the divideSalary function.
//     divideSalary(200);
//   }
//   else if (isNaN(input)) {
//     //if input is not a number, skip division and move directly to the function dividedToDiv. Will give error message.
//     dividedToDiv(input);
//   }
// }


// //dividing the number from input field
// function divideSalary(divisor) {
//   mathResult = siffra/divisor;
//   var stringResult = mathResult.toFixed(2);
//   dividedToDiv(stringResult);
// }
//
// //Appending a textnode with the calculated result in a div, also checking if its a number
// function dividedToDiv(nodecontent) {
//   if (document.getElementById('dividedResult')) {
//     var dividedResult = document.getElementById('dividedResult');
//     dividedResult.parentNode.removeChild(dividedResult);
//   }
//   var node  = document.createElement('DIV');
//   var textnode;
//   if (isNaN(nodecontent)) {
//     textnode = document.createTextNode('Nåt blev fel, prova att skriva din lön igen.');
//   }
//   else {
//     textnode = document.createTextNode('Ditt ob-tillägg blir ' + nodecontent + ' kronor i timmen.');
//   }
//   node.setAttribute("id", "dividedResult");
//   document.getElementById('dividedResultParent').appendChild(node);
//   node.appendChild(textnode);
// }

//fill the div allaAvtalWrapper with all the text from file 'avtalen.js'
function avtalstext(text){
  var avtalstexter = [];
  for (var i = 0; i < avtalen.length; i++) {
      if (avtalen[i].avtalsoverskrift != '') {
        avtalstexter.push(avtalen[i].avtalsoverskrift);
      }
      avtalstexter.push(avtalen[i].avtalsrubrik + avtalen[i][text]);
    }
  var avtalstexterString = avtalstexter.join("");
  $('#allaAvtalWrapper').hide().fadeIn();

  allaAvtal.innerHTML = avtalstexterString;
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
  avtalstext(helgtext);
  sokYrke.style.display = "none";
  allaAvtal.style.display = "block";
  modebuttonLeft.classList.add('passive');
  modebuttonRight.classList.remove('passive');
})


//function to blur i.e. remove focus from element
function blur(element) {
  element.blur();
}

//Workaround for ios, removes focus from input field, which makes it possible to register a click outside input field. Needed to be ablev to click an alternative in the autocomplete suggestions list
function removeFocus() {
    document.activeElement.blur();
  }
document.body.addEventListener("touchstart", removeFocus);


//set focus on input field
document.getElementById('sokYrkeKnapp').focus();
