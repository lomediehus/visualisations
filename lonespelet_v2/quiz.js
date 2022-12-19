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
    "img/strejk1.svg",
    "img/strejk2.svg",
)

var formatPercent = wNumb({
    decimals: 1,
    suffix: ' procent',
    mark: ","
})


// game data

let inflation = 10;
let lonekrav = 4.4;
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

function rensaSpelet() {
    inflation = 10;
    lonekrav = 4.4;
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
}

function randomFromArray(arrary){
    let random = Math.floor(Math.random() * arrary.length);
    return arrary[random];
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
                    "<p>Det sen höst och facken inom industrin samlats för att bestämma lönekraven i vårens avtalsförhandlingar, det så kallade märket – modellen för alla andra löneökningar.</p><p>Inflationen ligger på skyhöga 10 procent, allt under det blir i realiteten en lönesänkning.</p><p> Vad ska facken kräva för procentuell höjning?</p>"
                ];
            }
            
        },
        img: ["img/skyline.png"],
        alternativ: function(){
            return [{alternativ: "Bestäm lönekravet", action: function(){
            lonekrav = slider.noUiSlider.get(true);
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
        img: ["img/1_ny.svg", "img/2NY.svg"],
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
        img: ["img/1_ny.svg", "img/2NY.svg"],
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
        img: ["img/1_ny.svg", "img/2NY.svg"],
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
                        testIndex += 2
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
        img: ["img/1_ny.svg", "img/2NY.svg"],
        alternativ: function(){
            if (lonekrav == arbetsgivarkrav) {
                return [
                    {alternativ: "Gå vidare", action: function(){
                        testIndex += 1
                    }},
                ]             
            } else {
                return [
                    {alternativ: "Gå med på arbetsgivarnas krav", action: function(){
                        lonekrav = arbetsgivarkrav;
                        testIndex += 1
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
        img: ["img/strejk1.svg", "img/strejk2.svg"],
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
                        }},
                    ]             
                } else {
                    return [
                        {alternativ: "Gå med på arbetsgivarnas krav", action: function(){
                            let cont = document.body;
                            cont.classList.remove("strejk");
                            lonekrav = arbetsgivarkrav;
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
            let rubrik = "Märket blev " + formatPercent.to(lonekrav) + "."
            market = parseFloat(lonekrav);
            let output
            let endstring = "<p>Men nu är i alla fall märket satt, alltså den löneökning övriga förbund har att förhålla sig till i sina avtalsrörelser.</p><p>Nu är det dags för övriga förbund att förhandla. Kommunal vill ha en procent extra i en särskild satsning på yrkesutbildade undersköterskor.</p>";
            if (lonekrav < 3) {
                output = [rubrik, "<p>Alldeles för lite, klagar arga medlemmarna och flera förbund ser medlemssiffrorna sjunka.</p>" + endstring];
            } else if (lonekrav < 7) {
                output = [rubrik, "<p>Alldeles för mycket, gnäller arbetsgivarna. Alldeles för lite, klagar medlemmarna.</p>" + endstring];
            } else {
                output = [rubrik, startstring + "<p>Alldeles för mycket, klagar arbetsgivarna.</p>" + endstring];
            }
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
        alternativ: function(){
            return [
            {alternativ: "Fortsätt", action: function(){
                return
            }},
        ];},
        rattSvar: "",
        explainer: "",
    },
    {
        fraga: function () {
            let rubrik = "Kärva tider";
            let output = [rubrik, "<p>”Det är kärva tider, kommunerna har inte gett oss mer pengar och vi har skenande kostnader på grund av inflationen”, säger Vårdföretagarna och vägrar gå med på kraven från Kommunal.</p><p>Förbundet går ut i strejk och begär sympatiåtgärder från andra förbund.</p><p>Är det rimligt att de får mer än andra eller har arbetsgivaren rätt?</p>"];
            
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
        alternativ: function(){
            return [
            {alternativ: "Sympatistrejk!", action: function(){
                sympatistrejk = true;
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
            if (sympatistrejk) {
                let cont = document.body;
                cont.classList.add("strejk");
                output = ["Sympatistrejk","<p>Nya strejker lamslår stora delar av samhället. Läget inom vården blir akut och staten skjuter till pengar för en extra lönesatsning på undersköterskorna.</p><p>Kommunal känner medvind och kräver fria arbetsskor till alla inom vården.</p><p>Ställer du dig bakom kravet?</p>"]
            } else {
                output = ["Osolidariskt","<p>Utan stöd från andra förbund tvingas Kommual vika ner sig och skriva under avtalet.</p><p>Kommunal anklagar dig för att vara osolidarisk mot alla dem som kämpat hårt under pandemin.</p><p>Som kompensation vill de ha fria arbetsskor till alla inom vården.</p><p>Ställer du dig bakom kravet?</p>"]
            }
            
            return output;
        },
        img: ["img/strejk1.svg", "img/strejk2.svg"],
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
            if (laglonesatsning && arbetsskor) {
                output = ["Kostar mycket","<p>– Allt ska rymmas inom märket, dundrar arbetsgivarna. Ska ni ha något extra drar vi det från märket, låglönesatsningen kostar 0,2 procent och arbetsskor 0,1 procent</p><p>Driver du det vidare blir alltså löneökningarna lägre. " + formatPercent.to(lonekrav - 0.3) + " i stället för " + formatPercent.to(lonekrav) + ".</p><p>Vad gör du?</p>"]
            } else if (arbetsskor) {
                output = ["Skor kostar!","<p>– Allt ska rymmas inom märket, dundrar arbetsgivarna. Vill ni ha skor drar vi det från märket och det kostar 0,1 procent.</p><p>Driver du det vidare blir alltså löneökningarna lägre, alltså " + formatPercent.to(lonekrav - 0.1) + " i stället för " + formatPercent.to(lonekrav) + ".</p><p>Vad gör du?</p>"]
            } else {
                ["Klart?","Kommunal surar över skorna men slipper dra ner på lönekravet och skriver till slut på avtalet. Nu är väl avtalsrörelsen slut, eller?"]
            }
            
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
        alternativ: function(){
            if (arbetsskor) {
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
            let output = ["Påskfirandet i fara","Arbetsgivarna inom handeln vill slopa det höga ob-tillägget på söndagar. Handels vägrar och varslar om påskstrejk</p><p>Är det en kamp värd att ta eller borde Handels vika ner sig så att folk får ägg och sill till påsklunchen?</p>"];
            
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
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
                output = ["Arbetsgivarna ger sig","<p>Arbetsgivarna lämnar ob-ersättningen i fred och kompenseras med arbetsgrupp som ska utreda ob-ersättningarna till nästa avtalsrörelse.</p>"];
            } else {
                output = ["Arbetsgivarna vinner","Arbetsgivarna säger allvarsamt att man nu har ett rättvist och hållbart ersättningssystem och skrattar de hela vägen till banken.</p><p>Handels medlemmar är rasande och de portar dig från din lokala ICA-butik för ditt svek."];
            }
            
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
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
            output = ["Inflationstombolan","<p>Nu är avtalen klara med märket på " + formatPercent.to(lonekrav) + " som utgångspunkt. Men löneökningar i all ära. Vad som vekligen påverkar vad som blir kvar i plånboken är inflationen.</p><p>Ska Riksbankens räntehöjningar få effekt? Hur utvecklas kriget i Ukraina? Åt vilket håll går elpriserna?</p><p>Det finns många faktorer som påverkar vad den slutliga löneökningen innebär för köpkraften.</p>"]
            
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
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
                output = ["Inflationen sjunker", "<p>En ovanligt mild vinter gör att elpriserna sjunker kraftigt. I kombination med Riksbankens räntehöjningar gör det att inflationen störtdyker, från tio till fem procent.</p>"];
            } else if (inflation == 10) {
                output = ["Inflationen står still","<p>Elpriserna har stabiliserats på en ganska hög, men inte galen nivå. Och trots Riksbankens räntehöjningar påverkas inflationen inte nämnvärt och stannar på tio procent.</p>"];
            } else {
                output = ["Inflationen skenar","<p>En iskall vinter ger skyhöga elpriser. Samtidigt uppstår problem i de globala transportkedjorna som leder till att priset på mat och andra produkter ökar kraftigt.</p><p>Inflationen skjuter i höjden, från 10 till 15 procent.</p>"]
            }            
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
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

            let outputString = "<p>Avtalsrörelsen är över. Löneökningen blev " + formatPercent.to(market);

            if (skillnad < 0) {
                skillnadString = " vilket innebär att lönen i praktiken (reallönen) har minskat med " + formatPercent.to(skillnad) + " med en inflation på " + formatPercent.to(inflation) + ".</p>"
            } else if (skillnad == 0) {
                " vilket innebär att lönen i praktiken inte har förändrats.</p>"
            } else {
                " vilket innebär att lönen i praktiken (reallönen) har ökat med " + formatPercent.to(skillnad) + ".</p>"
            }

            if (laglonesatsning && arbetsskor) {
                extraString += " Kommunalarna har fått fria arbetsskor och en låglönesatsning men lägre löner än alla andra på  " + formatPercent.to(lonekrav) + ".";
            } else if (laglonesatsning) {
                extraString += " Kommunalarna har fått en låglönesatsning men lägre löneökning än alla andra på " + formatPercent.to(lonekrav) + ".";
            } else if (arbetsskor) {
                extraString +=  "Kommunalarna har fått fria arbetsskor men lägre löneökning än alla andra på " + formatPercent.to(lonekrav) + ".";
            }
            if (paskstrajk) {
                extraString += " De anställda i Handeln får behålla sitt ob-tillägg på söndagar."
            }

            outputString += skillnadString;
            if (extraString.length > 3) {
                outputString += extraString + "</p>";
            } 
            let output = [rubrik, outputString]
            return output;
        },
        img: ["img/1_ny.svg", "img/2NY.svg"],
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
