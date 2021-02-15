function getDocumentHeight() {
    return Math.max(
        html.offsetHeight,
    );
}

informHeight();




async function getData(url) {
    const response = await fetch(url)
    return await response.json();
}


getData("https://ak6u29ioi3.execute-api.eu-north-1.amazonaws.com/public/month/")
    .then((data) => {
        console.log(data);

        // Update arbetslöshet

        var arbetslosindex = data.Items.map(function(e) { return e.datatyp; }).indexOf('arbetsloshet');
        var arbetslosData = parseAkuData(data, arbetslosindex);

        let arbetslosString = `<p>
        <span class="data-marking u-textMeta">${arbetslosData.justNu}</span> procent. Så hög var den säsongsjusterade arbetslösheten i <span class="data-marking u-textMeta">${arbetslosData.manad + " " + arbetslosData.ar}</span> enligt de senaste siffrorna från Statistiska centralbyrån, SCB.
        </p>
        <p>
        Det är ${arbetslosData.skillnadEttAr} jämfört med samma period för ett år sedan och ${arbetslosData.skillnadEnManad} jämfört med förra månaden.
        </p>
        <p>
        De senaste fem åren har arbetslösheten som högst varit <span class="data-marking u-textMeta">${arbetslosData.maxFive}</span> procent och som lägst <span class="data-marking u-textMeta">${arbetslosData.minFive}</span> procent.</p>
        <h2 class="u-textMetaDeca u-spacingBottomS u-spacingTopM">Det här har hänt med arbetslösheten</h2>`;

        document.getElementById("arbetsloshet-allt").innerHTML = arbetslosString;

        // Update långtidsarbetslöshet

        var langtidindex = data.Items.map(function(e) { return e.datatyp; }).indexOf('langtidsarbetsloshet');
        var langtidData = parseAkuData(data, langtidindex);

        let langarbetslosString = `
        <h2 class="u-textMetaDeca u-spacingBottomS u-spacingTopM">Långtidsarbetslösheten</h2>
        <span class="data-marking u-textMeta">${langtidData.justNu}</span> procent av alla arbetslösa hade varit arbetslösa i mer än ett halvår i <span class="data-marking u-textMeta">${langtidData.manad}</span>, enligt SCB. Det är den gruppen man brukar kalla för långtidsarbetslösa.
        </p>
        <p>
        Det är ${langtidData.skillnadEttAr} jämfört med samma period för ett år sedan.
        </p>
        <p>
        De senaste fem åren har långtidsarbetslösheten som högst varit <span class="data-marking u-textMeta">${langtidData.maxFive}</span> procent och som lägst <span class="data-marking u-textMeta">${langtidData.minFive}</span> procent.</p>
        <h2 class="u-textMetaDeca u-spacingBottomS u-spacingTopM">Så har långtidsarbetslösheten förändrats</h2>`;

        document.getElementById("langarbetsloshet-allt").innerHTML = langarbetslosString;


        var ungdomsindex = data.Items.map(function(e) { return e.datatyp; }).indexOf('ungdomsarbetsloshet');
        var ungdomsData = parseAkuData(data, ungdomsindex);

        let ungdomsString = `
        <h2 class="u-textMetaDeca u-spacingBottomS u-spacingTopM">Ungdomsarbetslösheten</h2>
        <span class="data-marking u-textMeta">${ungdomsData.justNu}</span> procent av alla personer mellan 15 och 24 år som sökte jobb och inte studerade var arbetslösa i <span class="data-marking u-textMeta">${ungdomsData.manad}</span>, enligt SCB.
        </p>
        <p>
        Det är ${ungdomsData.skillnadEttAr} jämfört med samma period för ett år sedan.
        </p>
        <p>
        De senaste fem åren har ungdomsarbetslösheten som högst varit <span class="data-marking u-textMeta">${ungdomsData.maxFive}</span> procent och som lägst <span class="data-marking u-textMeta">${ungdomsData.minFive}</span> procent.</p>
        <h2 class="u-textMetaDeca u-spacingBottomS u-spacingTopM">Ungdomsarbetslöshetens utveckling över tid</h2>`;

        document.getElementById("ungdomsarbetsloshet-allt").innerHTML = ungdomsString;



        var utinindex = data.Items.map(function(e) { return e.datatyp; }).indexOf('inrikesutrikes');
        let utinData = parseAkuDataMultiple(data, utinindex);

        let utinString = `
        <h2 class="u-textMetaDeca u-spacingBottomS u-spacingTopM">Arbetslösheten hos utrikes och inrikes födda</h2>
        <p>Parternas etableringsjobb, ”enkla jobb” med lägre löner, eller subventionerade anställningar. Det har länge diskuterats hur gapet mellan arbetslösheten hos inrikes och utrikes födda ska krympas.</p>
        <p> I <span class="data-marking u-textMeta">${utinData.manad}</span> var skillnaden i arbetslöshet mellan grupperna <span class="data-marking u-textMeta">${utinData.justNu}</span> procentenheter. Det är ${utinData.skillnadEttAr} jämfört med samma period för ett år sedan. Samma månad var arbetslösheten hos utrikes födda <span class="data-marking u-textMeta">${utinData.justNuUt}</span> procent och hos inrikes födda <span class="data-marking u-textMeta">${utinData.justNuIn}</span> procent. </p>
        <p>De senaste fem åren har skillnaden mellan utrikes och inrikes föddas arbetslöshet som högst varit <span class="data-marking u-textMeta">${utinData.maxFive}</span> procent och som lägst <span class="data-marking u-textMeta">${utinData.minFive}</span> procent.</p>
        <h2 class="u-textMetaDeca u-spacingBottomS u-spacingTopM">Utrikes och inrikes föddas arbetslöshet över tid</h2>`;

        document.getElementById("utin-allt").innerHTML = utinString;





        removeElement("arbring");
        updateTableNew(data.Items[arbetslosindex].thedata, "arbchart", "arbetsloshet", 61);


        removeElement("ungring");
        updateTableNew(data.Items[ungdomsindex].thedata, "ungchart", "ungdomsarbetsloshet", 61)


        removeElement("langring");
        updateTableNew(data.Items[langtidindex].thedata, "langchart", "langtidsarbetsloshet", 61)


        removeElement("utring");
        updateTableNewTwoLines(utinData.data, "utinchart", ["utrikes", "inrikes", "skillnad"])

        let nyckeltalindex = data.Items.map(function(e) { return e.datatyp; }).indexOf('nyckeltal');
        nyckeltalData = parseNyckeltalData(data, nyckeltalindex);

        console.log(nyckeltalData);

        let nyckeltalString = `<p>
        <h2 class="u-textMetaDeca  u-spacingBottomS u-spacingTopM">Vad betyder egentligen alla de här siffrorna?</h2>
        <p>De officiella arbetslöshetssiffrorna tas fram av SCB genom den så kallade Arbetskraftsundersökningen eller AKU:n. Det är en stor enkätundersökning som varje månad görs med tusentals personer runt om i Sverige. De får frågor kring sin arbetssituation, till exempel hur mycket de jobbat den senaste veckan.</p>

        <p>I Sverige fanns det i <span class="data-marking u-textMeta" id="just-nu">${nyckeltalData.manad}</span> ungefär <span class="data-marking u-textMeta" id="just-nu">${nyckeltalData.befolkningenString.toLocaleString()}</span> personer mellan 15 och 74 år. Av dem stod <span class="data-marking u-textMeta" id="just-nu">${nyckeltalData.utanfor_arbetskraftenString.toLocaleString()}</span> ”utanför arbetskraften” enligt undersökningen. Det handlar om pensionärer, heltidsstuderande, värnpliktiga, sjuka eller helt enkelt personer som inte ville ha något jobb och som inte heller sökte något.
        </p>
        <p>
        Resten, <span class="data-marking u-textMeta" id="just-nu">${nyckeltalData.arbetskraftenString.toLocaleString()}</span> personer, utgjorde ”arbetskraften” och är de som arbetslöshetssiffrorna bygger på. De var antingen arbetslösa, alltså aktivt jobbsökande, eller ”sysselsatta”. Det innebär att de jobbat minst en timme under enkätveckan eller var lediga från ett fast jobb.
        </p>`

        document.getElementById("nyckeltal-allt").innerHTML = nyckeltalString;

        document.getElementById("arbetslosa_avtusen").innerHTML = nyckeltalData.arbetslosa_avtusen;
        document.getElementById("arbetskraften_avtusen").innerHTML = nyckeltalData.arbetskraften_avtusen;
        document.getElementById("sysselsatta_avtusen").innerHTML = nyckeltalData.sysselsatta_avtusen;

        createWaffles(nyckeltalData);


        informHeight();

    });



