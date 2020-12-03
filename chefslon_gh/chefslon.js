

d3.json("https://assets.codepen.io/2076398/chefslon.json")
  .then(function (d) {


    d3.select("#card_div")
    .selectAll("div")
    .data(d).enter()
    .append("div").html(function(d, i) {

      var html = `
      <div class="card__face card__face--front u-textMetaDeca" style="background-image: url(${d.Bild_front})"><span class="underline">${d.Bransch}</span><span class="byline u-textMeta">Foto: ${d.Foto}</span></div>
      <div class="card__face card__face--back u-textMetaDeca"><span class="underline">${d.Bransch}</span><img src="${d.Bild_back}" class="graf"></div>
      </div>
      `;

      return html;
    })

    .attr("class", "card")

    var card = document.getElementsByClassName('card');
    for (var i=0; i < card.length; i++) {
      card[i].addEventListener( 'click', function() {
        this.classList.toggle('is-flipped');
        let child = this.firstElementChild;

        console.log(child.children[1])

        child.children[1].classList.toggle('hidden');
      });
    }


    d.forEach(function (grej) {
      for (var key in grej) {
      }
    })



  })

  console.log("Card flip outline is made by Dave deSandro and published on CodePen under the MIT license. (https://opensource.org/licenses/MIT)")
