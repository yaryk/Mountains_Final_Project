var orderNow=document.forms.orderNow;orderNow.addEventListener("submit",function(e){e.preventDefault()}),$(function(){$(".rate").barrating({theme:"fontawesome-stars",allowEmpty:!0}),$(".journalSection__cardsContainer").masonry({itemSelector:".card",columnWidth:380}),$(".brandSection__carousel").flickity({freeScroll:!0,contain:!0,prevNextButtons:!1,pageDots:!1})});