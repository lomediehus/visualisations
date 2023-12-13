/* Här kan du ändra i variabler för att skapa ett quiz med flera svarsalternativ */

var quizName = "Vem sa vad";
var introText = "<p>Minns du vilken företagsledare som sa vilken groda?</p><p>Klicka på ”Starta quizet” för att testa dig själv.</p>";
var firstRobotText = "Klicka på knappen nedan för att starta.";
var firstButtonText = "Starta quizet";
var startaOm = "Gör om quizet";
var fortsätt = "Fortsätt";

/*
Du kan välja om du vill ha någonting i explainer och rubrik
Du kan ha hur många frågor du vill i alternativ

*/


var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    "bilder/start_quiz.png",
    "bilder/dollarstore.png",
    "bilder/elonmusk.png", 
    "bilder/fragandegroda.png",
    "bilder/grudrunsjoden.png",
    "bilder/hansbergstrom.png",
    "bilder/helenahelmersson.png",
    "bilder/isabellalowengrip.png",
    "bilder/leifostling.png", 
    "bilder/matsqviberg.png",
    "bilder/richardchristofferbergfors.png",
    "bilder/thinkpink.png"
)

var questions = [
    {
        fraga: "”Då får det vara slut på det här kommunistväldet.”",
        alternativ: ["Sebastian Siemiatkowski, vd för Klarna", "Ingvar Kamprad, Ikeas grundare", "Hans Bergström, delägare Engelska skolan"],
        rattSvar: "Hans Bergström, delägare Engelska skolan",
        explainer: "",
        rubrik: "Ett test",
        meddelande: false,
    },
    {
        fraga: "<p>Efter att 2018 ha släppt boken ”Though Love” medverkade ägarparet Barbara och Hans Bergström i Dagens Industris TV-kanal DiTV.</p> <p>I intervjun diskuterades skolans pedagogik, koncernens expansion och frågan om vinster i välvärden. Bergström dolde inte sina aversioner mot den dåvarande Löfvén-regeringen som han benämnde som ”kommunistväldet”.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        data: ["Hans Bergström, delägare Engelska skolan", "bilder/hansbergsstrom.jpg"],
        explainer: "",
        bild: "bilder/hansbergstrom.png",
        bildbyline: "Bild: Ulf Palm/SCANPIX, Shutterstock (montage)",
        meddelande: true,
    },
    {
        fraga: "”Jag har inte gjort något fel, nothing!”",
        alternativ: ["Birgitta Bonnesen, tidigare vd Swedbank", "Bella Nilsson, grundare Think Pink", "Ian Lundin, tidigare vd Lundin Oil"],
        rattSvar: "Bella Nilsson, grundare Think Pink",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>För SVT 2021 kommenterade Bella Nilsson,”Queen of trash”, utredningen om miljöbrott som pågått mot henne sedan 2020. Bolaget anklagas för att ha struntat i att återvinna sopor och i stället ha dumpat stora nämnder byggmaterial på olika soptippar runt om i landet.</p><p>Sedan dess har utredningen vuxit och omfattar även misstankar om grovt bokföringsbrott. Även entreprenören och tv-profilen Leif Ivan-Karlsson är misstänkt i fallet då han under en tid var vice vd för bolaget. Rättegång inleds i februari. Alla inblandade har nekat till brott.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/thinkpink.png",
        bildbyline: "Bild: Fredrik Sandberg/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Nej, det är faktiskt så att inget av dem hamnade på soptippen. Inget osorterat går ut till de här länderna. Inget dumpas.”",
        alternativ: ["Helena Helmersson, vd H&M", "Karl-Johan Persson, styrelseordförande H&M", "Stefan Persson, tidigare vd H&M"],
        rattSvar: "Helena Helmersson, vd H&M",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>Sommaren 2023 granskade Aftonbladet H&Ms insamlingsverksamhet för begagnade kläder. Resultatet visade att vissa av kläderna hamnade på några av jordens värsta dumpningsplatser i länder som Uganda och Benin.</p><p>Trots att kläderna utrustats med spårare och att tidningen både hade ögonvittnen och bildmaterial som bevis så vägrade Helena Helmersson att erkänna detta hade hänt i en intervju i TV4.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/helenahelmersson.png",
        bildbyline: "Bild: Magnus Hjalmarson Neideman/SVD/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Det är valår och om oppositionen vinner valet vill de höja både restaurangmomsen och arbetsgivaravgifterna för unga. Det vore en fullständig katastrof för oss och branschen och det kommer att få stora konsekvenser för vår tillväxt.”",
        alternativ: ["Johan Jureskog, kock och restaurangägare", "Richard och Christoffer Bergfors, vd och vice vd Max Burgers", "Petter Stordalen, investerare och hotellmagnat"],
        rattSvar: "Richard och Christoffer Bergfors, vd och vice vd Max Burgers",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>I ett nyhetsbrev till sina anställda inför valet 2014 varnade bröderna sin personal för att rösta på Socialdemokraterna, något som av flera anställda uppfattades som ett förtäckt hot.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/richardchristofferbergfors.png",
        bildbyline: "Bild: Pressbild, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Anställda har väldigt mycket makt i Sverige. Det är LAS, MBL. Arbetstagarna har en väldig makt och kan i anonyma medarbetarundersökningar få uttrycka vad man vill. Vem vill vara arbetsgivare i Sverige? Med det regelverk som finns?”",
        alternativ: ["Per Holknekt, grundare av Odd Molly", "Daniel Ek, vd Spotify", "Gudrun Sjödén, grundare och tidigare vd för klädmärket Gudrun Sjödén"],
        rattSvar: "Gudrun Sjödén, grundare och tidigare vd för klädmärket Gudrun Sjödén",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>Efter en granskning av arbetsmiljön på modeföretaget Gudrun Sjödén valde grundaren hösten 2022 att lämna Sverige. I en intervju med Expressen samma månad kritiserade hon systemet i Sverige för vara allt för löntagarorienterat.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/grudrunsjoden.png",
        bildbyline: "Bild: Malin Hoelstad/SvD/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Det är galenskap.”",
        alternativ: ["Elon Musk, vd Tesla", "Jeff Bezos, vd Amazon", "Mary Barra, vd General Motors"],
        rattSvar: "Elon Musk, vd Tesla",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>Mångmiljardären svarar kort och koncist om vad han anser om IF Metalls strejk mot Tesla i Sverige. Svaret kom i en tråd på X, tidigare Twitter, där man redogör för hur blockaden av posten till Tesla stoppar nummerskyltar till nyregistrerade bilar.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/elonmusk.png",
        bildbyline: "Bild: Jacquelyn Martin/AP/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Det ligger i kvinnors gener att vilja bli försörjda av män.”",
        alternativ: ["Peter Wallenberg, företagsledare och investerare", "Carola Lemne, tidigare vd Svenskt Näringsliv", "Mats Qviberg, finansman"],
        rattSvar: "Mats Qviberg, finansman",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>Meningen yttrades 2006 när Qviberg blev intervjuad i ett uppsatsarbete om varför så få kvinnor når toppositioner i näringslivet. Han pudlade senare med förklaringen att ”min fru tyckte jag var klumpig”.</p><p>Mats Qviberg var med och grundade HQ-bank. 2010 förlorade banken sitt tillstånd efter misstankar om bland annat insiderhandel och bokföringsbrott. Mats Qviberg åtalades 2016 för grovt svindleri, men friades av Stockholms tingsrätt.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/matsqviberg.png",
        bildbyline: "Bild: Claudio Bresciani/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Nu när jag är singel kommer jag att köra UC på alla jag träffar. Att träffa någon med skulder går bort.”",
        alternativ: ["Isabella Löwengrip, företagare och bloggare", "Camilla Läckberg, författare, entreprenör", "Margaux Dietz, influencer och företagare"],
        rattSvar: "Isabella Löwengrip, företagare och bloggare",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>I en intervju i Aftonbladet-TV 2017 berättade hon att hon skulle kredittesta alla potentiella framtida partners. Enligt henne själv handlade det om självrespekt.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/isabellalowengrip.png",
        bildbyline: "Bild: Stina Stjernkvist/SvD/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Nåde den arme man som smiter från disken och slingrar sig från matlagning. Omedelbar dödsdom väntar.”",
        alternativ: ["Peter Ahlberg, tidigare vd på Dollarstore", "Bert Karlsson, skivbolagsdirektör och politiker", "Leif- Ivan Karlsson, entreprenör"],
        rattSvar: "Peter Ahlberg, tidigare vd på Dollarstore",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>Den tidigare Dollarstore vd:n Peter Ahlberg har gjort sig känd som en frispråkig herre. 2017 befann han sig i en rejäl soppa efter att ha skickat nyhetsbrev till sina anställda. I sista delen av brevet kritiserade han debattklimatet kring jämställdhetsfrågor i Sverige.</p><p>Uttalande väckte anstöt och läckte till media. När han senare ställdes till svars av journalister från tidningen ETC, hotade han att skicka dem till Nordkorea.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/dollarstore.png",
        bildbyline: "Bild: Magnus Lejhall/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
    {
        fraga: "”Vad fan får jag för pengarna?”",
        alternativ: ["Leif Östling, tidigare vd på Scania och ordförande för Svenskt Näringsliv", "Jacob Wallenberg, företagsledare", "Christina Stenbeck, tidigare styrelseordförande i Kinnevik"],
        rattSvar: "Leif Östling, tidigare vd på Scania och ordförande för Svenskt Näringsliv",
        explainer: "",
        meddelande: false,
    },
    {
        fraga: "<p>Den tidigare hyllade Scania-chefen Leif Östling blev i samband med publiceringen av de så kallade Panamadokumenten påkommen med att ha ett skatteupplägg på Malta.</p><p>I en intervju med SVT försvarade han sig med att han hade betalat 20-30 miljoner i skatt i Sverige varje år under lång tid.</p>",
        alternativ: [fortsätt],
        rattSvar: "",
        bild: "bilder/leifostling.png",
        bildbyline: "Bild: Karin Olander/TT, Shutterstock (montage)",
        explainer: "",
        meddelande: true,
    },
];

var resultatSvar = {
    allaRatt: "Alla rätt! Vilket minne! Vilken samtidsfeeling!",
    nastanAllaRatt: "Vilket minne! Vilken samtidsfeeling! Grattis till toppoäng.",
    overHalftenRatt: "Hyfsat resultat, men det kunde vara bättre. Kanske har du bättre koll på politikernas grodor?",
    halftenRatt: "Helt okjej resultat, men det kunde vara bättre. Kanske har du bättre koll på politikernas grodor?",
    mindreAnHalftenRatt: "Du har inte riktigt hängt med de senaste åren. Dags att börja hålla dig ajour.",
    nastanAllaFel: "Du har inte riktigt hängt med de senaste åren. Dags att börja hålla dig ajour.",
    allaFel: "Det här gick inte alls bra. Du har inte hängt med de senaste åren. Dags att börja hålla dig ajour."
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
    onupdate: function() {
        informHeight();
        informScrollIntoView();
    },
    view: function() {
        return m("div.container", {id:"container"}, [
            m("img.questionImg", {src: "bilder/start_quiz.png", id: "image"}),
            m("p.textBlock.u-textMetaDeca.u-spacingTopM.speech-bubble", m.trust(introText)),
            m("button.Button.u-spacingTopM",
            {onclick: function(e) {
                e.target.classList.add("clickedButton");
                e.target.classList.remove("unclickedButton");
                e.redraw = false;
                let conta = document.getElementById("container");
                conta.classList.add("container-move");
                setTimeout(function(){
                    conta.classList.remove("container-move");
                    e.target.classList.remove("clickedButton");
                    e.target.classList.add("unclickedButton");
                    m.mount(root, test);
                }, 600);
            }}, firstButtonText)
        ]);
    }
};

function imageView(question) {
    return m("div")
}

function rattSvar(question) {
    rattString = ""

    if (question.userAnswer == question.rattSvar) {
        rattString = "Rätt!";
    } else {
        rattString = "Fel!";
    }

    return rattString;
}

var test = {
    oncreate: function() {
        console.log(body.scrollHeight)
        console.log(body.offsetHeight)
        console.log(html.clientHeight)
        console.log(html.scrollHeight)
        informHeight();
        informScrollIntoView();
    },
    onupdate: function() {
        informHeight();
        informScrollIntoView();
    },

    

    // m("div.Label", quizName), 
    view: function() {
        return m("div.container", {id:"container"}, [
            m("p.u-textMeta.u-spacingTopM", "Fråga " + fragaNr + " av " + totalQuestionNumber),
            questions[testIndex].meddelande ? null : m("p.questionBox.u-spacingBottomM.u-spacingTopM.speech.down", m.trust(questions[testIndex].fraga)),
            questions[testIndex].meddelande ? m("h2.u-spacingTopS.u-spacingBottomXS", rattSvar(questions[testIndex-1])) : null,
            questions[testIndex].meddelande ? m("img.questionImg", {src: questions[testIndex].bild, id: "image"}) : m("img.questionImg", {src: "bilder/fragandegroda.png", id: "image"}) ,
            questions[testIndex].meddelande ? m("p.u-textRight.u-textMeta.u-spacingBottomM", questions[testIndex].bildbyline) : m("p.u-textRight.u-textMeta.u-spacingBottomM", " "),
            questions[testIndex].meddelande ? m("p.questionBox.u-spacingBottomM", m.trust("<p>Rätt svar var <b>" + questions[testIndex -1].rattSvar + "</b>.</p>" + questions[testIndex].fraga)) : null,
            m("div.buttondiv.u-spacingTopM", shuffle(questions[testIndex].alternativ).map(function(fraga, index) {
                return m("button.Button.answerButton.u-spacingBottomS", {
                    id: "question-" + index,
                    onclick: function(e) {
                        questions[testIndex].userAnswer = fraga;
                        if (questions[testIndex].meddelande) {
                            console.log("meddelande");
                            fragaNr += 1;
                        } else {
                            if (questions[testIndex].rattSvar == fraga) {
                                totalPoints += 1;                                   
                                
                            }
                        }
                        testIndex += 1;
                        e.target.classList.add("clickedButton");
                        e.target.classList.remove("unclickedButton");
                        e.redraw = false;
                        let conta = document.getElementById("container");
                        conta.classList.add("container-move");
                        setTimeout(function(){
                            conta.classList.remove("container-move");
                            e.target.classList.remove("clickedButton");
                            e.target.classList.add("unclickedButton");
                            if (testIndex == questions.length) {
                                m.mount(root, done);
                            }
                            m.redraw();
                        }, 600);
                    }
                }, m.trust(fraga.replace(", ", ",<br>"))
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
                m("p.questionBox.u-spacingTopM.u-textMetaDeca", lastRobotMessage),
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
