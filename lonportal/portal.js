//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}

const boxes = document.querySelectorAll('.box');
const textbox = document.querySelectorAll('.textbox');


// // Animation function
// function wiggleBoxes() {
//     // Create a timeline
//     const tl = gsap.timeline({ repeat: -1 });

//     // Add animations for each box with elastic wiggle
//     boxes.forEach((box, index) => {
//         tl.fromTo(box, 
//             { rotation: 0 }, // Start with slight tilt
//             { 
//                 rotation: 2, // Return to neutral
//                 duration: 2,
//                 ease: Elastic.easeOut.config(5, 0.2) 
//             }
//         )
//         .to(box, {
//             rotation: -2, // Tilt left
//             duration: 2,
//             ease: Elastic.easeOut.config(5, 0.2)
//         },"<" )

//         .to(box, {
//             fontSize: "20px", // Text grows
//             duration: 0.2,
//             ease: Power1.inOut
//         }, "<")
//         .to(box, {
//             fontSize: "18px", // Text shrinks back
//             duration: 0.2,
//             ease: Power1.inOut,
//         // }, "<")
//         // .to(box, {
//         //     clearProps: true
           
//         // })
//         // .addPause(0.5); // Add a pause between animations
//         // .set(box, { clearProps: "all" }) // Clear all properties
        
//         onComplete: () => {
//             gsap.set(box, { clearProps: "all" }); // Clear all properties immediately
//         }
//         }, "<")

//         .to({}, {duration:1}); // 1 seconds of dead space

//     });
//     // gsap.set(".box", { clearProps: true });


//     return tl;

// }

function wiggleBoxes() {
    // Create a timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Add animations for each box with elastic wiggle
    boxes.forEach((box, index) => {
        tl.fromTo(box, 
            { rotation: 0 }, // Start neutral
            { 
                rotation: 2, // Rotate right
                duration: 2,
                ease: Elastic.easeOut.config(5, 0.2) 
            }
        )
        .to(box, {
            rotation: 0, // Tilt left
            duration: 2,
            ease: Elastic.easeOut.config(5, 0.2),
            stagger: 0.3 // Stagger start times by 0.1 seconds

        }, "<")
        
        // .set(box, { clearProps: "all" })// Clear all properties immediately

        .to({}, {duration:1}, "<"); // 1 second of dead space
    });

    return tl;
}


wiggleBoxes();

// // 
// // WITH Timelines (cleaner, more versatile)
// var tl = gsap.timeline({repeat: -1, repeatDelay: 0, onComplete:console.log, onCompleteParams:["complete"]});

// tl.fromTo(".box", 
//     { rotation: 0 }, // Start neutral
//     { 
//         rotation: 2, // Rotate right
//         duration: 2,
//         ease: Elastic.easeOut.config(5, 0.2), 
//         stagger: 0.5
//     }
//    )
// tl.reverse();


// //WITH Timelines (cleaner, more versatile)
// boxes.forEach((box) => {
//     gsap.fromTo(".box", 
//     { rotation: 0 }, // Start neutral
//     { 
//         rotation: 2, // Rotate right
//         duration: 2,
//         ease: Elastic.easeOut.config(5, 0.2), 
//         stagger: 0.5,
//         reverse: true,
//         repeat: -1,
//     }
//         // gsap.set(".box", { clearProps: true })

// )});


