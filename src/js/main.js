$(function () {
  // collapsed icon menu
  $('#menu-collapse').on('shown.bs.collapse', function () {
    $(".glyphicon").removeClass("glyphicon glyphicon-menu-hamburger").addClass("glyphicon glyphicon-menu-up");
  });

  $('#menu-collapse').on('hidden.bs.collapse', function () {
    $(".glyphicon").removeClass("glyphicon glyphicon-menu-up").addClass("glyphicon glyphicon-menu-hamburger");
  });
  // плавний скролінг на якорі
  $(document).on('click', 'a', function (e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  $(".rate").barrating({
    theme: 'fontawesome-stars'
  });

  $('.journalSection__cardsContainer').masonry({
    itemSelector: '.card',
    columnWidth: 380
  });

  $('.grid').masonry({
    itemSelector: '.grid-item'
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
        email: "Please enter valid email"
      }
    },
    errorPlacement: function (error, element) {
      if (element[0].name == "name") {
        error.appendTo(".ourClientsSaySection__contactForm__errorName");
      } 
      else if(element[0].name == "phoneNumber") {
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
});



