$(function(){$("#menu-collapse").on("shown.bs.collapse",function(){$(".glyphicon").removeClass("glyphicon glyphicon-menu-hamburger").addClass("glyphicon glyphicon-menu-up")}),$("#menu-collapse").on("hidden.bs.collapse",function(){$(".glyphicon").removeClass("glyphicon glyphicon-menu-up").addClass("glyphicon glyphicon-menu-hamburger")}),$(document).on("click","a",function(e){this.href.match(/#\w+/)&&(e.preventDefault(),$("html, body").animate({scrollTop:$($.attr(this,"href")).offset().top},500))}),$(".rate").barrating({theme:"fontawesome-stars"}),$("#orderTravelModal").on("show.bs.modal",function(e){$(this).find(".orderTravelModal__country").text(e.relatedTarget.children[1].innerText),$(this).find(".orderTravelModal__price").text("Price "+e.relatedTarget.children[3].children[1].innerText)}),$("#modalForm").validate({rules:{email:{required:!0,email:!0}},submitHandler:function(){return toastr.success("Send"),$("#modalForm").get(0).reset(),$("#orderTravelModal").modal("hide"),!1}}),$(".journalSection__cardsContainer").masonry({itemSelector:".card",columnWidth:380}),$(".grid").masonry({itemSelector:".grid-item"}),$(".gallerySection__grid").magnificPopup({type:"image",closeBtnInside:!1,removalDelay:300,mainClass:"mfp-fade",items:[{src:"../imgs/galleryImg1.jpg"},{src:"../imgs/galleryImg2.jpg"},{src:"../imgs/galleryImg3.jpg"},{src:"../imgs/galleryImg4.jpg"},{src:"../imgs/galleryImg5.jpg"},{src:"../imgs/galleryImg6.jpg"}],gallery:{enabled:!0}}),$(".brandSection__carousel").flickity({freeScroll:!0,contain:!0,prevNextButtons:!1,pageDots:!1,wrapAround:!0}),$("#orderNow").validate({rules:{name:{required:!0},phone:{required:!0,number:!0}},messages:{name:{required:"Please enter name"},phone:{required:"Please enter phone",number:"Phone number must cintain only numbers"}},errorPlacement:function(e,r){"wonnaGoSection__form__fName error"==r[0].className?e.appendTo(".wonnaGoSection__form__errorName"):e.appendTo(".wonnaGoSection__form__errorPhone")},errorElement:"span",submitHandler:function(){return toastr.success("We got your order"),$("#orderNow").get(0).reset(),!1}}),$("#contactForm").validate({rules:{name:{required:!0},phoneNumber:{required:!0,number:!0},email:{required:!0,email:!0}},messages:{name:{required:"Please enter name"},phoneNumber:{required:"Please enter a phone number",number:"Phone number must contain only a numbers"},email:{required:"Please enter an email",email:"Please  enter valid email"}},errorPlacement:function(e,r){"name"==r[0].name?e.appendTo(".ourClientsSaySection__contactForm__errorName"):"phoneNumber"==r[0].name?e.appendTo(".ourClientsSaySection__contactForm__errorNumber"):e.appendTo(".ourClientsSaySection__contactForm__errorEmail")},errorElement:"span",submitHandler:function(){return toastr.options={closeButton:!0},toastr.success("Data was send successful","Done"),$("#contactForm").get(0).reset(),!1}}),$("#offers").DataTable({ajax:"offers.json"})});