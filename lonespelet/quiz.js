/* Här kan du ändra i variabler för att skapa ett quiz med flera svarsalternativ */

var quizName = "Lönespelet";
var introText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var firstRobotText = "Klicka på knappen nedan för att starta.";
var firstButtonText = "Starta spelet";
var startaOm = "Spela en gång till";
var fortsätt = "Fortsätt";


var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "img/löner.png",
    "img/skyline.png",
)

/*
Du kan välja om du vill ha någonting i explainer och rubrik
Du kan ha hur många frågor du vill i alternativ
*/

var questions = [
    {
        fraga: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        img: "löner.png",
        alternativ: ["Ja", "Nej"],
        rattSvar: "Två",
        explainer: "Det är viktigt att kunna räkna",
        rubrik: "Ett test",
        meddelande: false,
    },
    {
        fraga: "Vad är två plus två. Bla bla bla bla bal. Hej hopp. Bla bla bla. Det här är ett test. Vad är två plus två?",
        img: "skyline.png",
        alternativ: ["Det här är ett lite längre svar", "Det här är också ett ganska långt svar."],
        rattSvar: "Fyra",
        explainer: "Det här är ett ganska långt chattmeddelande från roboten. Det är lite för långt",
        meddelande: false,
    },
    {
        fraga: "Det här är lite extra information om föregående fråga.",
        img: "skyline.png",
        alternativ: [fortsätt],
        rattSvar: "",
        explainer: "Det här är ett ganska långt chattmeddelande från roboten. Det är lite för långt",
        meddelande: true,
    },
    {
        fraga: "Vad är ett plus tre? Här finns förresten inget robotmeddelande alls",
        img: "skyline.png",
        alternativ: ["Fyra", "Två"],
        rattSvar: "Fyra",
        explainer: "",
        meddelande: false,
    },
];

var resultatSvar = {
    allaRatt: "Bra jobbat. Du fick alla rätt",
    nastanAllaRatt: "Bra jobbat. Du fick nästan alla rätt.",
    overHalftenRatt: "Helt okej. Du fick mer än hälften rätt.",
    halftenRatt: "Du svarade rätt på hälften av frågorna.",
    mindreAnHalftenRatt: "Du svarade rätt på färre än hälften av frågorna.",
    nastanAllaFel: "Det här gick ju inte så bra. Du svarade fel på nästan alla frågor.",
    allaFel: "Det här gick inte alls bra. Du svarade fel på alla frågor"
};

var bildTillPratbubbla = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/arbetet_logga.png";
var robotBild = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/robot2.png";

/* Här börjar testkoden. Ändra inget här */

var totalPoints = 0;
var testIndex = 0;
var fragaNr = 1;
var totalQuestionNumber = questions.reduce(function(total, currentValue) {
    if (!currentValue.meddelande) {
        console.log(total)
        return total + 1;
    } else {
        return total
    }
}, 0);


var root = document.body;

function getDocumentHeight() {
    return Math.max(
        html.offsetHeight,
    );
}

var hem = {
    oncreate: function() {
        console.log(body.scrollHeight)
        console.log(body.offsetHeight)
        console.log(html.clientHeight)
        console.log(html.scrollHeight)
        informHeight();
    },
    view: function() {
        return m("div.container", {id:"container"}, [
            m("img.questionImg", {src: "img/skyline.png"}),
            m("p.textBlock.u-textMetaDeca.u-spacingTopM", introText),
            m("button.Button.u-spacingTopM",
            {onclick: function() {
                let conta = document.getElementById("container");
                conta.classList.add("container-move");
                console.log(conta)
                setTimeout(function(){
                    conta.classList.remove("container-move");
                    m.mount(root, test);
                }, 600)
                
            }}, firstButtonText)
        ]);
    }
};

