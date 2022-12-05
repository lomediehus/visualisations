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
    "img/1.svg",
    "img/2.svg",
)


// game data

let lonekrav = 4.4;
let andraChansen = false;
let konfliktniva;
var testIndex = 0;


var questions = [
    {
        fraga: function() {
            return "<p>Inflationen bränner stora hål i plåböckerna och gör många desperata efter en rejäl löneökning.</p><p> Samtidigt sänker sig lågkonjunkturern över sverige och kriget i Ukraina rasar vidare.</p><p>Årets lönerörelse är inte det lättaste att få ihop för att göra alla nöjda. Försök själv genom att spela Arbetets lönespel.</p>";
            },
        alternatives: false,
        img: ["img/1.svg", "img/2.svg"],
        alternativ: [
            {alternativ: "Starta spelet", action: function(){
                console.log("Startar spelet");
                return
            } }],
        explainer: false,
        rubrik: "Välkommen till lönespelet",
    },
    {
        fraga: function() { 
            if (andraChansen) {
                return "Vad ska lönekravet vara då?";
            } else {
                return "<p>Det sen höst och facken inom industrin har samlats för att bestämma vad de ska kräva för löneökningar i vårens avtalsförhandlingar.</p><p>Efter att man kommit överrens med arbetsgivarna är det fackens avtal som bildar modell för alla andra löneökningar, det så kallade märket.</p><p>Inflationen ligger på skyhöga 10 procent, allt under det blir i realiteten en lönesänkning, men höga ökningar riskerar också att spä på inflationen i en ond spiral och sänka Sveriges konkurrenskraft. Vad ska facken kräva för procentuell höjning?</p>";
            }
            
        },
        img: ["img/skyline.png"],
        alternativ: [{alternativ: "Bestäm ett lönekrav", action: function(){
            lonekrav = slider.noUiSlider.get(true);
            console.log(lonekrav);
        } }],
        explainer: "Det här är ett ganska långt chattmeddelande från roboten. Det är lite för långt",
        slider: true,
        rubrik: "Industrin bestämmer sig",
    },
    {
        rubrik: "Kravet tas emot",
        fraga: function () {
            let output
            if (lonekrav < 3) {
                output = "Det här lönekravet innebär en rejäl reallönesänkning. Medlemmarna rasar och gruvtolvan skriver om vild strejk på Facebook vad ska du göra?";
            } else if (lonekrav < 7) {
                output = "Det här lönekravet innebär en reallönesänkning. Medlemmarna muttrar. Samtidigt hävdar Svenskt näringsliv att kravet är för högt och att företagen kommer gå i konkurs. Vad gör du?";
            } else {
                output = "Lars Calmfors sätter kaffet i vrångstrumen. 'Det här skulle innebära en totalcrasch av ekonomin och eskalerande inflaton' säger han till Dagens industri? Vad gör du?";
            }
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: [
            {alternativ: "Stå fast vid siffran", action: function(){
                return
            }},
            {alternativ: "Korrigera kravet", action: function(){
                andraChansen = true;
                testIndex -= 2;
            }}
        ],
        explainer: "",
    },
    {
        rubrik: "Så gick det",
        fraga: function () {
            let output
            if (lonekrav < 3) {
                output = "Inflationen är hög och medlemmarna svälter. Men Sveriges konkurrenskraft hålls uppe";
            } else if (lonekrav < 7) {
                output = "Det går lite halvbra för alla";
            } else {
                output = "En skenande inflation och lågkonjunkur för företagen att crascha och skapar massarbetslöshet";
            }
            return output;
        },
        img: ["img/1.svg", "img/2.svg"],
        alternativ: [
            {alternativ: "Spela en gång till", action: function(){
                lonekrav = 4.4;
                testIndex = 0;
                konfliktniva = 0;
                andraChansen = false;
            }},
        ],
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
        return m("div.container", {id:"container"}, [
            m("img.questionImg", {src: questions[testIndex].img[0], id: "image"}),
            m("h2.u-spacingTopL.u-spacingBottomXS", questions[testIndex].rubrik),
            m("p.questionBox.u-spacingBottomM", m.trust(questions[testIndex].fraga())),
            questions[testIndex].slider ? m("div.slidecontainer.u-spacingTopXXL.u-spacingBottomXXXL", m("div", {id: "slider"})) : "",
            m("div.buttondiv.u-spacingTopM", questions[testIndex].alternativ.map(function(fraga, index) {
                return m("button.Button.answerButton.u-spacingBottomS.u-spacingRightS.u-textUppercase", {
                    id: "question-" + index,
                    onclick: function(e) {
                        console.log("ddd");
                        e.redraw = false;
                        testIndex += 1;
                        let conta = document.getElementById("container");
                        conta.classList.add("container-move");
                        setTimeout(function(){
                            conta.classList.remove("container-move");
                            clearInterval(timer);
                            fraga.action();
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
