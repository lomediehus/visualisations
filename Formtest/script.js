
console.log('skriptet körs')

// combination of two save-to-text tutorials, this: https://www.thecodehubs.com/generate-text-file-using-plain-javascript and this: https://www.learnwithjason.dev/blog/get-form-values-as-json




  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    console.log({ value });

    var textValue = JSON.stringify(value)


    function generateTxtFile(text){
      var textFile = null;
      var data = new Blob([text], {type: 'text/plain'});
      // var data = new Blob([text], {type: 'application/json'});


      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    }

    (function () {
      var btnCreateFile = document.getElementById('btnCreateFile');
      // dummyText = document.getElementById('dummyText');
      // console.log('text' + dummyText)

      btnCreateFile.addEventListener('click', function () {
        var link = document.getElementById('downloadFile');
        // link.href = generateTxtFile(dummyText.innerText);
        link.href = generateTxtFile(textValue);


        link.style.display = 'inline-block';
      }, false);
    })();






  }

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
