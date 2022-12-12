/* Här kan du ändra i variabler för att skapa ett quiz med flera svarsalternativ */



var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    "img/loner.png",
    "img/skyline.png",
    "img/1_ny.svg",
    "img/2NY.svg",
)

var formatPercent = wNumb({
    decimals: 1,
    suffix: ' procent',
    mark: ","
})


// game data

let lonekrav = 4.4;
let arbetsgivarkrav;
let andraChansen = false;
let konfliktniva;
var testIndex = 0;
let laglonesatsning = false;
let strejkdagar = 0;
let tjänstepension = false;

function rensaSpelet() {
    lonekrav = 4.4;
    testIndex = 0;
    konfliktniva = 0;
    andraChansen = false;
    laglonesatsning = false;
    strejkdagar = 0;
    tjänstepension = false;
}


var questions = [
    {
        fraga: function() {
            return [
                "Välkommen till lönespelet", 
                "Inflationen bränner stora hål i plåböckerna och gör många desperata efter en rejäl löneökning.</p><p> Samtidigt sänker sig lågkonjunkturern över Sverige och kriget i Ukraina rasar vidare.</p><p>Årets lönerörelse är inte det lättaste att få ihop för att göra alla nöjda. Försök själv genom att spela Arbetets lönespel.</p>"
                ];
            },
        alternatives: false,
        img: ["img/1_ny.svg", "img/2NY.svg"],
        alternativ: function(){
            return [
            {alternativ: "Starta spelet", action: function(){
                console.log("Startar spelet");
                return
            } }];
        },
        explainer: false,
    },
    {
        fraga: function() { 
            if (andraChansen) {
                return ["Bestäm dig...", 
                    "Vad ska lönekravet vara då?"];
            } else {
                return [
                    "Industrin bestämmer sig", 
                    "<p>Det sen höst och facken inom industrin har samlats för att bestämma vad de ska kräva för löneökningar i vårens avtalsförhandlingar.</p><p>Efter att man kommit överrens med arbetsgivarna är det fackens avtal som bildar modell för alla andra löneökningar, det så kallade märket.</p><p>Inflationen ligger på skyhöga 10 procent, allt under det blir i realiteten en lönesänkning, men höga ökningar riskerar också att spä på inflationen i en ond spiral och sänka Sveriges konkurrenskraft. Vad ska facken kräva för procentuell höjning?</p>"
                ];
            }
            
        },
        img: ["img/skyline.png"],
        alternativ: function(){
            return [{alternativ: "Bestäm lönekravet", action: function(){
            lonekrav = slider.noUiSlider.get(true);
            console.log(lonekrav);
        } }];
        },
        explainer: "Det här är ett ganska långt chattmeddelande från roboten. Det är lite för långt",
        slider: true
    },
    {
        fraga: function () {
            let output
            if (lonekrav == 0) {
                output = ["Risk för depression","<p>Nationalekonomerna varnar för att den annalkande lågkonjunkturen övergår i en depression eftersom köpkraften skulle minska kraftigt.</p><p>Till och med arbetsgivarna tycker att det är lite i underkant, även om de inte säger det högt. </p>"];
            } else if (lonekrav < 3) {
                output = ["Upprörda medlemmar","<p>Nationalekonomerna är kluvna, å ena sidan ansvarsfullt och bra mot inflationen, å andra sidan risk att lågkonjunkturen blir ännu djupare med den minskade köpkraften.</p><p>Medlemmarna blir upprörda över att du lägger dig så lågt.</p>"];
            } else if (lonekrav < 5) {
                output = ["”Balanserat krav”", "<p> Nationalekonomerna anser på det stora hela att det är ett balanserat krav, inte så högt att det driver på inflationen men inte så lågt att löntagarnas köpkraft utarmas för mycket.</p> <p>En del upprörda röster hörs från medlemmar som tycker att du lägger dig för lågt.</p>"];
            } else if (lonekrav < 7) {
                output = ["”Hotad konkurrenskraft”", "<p>Vissa nationalekonomer anser att svensk konkurrenskraft allvarligt skulle hotas med sådana löneökningar. Andra anser att det är en rimlig nivå med tanke på att svenska företag gjort stora vinster de senaste åren.</p><p>Medlemmarna vill gärna se ännu högre krav, men hålller sig på mattan. </p>"];
            } else if (lonekrav < 10) {
                output = ["Nöjda medlemmar","<p>Många nationalekonomer varnar för en eskalerande inflationsspiral och företagskonkurser som riskerar jobben för tusentals.</p><p>Medlingsinstitutet antyder i en debattartikel att du borde lugna ner dig. Medlemmarna är ganska nöjda förutom Gruvtolvan som vill ha 20 procent."]
                ;
            } else if (lonekrav < 20) {
                output = ["”Inflationsspiraler”","<p>Nationalekonomerna lägger pannorna i djupa veck och pratar om inflationsspiraler från 70-talet och företagskonkurser som riskerar jobben för hundratusentals.</p><p>Många medlemmar jublar medan andra tycker att det är oansvarigt att kräva så mycket.</p>"]
                ;
            } else {
                output = ["”Oansvarigt”","<p>Nationalekonomerna skriker om inflationsspiraler, räntehöjningar och företagskonkurser som riskerar jobben för miljontals.</p><p> Även många medlemmar tycker att det är oansvarigt att kräva så mycket, förutom Gruvtolvan som anser att det är helt rimligt.</p>"];
            }
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: function(){
            return [
            {alternativ: "Stå fast vid lönekravet", action: function(){
                return
            }},
            {alternativ: "Ändra dig", action: function(){
                andraChansen = true;
                testIndex -= 2;
            }}
        ];
        },
        explainer: "",
    },
    {
        fraga: function () {
            let output 
            let startstring = "<p>Det är dags för LO-förbunden att komma överens om gemensamma krav i avtalsrörelsen ";
            if (lonekrav < 4) {
                output = ["Stor splittring", startstring + " men på mötet är det upprorsstämning.</p><p>”Alldeles för låga krav”, säger Transportordföranden och tågar ut ur rummet tillsammans med fem andra förbund.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            } else if (lonekrav < 5.1) {
                output = ["Uppror i leden", startstring + " men på mötet är vissa upprörda.</p>”Det här innebär ju en stor reallönesänkning”, säger Transportordföranden och går argt ut ur rummet.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            } else if (lonekrav < 10) {
                output = ["Resignerad stämning", startstring + " och på mötet infinner sig en resignerad stämning.</p>”Det här innebär visserligen en reallönesänkning men å andra sidan måste alla dra sitt strå”, säger Metallordföranden.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            } else {
                output = ["Knutna nävar", startstring + " och på mötet infinner sig en nervös men stridslysten stämning.</p>”Nu ska lönenerna upp rejält, blir det strejk så blir det”, säger Metallordföranden.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            }
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: function(){
            return [
            {alternativ: "Kräv en låglönesatsning", action: function(){
                laglonesatsning = true;
            }},
            {alternativ: "Strunta i låglönesatsningen", action: function(){
                
                return;
            }}
        ];},
        explainer: "",
    },
    {
        fraga: function () {
            let output 
            let startstring = "<p>Det är dags att börja förhandla med arbetsgivarna. Ditt lönekrav är <b>" + formatPercent.to(lonekrav) + "</b>" + (laglonesatsning ? " och en låglönesatsning" : "") + ".</p> ";
            if (lonekrav < 1.1) {
                output = ["”Klappat och klart”", startstring + "<p>Arbetsgivarna tror inte sina öron, men håller god min och accepterar ditt krav utan knot.</p>"];
            } else if (lonekrav < 3.1) {
                output = ["Muttrande arbetsgivare", startstring + "<p>Arbetsgivarna mumlar om inflation och dyrtider och säger att företagen kommer få svårt att klara en sådan kostnadsökning. </p><p>Arbetsgivarnas motbud är </b>" + formatPercent.to(lonekrav - 0.5) + "</b>.</p>"];
                arbetsgivarkrav = lonekrav - 0,5;
            } else if (lonekrav < 5) {
                output = ["Upprörda arbetsgivare", startstring + "<p>Arbetsgivarna pratar om inflation och dyrtider och hävdar att ett så högt krav kommer att driva företag i konkurs och riskera tusentals jobb. </p><p>Arbetsgivarnas motbud är </b>" + formatPercent.to(lonekrav - 1.5) + "</b>.</p>"];
                arbetsgivarkrav = lonekrav - 1.5;
            } else {
                output = ["”Oseriöst”", startstring + "<p>Ett oseriöst krav anser arbetsgivarna och får medhåll från vissa nationalekonomer som menar att svensk konkurrenskraft allvarligt skulle hotas med sådana löneökningar. <p>Arbetsgivarnas motbud är <b>3,5 procent</b>.</p>"];
                arbetsgivarkrav = 3.5;
            }
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: function(){
            if (lonekrav < 1.1) {
                return [
                    {alternativ: "Gå vidare", action: function(){
                        testIndex = questions.length - 1;
                    }},
                ]             
            } else {
                return [
                    {alternativ: "Gå med på arbetsgivarnas krav", action: function(){
                        lonekrav = arbetsgivarkrav;
                        testIndex = questions.length - 1;
                    }},
                    {alternativ: "Varsla om strejk", action: function(){
                        return;
                    }}

        ]};},
        explainer: "",
    },
    {
        fraga: function () {
            let cont = document.body;
            if (lonekrav - arbetsgivarkrav <= 0.5) {
                arbetsgivarkrav = lonekrav;
                output = ["Strejkvarsel!","<p>Du har varslat om storstejk som omfattar en halv miljon arbetstagare. Oansvarigt, anser arbetsgivarna men lugnar sig så småningom och möter ditt krav.</p><p>Ni sätter er vid förhandlingsbordet igen och undertecknar avtalet som ger " + formatPercent.to(lonekrav) + " i löneökningar.</p>" ];
            } else {
                arbetsgivarkrav += +0.5
                output = ["Strejkvarsel!","<p>Du har varslat om storstejk som omfattar en halv miljon arbetstagare. Oansvarigt, anser arbetsgivarna men lugnar sig så småningom och höjer sitt bud med 0,5 procentenheter till " + formatPercent.to(arbetsgivarkrav) + ".</p><p>Vad gör du?</p>"];
            }
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: function(){
            if (lonekrav == arbetsgivarkrav) {
                return [
                    {alternativ: "Gå vidare", action: function(){
                        testIndex = questions.length - 1;
                    }},
                ]             
            } else {
                return [
                    {alternativ: "Gå med på arbetsgivarnas krav", action: function(){
                        lonekrav = arbetsgivarkrav;
                        testIndex = questions.length - 1;
                    }},
                    {alternativ: "Gå ut i strejk", action: function(){
                        return;
                    }}

        ]};},
        explainer: "",
    },
    {
        fraga: function () {
            let cont = document.body;
            cont.classList.add("strejk");
            let output;
            if (lonekrav - arbetsgivarkrav <= 0.5) {
                arbetsgivarkrav = lonekrav;
                output = ["Klappat och klart","<p>Du har fått igenom dina krav på " + formatPercent.to(lonekrav) + ".</p><p> Nationalekonomerna ger godkänt betyg till uppgörelsen, men många medlemmar är missnöjda med nivån som ger en rejäl reallönesäkning med tanke på den höga inflationen.</p>"];
            } else {
                if (strejkdagar == 0) {
                    arbetsgivarkrav += 0.5;
                    output = ["Storstrejk!","<p>Strejken inleds. Industrierna står still och företagen förlorar mycket pengar. Arbetsgivarna rasar över fackets nonchalans inför den svenska konkurrenskraften.</p><p>För att få ett slut på strejken går de till slut med på att sockra budet med ytterligare 0,5 procent, till " + formatPercent.to(arbetsgivarkrav) + ".</p><p>Vad gör du?</p>"];
                } else if (strejkdagar == 1) {
                    arbetsgivarkrav += 0.5;
                    output = ["Strejken utvidgas.","Du tar ut ytterligare 100 000 anställda i strejk. Arbetsgivaren svarar med en lockout. Nu är det inte bara företagen som förlorar pengar, även din strejkassa börjar sina.</p><p>Medlingsinstitutet griper in och kommer med ett förslag på " + formatPercent.to(arbetsgivarkrav) + " som arbetsgivaren accepterar.</p><p>Vad gör du?</p>"];
                } else if (strejkdagar == 2) {
                    tjänstepension = true;
                    output = ["Strejken fortsätter","<p>Såväl din som arbetsgivarnas strejkkassa är på väg att ta slut. Företag kommer med storvarsel om uppsägningar.</p><p>Allmänheten, som till en början sympatiserat med strejken, börjar tröttna. Nationalekonomerna varnar för stora skadeverkningar på samhällsekonomin</p><p>Medlingsinstitutet slänger in extra avsättningar till tjänstepensionen ovanpå budet på " + formatPercent.to(arbetsgivarkrav) + ".<p>Vad gör du?</p>"];
                } else if (strejkdagar == 3) {
                    arbetsgivarkrav += 0.5;
                    output = ["Kris","<p> Den svenska ekonomin är på väg att kollapsa och regeringen hotar med lagstiftning för att få slut på konflikten.</p><p>Medlingsinstitutet lyckas till slut få arbetsgivarna att gå med på ytterligare 0,5 procent till " + formatPercent.to(arbetsgivarkrav) + ".</p><p>”Absolut slutbud”, dundrar arbetsgivarna.</p><p>Vad gör du?</p>"];
                } else if (strejkdagar == 4) {
                    output = ["Samhällskollaps","<p>Samhällsekonomin kraschar och Sverige är på väg mot konkurs. På gatorna syns svältande människor som stapplar fram med trasor på kroppen.</p><p>Regeringen stiftar en lag som innebär strejkförbud.</p>"];
                }
            } 
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: function(){
            if (strejkdagar == 4) {
                return [
                    {alternativ: "Spela igen", action: function(){
                        let cont = document.body;
                        cont.classList.remove("strejk");
                        rensaSpelet();
                    }},
                ]   
            } else {
                if (lonekrav == arbetsgivarkrav) {
                    return [
                        {alternativ: "Gå vidare", action: function(){
                            let cont = document.body;
                            cont.classList.remove("strejk");
                            testIndex = questions.length - 1;
                        }},
                    ]             
                } else {
                    return [
                        {alternativ: "Gå med på arbetsgivarnas krav", action: function(){
                            let cont = document.body;
                            cont.classList.remove("strejk");
                            lonekrav = arbetsgivarkrav;
                            testIndex = questions.length - 1;
                        }},
                        {alternativ: "Fortsätt strejken", action: function(){
                            strejkdagar += 1;
                            testIndex -= 1;
                        }}
    
            ]};
            }
            },
        explainer: "",
        explainer: "",
    },
    {
        fraga: function () {
            let output
            let startstring = "<p>Löneökningen blev <b>" + formatPercent.to(lonekrav) + "</b>.</p>";
            if (lonekrav < 3) {
                output = ["Fattigdomen breder ut sig", startstring + "<p>Inflationen är hög och medlemmarna svälter. Men Sveriges konkurrenskraft hålls uppe.</p>"];
            } else if (lonekrav < 7) {
                output = ["Halvdåligt för alla", startstring + "<p>Det går lite halvdåligt för för alla. En sämre levnadsstandard hos medlemmarna och knaggliga tider för företagen gör att alla är lite småsura.</p>"];
            } else {
                output = ["Ekonomisk kris", startstring + "<p>En skenande inflation och lågkonjunkur får företagen att krascha och skapar massarbetslöshet.</p>"];
            }
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: function(){
            return [
            {alternativ: "Spela en gång till", action: function(){
                rensaSpelet();
            }},
        ];},
        rattSvar: "",
        explainer: "",
    },
];



var bildTillPratbubbla = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/arbetet_logga.png";
var robotBild = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/robot2.png";

/* Här börjar testkoden. Ändra inget här */




var root = document.body;

function getDocumentHeight() {
    return Math.max(
        html.offsetHeight,
    );
}

let timer;
function imageSwitch(imageArray) {
    if (imageArray.length == 1) {
        return
    } else {
        let image = document.getElementById("image");
        let interval = true;
        timer = setInterval(function(){
            if (interval) {
                image.src = imageArray[0];
                interval = false;
            } else {
                image.src = imageArray[1];
                interval = true;
            }        
        }, 1000)
    }

}

let slider
function createSlider() {
    if (questions[testIndex].slider) {
        slider = document.getElementById("slider");
        console.log("hej")
        noUiSlider.create(slider, {
            start: [lonekrav],
            step: 0.1,
            connect: true,
            range: {
                min: 0,
                max: 20
            },
            pips: {
                mode: "values",
                values: [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20],
                density: 4
            },
            behaviour: 'tap-drag',
            tooltips: true,
            format: wNumb({
                decimals: 1,
                suffix: ' %',
                mark: ","
            })
            });
        informHeight();
        slider.querySelector(".noUi-pips").classList.add("u-textMeta");
    }
}



var test = {
    madeChoice: false,
    slidernumber: 3,
    oncreate: function() {
        imageSwitch(questions[testIndex].img);
        createSlider();
        informHeight();
    },
    onupdate: function() {
        imageSwitch(questions[testIndex].img);
        if (this.madeChoice == false) {
            createSlider();
        }
        informHeight();
    },

    view: function() {
        fragaArray = questions[testIndex].fraga();
        return m("div.container", {id:"container"}, [
            m("img.questionImg", {src: questions[testIndex].img[0], id: "image"}),
            m("h2.u-spacingTopL.u-spacingBottomXS", fragaArray[0]),
            m("p.questionBox.u-spacingBottomM", m.trust(fragaArray[1])),
            questions[testIndex].slider ? m("div.slidecontainer.u-spacingTopXXL.u-spacingBottomXXXL", m("div", {id: "slider"})) : "",
            m("div.buttondiv.u-spacingTopM", questions[testIndex].alternativ().map(function(fraga, index) {
                return m("button.Button.answerButton.u-spacingBottomS.u-spacingRightS.u-textUppercase", {
                    id: "question-" + index,
                    onclick: function(e) {
                        e.target.classList.add("clickedButton");
                        e.target.classList.remove("unclickedButton");
                        console.log("ddd");
                        e.redraw = false;
                        testIndex += 1;
                        let conta = document.getElementById("container");
                        console.log(e);
                        conta.classList.add("container-move");
                        setTimeout(function(){
                            conta.classList.remove("container-move");
                            clearInterval(timer);
                            fraga.action();
                            e.target.classList.remove("clickedButton");
                            e.target.classList.add("unclickedButton");
                            m.redraw();
                        }, 600);
                    }
                }, fraga.alternativ
                )}))
            ])
    }
};

function messageBox(message) {
    return m("div.messageBox.u-spacingTopXL", [
        m("img.messageImg", {src: bildTillPratbubbla}),
        m("div.bubbledLeft.u-textMeta", message)
    ]);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }
    return array;
}

m.mount(root, test);
