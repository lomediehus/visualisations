(function () {
'use strict';

var done = document.getElementById('done');
var mon = document.getElementById('monday');
var tue = document.getElementById('tuesday');
var wed = document.getElementById('wednesday');
var thu = document.getElementById('thursday');
var fri = document.getElementById('friday');
var sat = document.getElementById('saturday');
var sun = document.getElementById('sunday');
var vecka = document.getElementById('vecka');
var start = document.getElementById('start');
var content = document.getElementById('content');
// var resultparent = document.getElementById('resultparent');
var days = [mon, tue, wed, thu, fri, sat, sun];
var dygnsvila = 0;
var resultdiv;
var resulttext = '';
var resultp;
var twoDayCheck = 0;
var restCheck = 0;
var overlap = false;
var workdays = 0;
var dragid = '';





$(function () {
        $(".shift").draggable({
                snap: ".weekday",
                start: dragen,
                snapMode: "inner"
        });
});


//Funktion som utförs när man börjar dra ett element
function dragen(event, ui) {

  //hämtar html-attribut som hör till det dragna elementet
  var fore = event.target.getAttribute('before');
  var efter = event.target.getAttribute('after');
  var arbete = event.target.getAttribute('work');
  //binder värdet av det hämtade attributet till det dragna elementet
  $(this).data('fore', fore);
  $(this).data('efter', efter);
  $(this).data('work', arbete);

  //hämtar id:t från det dragna elementet så att jag kan hämta elementet i handleDropEvent-funktionen
  dragid = event.target.getAttribute('id');
}



//Det här händer med målet när man släpper något på det
$('.weekday').droppable({
  // accept:'.shift'
  drop: handleDropEvent
    });

function handleDropEvent(event, ui) {

  //Sparar data som är bunden till det dragna elementet i variabler
  var foredata = ui.draggable.data('fore');
  var efterdata = ui.draggable.data('efter');
  var workdata = ui.draggable.data('work');

  //Sätter nya html-attribut med värden sparade i variabler
  event.target.setAttribute("before", +foredata);
  event.target.setAttribute("after", +efterdata);
  event.target.setAttribute("work", workdata);


  //skapar variabel som hämtar element med id:t som sparats i draggable-funktionen
  var slappt = document.getElementById(dragid);

  //sparar position för aktuell droppable i variabler
  var left = event.target.offsetLeft;
  var top = event.target.offsetTop;

  //Sätter det släppta elementets top och left-position (vet inte varför jag måste dra av 5px för att det ska bli rätt)
  slappt.style.left = (left-5)  + 'px';
  slappt.style.top = top + 'px';
  slappt.style.position = "absolute";

  //Gör att man inte kan dra elementet en gång till
  ui.draggable.draggable( 'disable');
}

//Event till Färdig-knappen
done.addEventListener("click", function() {
  weektotal();

})


function weektotal() {
  var sum = 0;
  createResultdiv();



  //summerar den sammanlagda lediga tiden i en arbetsvecka
  for (var i = 0; i < days.length; i++) {
    sum += +(days[i].getAttribute('before'));
    sum += +(days[i].getAttribute('after'));
  }

  //Kollar först att man lagt in alla pass, om man har det är summan över 7950
  if (sum > 7950) {
    resulttext += 'Du har inte lagt in alla pass i schemat';
  }

  //Stora else-satsen där alla övriga villkor kollas och resultattexten byggs upp
  else {

    for (var j = 0; j < days.length-1; j++) {
      dygnsvila = 0;
      dygnsvila += +(days[j].getAttribute('after'));
      dygnsvila += +(days[j+1].getAttribute('before'));

      //Om dygnsvilan är under noll sätts overlap till true, händer bara om ett nattpass direkt följs av ett dagpass.
      if (dygnsvila < 0) {
        overlap = true;
      }

      //Om två dagar utan arbete följer på varandra ökas variablen towDayCheck med 1.
      else if ((days[j+1].getAttribute('work') === 'no') && (days[j].getAttribute('work') === 'no')) {
        twoDayCheck += 1;
      }

      else if ((days[j+1].getAttribute('work') != 'no') && (days[j].getAttribute('work') != 'no')) {
        resulttext += '<p>Dygnsvila ' + days[j].getAttribute('name') + '-' + days[j+1].getAttribute('name') + ': ' + timeConvert(dygnsvila) + '</p>';
        //Om dygnsvilan är för liten sätts variabeln restCheck till 1
        if (dygnsvila < 660) {
          restCheck = 1;
        }
      }
    }

    //Om fyra dagar i rad är arbetsdagar ökas variabeln workdays med 1
    for (var j = 0; j < days.length-3; j++) {
      if ((days[j].getAttribute('work') === "yes") && (days[j+1].getAttribute('work') === "yes") && (days[j+2].getAttribute('work') === "yes") && (days[j+3].getAttribute('work') === "yes")) {
        workdays += 1;
          console.log('arbete i rad ' + workdays);
      }
    }



    if (overlap === true) {
      resulttext = "Du kan inte ha ett dagpass direkt efter ett nattpass, de överlappar varandra."
    }


    //Om dygnsvilan aldrig är för liten är restCheck 0
    else if (restCheck === 0) {
        resulttext += "Dygnsvila över 11 timmar anses ge möjlighet till tillräcklig återhämtning.<br>"
        if (twoDayCheck === 0) {
          resulttext += '<br>Det är generellt bättre att någon gång under veckan ha två dagars sammanhängande ledighet.';
        }
        else {
          resulttext += '<br>Det är bra att det finns minst två dagars sammanhängande ledighet.';
          if (workdays === 1) {
            resulttext += ' Men fyra pass i rad kan vara slitsamt när man jobbar skift.'
          }
        }
      }

    //Om dygnsvilan någon gång är för liten är restCheck inte o
    else if (restCheck != 0) {
      resulttext += "Om dygnsvilan är under 11 timmar är det svårt att hinna få så mycket sömn som man behöver.<br>"
        if (twoDayCheck === 0) {
          resulttext += 'Det är generellt bättre att någon gång under veckan ha två dagars sammanhängande ledighet.';
        }
        else {
          resulttext += 'Det är bra att det finns minst två dagars sammanhängande ledighet.';
          if (workdays === 1) {
            resulttext += ' Men fyra pass i rad kan vara slitsamt när man jobbar skift.'
          }
          console.log(workdays);

        }
      }



  }

  //Fyller resultdiv med rubrik + resultattekt
  resultdiv.innerHTML = '<h3>Kommentar om ditt schema</h3>' + resulttext;

  //Create and appen button Börja om
  var igenknapp = document.createElement('button');
  igenknapp.classList.add("Button");
  igenknapp.style.display = "block";
  var t = document.createTextNode("Börja om!");
  igenknapp.appendChild(t);
  resultdiv.appendChild(igenknapp);


  enGangTill(igenknapp);
}

function enGangTill(knapp) {
  knapp.addEventListener('click', function() {
     window.location.href = window.location.href;
  })
}




function createResultdiv() {
  done.style.display = "none";
  resultdiv = document.createElement("DIV");
  resultdiv.setAttribute("id", "result");
  content.appendChild(resultdiv);
  resultdiv.style.top = (vecka.offsetHeight + start.offsetHeight + 20) + 'px';
}

//konverterar minuter till timmar och minuter, funkar inte med negativa tal
function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + 'h' + rminutes + "min.";
  }





})();
