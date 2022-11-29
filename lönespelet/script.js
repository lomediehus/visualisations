async function getResponse(searchString) {
	const response = await fetch(
		'https://jobsearch.api.jobtechdev.se/search?q=' + searchString,
		{
			method: 'GET',
		}
	);
	const data = await response.json(); // Extracting data as a JSON Object from the response
    printAds(data)
    return data
}


function printAds(data) {
    let place = document.getElementById("annonser");
    place.innerHTML = "";
    data.hits.forEach(function(annons) {
        let annonsElement = document.createElement("p");
        let a = document.createElement('a');
        let linkText = document.createTextNode(annons.headline);
        a.appendChild(linkText);
        a.href = annons.webpage_url;
        annonsElement.appendChild(a)
        place.appendChild(annonsElement);
        console.log(annons)
    })
    // console.log(data.hits);
    // console.log("hej")
}

function search() {
    let searchValue = document.getElementById("searchValue").value;
    getResponse(searchValue)
}

document.getElementById("searchButton").addEventListener("click", function(){
    search()
})

getResponse("journalistik")
