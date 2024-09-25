gsap.registerPlugin(TextPlugin);


// gsap.to("#texten", {
//     delay: 3,
//     duration: 2,
//     text: "Vi har ändrat våra 'turer' så att man alltid får 11 timmars vila mellan kväll och dag pass.",
//     ease: "none",
//   });



  const ryggpass = ["Vi har ändrat våra 'turer' så att man alltid får 11 timmars vila mellan kväll och dag pass.", "Olika starttider och sluttider.", "Tidigare hemgång vissa pass, börjar senare vissa pass.", "Turerna för när kvällspass slutar samt morgon pass börjar har förändrats och förskjutits.", "Justeringar i klockslag när medarbetare på natt börjar sitt pass och slutar sitt pass.", "Anpassat arbetstiderna. Kvällspass slutar en del 21 och någon 20.30 samt att någon börjar 7, någon 7.30 och någon 8.", "Kortat ner kvällspass och senarelagt morgonpass på säbo.", "Vi har sedan tidigare haft uppdelat med scheman med bara kvällspass och andra med bara dagpass.", "Morgonpassen är senarelagda och en del ensamarbete förekommer vi skiftbyte dag/natt samt natt/dag.", "Längre kvällspass, mindre delade turer vid vissa enheter, kortare dagpass.", "Långa pass.", "Justering av start och sluttider.", "En konsekvens av borttagandet av ryggpass är att fyra kvällspass i rad nu blivit vanligare."]

  ryggpass.forEach(element => {
    console.log(element)
    gsap.to("#texten", {
      delay: 3,
      duration: 2,
      text: element,
      ease: "none",
    });
  


    // Function to loop through text array and switch texts using GSAP
    function switchTexts(index = 0) {
      gsap.to("#texten", {
        duration: 2,  // How long the text animation should take
        text: ryggpass[index], // Set the current text from the array
        ease: "none",
        onComplete: () => {
          // Wait 3 seconds, then switch to the next text
          gsap.delayedCall(6, () => {
            // Move to the next index, reset to 0 if we reached the end of the array
            switchTexts((index + 1) % ryggpass.length);
          });
        }
      });
    }
  
    // Start the loop
    switchTexts();
    
  });