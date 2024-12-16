/* Här kan du ändra i variabler för att skapa ett quiz med flera svarsalternativ */

var quizName = "Ett år med Svensk Kulturkanon";
var introText = "<p>Du befinner dig på ett värdshus i Los Angeles och har just druckit din tredje Old Fashioned kryddad med mezcal när telefonen ringer i dina google glasses.</p><p>Det är kulturminister Parisa Liljestrand. Hennes ton är allvarlig. Sveriges statsminister, Ulf Kristersson, har ett uppdrag till dig. Att skapa en svensk kulturkanon.</p><p>Varje val för dig närmare ett av tre slut, beroende på hur du hanterar resurser, konflikter och relationer</p>";
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
    "bilder/lt.png",
    "bilder/hast.png",
    "bilder/mask.png",
    "bilder/bok.png",
    "bilder/tarning.png",
)

var questions = [
    {
        nummer: 1,
        fraga: "<p>Ditt uppdrag är att lyfta fram ett antal mindre verk som haft stor betydelse för Sveriges kultur- och samhällsliv.</p><p>På så vis ska en Svensk Kulturkanon etableras efter danskt snitt. Hur reagerar du?</p>",
        alternativ: [
            ["<p>Du är givetvis helt rätt person för detta. I åratal har du pladdrat om att integrationen misslyckats. Du accepterar omedelbart.</p> <p>Rätt väg framåt är att gå på feeling och skjuta från höften</p>", 2],
            ["<p>Du är givetvis helt rätt person för detta och har stor respekt för den svenska djupa staten.</p> <p>Be om mer information innan du bestämmer dig</p>", 3]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 2,
        fraga: "<p>Helt rätt! Vem behöver förberedelser?</p> <p>Hur svårt ska det egentligen vara att definiera svensk kultur i ett par snabba punkter?</p> <p>Vad är ditt fokus?</p>",
        alternativ: [
            ["<p>Bygga allianser och samla stöd i breda lager.</p> <p>Kanske närma dig frågan ödmjukt.</p>", 4],
            ["<p>Vi är väl moderna individualistiska människor?</p> <p>Du kör på efter eget huvud.</p>", 5]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 3,
        fraga: "<p>Du samlar in fakta, talar med professorer och experter.</p> <p>Men aj aj aj.</p> <p>Svenska Akademiens ständiga sekreterare, Mats Malm, gör ett utspel i Dagens Nyheter innan du är redo.</p> <p>Han säger att 'Kanon är ett begrepp som är inpyrt med makt och maktutövning' och blankt nej på frågan om Akademien kan definiera en sådan.</p> <p>Motarbetad! Direkt!</p> <p>Vad gör du?</p>",
        alternativ: [
            ["Improviserar en snabb replik.", 6],
            ["<p>Ha! En utmanare på vägen till framgång ute ur racet.</p> <p>Du fortsätter samla information.</p>", 7]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 4,
        fraga: "<p>Dina allierade i kampen visar sig vara Expressens Kulturchef Victor Malm, Richard Jomshof och det norska toalettmonstret Dodraugen.</p> <p>En inte alls omäktig allians. Men inte speciellt ödmjuk.</p> <p>Dina förkämpar har svårt att övertyga dina meningsmotståndare om att du är rätt man att leda nationen in i en ny kanon-era.</p> <p>Vad gör du?</p>",
        alternativ: [
            ["Lanserar t-shirt kampanjen 'Kanon med kanon!' där dina allierade, utklädda till Karoliner, äter köttbullar och samtalar om svenskheten till Benny Anderssons orkester.", 8],
            ["Spelar in en cover på Kents låt 'Sverige' som släpps på pursvenska Spotify.", 9]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 5,
        fraga: "<p>Det har nu gått ett halvår sedan du tillsattes för att ta fram nationens kulturkanon.</p> <p>Du kritiseras för att inte ha sammankallat ett enda möte.</p> <p>Hur svarar du?</p>",
        alternativ: [
            ["Anpassar din plan för att tillfredsställa kritikerna.", 8],
            ["<p>Trams. Du och din vision är större än såhär.</p> <p>Vad du skapar låter inte begränsa sig till olika konstarter och listor på verk.</p> <p>Jag menar, är svensken ens människa?</p>", 9]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 6,
        fraga: "<p>Du förklarar att du är en 'kulturell analfabet' – och påtalar att kulturvärldens skepsis beror på att kanon är något som Sverigedemokraterna har önskat sig.</p> <p>Kritikerna anser att dina svar saknar substans.</p> <p>Vad gör du?</p>",
        alternativ: [
            ["<p>Strategisk reträtt.</p> <p>Du dubbelkollar detaljer och ber att få återkomma.</p>", 8],
            ["Litar på din intuition och kör vidare.", 9]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 7,
        fraga: "<p>Du lanserar webbportalen 'Folkets kanon'</p> <p>Här kan alla lämna förslag på vad som ska ingå i Sveriges kulturkanon, men du är nu rejält försenad.</p> <p>Vad gör du?</p>",
        alternativ: [
            ["Använder insikten från din webbportal för att presentera en bred och folklig kanon.", 10],
            ["Prata med den kommitté du fortfarande inte sammankallat några möten med.", 11]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 8,
        fraga: "<p>Än så länge agerar du helt rätt.</p> <p>Ditt uppdrag har kostat nästan ingenting och all kritik bortförklaras med 'brunsmetning'.</p> <p>Ditt stöd växer därför snabbt hos kulturdepartementet men minskar på kultursidorna.</p> <p>Hur hanterar du det?</p>",
        alternativ: [
            ["<p>Lyft att Hollands kulturkanon har en historisk dimension och en bred ansats.</p> <p>Denna utvidgar sig från att bara titta på enskilda verk till att inkludera personer och händelser.</p> <p>'Och den är inte alls okritisk', skorrar du med allvarlig blick.</p> <p>Du har än så länge inte presenterat ett enda verk i Svensk kanon.</p>", 12],
            ["<p>Du söker ro i den lugnande tanken att när man blir äldre står inget på spel längre.<p> <p>Du har en frihet eftersom du inte är bekymrad över om du kommer få några nya uppdrag.<p>", 13]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 9,
        fraga: "<p>Du arbetar ensam och effektivt.</p> <p>Men på departementet beskrivs att arbeta med dig som att 'valla en katt'.</p> <p>Du riskerar därför att isoleras.</p> <p>Kanske går du lite väl mycket din egen väg, antyds det.</p> <p>Vad gör du?</p>",
        alternativ: [
            ["<p>Tänker att det är bättre att du gör detta än nån annan jävla galning.<p> <p>Du utestänger alla dina tjänstemän och vägrar lämna in dokumentation.</p>", 12],
            ["Dricker öl med pensionären Börje, äter sparris med Carl Jan Granqvist och talar med Socialdemokraterna.", 13]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 1: Förberedelser",
        meddelande: false,
        bild: "bilder/tarning.png",
    },
    {
        nummer: 10,
        fraga: "<p>Din innovativa lösning imponerar på vissa men andra anser att svensk kanon kanske inte enbart ska bestå av Jens Ganmans misslyckade författarkarriär, Hanif Balis självbiografi samt Ultima Thule.</p> <p>Men det är ju vad folk röstat på.</p> <p>Vad gör du?<p>",
        alternativ: [
            ["<p>Du landar återigen i att det här är en för komplex fråga för att reduceras till enskilda titlar.</p> <p>En kanon är något större än dig och mig.</p>", 14],
            ["<p>Ser det hela som en seger för demokratin och yttrandefriheten.</p> <p>Varför skulle inte en svensk kulturkanon kunna bestå av verk absolut ingen utom Johannes Klenell och Max V Karlsson läst eller kommer läsa?</p>", 15]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
        bild: "bilder/mask.png",
    },
    {
        nummer: 11,
        fraga: "<p>Å nej, en minoritetsperson!</p> <p>Du träffar Författarcentrum Sápmi på Bokmässan, de hävdar bestämt sin lagliga rätt att få göra inspel på din kulturkanon.</p> </p>Det här osar woke och pk. Inte Sverige.</p> <p>Vad gör du?</p>",
        alternativ: [
            ["<p>Bestämmer dig för att förolämpa alla nationella minoriteter samt hockeyspelare, för jämlikhetens skull.</p> <p>Mats Sundin, meänkieli samt jojk stryks ur kanon.</p>", 14],
            ["</p>Ringer BÅDE Hanne Kjöller och Peter Wennblad.</p> <p>Under året provtänker båda i artiklar om huruvida det inte är så att samer blivit en ny svensk adel.</p>", 15]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
        bild: "bilder/mask.png",
    },
    {
        nummer: 12,
        fraga: "<p>Svenska Akademien har inte bjudit dig till Nobelfesten.</p> </p>Uppenbart ett politiskt ställningstagande.</p> </p>Hur reagerar du?</p>",
        alternativ: [
            ["Söker alternativ. Tar en öl på Bar Europa, chillar.", 16],
            ["</p>Bränner ned Den Gyldende Freden. Men plockar upp ett par Bellmantexter på vägen.", 17]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
        bild: "bilder/mask.png",
    },
    {
        nummer: 13,
        fraga: "</p>Det stormar på kultursidorna!</p> </p>Victor Malm på Expressen kultur är fortfarande stark förespråkare av all form av kanon så länge som den består av vita gamla gubbar, men han tvivlar på att du är rätt person att genomföra den.</p> </p>Aftonbladet skriver att du tror att du utsetts till kung.</p> </p>Hur svarar du?</p>",
        alternativ: [
            ["Inte alls, men passar på att göra en jovialisk intervju med magasinet Kvartal.", 16],
            ["Tar strid genom en jovialisk intervju i magasinet Kvartal.", 17]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
        bild: "bilder/mask.png",
    },
    {
        nummer: 14,
        fraga: "<p>Du förolämpar förstås de nationella minoriteterna.</p> </p>Tjänstemän gnäller om utredningsdirektiven.</p> </p>En ledamot i din kommitté hoppar av. Utmärkt.</p> </p>Vem ersätter du henne med?</p>",
        alternativ: [
            ["<p>Framtiden.</p> <p>Alltså en AI.</p>", 18],
            ["<p>Erfarenhet.</p> <p>Alltså Cyril Hellman.</p>", 19]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
        bild: "bilder/mask.png",
    },
    {
        nummer: 15,
        fraga: "<p>Du ramlar in i Carl-Oskar Bohlin, minister för civilt försvar, under ett panelsamtal.</p> </p>Han föreslår att den dokumentära thrillern Krigsterrorbrandens putinistiska gryning av Art Illeri inkluderas i kanon för att stärka svensk beredskap.</p> </p>Du…?</p>",
        alternativ: [
            ["Slutade lyssna för tio minuter sedan, men kul att mannen är pratglad och ordrik.", 18],
            ["<p>Art Illeri är inget du läst, men det låter som ett bombastiskt författarskap.</p> <p>Klart det ska med!</p>", 19]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 2: Utmaningarna",
        meddelande: false,
        bild: "bilder/mask.png",
    },
    {
        nummer: 16,
        fraga: "<p>Aj aj aj. Du träffar ett gäng unga coola poeter, de presenterar hela Nordstedts och Modernistas höstkatalog för dig.</p> </p>Du…?</p>",
        alternativ: [
            ["...känner ingenting.", 20],
            ["<p>...ser att det här är framtiden.</p> <p>Du ger dem en egen svit på Park hotell samt tre hela dygn med Leonidas Aretakis under Bokmässan!</p>", 21]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 17,
        fraga: "<p>Tidskriften Axess är inte helt glada över din fryntliga framtoning.</p> <p>Hur fredsförhandlar du?</p>",
        alternativ: [
            ["Rilke, må hända tyskspråkig, är nu en del av svensk kulturkanon.", 20],
            ["Litar på att de strax distraheras av närmaste antikvitet och att det hela blåser över.", 21]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 18,
        fraga: "Storytel erbjuder dig sponsorpengar för att inkludera paret Grimwalker i kanon. Hur svarar du?",
        alternativ: [
            ["Absolut, landets kulturkanon utökas nu med tio nyskrivna tegelstensthrillers i veckan i hela fyrtifem år!", 22],
            ["Nej tack, du är mer av en Pascal Engman-tjej.", 23]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 19,
        fraga: "<p>Regeringskansliet vill att ni inkluderar vägen till NATO-medlemskapet med den blågula parollen 'en svensk kulturKANON' i den svenska identiteten.</p> <p>Jan Guillou skriver med anledning av detta en rasande krönika i Aftonbladet om dig.</p> <p>Vad gör du?</p>",
        alternativ: [
            ["Erbjuder underrättelseofficer Carl Hamilton en plats vid kanonen.", 22],
            ["Ignorerar kritiken och fokuserar på det relevanta, fler öl med pensionären Börje.", 23]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 20,
        fraga: "<p>Ingen vet riktigt hur det gick till, men kulturskribenten Björn Werner autorekryteras till kommittén.</p> <p>För, citat: 'han gillar inte tråkiga böcker.'</p> <p>Du har nu öppnat kulturkanon för alla utländska språk utom de nationella minoriteternas.</p> <p>Vilken mer författare ska in?</p>",
        alternativ: [
            ["Inga tråkiga böcker. Däremot Michel Houellebecq.", 24],
            ["<p>Du måste nog prata med lite mer folk innan du kan bestämma dig.</p> <p>Du ringer Lawen Redar (S), Johan Hakelius (rävjägare) och Ola Wong ('ej tydlig politisk profil') för garanterat wokefria kompletteringar av den svenska essensen.</p>", 25]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 21,
        fraga: "<p>Förhandlingarna om svensk kulturkanon flyttas till SVT:s Cyklopernas Land.</p> <p>Din kanon är nu en dikt av Elis Monteverde Burrau:</p> <p><i>\"det är inte vi som väljer,</p> <p>det är tystnaden som ropar strindberg,</p> <p>en kaffekopp som fylls på utan slut eller falukorvens ljumna hymn ett hoppsan,</p> <p>mellan barnens tallrikar och demokratins sulor.\"</i></p> <p>Vad prioriterar du?</p>",
        alternativ: [
            ["Fortsatta relationer och möten med nya människor.", 23],
            ["Att köpa två ton av Kakan Hermanssons keramik.", 25]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 22,
        fraga: "<p>Parisa Liljestrand kräver kanon på bordet senast på fredag.</p> <p>Attans, du som ville samla på dig ännu mer information och prata med folk!</p> <p>Vad gör du?</p>",
        alternativ: [
            ["Ritalin, här kommer jag!", 28],
            ["Ber om tilläggsdirektiv och framflyttad deadline till 2030.", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 23,
        fraga: "<p>Å nej! Du möter den konservativa tankesmedjan OIKOS!</p> <p>De är inte nöjda och saknar Heidenstam.</p> <p>Ulf Kristersson ger dig en besviken blick.</p> <p>Vad gör du?</p>",
        alternativ: [
            ["Han har ju bara missat sidan 2 i kanon.", 28],
            ["Utbrister, på Henrik Jönssonska: 'Vad är ens Sverige?'", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 24,
        fraga: "<p>Grattis!</p> <p>Alla läskunniga killar i Sverige är nu helt nöjda.</p> </p>De är kanske inte många men du har nu garderat dig mot en mångårig debatt om hur synd det är om männen och är absolut inte woke.</p> <p>Oavsett vilka andra vägval du gjort på vägen hit.</p> </p>Vad gör du?</p>",
        alternativ: [
            ["<p>Slutför stoiskt utan att tappa kontrollen.</p> <p>Säg något kryptiskt om humrar och förklara att alla män som vill kalla sig svenskar först måste kliva in i oktagonen och gå en rond mot en rutinerad MMA-fighter.</p>", 30],
            ["Vem vill vara någon till lags? Radera hela listan.", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 25,
        fraga: "Du har klarat ditt mål, men till vilket pris?",
        alternativ: [
            ["Ja, inte är det du som fått gråare hår i alla fall.", 28],
            ["Alla känslostormar är bara egots vibrationer.", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 26,
        fraga: "Du har klarat ditt mål, men till vilket pris?",
        alternativ: [
            ["Ja, inte är det du som fått gråare hår i alla fall.", 28],
            ["Alla känslostormar är bara egots vibrationer.", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 27,
        fraga: "Du har klarat ditt mål, men till vilket pris?",
        alternativ: [
            ["Ja, inte är det du som fått gråare hår i alla fall.", 28],
            ["Alla känslostormar är bara egots vibrationer.", 29]
        ],
        rattSvar: "",
        explainer: "",
        rubrik: "Akt 3: Avgörandet",
        meddelande: false,
        bild: "bilder/bok.png",
    },
    {
        nummer: 28,
        fraga: "<p><b>Samarbetsframgång:</b></p> <p>Grattis! Du har lyckats med något.</p> <p>Men vad?</p> <p>Svensk kulturkanon är nu en samling kulörta post-it-lappar i en låda i ett skrivbord bredvid Anna Kinberg Batras på Elefantkyrkogården vid Karlaplan.</p> <p>Regeringen kan med gott samvete skära ned kulturbudgeten.</p>",
        alternativ: [],
        rattSvar: "",
        explainer: "",
        rubrik: "Succé",
        meddelande: true,
        bild: "bilder/hast.png",
    },
    {
        nummer: 29,
        fraga: "<p><b>Astral succé:</b></p> <p>Grattis!</p> <p>Du har lyckats med ditt uppdrag.</p> <p>Svensk kulturkanon är nu ett sinnestillstånd. En känsla. En mors smekning. En första kyss. En humlas flykt över en blomsteräng.</p> <p>Regeringen kan med gott samvete skära ned kulturbudgeten.</p>",
        alternativ: [],
        rattSvar: "",
        explainer: "",
        rubrik: "Succé",
        meddelande: true,
        bild: "bilder/hast.png",
    },
    {
        nummer: 30,
        fraga: "<p><b>Ensam triumf:</b></p> <p>Grattis!</p></p>Du klarade uppdraget självständigt, du har med dig de 50% av befolkningen som spelar roll.</p> <p>Killarna!</p> <p>Men dina relationer med exakt alla andra är ansträngda eller brutna.</p> <p>Svensk kulturkanon består nu av kött, potatis och:</p> <p>1. Underkastelse</p> <p>2. Serotonin</p> <p>3. Kartan och landskapet.</p> <p>Regeringen kan med gott samvete skära ned kulturbudgeten.</p>",
        alternativ: [],
        rattSvar: "",
        explainer: "",
        rubrik: "Succé",
        meddelande: true,
        bild: "bilder/hast.png",
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
            m("img.questionImg", {src: questions[testIndex].bild, id: "image"}),
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
            m("img.questionImg", {src: "bilder/hast.png", id: "image"}),
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
