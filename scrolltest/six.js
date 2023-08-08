const fadeElements = document.querySelectorAll('.fade-element');
const windowHeight = window.innerHeight;
let firstElementVisible = false;

function handleScroll() {
  fadeElements.forEach((element, index) => {
    const elementOffsetTop = element.offsetTop;
    const distanceFromTop = elementOffsetTop - window.scrollY;

    if (index === 0) {
      // For the first element, make it fully visible before moving to the second
      const opacity = Math.min(1, Math.max(0, 1 - distanceFromTop / (windowHeight - 100)));
      element.style.opacity = opacity.toString();

      if (opacity === 1 && !firstElementVisible) {
        firstElementVisible = true;
      }
    } else if (index === 1 && firstElementVisible) {
      // For the second element, start becoming visible after the first is fully visible
      const opacity = Math.min(1, Math.max(0, 1 - (distanceFromTop - 30) / (windowHeight - 100)));
      element.style.opacity = opacity.toString();
    }
    console.log("handle scroll")
    informHeight();
  });
}

// Attach the "scroll" event listener
window.addEventListener('scroll', handleScroll);
