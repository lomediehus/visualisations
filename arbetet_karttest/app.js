let alla_kommuner = ["Stockholm", "Uppsala"];

let kommunhtml = document.getElementById("kommuner");

alla_kommuner.forEach((kommun) => {
    let para = document.createElement("a");
    para.onclick = function () {
        fetchData(kommun)
    };
    const node = document.createTextNode(kommun);
    para.appendChild(node);
    kommunhtml.appendChild(para);
}
)


async function fetchData(kommun) {
    let url = "https://lomediehus.github.io/visualisations/arbetet_karttest/" + kommun + ".json"
    let x = await fetch(url);
    let y = await x.text();
    y = JSON.parse(y);
    updateMap(y);
  }


//