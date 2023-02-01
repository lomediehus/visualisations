/* Här kan du ändra i variabler för att skapa ett quiz med flera svarsalternativ */



var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    "img/dragkamp_rubrik1.svg",
    "img/dragkamp_rubrik2.svg",
    "img/krav1.svg",
    "img/krav2.svg",
    "img/strejk1.svg",
    "img/strejk2.svg",
    "img/ekonom1.svg",
    "img/ekonom2.svg",
    "img/ekonom3.svg",
    "img/ekonom4.svg",
    "img/laglonesatsning1.svg",
    "img/laglonesatsning2.svg",
    "img/skor1.svg",
    "img/skor2.svg",
    "img/arbetsgivare1.svg",
    "img/arbetsgivare2.svg",
    "img/tombola1.svg",
    "img/tombola2.svg",
    "img/kommunalstrejk1.svg",
    "img/kommunalstrejk2.svg",
    "img/handskak1.svg",
    "img/handskak2.svg",
    "img/lonedomen1.svg",
    "img/lonedomen2.svg",
    "img/samhallskollaps1.svg",
    "img/samhallskollaps1.svg",
    "img/inflationlag1.svg",
    "img/inflationlag2.svg",
    "img/inflationmellan1.svg",
    "img/inflationmellan2.svg",
    "img/inflationhog1.svg",
    "img/inflationhog2.svg",
    "img/strejkvarsel1.svg",
    "img/strejkvarsel2.svg",
    "img/OB-striden1.svg",
    "img/OB-striden2.svg",
    "img/OB-resultat1.svg",
    "img/OB-resultat2.svg",
    "img/OB-resultat3.svg",
    "img/resultat1.svg",
    "img/resultat2.svg",
    "img/resultat3.svg",
    "img/resultat4.svg",
    "img/resultat5.svg",
    "img/resultat6.svg",
)

var formatPercent = wNumb({
    decimals: 1,
    suffix: ' procent',
    mark: ","
})

var formatKronor = wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: ' kronor',
    mark: ","
})

// game data

let inflation = 10;
let lonekrav = 0;
let arbetsgivarkrav;
let andraChansen = false;
let konfliktniva;
var testIndex = 0;
let laglonesatsning = false;
let strejkdagar = 0;
let tjänstepension = false;
let sympatistrejk = false;
let arbetsskor = false;
let paskstrajk = false;
let market = 4.4;
let dinLon = 20000;
let kravMott = false;


function rensaSpelet() {
    inflation = 10;
    lonekrav = 0;
    testIndex = 0;
    konfliktniva = 0;
    andraChansen = false;
    laglonesatsning = false;
    strejkdagar = 0;
    tjänstepension = false;
    sympatistrejk = false;
    arbetsskor = false;
    paskstrajk = false;
    market = 4.4;
    dinLon = 20000;
    kravMott = false;
}

function randomFromArray(arrary){
    let random = Math.floor(Math.random() * arrary.length);
    return arrary[random];
}


