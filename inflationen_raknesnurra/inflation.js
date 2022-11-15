

function printNumber() {
    console.log("hej")
   

    let number = document.getElementById("formvalue");
    let numberplace = document.getElementById("resultat");

    let index_2021 = 227.24;
    let index_2022 = 248.32;
    let nylon = parseInt(number.value) * index_2021 / index_2022;
    let skillnad = parseInt(number.value) - nylon;
    let output_string = "Din lön på <b>" + number.value + " kr </b> har minskat med <b>" + Math.round(skillnad) + " kr</b> kronor på ett år och är i dag värd <b>" + Math.round(nylon) + " kr</b> i priserna som gällde i oktober 2021.";

    numberplace.innerHTML = output_string;

    informHeight();
}



document.getElementById("button").addEventListener("click", printNumber);

informHeight();