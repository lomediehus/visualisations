gsap.registerPlugin(ScrollTrigger);

gsap.to(".rect_right", {opacity:1, x:200, scrollTrigger:{
  trigger: ".scroller",
  markers:true,
  start: "top 400",
  // end: "top 25",
  // events: onEnter onLeave onEnterBack onLeaveBack
  toggleActions: "restart reverse reverse reverse"
}
})

console.log( body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight)

  console.log(informScrollIntoView())

informHeight();