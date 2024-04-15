gsap.registerPlugin(ScrollTrigger);

gsap.set(".pinwheel", {transformOrigin: "center center", xPercent: -50, x: 0, yPercent: -50, y: 0});

gsap.to(".pinwheel", {
  // opacity: 1,
  rotation: 360,
  ease: "none",
  scrollTrigger: {
    scroller: ".scroller",
    trigger: ".pinwheel",
    start: "center center",
    end: "+=800",
    pin: true,
    scrub: 1
  }
});

// gsap.set(".rect_right", {transformOrigin: "center center", xPercent: -50, x: 0, yPercent: -50, y: 0});

gsap.to(".rect_right", {
  opacity: 1,
  // rotation: 360,
  ease: "none",
  scrollTrigger: {
    scroller: ".scroller",
    trigger: ".rect",
    // start: "center center",
    // end: "+=800",
    start: 0,
    end: 0,
    // pin: true,
    scrub: 1
  }
});


// let comparison = document.querySelector(".comparison-section"),
//     tl = gsap.timeline({
// 			scrollTrigger: {
//         scroller: ".scroller",
// 				trigger: comparison,
// 				start: "center center",
//         // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
// 				end: () => "+=" + comparison.offsetWidth, 
// 				scrub: true,
// 				pin: true
// 			},
// 			defaults: {ease: "none"}
// 		});
// 	// animate the container one way...
// 	tl.fromTo(".after-image", { xPercent: 100, x: 0}, {xPercent: 0})
// 	  // ...and the image the opposite way (at the same time)
// 	  .fromTo(".after-image img", {xPercent: -100, x: 0}, {xPercent: 0}, 0);


informHeight();