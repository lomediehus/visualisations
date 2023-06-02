

function printNumber() {
    console.log("hej")
   
    let numberplace = document.getElementById("resultat");
    let lon = parseInt(document.getElementById("lon").value);
    let dagar = parseInt(document.getElementById("dagar").value);
    let rorlig = parseInt(document.getElementById("rorlig").value);

    console.log(lon)
    console.log(dagar)
    console.log(rorlig)

    let semesterLon = lon * 0.008 * dagar;

    let rorligLon = 0;
    if (rorlig > 0) {
        rorligLon = rorlig * 0.005 * dagar;
    }

    console.log(rorligLon)

    semesterTillagg = Math.round(semesterLon + rorligLon)

    totalLon = Math.round(semesterLon + rorligLon + lon)
    

    // inflationen = Math.round(inflationen * 10) / 10

    // let nylon = parseInt(number.value) * index_2021 / index_2022;
    // let skillnad = parseInt(number.value) - nylon;


    // let fiktivlon = Math.round((parseInt(number.value) * ((index_2022 - index_2021) / index_2021)));

    console.log(semesterLon)

    let output_string = "<p>Din semesterlön blir <b>" + formatKronor.to(totalLon) + "</b> vilket består av din vanliga lön på <b>" + formatKronor.to(lon) + "</b> samt semestertillägg på <b>" + formatKronor.to(semesterTillagg) + "</b>.";



    numberplace.innerHTML = output_string;

    informHeight();
}


var formatPercent = wNumb({
    decimals: 1,
    suffix: ' procent',
    mark: ","
})

var formatKronor = wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: ' kronor',
    mark: ","
})



document.getElementById("button").addEventListener("click", printNumber);

informHeight();