function updateTableNew(theData, chartid, dataattribute, numberOfMonths) {
    let labels = [];
    let series = [];
    theData = theData.slice(Math.max(theData.length - numberOfMonths, 1))
    theData.forEach(value => {
        labels.push(value.month);
        series.push(value.values[0]);
    })

    initiateChart(labels, [{
        fill: false,
        label: false,
        backgroundColor: '#ee492e',
        borderColor: '#ee492e',
        data: series,
        lineTension: 0,
        pointRadius: 0,
        borderWidth: 1.5
    }], chartid);

}

function updateTableNewTwoLines(theData, chartid, dataattribute) {
    let labels = [];
    let series1 = [];
    let series2 = [];
    let series3 = [];
    theData = theData.slice(Math.max(theData.length - 37, 1))
    theData.forEach(value => {
        labels.push(value.month);
        series1.push(value.values[0]);
        series2.push(value.values[1]);
        series3.push(value.skillnad);
    })

    initiateChart(labels, [{
        fill: false,
        label: "Inrikes",
        backgroundColor: '#ee492e',
        borderColor: '#ee492e',
        data: series1,
        lineTension: 0,
        pointRadius: 0,
        borderWidth: 1.5
    },
    {
        fill: false,
        label: "Utrikes",
        backgroundColor: '#00805e',
        borderColor: '#00805e',
        data: series2,
        lineTension: 0,
        pointRadius: 0,
        borderWidth: 1.5
    },
    {
        fill: false,
        label: "Skillnad",
        backgroundColor: '#ababa7',
        borderColor: '#ababa7',
        data: series3,
        lineTension: 0,
        pointRadius: 0,
        borderWidth: 1.5
    }], chartid, true);

}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


