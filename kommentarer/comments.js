gsap.registerPlugin(TextPlugin);

  const allakategorier = {
    ryggpass: ["Vi har ändrat våra turer så att man alltid får 11 timmars vila mellan kväll och dag pass.", "Olika starttider och sluttider.", "Tidigare hemgång vissa pass, börjar senare vissa pass.", "Turerna för när kvällspass slutar samt morgon pass börjar har förändrats och förskjutits.", "Justeringar i klockslag när medarbetare på natt börjar sitt pass och slutar sitt pass.", "Anpassat arbetstiderna. Kvällspass slutar en del 21 och någon 20.30 samt att någon börjar 7, någon 7.30 och någon 8.", "Kortat ner kvällspass och senarelagt morgonpass på säbo.", "Vi har sedan tidigare haft uppdelat med scheman med bara kvällspass och andra med bara dagpass.", "Morgonpassen är senarelagda och en del ensamarbete förekommer vi skiftbyte dag/natt samt natt/dag.", "Längre kvällspass, mindre delade turer vid vissa enheter, kortare dagpass.", "Långa pass.", "Justering av start och sluttider.", "En konsekvens av borttagandet av ryggpass är att fyra kvällspass i rad nu blivit vanligare."],
    helg: ["Vi har infört längre arbetspass på helger för att klara bemanning på morgon och kvällar.", "Vi har även infört helgtjänstgöring. De flesta enheter har varannan helg.", "Helgtjänster har införts.", "Vi genomförde förändringar redan 2020. Kortare nattpass och varannan helg.", "Fler rena helgtjänster. förändringar avseende tider i kvälls resp. dagpass.", "Kvällspass för nattpersonal samt att projekt införts med helgtjänstgöring (arbetar enbart fre-mån).", "Införande av helgtjänst.", "Långturer är införda några dagar på helger.", "Kortare arbetspass inför ledig helg.", "Vi har infört helgtjänster på prov.", "Vi gör individuella anpassningar varpå medarbetare som önskar jobbar fler kvällar och helger.", "Infört tjänster med ständig helgtjänstgöring."],
    flexibilitet: ["Schemaläggningen har blivit mindre flexibel, och medarbetarna har sämre möjlighet att byta pass med en kollega.", "Mindre flexibilitet påverkar upplevelsen negativt.", "Mindre delaktighet kring egen schemaläggning.", "Svårare att tillgodose personalens önskemål.", "Har medfört att det är svårt för personalen att byta turer med varandra.", "Mindre flexibilitet, svårare att byta turer, svårare att planera in utbildningar eller andra aktiviteter.", "Basschema har blivit vanligare pga elvatimmarsregeln, eftersom det blev svårare för medarbetare att lägga sina egna önskeschema.", "Det har blivit svårare för nattpersonal att medverka vid utbildningar och APT.", "Svårt att få till möten med nattanställda."],
    arbetssatt: ["Vi har längre schemaperioder inom hemtjänsten för att våra medarbetare ska kunna planera och balansera arbete/privatliv.", "Ja, förändringar har skett relaterat till hur exempelvis helgpass samt arbetsplatsträffar schemaläggs.", "Vi arbetar med att införa central schemaläggning.", "Inom hemtjänst har veckor med enbart kvällspass införts, och även veckor med enbart dagspass.", "Uppdelning av APT.", "Säbo: Nattpassen har förlängts på enstaka säbo. Ryggpass korrigeras genom att man slutar tidigare eller börjar senare.", "Delade turer/långturer har kortats.", "Infört tredagars ledighet på vissa områden."],
    ekonomi: ["Ekonomisk negativ påverkan.", "Minskat antal sammanhängande 3-dagarsledigheter per schemaperiod, kan avsluta med kvällspass inför ledig helg.", "Man har lagt in tillgänglig tid som planeras in i sista stund för att få ihop tim."]
  }
  // console.log(allakategorier)

  // Loop through each array by name
Object.keys(allakategorier).forEach(key => {
  const array = allakategorier[key];
  
  // Now 'key' is the name of the array, and 'array' is the actual array
  // console.log('Array Name:', key);
  // console.log('Array Content:', array);
  
  array.forEach((element, index) => {
    console.log(`${key}[${index}]: ${element}`);
    console.log(element.length);


    
    // You can call your switchTexts function here
    switchTexts(array, key);
  });
});

// switchTexts function
// function switchTexts(array, key, index = 0) {
//   gsap.to("#" + key + "-text", {
//     duration: 2,
//     text: array[index], // Set the current text from the array
//     ease: "none",
//     yoyo: true,
//     repeat: 1,
//     onComplete: () => {
//       // Wait 3 seconds, then switch to the next text
//       gsap.delayedCall(6, () => {
//         // Move to the next index, reset to 0 if we reached the end of the array
//         switchTexts(array, key, (index + 1) % array.length);
//       });
//   }
// });
// }

// switchTexts function
function switchTexts(array, key, index = 0) {
  // Animate the text to appear
  gsap.to("#" + key + "-text", {
    duration: 2,
    text: array[index], // Set the current text from the array
    ease: "none",
    onComplete: () => {
      // Show the text for 5 seconds
      gsap.delayedCall(5, () => {
        // Animate the text to disappear
        gsap.to("#" + key + "-text", {
          duration: 0.7,
          text: "", // Clear the text
          ease: "none",
          onComplete: () => {
            // Switch to the next text
            switchTexts(array, key, (index + 1) % array.length);
          }
        });
      });
    }
  });
}






  let startbubble = document.querySelector("#ryggpass .speach-bubble")
  // console.log(startbubble)

  let sections = document.getElementsByClassName("sektion")
  sections = [...sections]
  let speach_bubbles = document.getElementsByClassName("speach-bubble")
  speach_bubbles = [...speach_bubbles]
  let stage_wrapper = document.getElementsByClassName("stage-wrapper") 
  stage_wrapper = [...stage_wrapper]
  // console.log(stage_wrapper)

  sections.forEach(section => {
    section.addEventListener("click", function(event){
      speach_bubbles.forEach(bubble => {
        bubble.style.opacity = "0.5";
        bubble.querySelector(".kommentarer").style.opacity = "0"
        bubble.querySelector(".visa").style.display = "inline";
      })
      stage_wrapper.forEach(wrapper => {
        wrapper.style.visibility = "hidden"
      })
      // console.log(section)
      let pratbubblan = this.querySelector(".speach-bubble")
      let texten = pratbubblan.querySelector(".kommentarer")
      let visa = pratbubblan.querySelector(".visa")
      let prickar = this.querySelector(".stage-wrapper")
      pratbubblan.style.opacity = "1"
      texten.style.opacity = "1"
      visa.style.display = "none"
      prickar.style.visibility = "visible" 
      // console.log(this.querySelector(".speach-bubble"))
    })
  })


  