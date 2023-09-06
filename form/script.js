//make it possible to console log with c(tobelogged)
const c = console.log.bind(document);

//Get one favicon for localhost and another for github pages
let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
}


let link;
//flag that will be set to true if all fields are filled
let allFilled = false;
//counter for empty fiels
let countBlanks = 0;

//Chec if all radiobuttons are checked
function checkSelections() {
  // Get all fieldsets containing radio buttons
  const fieldsets = document.querySelectorAll('fieldset');

  // Flag to keep track of whether all sets have a selection
  let allSetsHaveSelection = true;

  // Loop through each fieldset
  fieldsets.forEach((fieldset) => {
    //nodelist with all radiobuttons in a fieldset
    const radioButtons = fieldset.querySelectorAll('input[type="radio"]');
    let setHasSelection = false;


    // Loop through radio buttons in the current fieldset
    radioButtons.forEach((radio) => {
      if (radio.checked) {
        setHasSelection = true;
      }
    });

    // If the current set doesn't have a selection, set the flag to false
    if (!setHasSelection) {
      allSetsHaveSelection = false;
    }

  });

  // Check if all sets have a selection. If at least one does not, or if one of the text fields are empty (countBlanks) give an error message. If no empty radio button or text field is found, change  allFilled to "true"
  if (!allSetsHaveSelection || countBlanks > 0) {
    alert("Du måste fylla i alla uppgifter!")
    console.log('Please select one option from each set.');
  } else {
    allFilled = true;
  }

}


//executes when the "Klar" button is clicked
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Create an array to store form data objects
    const dataArray = [];
  
    //Hard coded objects, should be as many as there are questions in the quiz
    const firstObject = { divid: "fraga1"};
    const secondObject = { divid: "fraga2"};
  
    //counter to keep track of how many form entries goes into each object
    let count = 0;
  
    // Loop through form entries and create objects
    for (const entry of formData.entries()) {
      const [key, value] = entry;
      //increase the countBlanks with one if an empty field is found
      if (value === ''){
        countBlanks++;
      }
  
      //Guide the key-value-pairs into the correct object. Hard coded. The number depens of the number of input elements.
      if (count < 11) {
        firstObject[key] = value;
      } else {
        secondObject[key] = value;
      }

      count++;
    }
   
    //execute function that checks for unfilled radiobuttons
    checkSelections();


    dataArray.push(firstObject, secondObject);
  
    //json formatting data
    const jsonData = JSON.stringify(dataArray, null, 2); // 2 spaces for indentation
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    //function to attach form data to a download link
    function makeFile() {
     
    //If there is already a download link on the page, remove it
    if (link!=undefined) {
      link.remove();
    }
    //create new download link and append it
    link = document.createElement('a');
    link.setAttribute("id","downloadlink");
    link.setAttribute("class","nice-link")
    link.href = url;
    link.download = 'data.json';
    link.textContent = 'Ladda ner datafil';
    form.appendChild(link)

    }

    //If all form entries are filled, execute the makeFile function
    if (allFilled) {
      console.log(allFilled)
      makeFile();
    }


  }

  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