function initiateChart(labels, datasets, id, showLegend = false) {
    var ctx = document.getElementById(id).getContext('2d');
    Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }});
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: datasets
        },

        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: showLegend
            },
            scales: {
                yAxes: [{
                    ticks: {

                    }
                }],
                xAxes: [{
                    ticks: {
                        minRotation: 20
                    }
                }]
            }
        }
    });
}

function getManad(manadNr){
    let manadNamn;
    switch (manadNr) {
        case "01":
            manadNamn = "januari";
            break;
        case "02":
            manadNamn = "februari";
            break;
        case "03":
            manadNamn = "mars";
            break;
        case "04":
            manadNamn = "april";
            break;
        case "05":
            manadNamn = "maj";
            break;
        case "06":
            manadNamn = "juni";
            break;
        case "07":
            manadNamn = "juli";
            break;
        case "08":
            manadNamn = "augusti";
            break;
        case "09":
            manadNamn = "september";
            break;
        case "10":
            manadNamn = "oktober";
            break;
        case "11":
            manadNamn = "november";
            break;
        case "12":
            manadNamn = "december";
    }
    return manadNamn;
}



function createWaffles(data) {
    // Select your div
    const waffle1 = d3.select('.waffle1');


    // Create an array with numbers 0 - 99
    const numbers = d3.range(1000);

    // For each item in the array, add a div element
    // if the number is < 5, color it red, otherwise gray
    waffle1
    	.selectAll('.block')
    	.data(numbers)
    	.enter()
    	.append('div')
    	.attr('class', 'block')
    	.style('background-color', d => (d < data.arbetskraften_avtusen ? '#80807d' : '#c7c6c1'));

    const waffle2 = d3.select('.waffle2');

    // For each item in the array, add a div element
    // if the number is < 5, color it red, otherwise gray
    waffle2
    	.selectAll('.block')
    	.data(numbers)
    	.enter()
    	.append('div')
    	.attr('class', 'block')
    	.style('background-color', function(d) {
            if (d < data.arbetslosa_avtusen) {
                return '#ee492e'
            } else if (d < data.arbetskraften_avtusen) {
                return '#80807d'
            } else {
                return '#c7c6c1'
            }
        });

    const waffle4 = d3.select('.waffle4');

    // For each item in the array, add a div element
    // if the number is < 5, color it red, otherwise gray
    waffle4
    	.selectAll('.block')
    	.data(numbers)
    	.enter()
    	.append('div')
    	.attr('class', 'block')
    	.style('background-color', function(d) {
            if (d < data.arbetslosa_avtusen) {
                return '#ee492e'
            } else if (d < data.arbetskraften_avtusen) {
                return '#00805e'
            } else {
                return '#c7c6c1'
            }
        });

}




