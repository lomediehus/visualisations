gsap.registerPlugin(ScrollTrigger);

// gsap.set(".pinwheel", {transformOrigin: "center center", xPercent: -50, x: 0, yPercent: -50, y: 0});

// gsap.to(".pinwheel", {
//   // opacity: 1,
//   rotation: 360,
//   ease: "none",
//   scrollTrigger: {
//     scroller: ".scroller",
//     trigger: ".pinwheel",
//     start: "center center",
//     end: "+=800",
//     pin: true,
//     scrub: 1
//   }
// });

// gsap.set(".rect_right", {transformOrigin: "center center", xPercent: -50, x: 0, yPercent: -50, y: 0});

gsap.to(".rect_right", {
  opacity: 1,
  // rotation: 360,
  ease: "none",
  scrollTrigger: {
    scroller: ".scroller",
    trigger: ".rect",
    markers:true,
    // start: "center center",
    // end: "+=800",
    start: 0,
    end: 0,
    //pin keeps pin element in place until animation ends
    pin: ".rect_container",
    scrub: 1
  }
});

gsap.to(".rect_right2", {
  opacity: 1,
  // rotation: 360,
  ease: "none",
  scrollTrigger: {
    scroller: ".scroller",
    trigger: ".rect2",
    markers:true,
    // start: "center center",
    // end: "+=800",
    start: 0,
    end: 0,
    //pin keeps pin element in place until animation ends
    pin: ".rect_container2",
    scrub: 1
  }
});


informHeight();