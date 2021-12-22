//thanks to https://css-tricks.com/text-fade-read-more

var $el, $ps, $up, totalHeight;

var rubriker = [...document.getElementsByTagName('h3')];
function addBolderClass(el) {
  el.classList.add("bolder");
  informHeight();
  console.log('nyvers1')
}
rubriker.forEach(addBolderClass);



$(".lasdiv .knapp").click(function() {




      totalHeight = 0

      $el = $(this);
      $p  = $el.parent();
      $up = $p.parent();
      $ps = $up.find("p:not('.read-more')");

      // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
      $ps.each(function() {
        totalHeight += $(this).outerHeight();
        totalHeight += 20;
      });

      $up
        .css({
          // Set height to prevent instant jumpdown when max height is removed
          "height": $up.height(),
          "max-height": 9999
        })
        .animate({
          "height": totalHeight
        },
        {
        complete: function() {
          informHeight()
          }
        }

      );



      // fade out read-more
      $p.fadeOut();



      // prevent jump-down
      return false;




});