var questions = [
    {
        fraga: function() {
            return [
                "Din egen avtalsrörelse", 
                "Inflationen liggger på skyhöga 10 procent och bränner stora hål i plånböckerna. Samtidigt sänker sig lågkonjunkturen över Sverige och kriget i Ukraina rasar vidare.</p><p>Årets lönerörelse kan bli svår att få ihop om alla ska bli nöjda. Försök själv i Arbetets spel Lönekampen.</p>"
                ];
            },
        alternatives: false,
        img: ["img/dragkamp_rubrik1.svg", "img/dragkamp_rubrik2.svg"],
        alternativ: function(){
            return [
            {alternativ: "Starta spelet", action: function(){
                return;
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
                    "<p>Facken inom industrin ska spika sina krav inför vårens avtalsförhandlingar. Avtalen ligger sedan till grund för alla övriga lönökningar på arbetsmarknaden – det så kallade märket.</p><p>Vad ska facken kräva för höjning i procent?</p>"
                ];
            }
            
        },
        img: ["img/krav1.svg", "img/krav2.svg"],
        alternativ: function(){
            return [{alternativ: "Bestäm lönekravet", action: function(){
            lonekrav = slider.noUiSlider.get(true);
        } }];
        },
        slider: true
    },
    {
        fraga: function () {
            let output
            if (lonekrav < 1.1) {
                output = ["Risk för depression","<p>Nationalekonomerna varnar för att den annalkande lågkonjunkturen övergår i en depression eftersom köpkraften skulle minska kraftigt.</p><p>Till och med arbetsgivarna tycker att det är lite i underkant, även om de inte säger det högt.</p>"];
            } else if (lonekrav < 3) {
                output = ["Upprörda medlemmar","<p>Nationalekonomerna är kluvna, å ena sidan ansvarsfullt och bra mot inflationen, å andra sidan risk att lågkonjunkturen blir ännu djupare med den minskade köpkraften.</p><p>Medlemmarna blir upprörda över att du lägger dig så lågt.</p>"];
            } else if (lonekrav < 5) {
                output = ["”Balanserat krav”", "<p> Nationalekonomerna anser på det stora hela att det är ett balanserat krav. Inte så högt att det driver på inflationen men inte så lågt att löntagarnas köpkraft utarmas för mycket.</p><p>En del upprörda röster hörs från medlemmar som tycker att du lägger dig för lågt.</p>"];
            } else if (lonekrav < 7) {
                output = ["”Hotad konkurrenskraft”", "<p>Vissa nationalekonomer anser att svensk konkurrenskraft allvarligt skulle hotas med sådana löneökningar. Andra anser att det är en rimlig nivå med tanke på att svenska företag gjort stora vinster de senaste åren.</p><p>Medlemmarna vill gärna se ännu högre krav, men protesterna är ganska milda. </p>"];
            } else if (lonekrav < 10) {
                output = ["Nöjda medlemmar","<p>Många nationalekonomer varnar för en eskalerande inflationsspiral och företagskonkurser som riskerar jobben för tusentals.</p><p>Medlingsinstitutet antyder i en debattartikel att du borde lugna ner dig. Medlemmarna är ganska nöjda förutom Gruvtolvan som vill ha 20 procent."];
            } else if (lonekrav < 20) {
                output = ["”Inflationsspiraler”","<p>Nationalekonomerna lägger pannorna i djupa veck och pratar om inflationsspiraler från 70-talet och företagskonkurser som riskerar jobben för hundratusentals.</p><p>Många medlemmar jublar medan andra tycker att det är oansvarigt att kräva så mycket.</p>"];
            } else {
                output = ["”Oansvarigt”","<p>Nationalekonomerna skriker om inflationsspiraler, räntehöjningar och företagskonkurser som riskerar jobben för miljontals.</p><p> Även många medlemmar tycker att det är oansvarigt att kräva så mycket, förutom Gruvtolvan som anser att det är helt rimligt.</p>"];
            }
            return output;
        },
        img: function(){
            if (lonekrav < 7) {
                return ["img/ekonom1.svg", "img/ekonom2.svg"];
            } else {
                return ["img/ekonom3.svg", "img/ekonom4.svg"];
            }
            
        },
        alternateImage: true,
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
                output = ["Låglönesatsning?", startstring + " men på mötet är det upprorsstämning. ”Alldeles för låga krav”, säger Transportordföranden och tågar ut ur rummet tillsammans med fem andra förbund.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            } else if (lonekrav < 5.1) {
                output = ["Låglönesatsning?", startstring + " men på mötet är vissa upprörda. ”Det här innebär ju en stor reallönesänkning”, säger Transportordföranden och går argt ut ur rummet.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            } else if (lonekrav < 10) {
                output = ["Låglönesatsning?", startstring + " och på mötet infinner sig en resignerad stämning. ”Det här innebär visserligen en reallönesänkning men å andra sidan måste alla dra sitt strå”, säger Metallordföranden.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            } else {
                output = ["Låglönesatsning?", startstring + " och på mötet infinner sig en nervös men stridslysten stämning. ”Nu ska lönerna upp rejält, blir det strejk så blir det”, säger Metallordföranden.</p><p>Kommunal föreslår att man borde kräva en extra lönesatsning för de med lägst inkomst. Arbetsgivarna skulle inte gilla det.</p>"];
            }
            return output;
        },
        img: ["img/laglonesatsning1.svg", "img/laglonesatsning2.svg"],
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
            let startstring = "<p>Det är dags för industrifacken att börja förhandla med arbetsgivarna inom industrin. Ditt lönekrav är <b>" + formatPercent.to(lonekrav) + "</b>" + (laglonesatsning ? " och en låglönesatsning" : "") + ".</p> ";
            if (lonekrav < 1.1) {
                output = ["”Klappat och klart”", startstring + "<p>Arbetsgivarna tror inte sina öron, men håller god min och accepterar ditt krav utan knot.</p>"];
            } else if (lonekrav < 3.1) {
                output = ["Muttrande arbetsgivare", startstring + "<p>Arbetsgivarna mumlar om inflation och dyrtider och säger att företagen kommer få svårt att klara en sådan kostnadsökning. </p><p>Arbetsgivarnas motbud är <b>" + formatPercent.to(lonekrav - 0.5) + "</b>.</p>"];
                arbetsgivarkrav = lonekrav - 0,5;
            } else if (lonekrav < 5) {
                output = ["Upprörda arbetsgivare", startstring + "<p>Arbetsgivarna pratar om inflation och dyrtider och hävdar att ett så högt krav kommer att driva företag i konkurs och riskera tusentals jobb. </p><p>Arbetsgivarnas motbud är <b>" + formatPercent.to(lonekrav - 1.5) + "</b>.</p>"];
                arbetsgivarkrav = lonekrav - 1.5;
            } else {
                output = ["”Oseriöst”", startstring + "<p>Ett oseriöst krav anser arbetsgivarna och får medhåll från vissa nationalekonomer som menar att svensk konkurrenskraft allvarligt skulle hotas med sådana löneökningar. <p>Arbetsgivarnas motbud är <b>3,5 procent</b>.</p>"];
                arbetsgivarkrav = 3.5;
            }
            return output;
        },
        img: ["img/arbetsgivare1.svg", "img/arbetsgivare2.svg",],
        alternativ: function(){
            if (lonekrav < 1.1) {
                return [
                    {alternativ: "Gå vidare", action: function(){
                        testIndex += 2;
                    }},
                ]             
            } else {
                return [
                    {alternativ: "Varsla om strejk", action: function(){
                        return;
                    }},
                    {alternativ: "Gå med på arbetsgivarnas bud", action: function(){
                        lonekrav = arbetsgivarkrav;
                        testIndex += 2
                    }},

        ]};},
        explainer: "",
    },
    {
        fraga: function () {
            let cont = document.body;
            if (lonekrav - arbetsgivarkrav <= 0.5) {
                arbetsgivarkrav = lonekrav;
                output = ["Strejkvarsel!","<p>Du har varslat om en stor strejk som omfattar en halv miljon arbetstagare. Oansvarigt, anser arbetsgivarna men lugnar sig så småningom och möter ditt krav.</p><p>Ni sätter er vid förhandlingsbordet igen och undertecknar avtalet som ger " + formatPercent.to(lonekrav) + " i löneökningar.</p>" ];
            } else {
                arbetsgivarkrav += +0.5
                output = ["Strejkvarsel!","<p>Du har varslat om en stor strejk som omfattar en halv miljon arbetstagare. Oansvarigt, anser arbetsgivarna men lugnar sig så småningom och höjer sitt bud med 0,5 procentenheter till <b>" + formatPercent.to(arbetsgivarkrav) + "</b>. Vad gör du?</p>"];
            }
            return output;
        },
        img: ["img/strejkvarsel1.svg", "img/strejkvarsel2.svg"],
        alternativ: function(){
            if (lonekrav == arbetsgivarkrav) {
                return [
                    {alternativ: "Gå vidare", action: function(){
                        testIndex += 1
                    }},
                ]             
            } else {
                return [
                    {alternativ: "Gå ut i strejk", action: function(){
                        return;
                    }},
                    {alternativ: "Gå med på arbetsgivarnas bud", action: function(){
                        lonekrav = arbetsgivarkrav;
                        testIndex += 1
                    }},
        ]};},
        explainer: "",
    },
    {
        fraga: function () {
            let cont = document.body;
            cont.classList.add("strejk");
            let output;
            if (lonekrav - arbetsgivarkrav <= 0.5) {
                let lilleskillnad = lonekrav - arbetsgivarkrav;
                kravMott = true;
                arbetsgivarkrav = lonekrav;
                cont.classList.remove("strejk");
                output = ["Klappat och klart","<p>Arbetsgivarna ger med sig och möter ditt krav på <b>" + formatPercent.to(lonekrav) + "</b>. Strejken är alltså över.</p><p> Nationalekonomerna ger godkänt betyg till uppgörelsen, men många medlemmar är missnöjda med nivån som ger en rejäl reallönesäkning med tanke på den höga inflationen.</p>"];
            } else {
                if (strejkdagar == 0) {
                    arbetsgivarkrav += 0.5;
                    output = ["Stor strejk!","<p>Strejken inleds. Industrierna står still och företagen förlorar mycket pengar. Arbetsgivarna rasar över fackets nonchalans inför den svenska konkurrenskraften.</p><p>För att få ett slut på strejken går de till slut med på att sockra budet med ytterligare 0,5 procentenheter, till <b>" + formatPercent.to(arbetsgivarkrav) + ".</b></p>"];
                } else if (strejkdagar == 1) {
                    arbetsgivarkrav += 0.5;
                    output = ["Strejken utvidgas","Du tar ut ytterligare 100 000 anställda i strejk. Arbetsgivaren svarar med en lockout. Nu är det inte bara företagen som förlorar pengar, även din strejkkassa börjar sina.</p><p>Industriparternas opartiska medlare, Opo, griper in och kommer med ett förslag på <b>" + formatPercent.to(arbetsgivarkrav) + " som arbetsgivaren accepterar.</b></p>"];
                } else if (strejkdagar == 2) {
                    tjänstepension = true;
                    output = ["Strejken fortsätter","<p>Såväl din som arbetsgivarnas strejkkassa är på väg att ta slut. Företag kommer med storvarsel om uppsägningar.</p><p>Allmänheten, som till en början sympatiserat med strejken, börjar tröttna. Nationalekonomerna varnar för stora skadeverkningar på samhällsekonomin</p><p>Opo föreslår extra avsättningar till tjänstepensionen ovanpå budet på <b>" + formatPercent.to(arbetsgivarkrav) + "</b>."];
                } else if (strejkdagar == 3) {
                    arbetsgivarkrav += 0.5;
                    output = ["Kris","<p> Den svenska ekonomin är på väg att kollapsa och regeringen hotar med lagstiftning för att få slut på konflikten.</p><p>Opo lyckas till slut få arbetsgivarna att gå med på ytterligare 0,5 procentenheter till <b>" + formatPercent.to(arbetsgivarkrav) + "</b>.</p><p>”Absolut slutbud”, dundrar arbetsgivarna.</p>"];
                } else if (strejkdagar == 4) {
                    cont.classList.remove("strejk");
                    output = ["Samhällskollaps","<p>Samhällsekonomin kraschar och Sverige är på väg mot konkurs. På gatorna syns svältande människor som stapplar fram med trasor på kroppen.</p><p>Regeringen stiftar en lag som innebär strejkförbud.</p>"];
                }
            } 
            return output;
        },
        alternateImage: true,
        img: function(){
            if (kravMott) {
                return ["img/handskak1.svg", "img/handskak2.svg"];
            } else if (strejkdagar == 4) {
                return ["img/samhallskollaps1.svg", "img/samhallskollaps2.svg"]
            } else {
                return ["img/strejk1.svg", "img/strejk2.svg"];
            }
        },
        alternativ: function(){
            if (kravMott) {
                return [
                    {alternativ: "Gå vidare", action: function(){
                        let cont = document.body;
                        cont.classList.remove("strejk");
                    }},
                ]   
            } else {
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
                            }},
                        ]             
                    } else {
                        return [
                            {alternativ: "Fortsätt strejken", action: function(){
                                strejkdagar += 1;
                                testIndex -= 1;
                            }},
                            {alternativ: "Gå med på arbetsgivarnas bud", action: function(){
                                let cont = document.body;
                                cont.classList.remove("strejk");
                                lonekrav = arbetsgivarkrav;
                            }},
                ]};
                }
            }
            
            },
        explainer: "",
        explainer: "",
    },
    {
        fraga: function () {
            let rubrik = "Märket blev " + formatPercent.to(lonekrav);
            market = parseFloat(lonekrav);
            let output
            let endstring = "<p>Men nu är i alla fall märket satt, alltså industrins löneökning som blir övriga förbunds riktmärke i sina förhandlingar.</p><p>Nu är det dags för övriga förbund att förhandla.</p>";
            if (lonekrav < 3) {
                output = [rubrik, "<p>Alldeles för lite, klagar arga medlemmar och flera förbund ser medlemssiffrorna sjunka.</p>" + endstring];
            } else if (lonekrav < 5) {
                output = [rubrik, "<p>Alldeles för mycket, gnäller arbetsgivarna. Alldeles för lite, klagar medlemmarna.</p>" + endstring];
            } else {
                output = [rubrik, "<p>Alldeles för mycket, klagar arbetsgivarna.</p>" + endstring];
            }
            return output;
        },
        img: ["img/handskak1.svg", "img/handskak2.svg"],
        alternativ: function(){
            return [
            {alternativ: "Fortsätt", action: function(){
                let cont = document.body;
                cont.classList.add("strejk");
                return
            }},
        ];},
        rattSvar: "",
        explainer: "",
    },
    {
        fraga: function () {
            let rubrik = "Strejk i omsorgen";
            let output;
            if (market <1.1) {
                output = [rubrik, "<p>Kommunal försöker utmana märket och vill ha en procent extra i en särskild satsning på yrkesutbildade undersköterskor.</p><p>”Kommunerna har inte gett oss mer pengar och vi har skenande kostnader på grund av inflationen”, säger Vårdföretagarna och vägrar gå med på kravet.</p><p>Förbundet går ut i strejk och begär sympatiåtgärder från andra förbund.</p><p>Vad gör du?</p>"];
            } else {
                output = [rubrik, "<p>Kommunal försöker utmana märket och vill ha en procent extra i en särskild satsning på yrkesutbildade undersköterskor.</p><p>”Kommunerna har inte gett oss mer pengar och vi har skenande kostnader på grund av inflationen”, säger Vårdföretagarna och vägrar gå med på kravet.</p><p>Förbundet går ut i strejk och begär sympatiåtgärder från andra förbund.</p>"];
            }
            
            return output;
        },
        img: ["img/kommunalstrejk1.svg", "img/kommunalstrejk2.svg"],
        alternativ: function(){
            return [
            {alternativ: "Sympatistrejk!", action: function(){
                sympatistrejk = true;
                strejkdagar += 1;
            }},
            {alternativ: "Kommunal får klara sig själva", action: function(){               
                return;
            }}
        ];},
        explainer: "",
    },
    {
        fraga: function () {
            let output;
            let cont = document.body;
            cont.classList.remove("strejk");
            if (sympatistrejk) {
                let cont = document.body;
                output = ["Skokrav","<p>Nya strejker lamslår stora delar av samhället. Läget inom vården blir akut och staten skjuter till pengar för en extra lönesatsning på undersköterskorna.</p><p>Kommunal känner medvind och kräver fria arbetsskor till alla inom vården.</p><p>Ställer du dig bakom kravet?</p>"]
            } else {
                output = ["Skokrav","<p>Utan stöd från andra förbund tvingas Kommunal vika ner sig och skriva under avtalet.</p><p>Kommunal anklagar dig för att vara osolidarisk mot alla dem som kämpat hårt under pandemin.</p><p>Som kompensation vill de ha fria arbetsskor till alla inom vården.</p><p>Ställer du dig bakom kravet?</p>"]
            }
            
            return output;
        },
        alternateImage: true,
        img: function(){
            return ["img/skor1.svg", "img/skor2.svg"];
            },
        alternativ: function(){
            return [
            {alternativ: "Skor åt alla!", action: function(){
                arbetsskor = true;
            }},
            {alternativ: "Nej, nu räcker det väl?", action: function(){               
                return;
            }}
        ];},
        explainer: "",
    },
    {
        fraga: function () {
            let cont = document.body;
            cont.classList.remove("strejk");
            let output;
            if (market < 1.1 && arbetsskor) {
                output = ["Okej då", "”Med tanke på de rimliga lönekravet går vi väl med på arbetsskor då”, säger Vårdföretagen lite surt"]
            } else {
                if (laglonesatsning && arbetsskor) {
                    output = ["Kostar mycket","<p>– Allt ska rymmas inom märket, dundrar arbetsgivarna. Ska ni ha något extra drar vi det från märket, låglönesatsningen kostar 0,2 procentenheter och arbetsskor 0,1 procentenheter</p><p>Driver du det vidare blir alltså löneökningarna lägre för Kommunals medlemmar. <b>" + formatPercent.to(lonekrav - 0.3) + "</b> i stället för <b>" + formatPercent.to(lonekrav) + "</b>.</p><p>Vad gör du?</p>"]
                } else if (arbetsskor) {
                    output = ["Skor kostar!","<p>– Allt ska rymmas inom märket, dundrar arbetsgivarna. Vill ni ha skor drar vi det från märket och det kostar 0,1 procentenheter.</p><p>Driver du det vidare blir alltså löneökningarna lägre för Kommunals medlemmar, alltså <b>" + formatPercent.to(lonekrav - 0.1) + "</b> i stället för <b>" + formatPercent.to(lonekrav) + "<b>.</p><p>Vad gör du?</p>"]
                } else {
                    output = ["Klart?","Kommunal surar över skorna men slipper dra ner på lönekravet och skriver till slut på avtalet. Nu är väl avtalsrörelsen slut, eller?"]
                }
            }
            
            
            return output;
        },
        img: ["img/skor1.svg", "img/skor2.svg"],
        alternativ: function(){
            if (arbetsskor) {
                if (market < 1.1) {
                    return [
                        {alternativ: "Gå vidare", action: function(){
                            arbetsskor = true;
                        }}]
                } else {
                    return [
                        {alternativ: "Acceptera sänkningen", action: function(){
                            if (laglonesatsning && arbetsskor) {
                                lonekrav -= 0.3;
                            } else {
                                lonekrav -= 0.1;
                            }
                            
                            arbetsskor = true;
                        }},
                        {alternativ: "Inte värt det", action: function(){    
                            arbetsskor = false;           
                            return;
                        }}]
                }
            } else {
                return [
                    {alternativ: "Gå vidare", action: function(){
                        return
                    }}]
            }
            
        },
        explainer: "",
    },
    {
        fraga: function () {
            let output = ["Påskfirandet i fara","Skostriden är över och blickarna vänds mot butikspersonalen. Arbetsgivarna inom handeln vill sänka ob-tillägget på söndagar. Handels vägrar och varslar om påskstrejk.</p><p>Är det en kamp värd att ta eller borde Handels vika ner sig så att folk får ägg och sill till påsklunchen?</p>"];
            
            return output;
        },
        img: ["img/OB-striden1.svg", "img/OB-striden2.svg",],
        alternativ: function(){
            return [
            {alternativ: "Ta kampen!", action: function(){
                paskstrajk = true;
            }},
            {alternativ: "Vik ner dig", action: function(){               
                return;
            }}
        ];},
        explainer: "",
    },
    {
        fraga: function () {
            let output;
            if (paskstrajk) {
                output = ["Arbetsgivarna ger sig","<p>Arbetsgivarna lämnar ob-ersättningen i fred och kompenseras med en arbetsgrupp som ska utreda ob-ersättningarna till nästa avtalsrörelse.</p>"];
            } else {
                output = ["Arbetsgivarna vinner","Arbetsgivarna säger allvarsamt att man nu har ett rättvist och hållbart ersättningssystem och skrattar hela vägen till banken.</p><p>Handels medlemmar är rasande och de portar dig från din lokala ICA-butik för ditt svek."];
            }
            
            return output;
        },
        img: function(){
            if (paskstrajk) {
                return ["img/OB-resultat1.svg", "img/OB-resultat2.svg"];
            } else {
                return ["img/OB-resultat1.svg", "img/OB-resultat3.svg"];
            }
            
        },
        alternateImage: true,
        alternativ: function(){
            return [
            {alternativ: "Gå vidare", action: function(){
                return
            }}
        ];},
        explainer: "",
    },
    {
        fraga: function () {
            let output;
            output = ["Inflationstombolan","<p>Nu är avtalen klara med märket på <b>" + formatPercent.to(market) + "</b> som utgångspunkt. Men löneökningar i all ära. Vad som verkligen påverkar vad som blir kvar i plånboken är inflationen.</p><p>Ska Riksbankens räntehöjningar få effekt? Hur utvecklas kriget i Ukraina? Åt vilket håll går elpriserna?</p><p>Det är frågor som du inte kan påverka genom några val utan i stället får låta slumpen avgöra.</p>"]
            
            return output;
        },
        img: ["img/tombola1.svg", "img/tombola2.svg"],
        alternativ: function(){
            return [
            {alternativ: "Slumpa inflationen", action: function(){
                inflation = randomFromArray([10, 15, 5]);
            }}
        ];},
        explainer: "",
    },
    {
        fraga: function () {
            let output;
            if (inflation == 5) {
                output = ["Inflationen sjunker", "<p>En ovanligt mild vinter gör att el- och bränslepriserna sjunker kraftigt. I kombination med Riksbankens räntehöjningar gör det att inflationen störtdyker, från tio till fem procent.</p>"];
            } else if (inflation == 10) {
                output = ["Inflationen står still","<p>El- och bränslepriserna har stabiliserats på en ganska hög, men inte galen nivå. Och trots Riksbankens räntehöjningar påverkas inflationen inte nämnvärt och stannar på tio procent.</p>"];
            } else {
                output = ["Inflationen skenar","<p>En iskall vinter ger skyhöga el- och bränslepriser. Samtidigt uppstår problem i de globala transportkedjorna som leder till att priset på mat och andra produkter ökar kraftigt.</p><p>Inflationen skjuter i höjden, från 10 till 15 procent.</p>"]
            }            
            return output;
        },
        img: function(){
            if (inflation == 5) {
                return ["img/inflationlag1.svg", "img/inflationlag2.svg"];
            } else if (inflation == 10) {
                return ["img/inflationmellan1.svg", "img/inflationmellan2.svg"];
            } else {
                return ["img/inflationhog1.svg", "img/inflationhog2.svg"];
            }
            
        },
        alternateImage: true,
        alternativ: function(){
            return [
            {alternativ: "Gå vidare", action: function(){
                return
            }}
        ];},
        explainer: "",
    },
    {
        fraga: function () {
            let rubrik = "Avtalsrörelsen är över";
            let skillnad = market - inflation;
            let skillnadString;
            let extraString = "<p>";

            let outputString = "";
            if (strejkdagar == 0) {
                outputString += "En konfliktfri avtalsrörelse är över. ";
            } else if (strejkdagar == 1) {
                outputString += "En relativt smidig avtalsrörelse är över. ";
            } else {
                outputString += "En konfliktfylld avtalsrörelse är över. "
            }
            
            outputString += "Löneökningen blev <b>" + formatPercent.to(market) + "</b>";

            if (skillnad < 0) {
                skillnadString = " vilket innebär att lönen i praktiken (reallönen) har minskat med <b>" + formatPercent.to(skillnad * -1) + "</b> med en inflation på <b>" + formatPercent.to(inflation) + "</b>.</p>"
            } else if (skillnad == 0) {
                skillnadString = " vilket innebär att lönen i praktiken inte har förändrats.</p>"
            } else {
                skillnadString = " vilket innebär att lönen i praktiken (reallönen) har ökat med <b>" + formatPercent.to(skillnad) + "</b>.</p>"
            }

            outputString += skillnadString;

            if (skillnad < -10) {
                outputString += "<p>Medlemmarna är rasande över hur dålig du är på att förhandla. Alla blir mycket fattigare och de fackliga medlemskapen störtdyker. Du avsätts på nästa kongress.</p>";
            } else if (skillnad < -5) {
                outputString += "<p>Löntagarna blir betydligt fattigare. Många medlemmar är missnöjda och vissa väljer att gå ur facket i protest.</p>";
            } else if (skillnad < -3) {
                outputString += "<p>Många medlemmar muttrar över hålen i plånboken, men förstår ändå att inflationen är svår att komma runt.</p>";
            } else if (skillnad >= 0) {
                outputString += "<p>Arbetsgivarna gnäller om skenande lönekostnader, men löntagarna har inte blivit fattigare. Med den här inflationen var det ett rätt bra resultat ändå.</p>";
            } else {
                outputString += "<p>Arbetsgivarna är bittra över kostnaderna, men löntagarna har inte blivit så mycket fattigare. Med den här inflationen var väl det ett rätt bra resultat ändå.</p>";
            }

            if (market < 1.1) {
                if (laglonesatsning && arbetsskor) {
                    extraString += " Kommunalarna har fått fria arbetsskor och en låglönesatsning.";
                } else if (laglonesatsning) {
                    extraString += " Kommunalarna har fått en låglönesatsning.";
                } else if (arbetsskor) {
                    extraString +=  "Kommunalarna har fått fria arbetsskor.";
                }
            } else {
                if (laglonesatsning && arbetsskor) {
                    extraString += " Kommunalarna har fått fria arbetsskor och en låglönesatsning men fått ta av löneökningarna och landar på  <b>" + formatPercent.to(lonekrav) + "</b>.";
                } else if (laglonesatsning) {
                    extraString += " Kommunalarna har fått en låglönesatsning men fått ta av löneökningarna och landar på <b>" + formatPercent.to(lonekrav) + "</b>.";
                } else if (arbetsskor) {
                    extraString +=  "Kommunalarna har fått fria arbetsskor men fått ta av löneökningarna och landar på <b>" + formatPercent.to(lonekrav) + "</b>.";
                }
            }

            if (paskstrajk) {
                extraString += " De anställda i handeln får behålla sitt ob-tillägg på söndagar."
            }

            
            if (extraString.length > 3) {
                outputString += extraString + "</p>";
            } 

            outputString += "<p>Skriv in din lön i rutan nedan för att räkna på vad avtalet skulle betyda för dig.</p>"
            let output = [rubrik, outputString]
            return output;
        },
        img: function(){
            let skillnad = market - inflation;
            if (skillnad < -3) {
                return ["img/resultat1.svg", "img/resultat2.svg"];
            } else {
                return ["img/resultat3.svg", "img/resultat4.svg"];
            }            
        },
        alternateImage: true,
        alternativ: function(){
            return [
            {alternativ: "Räkna på din lön", action: function(){
                dinLon = document.getElementById("formvalue").value;               
            }},
            {alternativ: "Spela igen", action: function(){
                rensaSpelet();
            }},
        ];},
        rattSvar: "",
        explainer: "",
        payForm: true,
    },
    {
        fraga: function () {
            dinLon = parseInt(dinLon.replace(/[^0-9]/g, ''));
            lonInnan = formatKronor.to(dinLon);
            lonEfter = formatKronor.to((dinLon * (market / 100)) + dinLon);
            skillnad = market - inflation;
            lonInflation = formatKronor.to((dinLon * (skillnad / 100)) + dinLon);

            output = ["Lönedomen", "<p>Din lön på <b>" + lonInnan + "</b> blir <b>" + lonEfter + "</b> efter lönehöjningen på <b>" + formatPercent.to(market) + "</b>.</p>Men med en inflation på <b>" + formatPercent.to(inflation) + "</b> blir den i praktiken värd <b>" + lonInflation + "</b> jämfört med förra året.</p>"];
            return output;
        },
        img: ["img/lonedomen1.svg", "img/lonedomen2.svg",],
        alternativ: function(){
            return [
            {alternativ: "Spela igen", action: function(){
                rensaSpelet();
            }},
        ];},
        rattSvar: "",
        explainer: "",
    },
];



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
                image.src = imageArray[1];
                interval = false;
            } else {
                image.src = imageArray[0];
                interval = true;
            }        
        }, 1000)
    }

}

