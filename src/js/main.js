$(function () {
  // collapsed icon menu
  $('#menu-collapse').on('shown.bs.collapse', function () {
    $(".glyphicon").removeClass("glyphicon glyphicon-menu-hamburger").addClass("glyphicon glyphicon-menu-up");
  });

  $('#menu-collapse').on('hidden.bs.collapse', function () {
    $(".glyphicon").removeClass("glyphicon glyphicon-menu-up").addClass("glyphicon glyphicon-menu-hamburger");
  });

  // scrolling for link
  $(document).on('click', 'a', function (e) {
    if (this.href.match(/#\w+/)) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
    }
  });

  // travel with us (rate(stars) and modal for each card)
  $(".rate").barrating({
    theme: 'fontawesome-stars'
  });
  // modal for travel section cards
  $('#orderTravelModal').on('show.bs.modal', function (event) {
    $(this).find('.orderTravelModal__country').text(event.relatedTarget.children[1].innerText);
    $(this).find('.orderTravelModal__price').text("Price " + event.relatedTarget.children[3].children[1].innerText);
  });
  $("#modalForm").validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    submitHandler: function () {
      toastr.success("Send");
      $('#modalForm').get(0).reset();
      $('#orderTravelModal').modal("hide");
      return false;
    }
  });

  $('.journalSection__cardsContainer').masonry({
    itemSelector: '.card',
    columnWidth: 380
  });

  $('.grid').masonry({
    itemSelector: '.grid-item'
  });
  // for gallery zoom 
  $('.gallerySection__grid').magnificPopup({
    type: 'image',
    closeBtnInside: false,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    items: [
      {
        src: '../imgs/galleryImg1.jpg',
      },
      {
        src: '../imgs/galleryImg2.jpg',
      },
      {
        src: "../imgs/galleryImg3.jpg",
      },
      {
        src: "../imgs/galleryImg4.jpg",
      },
      {
        src: "../imgs/galleryImg5.jpg",
      },
      {
        src: "../imgs/galleryImg6.jpg",
      }

    ],
    gallery: {
      enabled: true
    }
  });

  $('.brandSection__carousel').flickity({
    freeScroll: true,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true
  });

  // order form validation
  $("#orderNow").validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true,
        number: true
      }
    },
    messages: {
      name: {
        required: "Please enter name"
      },
      phone: {
        required: "Please enter phone",
        number: "Phone number must cintain only numbers"
      }
    },
    errorPlacement: function (error, element) {
      if (element[0].className == "wonnaGoSection__form__fName error") {
        error.appendTo(".wonnaGoSection__form__errorName");
      } else {
        error.appendTo(".wonnaGoSection__form__errorPhone");
      }
    },
    errorElement: "span",
    submitHandler: function () {
      toastr.success('We got your order');
      $('#orderNow').get(0).reset();
      return false;
    }
  });

  // contact form validation
  $("#contactForm").validate({
    rules: {
      name: {
        required: true
      },
      phoneNumber: {
        required: true,
        number: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Please enter name"
      },
      phoneNumber: {
        required: "Please enter a phone number",
        number: "Phone number must contain only a numbers"
      },
      email: {
        required: "Please enter an email",
        email: "Please  enter valid email"
      }
    },
    errorPlacement: function (error, element) {
      if (element[0].name == "name") {
        error.appendTo(".ourClientsSaySection__contactForm__errorName");
      }
      else if (element[0].name == "phoneNumber") {
        error.appendTo(".ourClientsSaySection__contactForm__errorNumber");
      } else {
        error.appendTo(".ourClientsSaySection__contactForm__errorEmail");
      }
    },
    errorElement: "span",
    submitHandler: function () {
      toastr.options = {
        "closeButton": true
      }
      toastr.success('Data was send successful', 'Done');
      $('#contactForm').get(0).reset();
      return false;
    }
  });

  // datatable ajax request
  $('#offers').DataTable({
    ajax: "offers.json"
  });
});
