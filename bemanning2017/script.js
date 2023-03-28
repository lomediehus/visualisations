(function () {
'use strict';


var bbutton = document.getElementsByClassName('antal');
var tvadiv = document.getElementById("tvadiv");
var div;
var id;
var tbl, rad, cell1, cell2;
var searchresult = document.getElementById('searchresult');
var headline = 0;
  var bdata = [
  {
    "Grupp": "fem",
    "Kommun": "Karlsborg",
    "Personal": "0,21",
    "Boende": "4,76",
    "Rubrik": "Över 4,5"
  },
  {
    "Grupp": "fem",
    "Kommun": "Västerås",
    "Personal": "0,22",
    "Boende": "4,55",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Berg",
    "Personal": "0,23",
    "Boende": "4,35",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Vara",
    "Personal": "0,23",
    "Boende": "4,35",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Oxelösund",
    "Personal": "0,24",
    "Boende": "4,17",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Arvika",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Bollebygd",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Dals-Ed",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Grästorp",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Karlstad",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Katrineholm",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Kristinehamn",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Lilla Edet",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Söderköping",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Vallentuna",
    "Personal": "0,25",
    "Boende": "4,00",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Boxholm",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Forshaga",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Färgelanda",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Gnesta",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Göteborg",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Nykvarn",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Nyköping",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Sollentuna",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Strängnäs",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Söderhamn",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Töreboda",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Upplands-Bro",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Vaggeryd",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Årjäng",
    "Personal": "0,26",
    "Boende": "3,85",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Ale",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Arboga",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Eslöv",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Herrljunga",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Härryda",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Hörby",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Krokom",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Lidingö",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Ljungby",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Markaryd",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Munkfors",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Mölndal",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Nybro",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Smedjebacken",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Tyresö",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Täby",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Östersund",
    "Personal": "0,27",
    "Boende": "3,70",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Arvidsjaur",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Eskilstuna",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Essunga",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Fagersta",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Helsingborg",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Huddinge",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Hylte",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Kinda",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Kungälv",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Lidköping",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Mönsterås",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Norrköping",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Norrtälje",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Salem",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Sundbyberg",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Säffle",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Säter",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Varberg",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Vingåker",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Ystad",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Älmhult",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Örebro",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Österåker",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "fyra",
    "Kommun": "Östhammar",
    "Personal": "0,28",
    "Boende": "3,57",
    "Rubrik": "3,5 - 4,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Avesta",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Botkyrka",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Båstad",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Emmaboda",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Falkenberg",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Falun",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Gagnef",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hagfors",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Höganäs",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kalmar",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Klippan",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kungsbacka",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ljusdal",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Nacka",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ockelbo",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ragunda",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sjöbo",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Skara",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Skövde",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Solna",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sotenäs",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Storuman",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sunne",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Södertälje",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Torsby",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Uppsala",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Åre",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ängelholm",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Örkelljunga",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Överkalix",
    "Personal": "0,29",
    "Boende": "3,45",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Bjuv",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Danderyd",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Eda",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ekerö",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Falköping",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Filipstad",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Finspång",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Grums",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Halmstad",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Haninge",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Haparanda",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hultsfred",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Härnösand",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Järfälla",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Knivsta",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Laholm",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Lysekil",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Mariestad",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Norberg",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sigtuna",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Stockholm",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Strömstad",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sundsvall",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tidaholm",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tomelilla",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Trollhättan",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Umeå",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Upplands Väsby",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vaxholm",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vindeln",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vännäs",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ånge",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Åtvidaberg",
    "Personal": "0,30",
    "Boende": "3,33",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Alla kommuner (ovägt medel)",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Bengtsfors",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Bromölla",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Eksjö",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Enköping",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hällefors",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Jönköping",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kalix",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Landskrona",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Laxå",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Lindesberg",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Linköping",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Luleå",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Mjölby",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Motala",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Munkedal",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Partille",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sala",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sandviken",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Stenungsund",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Storfors",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tanum",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Timrå",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tingsryd",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Uddevalla",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Växjö",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Östra Göinge",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Övertorneå",
    "Personal": "0,31",
    "Boende": "3,23",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Alingsås",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Alvesta",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Bollnäs",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Borås",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Bräcke",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Gotland",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Gullspång",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hallstahammar",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hjo",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Höör",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kramfors",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Lekeberg",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Leksand",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Lerum",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Mark",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Olofström",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Orust",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Osby",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Robertsfors",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Rättvik",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Skellefteå",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Staffanstorp",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Surahammar",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sölvesborg",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tierp",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Trelleborg",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vansbro",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vetlanda",
    "Personal": "0,32",
    "Boende": "3,13",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Askersund",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Gnosjö",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Götene",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hallsberg",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Heby",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hedemora",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hofors",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Härjedalen",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hässleholm",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Högsby",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kiruna",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kristianstad",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kumla",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kävlinge",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Köping",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sollefteå",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Strömsund",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Svedala",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Svenljunga",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Sävsjö",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vänersborg",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Värnamo",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Västervik",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Åstorp",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Älvkarleby",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Älvsbyn",
    "Personal": "0,33",
    "Boende": "3,03",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Borgholm",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Hudiksvall",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Håbo",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Jokkmokk",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Lund",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Malmö",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Nordanstig",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Nordmaling",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Nässjö",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Pajala",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Piteå",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ronneby",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Simrishamn",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tjörn",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ulricehamn",
    "Personal": "0,34",
    "Boende": "2,94",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Bjurholm",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Boden",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Gislaved",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Mellerud",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Mullsjö",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Nora",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Skurup",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tranås",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Trosa",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vellinge",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Älvdalen",
    "Personal": "0,35",
    "Boende": "2,86",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Arjeplog",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Gällivare",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Karlshamn",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Kil",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ovanåker",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tibro",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Tranemo",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Åmål",
    "Personal": "0,36",
    "Boende": "2,78",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Degerfors",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Flen",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Habo",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ljusnarsberg",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Lycksele",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Malung-Sälen",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Svalöv",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vimmerby",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Ödeshög",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Örnsköldsvik",
    "Personal": "0,37",
    "Boende": "2,70",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Mora",
    "Personal": "0,38",
    "Boende": "2,63",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Torsås",
    "Personal": "0,38",
    "Boende": "2,63",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Vilhelmina",
    "Personal": "0,38",
    "Boende": "2,63",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tre",
    "Kommun": "Perstorp",
    "Personal": "0,39",
    "Boende": "2,56",
    "Rubrik": "2,5 - 3,5"
  },
  {
    "Grupp": "tva",
    "Kommun": "Malå",
    "Personal": "0,43",
    "Boende": "2,33",
    "Rubrik": "1,5 - 2,5"
  },
  {
    "Grupp": "tva",
    "Kommun": "Skinnskatteberg",
    "Personal": "0,44",
    "Boende": "2,27",
    "Rubrik": "1,5 - 2,5"
  },
  {
    "Grupp": "tva",
    "Kommun": "Hammarö",
    "Personal": "0,47",
    "Boende": "2,13",
    "Rubrik": "1,5 - 2,5"
  },
  {
    "Grupp": "tva",
    "Kommun": "Ydre",
    "Personal": "0,58",
    "Boende": "1,72",
    "Rubrik": "1,5 - 2,5"
  },
  {
    "Grupp": "saknas",
    "Kommun": "Aneby",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Borlänge",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Burlöv",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Dorotea",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Gävle",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Karlskoga",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Karlskrona",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Kungsör",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Lessebo",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Lomma",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Ludvika",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Mörbylånga",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Nynäshamn",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Orsa",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Oskarshamn",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Sorsele",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Uppvidinge",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Vårgårda",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Åsele",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  },
  {
    "Grupp": "saknas",
    "Kommun": "Öckerö",
    "Personal": "",
    "Boende": "uppgift saknas",
    "Rubrik": ""
  }
]
;
  

 


//handling input in search field
$("input").on("keydown",function search(e) {
    //key 13 is "enter"
    if(e.keyCode == 13) {
      var sokt = $(this).val();
      //empty the div before presenting the new result
      searchresult.innerHTML = '';
      //traversing the data object to find a match
      bdata.forEach(function(row) {
        //find i match, in lowercase
        if (row.Kommun.toLowerCase() === sokt.toLowerCase()){
          //creating the table
          tbl = document.createElement('table');
          // tbl.className = "u-textMeta";
          maketable(row);
          //appending the table
          searchresult.appendChild(tbl);
        }
      })
    }
});



//function that adds click events to buttons
addclick();



function dostuffwithdata(data) {
  data.forEach(function(row) {
    if (row.Grupp === id){
      //adding a headline on first run only
      if (headline === 0) {
        var rubrik = document.createElement("TH");
        rubrik.className = "u-textMeta";
        rubrik.innerHTML = row.Rubrik + " boende per personal";
        rubrik.setAttribute("colspan", "2");
        rad = tbl.insertRow();
        rad.appendChild(rubrik);
        headline++;

      }
      maketable(row);
      }
    }
  )}


function addclick() {
  //traversing the collection of buttons with classname "antal"
  for (var i=0; i<bbutton.length; i++) {

    bbutton[i].addEventListener("click", function() {
      id = this.id;
      //getting the next DOM element, which is the div where the result will be presented
      div = document.getElementById(this.id).nextElementSibling;
      //emptying the div
      div.innerHTML = '';
      //if the div is not visible, make it visible and fill it whith result
      if (div.style.display != "block") {
        div.style.display = "block";
        $(this).find('span').text(String.fromCharCode(9660));
        tbl = document.createElement('table');
        div.appendChild(tbl);
        dostuffwithdata(bdata);

      }
      //if the div is visible, make it invisible
      else {
        div.style.display = "none";
        div.innerHTML = '';
        $(this).find('span').text(String.fromCharCode(9658));
        headline = 0;
      }

    })
  }
}

//making the table and filling the cells with data
function maketable(row) {
  rad = tbl.insertRow();
  rad.className= "u-textMeta";
  cell1 = rad.insertCell(0);
  cell2 = rad.insertCell(1);
  cell1.innerHTML = row.Kommun;
  cell2.innerHTML = row.Boende;
  informHeight();
}

})();
