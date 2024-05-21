//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}


// var container_width = document.querySelector("#chart");
// var container_height = document.querySelector("#chart").getBoundingClientRect().height;
// c(container_height)
// var relX = container_width.offsetWidth;
// var background = document.querySelector("#background");
// c(background)
// c(relX);
// var duration = 0;
// if (relX > 800) {
// 	duration = 300; 
// } 
// else {
// 	duration = 150;
// }

// background.style.minHeight = container_height + 50 + "px";
// // background.style.minHeight = container_height + (0.06 * container_height) + "px";
// var moonwalk = gsap.to("#moon-container", { x: relX, duration: duration, ease: "linear"} );
// moonwalk.repeat(-1);

// Initialize Howler sound objects
const sound1 = new Howl({
  src: ['viskning.mp3'], // Provide the path to your first sound file
  loop: false,
  volume: 0.5
});

const sound2 = new Howl({
    src: ['cafesamtal.mp3'], // Provide the path to your second sound file
    loop: false,
    volume: 1.5
});

const sound3 = new Howl({
  src: ['barnskrik.mp3'], // Provide the path to your second sound file
  loop: false,
  volume: 1.5
});

const sound4 = new Howl({
  src: ['klippare.wav'], // Provide the path to your second sound file
  loop: false,
  volume: 1
});

const sound5 = new Howl({
  src: ['skott.wav'], // Provide the path to your second sound file
  loop: false,
  volume: 0.5
});
const soundArray = [sound1, sound2, sound3, sound4, sound5]


let duration = 2;
const tl = gsap.timeline({repeat: -1, repeatDelay: 1});

// animate two elements, then two more
// tl.to("#marker", {
//   y: -50,
//   duration: duration
// }, 0)
// .to("#steg1", {
//   y: -50,
//   duration: duration
// }, 0);

// tl.fromTo("#marker", {
//   y: -50,
// },
// {
//   y:-100,
//   duration: duration
// }, 0)
// .to("#steg2", {
//   y: -50,
//   duration: duration
// }, ">");



for (let i = 0; i <= 4; i++) {
    tl.to("#marker", {
      y: -50 * (i + 1), // Use (i + 1) to ensure immediate movement
      duration: 0.5,
      ease: "power2.inOut"
    }).to("#marker", {
        duration: 2,
        onStart: function() {
          let soundIndex = i % soundArray.length;
          console.log(soundIndex)
          console.log(i)
          if (soundEnabled) {
            soundArray[soundIndex].play();
          }
          },
          onComplete: function() {
            let soundIndex = i % soundArray.length;
            if (soundEnabled) soundArray[soundIndex].stop();
          }
    });
}


// Variable to track if sound is enabled
let soundEnabled = false;

document.getElementById('soundButton').addEventListener('click', function() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
      this.textContent = 'Ljud av';
  } else {
      sound1.stop();
      sound2.stop();
      sound3.stop();
      sound4.stop();
      sound5.stop();
      this.textContent = 'Ljud på';
  }
});
