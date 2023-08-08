//function to get the correct favicon for the github page
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

const c = console.log.bind(document);


const scrollElements = document.querySelectorAll(".js-scroll");

scrollElements.forEach((el) => {
  el.style.opacity = 0
})

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;


  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

// const elementInView = (el, scrollOffset = 0) => {
//   const elementTop = el.getBoundingClientRect().top;
//   c(scrollOffset)
//   // c(elementTop)
//
//   return (
//     elementTop <=
//     ((window.innerHeight || document.documentElement.clientHeight) - scrollOffset)
//   );
// };





const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {

    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

informHeight();
