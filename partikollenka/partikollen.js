(function () {
'use strict';


var nastafraga = document.getElementById('nastafraga');
var fragediv = document.getElementById('fragediv');
var inledning = document.getElementById('inledning');
var radiobuttons = fragediv.getElementsByTagName('input');
var fragep = document.getElementById('fragep');
var fragerubrik = document.getElementById('fragerubrik');
var alt1 = document.getElementById('alt1');
var alt2 = document.getElementById('alt2');
var alt3 = document.getElementById('alt3');
var alt1label = document.getElementById('alt1label');
var alt2label = document.getElementById('alt2label');
var alt3label = document.getElementById('alt3label');
var qc = 0;
var vetej = 0;
var s=0, v=0, c=0, l=0, mp=0, sd=0, m=0, kd=0;
var finished;
var progressbar = document.getElementsByClassName('progress');
var progress = false;
var alertboxbutton = document.getElementById("alertboxbutton");
var fullsvarwrapper;





var partypoints = {
  moderaterna: 0,
  liberalerna: 0,
  centerpartiet: 0,
  kristdemokraterna: 0,
  socialdemokraterna: 0,
  vänsterpartiet: 0,
  miljöpartiet: 0,
  sverigedemokraterna: 0
}


function close() {
  document.getElementById('closex').addEventListener("click", function() {
    fullsvarwrapper.style.visibility = "hidden";
    fullsvar.innerHTML = '';
  });

}


function makeDivs() {
  var div;
  var textnode;
  for (var i = 0; i < fragor.length; i++) {
    div = document.createElement('DIV');
    div.className = 'kortfraga';
    // textnode = document.createTextNode(fragor[i].kortfraga);
    // div.appendChild(textnode);
    inledning.appendChild(div);
    div.innerHTML = fragor[i].kortfraga;
    // textnode = fragor[]
    klickDivs(div, fragor, i);
  }
  informHeight();

};

function klickDivs(element, array, index) {
  element.addEventListener("click", function() {
      fullsvarwrapper.style.visibility = "visible";

      var string = '';
      for (var property in array[index].fullsvar) {
        string += '<p class=\"collapsed\"><span class=\"partinamn\"">' + property + ':</span> ' + array[index].fullsvar[property] + '</p>';
        }
      document.getElementById('fullsvar').innerHTML += '<p class="smalltopmargin">Klicka för att se hela svaret.'+ string;
      // document.getElementById('fullsvar').innerHTML += '<h3>' + array[index].fraga + '</h3>' +'<p>Klicka för att se hela svaret.'+ string;
      klickParagraphs();
  })
}

function klickParagraphs() {
  var p = document.getElementsByClassName('collapsed');
  for (var i=0; i<p.length; i++) {
    p[i].addEventListener('click', function() {
      var pexpanded = document.getElementsByClassName('expanded');
      for (var i=0; i<pexpanded.length; i++) {
        pexpanded[i].classList.add('collapsed');
        pexpanded[i].classList.remove('expanded');
      }
      this.classList.remove('collapsed');
      this.classList.add('expanded');
    })
  }
}



function fillQuestion(nr) {
    fragerubrik.innerHTML = nr.fragerubrik;
    $('#fragerubrik').hide().fadeIn();
    fragep.innerHTML = nr.fraga;
    $('#fragep').hide().fadeIn();
    alt1label.innerHTML = nr.alt1.svar.toUpperCase();
    alt2label.innerHTML = nr.alt2.svar.toUpperCase();
    alt3label.innerHTML = nr.alt3.svar.toUpperCase();
    forklaringp.innerHTML = nr.forklaring;
    $('#bakgrund').hide().fadeIn();
    $('#forklaringp').hide().fadeIn();
}

// Making sure all radiobuttons start unchecked
function uncheck() {
    for (var i = 0; i < radiobuttons.length; i++) {
      radiobuttons[i].checked = false;
  }
}

function styleProgressBar() {
  if (qc >  0 && qc < 12) {
    progressbar[qc-1].style.background = "#007D8C";
    if (qc < 11) {
      progressbar[qc].style.color = "black";
      }
  }
}


function showAlert() {
  document.getElementById("alertboxwrapper").style.display = "block";
}

function createFullsvarwrapper() {
  fullsvarwrapper = document.createElement('DIV');
  fullsvarwrapper.setAttribute('id', 'fullsvarwrapper');
  if (document.contains(document.getElementById("fullsvarwrapper"))) {
    document.getElementById("fullsvarwrapper").remove();
  }
  inledning.appendChild(fullsvarwrapper);
  fullsvarwrapper.innerHTML += '<div class="close"><img src="closex.png" onerror=this.src="closex.png" id="closex" class="closex"></div><div id="fullsvar"></div>';
}

uncheck();

alertboxbutton.addEventListener("click", function() {
  alertboxwrapper.style.display = "none";
})


//Event listener for Nästa fråga-knappen
nastafraga.addEventListener("click", function() {
  //make the progressbar visible. Executed only first round.
  if (progress === false) {
    for (var i = 0; i < progressbar.length; i++) {
      progressbar[i].style.display = "inline-block";
    }
    progress = true;
    progressbar[0].style.color = "black";
  }

  if (finished === true) {
    if ((qc !== 0) && (radiobuttons[0].checked === false) && (radiobuttons[1].checked === false) && (radiobuttons[2].checked === false)) {
      showAlert();
    }
      else if (nastafraga.innerHTML === "Visa partiernas fullständiga svar") {
      inledning.innerHTML = '<h2>Klicka på rutorna för att se svaren</h2>';
      createFullsvarwrapper();
      makeDivs();
      close();
      nastafraga.style.display = "none";
    }
    else {
    evaluate(fragor[qc]);
    inledning.style.display = "inline-block";
    inledning.innerHTML = '';
    styleProgressBar();

    if (vetej < 9) {
      var string1 = "<p>Dina svar stämmer bäst överens med följande parti/partier:</p>";
      //loop the object "partypoints". List the party name if the value of the party equals the max value
      for (var i in partypoints) {
        if (partypoints[i] === Math.max(s,v,mp,c,l,m,sd,kd)) {
          string1 = string1 + '<p class="parti">' + i + "</p>";
          }
      }
    }
    else {
      string1 = "<p>Du har svarat \"VET EJ\" på minst nio av frågorna. Resultatet blir då mycket osäkert och visas därför inte. Ladda om sidan om du vill göra om testet, eller klicka på knappen för att se vad partierna har svarat."
    }

    inledning.innerHTML = string1;
    fragediv.style.display = "none";
    nastafraga.innerHTML = "Visa partiernas fullständiga svar";
  }
  }
  else {
    //check if all the buttons are unchecked
    if ((qc !== 0) && (radiobuttons[0].checked === false) && (radiobuttons[1].checked === false) && (radiobuttons[2].checked === false)) {
      showAlert();
    }
    else {
      styleProgressBar();
      //to ask the first question
      if (qc === 0) {
        fillQuestion(fragor[qc]);
        inledning.style.display = 'none';
        fragediv.style.display = "inline";
        nastafraga.innerHTML = "Nästa fråga";
        uncheck();
      }
      //if all but one questions have been asked
      else if (qc === fragor.length-1){
        nastafraga.innerHTML = "Se resultatet";
        evaluate(fragor[qc-1]);
        uncheck();
        finished = true;
        fillQuestion(fragor[qc]);
      }
      //the rest of the questions, all that don't have special conditions
      else {
        evaluate(fragor[qc-1]);
        uncheck();
        fillQuestion(fragor[qc]);
      }
      if (qc <= fragor.length) {
        qc++;
      }
    }
}


});

//Getting the value of the checked radiobutton
function getvalue() {
  for (var i = 0; i < radiobuttons.length; i++) {
    if (radiobuttons[i].checked === true){
      return radiobuttons[i].value;
      }
  }
}


//checking answer, passing question object as parameter
function evaluate(fraga) {
  if (qc < fragor.length) {

    //checking which alternative is chosen
    if (getvalue() === "alt1") {
      fraga.alt1.vald = true;
      pointsToParty(fraga.alt1.partier);
      }
    else if (getvalue() === "alt2") {
        fraga.alt2.vald = true;
        pointsToParty(fraga.alt2.partier);
        }
    else if (getvalue() === "alt3") {
      vetej++;
      fraga.alt3.vald = true;
      pointsToParty(fraga.alt3.partier);
      }
  }

  }


//Adding points to the parties. Argument of parameter will be a list of parties supporting the chosen alternative.
function pointsToParty(alternativ) {
  for (var i=0; i<alternativ.length; i++) {
    //checking which partie(s) match the chosen answer, incrementing if match found
    switch (alternativ[i]) {
      case "s":
      s++;
      partypoints.socialdemokraterna ++;
        break;
      case "v":
      v++;
      partypoints.vänsterpartiet++;
        break;
      case "mp":
      mp++;
      partypoints.miljöpartiet ++;
        break;
      case "c":
      c++;
      partypoints.centerpartiet ++;
        break;
      case "l":
      l++;
      partypoints.liberalerna ++;
        break;
      case "m":
      m++;
      partypoints.moderaterna ++;
        break;
      case "kd":
      kd++;
      partypoints.kristdemokraterna ++;
        break;
      case "sd":
      sd++;
      partypoints.sverigedemokraterna ++;
        break;
    }
  }
}

document.getElementById('merinfo').addEventListener('click', function() {
  createFullsvarwrapper();
  fullsvarwrapper.style.visibility = "visible";

  var merinfotext = "<p>Partikollen baseras på en enkät från LO Mediehus till riksdagspartierna.</p>"
  + "<p>I vissa fall har partierna själva svarat ”ja” eller ”nej”, i övriga fall har vi efter analys av svaren hänfört dem till kategorierna ”ja”, ”nej” respektive ”vet ej”.</p>"
  + "<p>När användaren besvarar frågorna ges för varje svar ett poäng till det parti vars svar stämmer överens med de egna svaren. När användaren besvarat alla frågor får hen se det parti/de partier som fått flest poäng.</p>"
  + '<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/fragor15.js"> Hela datafilen finns att se här:</a>';

  // document.getElementById('fullsvar').innerHTML += merinfotext;
  fullsvar.innerHTML += merinfotext;
  close();

})



})();
