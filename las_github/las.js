//thanks to https://css-tricks.com/text-fade-read-more

var $el, $ps, $up, totalHeight;


$(".lasdiv .knapp").click(function() {




      totalHeight = 0

      $el = $(this);
      $p  = $el.parent();
      $up = $p.parent();
      $ps = $up.find("p:not('.read-more')");

      // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
      $ps.each(function() {
        totalHeight += $(this).outerHeight();
        totalHeight += 15;
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
          console.log('komplett')
          informHeight()
          }
        }

      );



      // fade out read-more
      $p.fadeOut();



      // prevent jump-down
      return false;




});
