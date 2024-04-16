gsap.registerPlugin(ScrollTrigger);

gsap.to(".rect_right", {opacity:1, scrollTrigger:{
  // scroller:".scroller",
  trigger: ".scroller",
  markers:true,
  start: "top center",
  end: "+=300",
  scrub:1,
  // pin:true
  // events: onEnter onLeave onEnterBack onLeaveBack
  // toggleActions: "restart pause reverse reset"
  // options: play pause resume reset restart complete reverse none
}
})


informHeight();