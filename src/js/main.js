var orderNow = document.forms.orderNow;
orderNow.addEventListener("submit", function (e) {
  e.preventDefault();
});

$(function () { // jquery bar rating
  $('.rate').barrating({
    theme: 'fontawesome-stars',
    allowEmpty: true
    
  });

  $('.gallerySection__grid').masonry({
  
  itemSelector: '.gallerySection__item',
  columnWidth: 263
  
});


})

