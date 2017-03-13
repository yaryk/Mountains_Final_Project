var orderNow = document.forms.orderNow;
orderNow.addEventListener("submit", function (e) {
  e.preventDefault();
});

$(function () { // jquery bar rating
  // collapsed icon menu
  $('#menu-collapse').on('shown.bs.collapse', function () {
       $(".glyphicon").removeClass("glyphicon glyphicon-menu-hamburger").addClass("glyphicon glyphicon-menu-up");
    });

    $('#menu-collapse').on('hidden.bs.collapse', function () {
       $(".glyphicon").removeClass("glyphicon glyphicon-menu-up").addClass("glyphicon glyphicon-menu-hamburger");
    });
    // плавний скролінг на якорі
  $(document).on('click', 'a', function(e){
    e.preventDefault();
    
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});
  $('.rate').barrating({
    theme: 'fontawesome-stars',
    allowEmpty: true
  });

  $('.journalSection__cardsContainer').masonry({
  
  itemSelector: '.card',
  columnWidth: 380
  
});
 $('.grid').masonry({
  itemSelector: '.grid-item',
  // columnWidth: 50
});


     $('.brandSection__carousel').flickity({
     freeScroll : true, 
     contain : true, 
     prevNextButtons : false, 
     pageDots : false,
     wrapAround: true
});

})

