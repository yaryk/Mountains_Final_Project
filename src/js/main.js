var orderNow = document.forms.orderNow;
orderNow.addEventListener("submit", function (e) {
  e.preventDefault();
});

$(function () { // jquery bar rating
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
     pageDots : false 
});

})

