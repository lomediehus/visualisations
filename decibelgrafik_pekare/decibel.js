//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}


// Initialize Howler sound objects
const sound1 = new Howl({
  src: ['ljud/viskning.mp3'], // Provide the path to your first sound file
  loop: false,
  volume: 0.5
});

const sound2 = new Howl({
    src: ['ljud/faglar.mp3'], // Provide the path to your second sound file
    loop: false,
    volume: 1.5
});

const sound3 = new Howl({
  src: ['ljud/cafesamtal.mp3'], // Provide the path to your second sound file
  loop: false,
  volume: 1.5
});

const sound4 = new Howl({
  src: ['ljud/skolmatsal.mp3'], // Provide the path to your second sound file
  loop: false,
  volume: 1
});

const sound5 = new Howl({
  src: ['ljud/traktor.wav'], // Provide the path to your second sound file
  loop: false,
  volume: 5
});

const sound6 = new Howl({
  src: ['ljud/barnskrik.mp3'], // Provide the path to your second sound file
  loop: false,
  volume: 3.5
});

const sound7 = new Howl({
  src: ['ljud/grisar.mp3'], // Provide the path to your second sound file
  loop: false,
  volume: 1.5
});

const sound8 = new Howl({
  src: ['ljud/skott.wav'], // Provide the path to your second sound file
  loop: false,
  volume: 2
});

const soundArray = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8]


let duration = 2;
const tl = gsap.timeline({repeat: -1, repeatDelay: 1});

for (let i = 0; i <= 7; i++) {
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
      sound6.stop();
      sound7.stop();
      sound8.stop();
      this.textContent = 'Ljud på';
  }
});
