const valjkommun = document.getElementById('valjkommun');
// const data = '';
const [aldreomsorgen, forskolan, ovrigt] = [document.getElementById('aldreomsorgen'), document.getElementById('forskolan'), document.getElementById('ovrigt')];
const strans = [...document.getElementsByClassName('semitransparent')];



$.ajax({
        url: "protosiffror.json",
        dataType: "json",
        mimeType: "application/json",
        success: function (data) {
            kdata = data;

            //Make the graph that compares proffessions
            // jamforyrke(kdata, 'RIKSSNITT', 4);
            populateKommunDropdown();
            },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
})



function populateKommunDropdown() {
  kdata.forEach((item, i) => {
      let el = document.createElement("option");
      el.textContent = item.Kommun;
      valjkommun.appendChild(el);
  });
  //Add option "Välj kommun", which will be the first option
  let el = document.createElement("option");
  el.textContent = 'Välj kommun';
  valjkommun.appendChild(el);
};

valjkommun.addEventListener("change", function(){
  console.log(this.value)
  kdata.forEach((item, i) => {
    if (item.Kommun === this.value) {
      aldreomsorgen.innerHTML = item['Äldreomsorgen'];
      forskolan.innerHTML = item['Förskolan'];
      ovrigt.innerHTML = item['Övrigt'];
      }
    })


  strans.forEach((item, index) => {
    if (this.value != "valjkommun"){
      item.classList.remove('semitransparent')
      }
    else {
      item.classList.add('semitransparent');
      item.innerHTML = 'XX%';
      }
    });


})
