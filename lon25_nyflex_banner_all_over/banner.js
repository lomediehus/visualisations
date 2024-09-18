gsap.registerPlugin();

let tl = gsap.timeline({ repeat: -1, repeatDelay: 0 }); // Repeat infinitely

let xValue = 500;

// Define the animation sequence for each text
tl.fromTo("#b_text1", { x: xValue + "%"}, { x: "-" + xValue + "%", duration: 8 })
//   .to("#b_text1", { x: "-"+xValue + "%", opacity: 0, duration: 1, delay: 2 }) // Stay in the middle for 2 secs, then move left
  .fromTo("#b_text2", { x: xValue + "%"}, { x: "-" + xValue + "%", duration: 8 })
//   .to("#b_text2", { x: "-"+xValue + "%", opacity: 0, duration: 1, delay: 2 })
  .fromTo("#b_text3", { x: xValue + "%"}, { x: "-" + xValue + "%", duration: 8 });
//   .to("#b_text3", { x: "-" + xValue + "%", opacity: 0, duration: 1, delay: 2 });


//   // Define the animation sequence for each text
// tl.fromTo("#b_text1", { x: xValue + "%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1 })
// .to("#b_text1", { x: "-"+xValue + "%", opacity: 0, duration: 1, delay: 2 }) // Stay in the middle for 2 secs, then move left
// .fromTo("#b_text2", { x: xValue + "%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1 })
// .to("#b_text2", { x: "-"+xValue + "%", opacity: 0, duration: 1, delay: 2 })
// .fromTo("#b_text3", { x: xValue + "%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1 })
// .to("#b_text3", { x: "-" + xValue + "%", opacity: 0, duration: 1, delay: 2 });

