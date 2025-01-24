
  let quizName = "Arbetsmiljötestet"
  
  var root = document.body;

function getDocumentHeight() {
    return Math.max(
        html.offsetHeight,
    );
}
  
  var sliderDescriptions = [
    " Du har valt ett. Det betyder att påståendet inte alls stämmer",
    " Du har valt två. Det betyder att påståendet delvis inte stämmer",
    " Du har valt tre. Det betyder att påståendet varken stämmer eller inte stämmer",
    " Du har valt fyra. Det betyder att påståendet delvis stämmer",
    " Du har valt fem. Det betyder att påståendet stämmer helt"
  ];
  
  var questions = [
    {
      rubrik: "Socialt klimat",
      fraga: "Det finns en positiv laganda på min arbetsplats.",
      blurb: "Dra i spaken mellan 1 och 5 för att gradera hur väl du känner igen dig i påståendet.",
      result: null
    },
    {
      rubrik: "Socialt klimat",
      fraga: "Jag känner mig sällan utanför på min arbetsplats.",
      blurb: "Att alla är med i gemenskapen är viktigt för trivsel och psykiskt välmående.",
      result: null
    },
    {
      rubrik: "Socialt klimat",
      fraga: "Alla arbetskamrater behandlas respektfullt.",
      blurb: "Man behöver inte gilla alla på jobbet, men man måste respektera varandra.",
      result: null
    },
    {
      rubrik: "Socialt klimat",
      fraga:
        "Jag får uppskattning från mina arbetskamrater när jag gjort ett bra jobb.",
      blurb: "Beröm och återkoppling skapar positiv stämning och gör att man utvecklas och känner sig sedd.",
      result: null
    },
    {
      rubrik: "Socialt klimat",
      fraga:
        "Min närmaste chef lyssnar på mig när jag kommer med synpunkter och förslag.",
      blurb: "En bra chef lyssnar på idéer och synpunkter, även om de inte alltid påverkar besluten.",
      result: null
    },
    {
      rubrik: "Delaktighet och utveckling",
      fraga: "Jag tillfrågas om mina synpunkter och idéer på min arbetsplats.",
      blurb: "Fler hjärnor tänker bättre än en, och fler känner sig delaktiga i resultatet.",
      result: null
    },
    {
      rubrik: "Delaktighet och utveckling",
      fraga:
        "Våra arbetsplatsträffar och informationsmöten fungerar bra och känns meningsfulla.",
      blurb: "Bra möten lyfter en arbetsgrupp. Dåliga skapar irritation och stress.",
      result: null
    },
    {
      rubrik: "Delaktighet och utveckling",
      fraga:
        "Mina arbetsuppgifter känns för det mesta intressanta och meningsfulla.",
      blurb: "Vi tillbringar mycket tid på jobbet. Det är lättare om man känner att man gör något bra.",
      result: null
    },
    {
      rubrik: "Delaktighet och utveckling",
      fraga:
        "Jag har tillräcklig utbildning och kompetens för att klara mina arbetsuppgifter.",
      blurb: "Osäkerhet stressar. Du ska få den utbildning och det stöd som krävs för att du ska klara ditt jobb.",
      result: null
    },
    {
      rubrik: "Delaktighet och utveckling",
      fraga:
        "Om jag behöver utveckla min kompetens i något avseende, t ex genom utbildning, så brukar det inte vara något problem att få det.",
      blurb: "Det är arbetsgivarens ansvar att ge dig kompetensutveckling vid behov.",
      result: null
    },
    {
      rubrik: "Arbetsorganisation och ledning",
      fraga:
        "Jag har stor frihet i mitt arbete att själv avgöra hur mitt arbete ska genomföras.",
      blurb: "Du kanske inte kan bestämma VAD som ska göras, men om du kan påverka HUR det ska göras mår du ofta bättre på jobbet.",
      result: null
    },
    {
      rubrik: "Arbetsorganisation och ledning",
      fraga: "Min arbetsbelastning känns inte påfrestande.",
      blurb: "Om du ofta känner att du inte räcker till eller hinner med, är det dags för ett allvarligt samtal med chefen.",
      result: null
    },
    {
      rubrik: "Arbetsorganisation och ledning",
      fraga:
        "Det ges utrymme för återhämtning efter ett fysiskt eller psykiskt krävande arbete.",
      blurb: "Kortvarig stress är inte farligt, men du måste få tid att återhämta dig annars riskerar du att bli sjuk av stress. Fysisk återhämtning är också viktigt.",
      result: null
    },
    {
      rubrik: "Arbetsorganisation och ledning",
      fraga:
        "Vi har en lämplig arbetsorganisation för att möta de krav som ställs på oss.",
      blurb: "Är ni tillräckligt många med rätt kompetens? Rätt organisation är avgörande för arbetsmiljön.",
      result: null
    },
    {
      rubrik: "Arbetsorganisation och ledning",
      fraga:
        "Då det uppstår problem ställer ledningen upp och försöker hjälpa till.",
      blurb: "Att chefen har tid och kan stötta dig är viktigt.",
      result: null
    },
    {
      rubrik: "Fysisk arbetsmiljö",
      fraga:
        "Våra arbetslokaler är bra, t ex vad beträffar rymlighet, ändamålsenlighet, underhåll, städning, ordning, personalutrymmen.",
      blurb: "En bra fysisk arbetsmiljö minskar olycksrisken och gör att du trivs på jobbet.",
      result: null
    },
    {
      rubrik: "Fysisk arbetsmiljö",
      fraga:
        "Jag har inga ohälsosamma fysiska belastningar i mitt arbete, t ex vad beträffar tunga lyft, ensidigt arbete, dålig arbetsställning.",
      blurb: "Arbetsgivaren ska se till så att du har de hjälpmedel du behöver för att inte blir sjuk eller skadad.",
      result: null
    },
    {
      rubrik: "Fysisk arbetsmiljö",
      fraga: "Jag utsätts inte för buller eller vibrationer i mitt arbete.",
      blurb: "Buller och vibrationer ska tas på allvar. Ta upp frågan med chef och skyddsombud om det behövs.",
      result: null
    },
    {
      rubrik: "Fysisk arbetsmiljö",
      fraga:
        "Olycksfallsrisken i mitt arbete är låg, t ex vad gäller fall, halka, nedfallande föremål, slag, påkörning, explosion, läckage/spill av kemikalier.",
      blurb: "Har ni gjort riskanalyser på jobbet av de faror som finns? Det ska göras enligt lagen.",
      result: null
    },
    {
      rubrik: "Fysisk arbetsmiljö",
      fraga:
        "Personlig skyddsutrustning finns att tillgå i mitt arbete när behov finns.",
      blurb: "Arbetsgivaren ska tillhandahålla skyddskläder och skyddsutrustning om det behövs. Du ska använda det. Det livsviktigt på riktigt.",
      result: null
    }
  ];
  
  var answers = [
    "Aj då! Det här ser inte bra ut. Här finns mycket att förbättra, för så här kan du ju inte ha det. Arbetsgivaren ska se till att du har en god arbetsmiljö på jobbet. Det är dags att ta ett allvarligt samtal med chef och skyddsombud om detta. Ni har behov av en gemensam arbetsmiljökartläggning som sedan resulterar i en åtgärdsplan och förändringar för att skapa en bättre arbetsmiljö.",
    "Nja, inte så bra. Det här var ingen höjdare precis. Här finns stort utrymme till förbättringar av arbetsmiljön och det är arbetsgivaren som ska se till att problemen åtgärdas. Ta ett snack med chef och skyddsombud om detta. En gemensam arbetsmiljökartläggning för alla på jobbet, som sedan resulterar i en åtgärdsplan, är en bra idé.",
    "Grattis! Du har det riktigt bra på jobbet, eller hur? Några brister kan dock fortfarande finnas, och det är ändå viktigt att fortsätta att arbeta med arbetsmiljön. Det går nästan alltid att förbättra något. Det är ju din hälsa och ditt jobb det handlar om.",
    "Grattis!! Full pott. Några brister kan dock fortfarande finnas, och det är ändå viktigt att fortsätta att arbeta med arbetsmiljön. Det går nästan alltid att förbättra något. Det är ju din hälsa och ditt jobb det handlar om."
  ];
  
  var hem = {
    oncreate: function() {
      console.log(getDocumentHeight());
      informHeight();
    },
    view: function() {
      return m("div.container", [
        m("div.Label", quizName),
        m("h1.u-textMetaDeca.u-spacingTopM", "Välkommen"),
        m(
          "p.textBlock.u-spacingTopM",
          "Det här är ett test för att få en snabb koll på din arbetsmiljö. Låt arbetsmiljöroboten guida dig genom 20 påståenden och få svar på hur din arbetsmiljö faktiskt ser ut."
        ),
        m(
          "p.textBlock.u-spacingTopM",
          "Testet består av fyra delar med fem påståenden i varje del och tar ungefär fem minuter genomföra. Din uppgift är att gradera hur väl påståendet stämmer överens med din situation, på en skala mellan ett och fem."
        ),
        m("div.messageBox.u-spacingTopM", [
          m("img.messageImg", {
            src: "robot2.png"
          }),
          m(
            "div.bubbledLeft.u-textMeta",
            ("p", "Klicka på knappen nedan för att starta.")
          )
        ]),
        m(
          "button.Button.u-spacingTopM",
          {
            onclick: function() {
              m.mount(root, test);
            }
          },
          "Starta testet"
        )
      ]);
    }
  };
  
  var testIndex = 0;
  
  var slider;
  
  var test = {
    madeChoice: false,
    slidernumber: 3,
    oncreate: function() {
      slider = document.getElementById("slider");
  
      noUiSlider.create(slider, {
        start: [3],
        step: 1,
        connect: true,
        range: {
          min: 1,
          max: 5
        },
        pips: {
          mode: "values",
          values: [1, 2, 3, 4, 5],
          density: 4
        }
      });
      slider.noUiSlider.on("change", function() {
        test.madeChoice = true;
        m.redraw();
      });
      informHeight();
      slider.querySelector(".noUi-pips").classList.add("u-textMeta");
    },
    onupdate: function() {
      informHeight();
      console.log(getDocumentHeight())
    },
  
    view: function() {
      let inputText = "";
      var questionBox = [
        m("div.Label", quizName),
        m("p.u-textMeta.u-spacingTopM", "Fråga " + (testIndex + 1) + " av " + questions.length),
        m("h1.u-textMetaDeca", questions[testIndex].rubrik),    
        m("p.questionBox.u-spacingTopM", '”' + questions[testIndex].fraga + '”'),
  
        m(
          "div.slidecontainer.u-spacingTopL.u-spacingBottomXXXL",
          m("div", { id: "slider" })
        ),
  
        m("div.messageBox.u-spacingTopM", [
          m("img.messageImg", {
            src: "robot2.png"
          }),
          m(
            "div.bubbledLeft.u-textMeta",
            ("p",
            test.madeChoice
              ? sliderDescriptions[parseInt(slider.noUiSlider.get()) - 1]
              : questions[testIndex].blurb)
          )
        ]),
        m(
          "div.buttondiv",
          m(
            "button.Button.u-spacingTopM.u-spacingRightS",
            {
              onclick: function() {
                questions[testIndex].result = slider.noUiSlider.get();
                testIndex += 1;
                slider.noUiSlider.set(3);
                test.madeChoice = false;
                if (testIndex == questions.length) {
                  m.mount(root, done);
                }
              }
            },
            "Nästa fråga"
          ),
          testIndex > 0
            ? m(
                "button.Button.u-spacingTopM",
                {
                  onclick: function() {
                    if (testIndex > 0) {
                      testIndex -= 1;
                    }
                  }
                },
                "Backa"
              )
            : null
        )
      ];
  
      return m("div.container", [m("div", questionBox)]);
    }
  };
  
  var showDetails = false;
  
  let socialt, delaktighet, organisation, fysisk;
  let socialtString, delaktighetString, organisationString, fysiskString;
  
  var done = {
    oncreate: function() {
      console.log(questions);
      informHeight();
    },
    onupdate: function() {
      informHeight();
    },
    view: function() {
      var resultString;
      var totalPoints = 0;
      for (var x = 0; x < questions.length; x++) {
        totalPoints += parseInt(questions[x].result);
      }
      var maxPoints = questions.length * 5;
  
      if (totalPoints == 100) {
        resultString = answers[3];
      } else if (totalPoints > 79) {
        resultString = answers[2];
      } else if (totalPoints > 54) {
        resultString = answers[1];
      } else {
        resultString = answers[0];
      }
      
       socialt = questions
                    .slice(0, 5)
                    .reduce((a, b) => a + parseInt(b.result), 0);
                  delaktighet = questions
                    .slice(5, 10)
                    .reduce((a, b) => a + parseInt(b.result), 0);
                  organisation = questions
                    .slice(10, 15)
                    .reduce((a, b) => a + parseInt(b.result), 0);
                  fysisk = questions
                    .slice(15)
                    .reduce((a, b) => a + parseInt(b.result), 0);
                  console.log(socialt);
                  console.log(delaktighet);
                  console.log(organisation);
                  console.log(fysisk);
  
      return m("div.container", [
        m("div.Label", quizName),
        m("h1.u-textMetaDeca.u-spacingTopM", "Klar!"),
        m("div", [
          m(
            "p..u-spacingTopM",
            "Din arbetsmiljö fick " +
              totalPoints +
              " poäng av " +
              maxPoints +
              " möjliga. Scrolla ner för att se mer detaljer."
          ),
          m("div.messageBox.u-spacingTopM", [
            m("img.messageImg", {
              src:
                "robot2.png"
            }),
            m("div.bubbledLeft.u-textMeta", ("p", resultString))
          ])
        ]),
        m(
          "div.buttondiv",
          m(
            "button.Button.u-spacingTopM.u-spacingRightS",
            {
              onclick: function() {
                  window.print();
              }
            },
            "Skriv ut resultatet"
          ),
          m(
            "button.Button.u-spacingTopM",
            {
              onclick: function() {
                showDetails = false;
                testIndex = 0;
                questions.forEach(function(element) {
                  element.result = null;
                });
                console.log(questions);
                m.mount(root, hem);
              }
            },
            "Gör om testet"
          ),
          m(
            "div.detail.u-spacingTopM",
            questions.map(function(element, index) {
                  let output = [];
                  let color;
                  let answer;
  
                  let number;
                  switch (element.result) {
                    case "5.00":
                      color = ".green";
                      answer = "stämmer helt";
                      number = "5";
                      break;
                    case "4.00":
                      color = ".green";
                      answer = "stämmer delvis";
                      number = "4";
                      break;
                    case "3.00":
                      color = ".orange";
                      answer = "varken stämmer eller inte stämmer";
                      number = "3";
                      break;
                    case "2.00":
                      color = ".red";
                      answer = "stämmer delvis inte";
                      number = "2";
                      break;
                    default:
                      color = ".red";
                      answer = "stämmer inte alls";
                      number = "1";
                  }
  
                  if (index == 0 || index == 5 || index == 10 || index == 15) {
                    output.push(
                      m("h1.u-textMetaDeca.u-spacingTopM", element.rubrik)
                    );
                  }
                  if (index == 0) {
                    output.push(
                      m("p.u-textMeta.u-spacingBottomS", socialt + " av 25 poäng")
                    );
                  } else if (index == 5) {
                    output.push(
                      m(
                        "p.u-textMeta.u-spacingBottomS",
                        delaktighet + " av 25 poäng"
                      )
                    );
                  } else if (index == 10) {
                    output.push(
                      m(
                        "p.u-textMeta.u-spacingBottomS",
                        organisation + " av 25 poäng"
                      )
                    );
                  } else if (index == 15) {
                    output.push(
                      m("p.u-textMeta.u-spacingBottomS", fysisk + " av 25 poäng")
                    );
                  }
  
                  output.push(
                    m("p.u-textMeta", [
                      m("span.u-textMeta", element.fraga + " "),
                      m("br"),
                      m("span.u-textMeta.u-textStrong", "Ditt svar: "),
                      m("span.u-textMeta" + color, answer + " (" + number + ")")
                    ])
                  );
                  if (index == 4) {
                    output.push(
                      specialMessageBox(
                        messageArray(socialt, 
                                     "socialt klimat",
                                    [m("span", "Här kan läsa mer om ämnet: "),m("a", {href: "http://www.arbetsmiljoupplysningen.se/amnen/arbetsklimat", target: "_blank"}, "Arbetsmiljö-upplysningen")])
                      )
                    );
                  } else if (index == 9) {
                    output.push(
                      specialMessageBox(
                        messageArray(
                          delaktighet,
                          "delaktighet och utveckling",
                          [m("span", "Här finns ett verktyg för att kartlägga den organisatoriska och sociala arbetsmiljö på jobbet: "),m("a", {href: "https://www.prevent.se/osaenkaten/", target: "_blank"}, "Prevent")]
                        )
                      )
                    );
                  } else if (index == 14) {
                    output.push(
                      specialMessageBox(
                        messageArray(
                          organisation,
                          "arbetsorganisation och ledning",
                          [m("span", "Här kan du ladda ner föreskrifterna och en vägledning om organisatorisk och social arbetsmiljö: "),m("a", {href: "https://www.av.se/arbetsmiljoarbete-och-inspektioner/publikationer/bocker/vagledning-organisatorisk-social-arbetsmiljo-h457/", target: "_blank"}, "Arbetsmiljöverket")]
                        )
                      )
                    );
                  } else if (index == 19) {
                    output.push(
                      specialMessageBox(
                        messageArray(
                          fysisk,
                          "den fysiska arbetsmiljön",
                          [m("span", "Här finns nyttig information, regler och tips: "),m("a", {href: "https://www.av.se/arbetsmiljoarbete-och-inspektioner/arbeta-med-arbetsmiljon/", target: "_blank"}, "Arbetsmiljöverket")]            
                        )
                      )
                    );
                  }
                  
                  function messageArray(result, special, linkTip) {
                    let outputArray;
                    if (result < 15) {
                      outputString =
                        "Aj då! Resultatet för " + special + " ser inte bra ut.";
                    } else if (result < 20) {
                      outputString =
                        "Nja, Resultatet för " + special + " har mer att önska.";
                    } else if (result < 25) {
                      outputString =
                        "Grattis, Resultatet för " + special + " verkar vara bra.";
                    } else {
                      outputString =
                        "Grattis! Resultatet för " +
                        special +
                        " blev full pott. Några enstaka brister kan dock finnas så fortsätt jobba med arbetsmiljöfrågorna.";
                    }
                    return [m("p", outputString), m("p", linkTip)];
                  }
  
                  return output;
                })
          ),
          m(
          "div.buttondiv",
          m(
            "button.Button.u-spacingTopM.u-spacingRightS",
            {
              onclick: function() {
                  window.print();
              }
            },
            "Skriv ut resultatet"
          ),
          m(
            "button.Button.u-spacingTopM",
            {
              onclick: function() {
                showDetails = false;
                testIndex = 0;
                questions.forEach(function(element) {
                  element.result = null;
                });
                console.log(questions);
                m.mount(root, hem);
              }
            },
            "Gör om testet"
          ))
        )
      ]);
    }
  };
  
  function messageBox(message) {
    return m("div.messageBox.u-spacingTopM.u-spacingBottomXL", [
      m("img.messageImg", {
        src: "robot2.png"
      }),
      m("div.bubbledLeft.u-textMeta", ("p", message))
    ]);
  }
  
  function specialMessageBox(inputArray) {
    return m("div.messageBox.u-spacingTopM.u-spacingBottomXL", [
      m("img.messageImg", {
        src: "robot2.png"
      }),
      m("div.bubbledLeft.u-textMeta", inputArray)
    ]);
  }
  
  var activeHeadline = "";
  
  m.mount(root, hem);
  