var test = {
    onupdate: function() {
        informHeight();
    },

    view: function() {
        return m("div.container", {id:"container"}, [
            m("img.questionImg", {src: "img/" + questions[testIndex].img}),
            m("p.questionBox.u-spacingTopM..u-spacingBottomM.u-textMetaDeca", questions[testIndex].fraga),
            m("div.buttondiv.u-spacingTopM", questions[testIndex].alternativ.map(function(fraga, index) {
                return m("button.Button.answerButton.u-spacingBottomS.u-spacingRightS", {
                    id: "question-" + index,
                    onclick: function(e) {
                        e.redraw = false
                        if (questions[testIndex].meddelande) {
                            
                            console.log("meddelande");
                            testIndex += 1;
                            let conta = document.getElementById("container");
                            conta.classList.add("container-move");
                            console.log(conta);
                            setTimeout(function(){
                                if (testIndex == questions.length) {
                                    m.mount(root, done);
                                }
                                m.redraw();
                            }, 600);

                        } else {
                            questions[testIndex].userAnswer = fraga;
                            if (questions[testIndex].rattSvar == fraga) {
                                totalPoints += 1;

                                testIndex += 1;
                                fragaNr += 1;
                                
                                let conta = document.getElementById("container");
                                conta.classList.add("container-move");
                                console.log(conta);
                                setTimeout(function(){
                                    if (testIndex == questions.length) {
                                        m.mount(root, done);
                                    }
                                    m.redraw();
                                }, 600);
                            } else {
                                testIndex += 1;
                                fragaNr += 1;
                                let conta = document.getElementById("container");
                                conta.classList.add("container-move");
                                console.log(conta);
                                setTimeout(function(){
                                    if (testIndex == questions.length) {
                                        m.mount(root, done);
                                    }
                                    m.mount(root, test);
                                }, 600);
                            }

                        }
                    }
                }, fraga
                )}))
            ])
    }
};

var done = {
    oncreate: function() {
        informHeight();
    },
    onupdate: function() {
        informHeight();
    },
    view: function() {
        var resultString = "Du fick " + totalPoints + " rätt av " + totalQuestionNumber + " möjliga.";
        var lastRobotMessage;
        if (totalQuestionNumber == totalPoints) {
            lastRobotMessage = resultatSvar.allaRatt;
        } else if (totalPoints > totalQuestionNumber * 0.8) {
            lastRobotMessage = resultatSvar.nastanAllaRatt;
        } else if (totalPoints > totalQuestionNumber * 0.5) {
            lastRobotMessage = resultatSvar.overHalftenRatt;
        } else if (totalPoints == totalQuestionNumber * 0.5) {
            lastRobotMessage = resultatSvar.halftenRatt;
        } else if (totalPoints > totalQuestionNumber * 0.3) {
            lastRobotMessage = resultatSvar.mindreAnHalftenRatt;
        } else if (totalPoints > 0) {
            lastRobotMessage = resultatSvar.nastanAllaFel;
        } else {
            lastRobotMessage = resultatSvar.allaFel;
        }
        return m("div.container", [
            m("div.Label", quizName),
            m("div", [
                m("p.questionBox.u-spacingTopM.u-textMetaDeca", resultString),
                messageBox(lastRobotMessage),
                m("div.buttondiv",
                m("button.Button.u-spacingTopM.u-spacingRightS", {
                    onclick: function() {
                        testIndex = 0;
                        totalPoints = 0;
                        fragaNr = 1;
                        m.mount(root, hem);
                    }
                }, startaOm
            )),
            m("h1.u-textMetaDeca.u-spacingTopM.u-spacingBottomS", "Detaljerat resultat:"),
            m("div", questions.filter(question => !question.meddelande).map(function(question, index){

                return m("div.answerDiv.u-spacingBottomM", [
                    m("p.u-textMeta.u-textStrong", (index + 1) + ". " + question.fraga),
                    m(question.rattSvar == question.userAnswer ? "p.u-textMeta.u-colorFgComplementary-1" : "p.u-textMeta.u-colorFgPrimary", question.rattSvar == question.userAnswer ? "Ditt svar var rätt!" : "Ditt svar var fel."),
                    m("p.u-textMeta", "Rätt svar är \”" + question.rattSvar + "\”. Du svarade \”" + question.userAnswer + "\”."),
                ])
            }))
        ])]);
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

m.mount(root, hem);
