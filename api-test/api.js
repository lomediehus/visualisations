fetch('https://api.scb.se/OV0104/v1//doris/en/ssd/BE/BE0401/BE0401B/BefProgFoddaMedel10', {


    method: 'POST',
    headers: {
        //'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "query": [
            {
                "code": "Fodelseland",
                "selection": {
                    "filter": "item",
                    "values": ["010", "020"]
                }
            },
            {
                "code": "Alder",
                "selection": {
                    "filter": "all",
                    "values": ["*"]
                }
            },
            {
                "code": "Tid",
                "selection": {
                    "filter": "top",
                    "values": ["3"]
                }
            }
        ],
        "response": {
            "format": "json"
        }
    })
})
.then(response => response.json())
.then(data => {
    const results = data.data.filter(item =>
        item.title.toLowerCase().includes(query)
    );
    displayResults(results);
})
.catch(error => console.error('Error fetching data:', error));

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.title;
        resultsContainer.appendChild(li);
    });
}