function getMinFive(data) {
    data = data.slice(Math.max(data.length - 61, 1))
    return data.reduce((min, p) => p.values[0] < min ? p.values[0] : min, data[0].values[0]);
}

function getMinFiveUt(data) {
    data = data.slice(Math.max(data.length - 61, 1))
    return data.reduce((min, p) => p.skillnad < min ? p.skillnad : min, data[0].skillnad);
}

function getMaxFive(data) {
    data = data.slice(Math.max(data.length - 61, 1))
    return data.reduce((max, p) => p.values[0] > max ? p.values[0] : max, data[0].values[0]);
}

function getMaxFiveUt(data) {
    data = data.slice(Math.max(data.length - 61, 1))
    return data.reduce((max, p) => p.skillnad > max ? p.skillnad : max, data[0].skillnad);
}


function parseAkuData(data, theIndex) {
    let justNu = data.Items[theIndex].thedata[data.Items[theIndex].thedata.length - 1].values[0];
    let ettArSedan = data.Items[theIndex].thedata[data.Items[theIndex].thedata.length - 13].values[0];
    let enManadSedan = data.Items[theIndex].thedata[data.Items[theIndex].thedata.length - 2].values[0]
    let maxFive = getMaxFive(data.Items[theIndex].thedata);
    let minFive = getMinFive(data.Items[theIndex].thedata);
    let manad = getManad(data.Items[theIndex].thedata[data.Items[theIndex].thedata.length - 1].month.split("M")[1]);
    let ar = data.Items[theIndex].thedata[data.Items[theIndex].thedata.length - 1].month.split("M")[0]

    let skillnadEttArOld = Math.round((justNu - ettArSedan) * 10) / 10;
    let skillnadEttAr = Math.round((justNu - ettArSedan) * 10) / 10;

    if (skillnadEttAr < 0) {
        skillnadEttAr *= -1
        skillnadEttAr = "en </span><span class='data-marking u-textMeta'>minskning</span> med <span class='data-marking u-textMeta'>" + skillnadEttAr + "</span> procentenheter"
    } else if (skillnadEttAr > 0) {

        skillnadEttAr = "en </span><span class='data-marking u-textMeta'>ökning</span> med <span class='data-marking u-textMeta'>" + skillnadEttAr + "</span> procentenheter"
    } else {
        skillnadEttAr = "<span class='data-marking u-textMeta'>ingen skillnad</span>"
    }

    let skillnadEnManad = Math.round((justNu - enManadSedan) * 10) / 10;
    if (skillnadEnManad < 0) {
        skillnadEnManad *= -1
        skillnadEnManad = "en </span><span class='data-marking u-textMeta'>minskning</span> med <span class='data-marking u-textMeta'>" + skillnadEnManad + "</span> procentenheter"
    } else if (skillnadEnManad > 0) {

        skillnadEnManad = "en </span><span class='data-marking u-textMeta'>ökning</span> med <span class='data-marking u-textMeta'>" + skillnadEnManad + "</span> procentenheter"
    } else {
        skillnadEnManad = "<span class='data-marking u-textMeta'>ingen skillnad</span>"
    }

    return {
        justNu: justNu.toString().replace(".", ","),
        ettArSedan: ettArSedan.toString().replace(".", ","),
        skillnadEttAr: skillnadEttAr.toString().replace(".", ","),
        enManadSedan: enManadSedan.toString().replace(".", ","),
        skillnadEnManad: skillnadEnManad.toString().replace(".", ","),
        maxFive: maxFive.toString().replace(".", ","),
        minFive: minFive.toString().replace(".", ","),
        manad: manad,
        ar: ar,
        data: data.Items[theIndex].thedata
    }
}


