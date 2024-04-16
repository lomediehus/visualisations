gsap.registerPlugin(ScrollTrigger);

gsap.to(".rect_right", {opacity:1, scrollTrigger:{
  // scroller:".container",
  trigger: ".rect_right",
  markers:true,
  start: "0 400",
  end: "100 50",
  // scrub:1,
  // pin:true
  // events: onEnter onLeave onEnterBack onLeaveBack
  // toggleActions: "restart pause reverse reset"
  // options: play pause resume reset restart complete reverse none
}
})


informHeight();