let slider
function createSlider() {
    if (questions[testIndex].slider) {
        slider = document.getElementById("slider");
        noUiSlider.create(slider, {
            start: [lonekrav],
            step: 0.1,
            connect: true,
            range: {
                min: 0,
                max: 20
            },
            pips: {
                mode: "positions",
                values: [0,25,50,75,100],
                density: 5
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
        questions[testIndex].alternateImage ? imageSwitch(questions[testIndex].img()) : imageSwitch(questions[testIndex].img);
        if (this.madeChoice == false) {
            createSlider();
        }
        informHeight();
        informScrollIntoView();
        console.log("Kallar på informScrollIntoView!")
    },

    view: function() {
        fragaArray = questions[testIndex].fraga();
        return m("div.container", {id:"container"}, [
            questions[testIndex].alternateImage ? m("img.questionImg", {src: questions[testIndex].img()[0], id: "image"}) : m("img.questionImg", {src: questions[testIndex].img[0], id: "image"}),
            m("h2.u-spacingTopS.u-spacingBottomXS", fragaArray[0]),
            m("p.questionBox.u-spacingBottomM", m.trust(fragaArray[1])),
            questions[testIndex].slider ? m("div.slidecontainer.u-spacingTopXXL.u-spacingBottomXXXL", m("div", {id: "slider"})) : "",
            questions[testIndex].payForm ? m("div.formcontainer.u-spacingBottomXXXL", m("input.lonInput.u-textMeta", {id: "formvalue", type:"text", value: "20 000"})) : "",
            m("div.buttondiv.u-spacingTopM", questions[testIndex].alternativ().map(function(fraga, index) {
                return m("button.Button.answerButton.u-spacingBottomS.u-spacingRightS.u-textUppercase", {
                    id: "question-" + index,
                    onclick: function(e) {
                        e.target.classList.add("clickedButton");
                        e.target.classList.remove("unclickedButton");
                        e.redraw = false;
                        testIndex += 1;
                        let conta = document.getElementById("container");
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
