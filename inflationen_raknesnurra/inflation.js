function printNumber() {
    console.log("hej")
    let number = document.getElementById("formvalue");
    let numberplace = document.getElementById("resultat");
    numberplace.innerHTML = "Om din lön var <b>" + number.value + " kr</b> i oktober förra året är den värd <b>" + String(Math.round(parseInt(number.value) * 0.8)) + " </b>kr idag.";
}

document.getElementById("button").addEventListener("click", printNumber);