

d3.json("utbildning.json")
  .then(function (d) {


    d3.select("#card_div")
    .selectAll("div")
    .data(d).enter()
    .append("div").html(function(d, i) {

      var html = `
      <!--<div class="card__face card__face--front u-textMetaDeca" style="background-image: url(${d.Bild_front})"><span class="underline">${d.Bransch}</span><span class="byline u-textMeta">Foto: ${d.Foto}</span></div>  -->
      <div class="card__face card__face--front u-textMetaDeca"><span class="underline">${d.Bransch}</span><span class="byline u-textMeta">Foto: ${d.Foto}</span>
      <!--<div style="background-image: url(${d.Bild_front})" class="back-img"></div>-->
        <div class="card-img-container"><img class="card-img" src=${d.Bild_front}> </div>

      </div>


      <div class="card__face card__face--back"><span class="underline u-textMeta">${d.Bransch}</span>

      <h2 class="u-textMetaDeca">Exempel på utbildningar</h2>
      <p class="u-textMeta">${d.Text_back}</p></div>
      `;
      return html;

    })


    .attr("class", "card")

    var card = document.getElementsByClassName('card');
    for (var i=0; i < card.length; i++) {
      card[i].addEventListener( 'click', function(e) {
        //do not flip the card if you click on the link ('A')
        if (e.target.tagName === 'A') {
          console.log('länk') 
          console.log(e.target.tagName)
          return;
  
        }
        console.log(e.target.tagName)

        this.classList.toggle('is-flipped');
        let child = this.firstElementChild;
        child.children[1].classList.toggle('hidden');                
      });
    }


    d.forEach(function (grej) {
      for (var key in grej) {
      }
    })





  })

  console.log("Card flip outline is made by Dave deSandro and published on CodePen under the MIT license. (https://opensource.org/licenses/MIT)")
