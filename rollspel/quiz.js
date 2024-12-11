/* Här kan du ändra i variabler för att skapa ett quiz med flera svarsalternativ */

var quizName = "Ett år med Svensk Kulturkanon";
var introText = "<p>Du befinner dig på ett värdshus i Los Angeles. Du har just druckit din tredje Old Fashioned kryddad med mezcal när telefonen ringer i dina google glasses. Det är kulturminister Parisa Liljestrand. Hennes ton är allvarlig. Sveriges statsminister, Ulf Kristersson, har ett uppdrag till dig. Att skapa en svensk kulturkanon.</p><p>Varje val för dig närmare ett av tre slut, beroende på hur du hanterar resurser, konflikter och relationer</p>";
var firstRobotText = "Klicka på knappen nedan för att starta.";
var firstButtonText = "Starta spelet";
var startaOm = "Gör om spelet";
var fortsätt = ["Fortsätt", 5];

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
    "bilder/kanon2.webp"
)

var questions = [
    {
        nummer: 1,
        fraga: "<p>Ditt uppdrag är att lyfta fram ett antal mindre verk som haft stor betydelse för Sveriges kultur- och samhällsliv.</p><p>På så vis ska en Svensk Kulturkanon etableras efter danskt snitt. Hur reagerar du?</p>",
        alternativ: [
            ["Du är givetvis helt rätt person för detta. I åratal har du pladdrat om att integrationen misslyckats. Du accepterar omedelbart. Rätt väg framåt är att gå på feeling och skjuta från höften", 2],
            ["Du är givetvis helt rätt person för detta och har stor respekt för den svenska djupa staten. Be om mer information innan du bestämmer dig", 3]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 2,
        fraga: "Vem behöver förberedelser? Hur svårt ska det egentligen vara att definiera svensk kultur i ett par snabba punkter? Vad är ditt fokus?",
        alternativ: [
            ["Bygga allianser och samla stöd. Kanske närma dig frågan ödmjukt.", 4],
            ["Vi är väl moderna individualistiska människor? Du kör på efter eget huvud.", 5]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 3,
        fraga: "Du samlar in fakta, talar med professorer och experter. Men Svenska Akademiens ständiga sekreterare, Mats Malm, gör ett utspel i Dagens Nyheter innan du är redo. Han säger att 'Kanon är ett begrepp som är inpyrt med makt och maktutövning' och säger blankt nej på frågan om Akademien kan definiera en sådan. Motarbetad. Direkt. Vad gör du?",
        alternativ: [
            ["Improviserar en snabb replik.", 6],
            ["Tänker att en utmanare nu är ute ur racet. Du fortsätter samla information.", 7]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 4,
        fraga: "Dina allierade i kampen är Expressens Kulturchef Victor Malm, Richard Jomshof och det norska toalettmonstret Dodraugen. En inte alls omäktig allians. Men inte speciellt ödmjuk. De har svårt att övertyga dina meningsmotståndare om att du är rätt man att leda nationen in i en ny kanon-era. Vad gör du?",
        alternativ: [
            ["Lanserar t-shirt kampanjen 'Kanon med kanon!' där dina allierade, utklädda till Karoliner, äter köttbullar och samtalar om svenskheten till Benny Anderssons orkester.", 8],
            ["Spelar in en cover på Kents låt 'Sverige' som släpps på svenska Spotify.", 9]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 5,
        fraga: "Det har nu gått ett halvår sedan du tillsattes för att ta fram nationens kulturkanon. Nu kritiseras du för att inte ha sammankallat ett enda möte. Hur svarar du?",
        alternativ: [
            ["Anpassar din plan för att tillfredsställa kritikerna.", 8],
            ["Du och din vision är större än såhär. Vad du skapar låter inte begränsa sig till olika konstarter och listor på verk. Jag menar, är svensken ens människa?", 9]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 6,
        fraga: "Du förklarar att du är en 'kulturell analfabet' – och påtalar att kulturvärldens skepsis beror på att kanon är något som Sverigedemokraterna har önskat sig. Kritikerna anser att dina svar saknar substans. Vad gör du?",
        alternativ: [
            ["Dubbelkollar detaljer och ber att få återkomma.", 8],
            ["Litar på din intuition och kör vidare.", 9]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 7,
        fraga: "Du lanserar webbportalen 'Folkets kanon', där alla kan lämna förslag på vad som ska ingå i Sveriges kanon, men du är rejält försenad. Vad gör du?",
        alternativ: [
            ["Använder insikten från din webbportal för att presentera en bred och folklig kanon.", 10],
            ["Prata med den kommitté du fortfarande inte sammankallat några möten med.", 11]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 8,
        fraga: "Än så länge agerar du helt rätt. Ditt projekt kostar nästan ingenting och all kritik bortförklaras med 'brunsmetning'. Ditt stöd växer snabbt hos regeringen men minskar på kultursidorna. Hur hanterar du det?",
        alternativ: [
            ["Lyft att Hollands kulturkanon har en historisk dimension och en bred ansats. Som utvidgar sig från att bara titta på enskilda verk till att inkludera personer och händelser. 'Och den är inte alls okritisk', säger du. Du har än så länge inte presenterat ett enda verk i Svensk kanon.", 12],
            ["Du söker ro i den lugnande tanken att när man blir äldre står inget på spel längre. Du har en frihet eftersom du inte är bekymrad över om du kommer få några nya uppdrag.", 13]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 9,
        fraga: "Du arbetar ensam och effektivt. På departementet beskrivs att arbeta med dig som att 'valla en katt'. Men du riskerar att isoleras. Kanske går du lite väl din egen väg, antyds det. Vad gör du?",
        alternativ: [
            ["Tänker att det är bättre att du gör detta än nån annan jävla galning.", 12],
            ["Dricker öl med pensionären Börje, äter sparris med Carl Jan Granqvist och talar med Socialdemokraterna.", 13]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
    },
    {
        nummer: 10,
        fraga: "Din innovativa lösning imponerar på vissa men andra anser att svensk Kanon kanske inte enbart ska bestå av Jens Ganmans misslyckade författarkarriär, Hanif Balis självbiografi samt Ultima Thule. Vad gör du?",
        alternativ: [
            ["Du landar återigen i att det här är en för komplex fråga för att reduceras till enskilda titlar. En kanon är något större än dig och mig.", 14],
            ["Ser det hela som en seger för demokratin och yttrandefriheten. Varför skulle inte en svensk kulturkanon kunna bestå av verk absolut ingen utom Johannes Klenell och Max V Karlsson läst eller kommer läsa?", 15]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
    },
    {
        nummer: 11,
        fraga: "Å nej, en minoritetsperson! Du träffar Författarcentrum Sápmi på Bokmässan, de hävdar bestämt sin lagliga rätt att få göra inspel på din kulturkanon. Vad gör du?",
        alternativ: [
            ["Bestämmer dig för att förolämpa alla nationella minoriteter samt hockeyspelare, för jämlikhetens skull.", 14],
            ["Ringer en vän på Svenska Dagbladet som skriver en text där hen undrar om inte samer blivit en ny svensk adel.", 15]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
    },
    {
        nummer: 12,
        fraga: "Svenska Akademien har inte bjudit dig till Nobelfesten. Det måste vara ett politiskt ställningstagande. Hur reagerar du?",
        alternativ: [
            ["Tar en öl på Bar Europa, chillar.", 16],
            ["Bränner ned Den Gyldende Freden och plockar upp ett par Bellmantexter på vägen.", 17]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
    },
    {
        nummer: 13,
        fraga: "Det stormar på kultursidorna! Victor Malm på Expressen kultur är typ för en kanon, men tror inte att du kan genomföra den. Aftonbladet skriver att du tror att du utsetts till kung. Hur svarar du?",
        alternativ: [
            ["Inte alls, men passar på att ta en jovialisk intervju med Kvartal.", 16],
            ["Tar strid genom en jovialisk intervju i Kvartal.", 17]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
    },
    {
        nummer: 14,
        fraga: "Det visar sig att du råkat förolämpa de nationella minoriteterna. Tjänstemännen gnäller om utredningsdirektiven. En ledamot i din kommitté hoppar av. Vem ersätter du henne med?",
        alternativ: [
            ["En AI.", 18],
            ["Sveriges snabbaste reporter, Cyril Hellman.", 19]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
    },
    {
        nummer: 15,
        fraga: "Du ramlar in i Carl-Oskar Bohlin, minister för civilt försvar, under ett panelsamtal. Han föreslår att den dokumentära thrillern Krigsterrorbrandens putinistiska gryning av Art Illeri inkluderas i kanon för att stärka svensk beredskap. Du…?",
        alternativ: [
            ["Slutade lyssna för tio minuter sedan, men kul att mannen är pratglad.", 18],
            ["Art Illeri är inget du läst, men det låter som ett bombastiskt författarskap. Klart det ska med!", 19]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
    },
    {
        nummer: 16,
        fraga: "Aj aj aj. Du träffar ett gäng unga coola poeter, de presenterar hela Nordstedts och Modernistas höstkatalog för dig. Du…?",
        alternativ: [
            ["Känner ingenting.", 20],
            ["Ger dem en egen svit på Park hotell under bokmässan!", 21]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 17,
        fraga: "Tidskriften Axess är inte helt glada över din fryntliga framtoning. Hur fredsförhandlar du?",
        alternativ: [
            ["Rilke, må hända tyskspråkig, är nu en del av svensk kulturkanon.", 20],
            ["Litar på att de strax distraheras av närmaste antikvitet och att det hela blåser över.", 21]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 18,
        fraga: "Storytel erbjuder dig sponsorpengar för att inkludera paret Grimwalker i kanon. Hur svarar du?",
        alternativ: [
            ["Absolut, landets kulturkanon utökas nu med två nyskrivna thrillers i veckan!", 22],
            ["Nej tack, du är mer av en Pascal Engman-tjej.", 23]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 19,
        fraga: "Regeringskansliet vill att ni inkluderar NATO-medlemskapet i en svensk kulturkanon. Jan Guillou skriver en rasande krönika. Vad gör du?",
        alternativ: [
            ["Erbjuder Hamilton en plats i kanon.", 22],
            ["Ignorerar kritiken och fokuserar på det relevanta, fler öl med pensionären Börje.", 23]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 20,
        fraga: "Kulturskribenten Björn Werner autorekryteras till kommittén. Du har nu öppnat kulturkanon för alla utländska språk utom de nationella minoriteternas. Vilken mer författare ska in?",
        alternativ: [
            ["Inga tråkiga böcker. Michel Houellebecq.", 24],
            ["Du måste nog prata med lite mer folk innan du kan bestämma dig. Du ringer Lawen Redar (S) och Ola Wong ('ej tydlig politisk profil').", 25]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 21,
        fraga: "Förhandlingarna om svensk kulturkanon förläggs i SVT:s Cyklopernas Land. Din kanon är nu en dikt av Elis Monteverde Burrau: 'det är inte vi som väljer, det är tystnaden som ropar strindberg, en kaffekopp som fylls på utan slut eller falukorvens ljumna hymn ett hoppsan, mellan barnens tallrikar och demokratins sulor.' Vad prioriterar du?",
        alternativ: [
            ["Fortsatta relationer.", 24],
            ["Din strategi.", 25]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 22,
        fraga: "Parisa Liljestrand kräver kanon på bordet senast på fredag. Attans, du som ville samla på dig ännu mer information och prata med folk! Vad gör du?",
        alternativ: [
            ["Ritalin, här kommer jag!", 28],
            ["Ber om tilläggsdirektiv och framflyttad deadline till 2030.", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 23,
        fraga: "Å nej, det är en sista Sverigedemokrat! Han saknar Heidenstam.",
        alternativ: [
            ["Han har bara missat sidan 2.", 28],
            ["Vad är ens Sverige?", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 24,
        fraga: "Grattis! Alla läskunniga killar i Sverige är nu helt nöjda. Oavsett vilka övriga vägval du gjort. Vad gör du?",
        alternativ: [
            ["Slutför stoiskt utan att riskera att tappa kontrollen.", 30],
            ["Vem vill vara någon till lags? Radera listan.", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 25,
        fraga: "Du har klarat ditt mål, men till vilket pris?",
        alternativ: [
            ["Ja, inte är det du som fått än gråare hår i alla fall.", 28],
            ["Alla stormar är bara egots vibrationer.", 30]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 26,
        fraga: "Du har klarat ditt mål, men till vilket pris?",
        alternativ: [
            ["Ja, inte är det du som fått än gråare hår i alla fall.", 28],
            ["Alla stormar är bara egots vibrationer.", 30]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 27,
        fraga: "Du har klarat ditt mål, men till vilket pris?",
        alternativ: [
            ["Ja, inte är det du som fått än gråare hår i alla fall.", 28],
            ["Alla stormar är bara egots vibrationer.", 30]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
    },
    {
        nummer: 28,
        fraga: "Samarbetsframgång: Grattis! Du har lyckats med något. Svensk kulturkanon är nu en samling kulörta post-it-lappar i en låda i ett skrivbord bredvid Anna Kinberg Batras på Elefantkyrkogården vid Karlaplan. Regeringen kan med gott samvete sänka skatten.",
        alternativ: [],
        rattSvar: "",
        explainer: "",
        rubrik: "Slutscenarier",
        meddelande: true,
    },
    {
        nummer: 29,
        fraga: "Astral succé: Grattis! Du har lyckats med ditt uppdrag. Svensk kulturkanon är nu ett sinnestillstånd. En känsla. En mors smekning. En första kyss. En humlas flykt över en blomsteräng. Regeringen kan med gott samvete sänka skatten.",
        alternativ: [],
        rattSvar: "",
        explainer: "",
        rubrik: "Slutscenarier",
        meddelande: true,
    },
    {
        nummer: 30,
        fraga: "Ensam triumf: Du klarade uppdraget självständigt, du har med dig de 50% av befolkningen som spelar roll. Killarna. Men dina relationer med exakt alla andra är ansträngda eller brutna. Svensk kulturkanon består nu av kött, potatis och: 1. Underkastelse 2. Serotonin 3. Kartan och landskapet. Regeringen kan med gott samvete sänka skatten.",
        alternativ: [],
        rattSvar: "",
        explainer: "",
        rubrik: "Slutscenarier",
        meddelande: true,
    }
];


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
            m("img.questionImg", {src: "bilder/lt.png", id: "image"}),
            m("p.textBlock.u-textMetaDeca.u-spacingTopM.speech-bubble", m.trust(introText)),
            m("div.buttondiv",
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
            }}, firstButtonText))
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

function whatNext(question) {
    let next;
    question.alternativ.forEach((fraga) => {
        if (question.userAnswer == fraga[0]) {
            next = fraga[1];
        }});
    return next;
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
            m("p.u-textMeta.u-spacingTopM", m.trust(questions[testIndex].rubrik)),
            m("img.questionImg", {src: "bilder/lt.png", id: "image"}),
            m("p.textBlock.u-textMetaDeca.u-spacingTopM.speech-bubble", m.trust(questions[testIndex].fraga)),
            m("p.u-textRight.u-textMeta.u-spacingBottomM", " "),
            m("div.buttondiv.u-spacingTopM", shuffle(questions[testIndex].alternativ).map(function(fraga, index) {
                return m("button.Button.answerButton.u-spacingBottomS", {
                    id: "question-" + index,
                    onclick: function(e) {
                        questions[testIndex].userAnswer = fraga[0];

                        testIndex = whatNext(questions[testIndex])-1;
                        e.target.classList.add("clickedButton");
                        e.target.classList.remove("unclickedButton");
                        e.redraw = false;
                        let conta = document.getElementById("container");
                        conta.classList.add("container-move");
                        console.log(questions[testIndex].meddelande)
                        setTimeout(function(){
                            conta.classList.remove("container-move");
                            e.target.classList.remove("clickedButton");
                            e.target.classList.add("unclickedButton");
                            if (questions[testIndex].meddelande) {
                                m.mount(root, done);
                            }
                            m.redraw();
                        }, 600);
                    }
                }, m.trust(fraga[0].replace(", ", ",<br>"))
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

        return m("div.container", [
            m("p.u-textMeta.u-spacingTopM", m.trust(questions[testIndex].rubrik)),
            m("img.questionImg", {src: "bilder/lt.png", id: "image"}),
            m("p.textBlock.u-textMetaDeca.u-spacingTopM.speech-bubble", m.trust(questions[testIndex].fraga)),
            m("p.u-textRight.u-textMeta.u-spacingBottomM", " "),
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
 
        ]);
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
