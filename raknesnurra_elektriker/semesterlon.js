

function printNumber() {   
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
        rorligLon = rorlig * 0.125;
    }

    console.log(rorligLon)

    semesterTillagg = Math.round(semesterLon + rorligLon)

    totalLon = Math.round(semesterLon + rorligLon + lon)
    

    console.log(semesterLon)
    console.log(rorligLon) 
    console.log(semesterTillagg)

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