function parseAkuDataMultiple(data, theIndex) {
    data = parseAkuData(data, theIndex);
    data.data.forEach((d, i) => {
        data.data[i].skillnad = Math.round((d.values[1] - d.values[0]) * 10) / 10;
    });

    let justNu = data.data[data.data.length - 1].skillnad;
    let justNuIn = data.data[data.data.length - 1].values[0];
    let justNuUt = data.data[data.data.length - 1].values[1];
    let ettArSedan = data.data[data.data.length - 13].skillnad;
    let enManadSedan = data.data[data.data.length - 2].skillnad;
    let maxFive = getMaxFiveUt(data.data);
    let minFive = getMinFiveUt(data.data);
    let manad = getManad(data.data[data.data.length - 1].month.split("M")[1]);
    let ar = data.data[data.data.length - 1].month.split("M")[0]
    let skillnadEttAr = Math.round((justNu - ettArSedan) * 10) / 10;

    if (skillnadEttAr < 0) {
        skillnadEttAr = skillnadEttAr * -1;
        skillnadEttAr = "en </span><span class='data-marking u-textMeta'>minskning</span> med <span class='data-marking u-textMeta'>" + skillnadEttAr + "</span> procentenheter"
    } else if (skillnadEttAr > 0) {

        skillnadEttAr = "en </span><span class='data-marking u-textMeta'>ökning</span> med <span class='data-marking u-textMeta'>" + skillnadEttAr + "</span> procentenheter"
    } else {
        skillnadEttAr = "<span class='data-marking u-textMeta'>ingen skillnad</span>"
    }

    let skillnadEnManad = Math.round((justNu - enManadSedan) * 10) / 10;
    if (skillnadEnManad < 0) {
        skillnadEnManad *= -1
        skillnadEnManad = "en </span><span class='data-marking u-textMeta'>minskning</span> med <span class='data-marking u-textMeta'>" + skillnadEnManad + "</span> procentenheter"
    } else if (skillnadEnManad > 0) {

        skillnadEnManad = "en </span><span class='data-marking u-textMeta'>ökning</span> med <span class='data-marking u-textMeta'>" + skillnadEnManad + "</span> procentenheter"
    } else {
        skillnadEnManad = "<span class='data-marking u-textMeta'>ingen skillnad</span>"
    }

    return {
        justNu: justNu.toString().replace(".", ","),
        justNuIn: justNuIn.toString().replace(".", ","),
        justNuUt: justNuUt.toString().replace(".", ","),
        ettArSedan: ettArSedan.toString().replace(".", ","),
        skillnadEttAr: skillnadEttAr.toString().replace(".", ","),
        enManadSedan: enManadSedan.toString().replace(".", ","),
        skillnadEnManad: skillnadEnManad.toString().replace(".", ","),
        skillnadEttAr: skillnadEttAr.toString().replace(".", ","),
        maxFive: maxFive.toString().replace(".", ","),
        minFive: minFive.toString().replace(".", ","),
        manad: manad,
        ar: ar,
        data: data.data
    }
}

function parseNyckeltalData(data, nyckeltalindex) {
    data = data.Items[nyckeltalindex].thedata;
    let nyckeltalData = {
        arbetskraften: Math.round(data.arbetskraften.values[0]),
        sysselsatta: Math.round(data.sysselsatta.values[0]),
        befolkningen: Math.round(data.befolkningen.values[0]),
        utanfor_arbetskraften: Math.round(data.befolkningen.values[0] - data.arbetskraften.values[0]),
        arbetslosa: Math.round(data.arbetskraften.values[0] - data.sysselsatta.values[0])
    }

    nyckeltalData.manad = getManad(data.arbetskraften.key[1].split("M")[1]);
    nyckeltalData.ar = data.arbetskraften.key[1].split("M")[0]

    nyckeltalData.befolkningenString = numberWithCommas(nyckeltalData.befolkningen * 1000);
    nyckeltalData.sysselsattaString = numberWithCommas(nyckeltalData.sysselsatta * 1000);
    nyckeltalData.arbetskraftenString = numberWithCommas(nyckeltalData.arbetskraften * 1000);
    nyckeltalData.utanfor_arbetskraftenString = numberWithCommas(nyckeltalData.utanfor_arbetskraften * 1000);
    nyckeltalData.arbetslosaString = numberWithCommas(nyckeltalData.arbetslosa * 1000);

    nyckeltalData.arbetskraften_avtusen = Math.round((nyckeltalData.arbetskraften / nyckeltalData.befolkningen) * 1000);
    nyckeltalData.arbetslosa_avtusen = Math.round((nyckeltalData.arbetslosa / nyckeltalData.befolkningen) * 1000);
    nyckeltalData.sysselsatta_avtusen = nyckeltalData.arbetskraften_avtusen - nyckeltalData.arbetslosa_avtusen;

    return nyckeltalData;
}

function numberWithCommas(x) {
    return x;

    //x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}
