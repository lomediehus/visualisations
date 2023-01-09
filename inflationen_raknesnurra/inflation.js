

function printNumber() {
    console.log("hej")
   

    let number = document.getElementById("formvalue");
    let numberplace = document.getElementById("resultat");
    

    let index_2021 = 228.33;
    let index_2022 = 250.10;
    let månad = "november";
    let år = "2021";

    let url = "https://www.scb.se/hitta-statistik/statistik-efter-amne/priser-och-konsumtion/konsumentprisindex/konsumentprisindex-kpi/pong/tabell-och-diagram/konsumentprisindex-med-fast-ranta-kpif-och-kpif-xe/kpif-index-1987100/"

    let inflationen = ((index_2022 - index_2021) / index_2021) * 100;

    inflationen = Math.round(inflationen * 10) / 10

    let nylon = parseInt(number.value) * index_2021 / index_2022;
    let skillnad = parseInt(number.value) - nylon;

    console.log(number.value)
    let output_string = "<p>Prisökningarna, eller inflationen, var i " + månad + " <b>" + formatPercent.to(inflationen) + "</b>.</p> <p>Din lön på <b>" + formatKronor.to(parseInt(number.value)) + "</b> har minskat i värde med <b>" + formatKronor.to(Math.round(skillnad)) + "</b> kronor på ett år och är i dag värd <b>" + formatKronor.to(Math.round(nylon)) + "</b> i priserna som gällde i " + månad + " " + år + ".</p><p><a href='" + url + "' target ='_blank'>Källa: SCB, (KPIF)</a></p>";

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