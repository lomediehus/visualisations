

function printNumber() {
    console.log("hej")
   

    let number = document.getElementById("formvalue");
    let numberplace = document.getElementById("resultat");
    

    let index_2022 = 230.01;
    let index_2023 = 251.49;
    let månad = "januari";
    let år = "2022";

    let url = "https://www.scb.se/hitta-statistik/statistik-efter-amne/priser-och-konsumtion/konsumentprisindex/konsumentprisindex-kpi/pong/tabell-och-diagram/konsumentprisindex-med-fast-ranta-kpif-och-kpif-xe/kpif-index-1987100/"

    let inflationen = ((index_2022 - index_2022) / index_2023) * 100;

    inflationen = Math.round(inflationen * 10) / 10

    let nylon = parseInt(number.value) * index_2022 / index_2023;
    let skillnad = parseInt(number.value) - nylon;


    let fiktivlon = Math.round((parseInt(number.value) * ((index_2023 - index_2022) / index_2022)));

    console.log(fiktivlon)

    console.log(number.value)
    let output_string = "<p>Prisökningarna, eller inflationen, var i " + månad + " <b>" + formatPercent.to(inflationen) + "</b>.</p> <p>Din lön på <b>" + formatKronor.to(parseInt(number.value)) + "</b> har minskat i värde med <b>" + formatKronor.to(Math.round(skillnad)) + "</b> kronor på ett år och är i dag värd <b>" + formatKronor.to(Math.round(nylon)) + "</b> i priserna som gällde i " + månad + " " + år + ".</p>";

    output_string += "<p>Din lön skulle behöva öka med <b>" + formatKronor.to(fiktivlon) + "</b> i dagens penningvärde för att du skulle kunna köpa lika mycket för den som i januari 2022.</p>"

    output_string += "<p><a href='" + url + "' target ='_blank'>Källa: SCB, (KPIF)</a></p>"



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
