document.getElementById("showInfo").addEventListener("click", function () {
    fetch("info.html")
        .then(response => response.text())
        .then(data => {
            const shadowHost = document.getElementById("infoBox");
            const shadow = shadowHost.attachShadow({ mode: "open" });
            shadow.innerHTML = data; // Insert fetched HTML inside Shadow DOM
        })
        .catch(error => console.error("Error loading file:", error));
});
