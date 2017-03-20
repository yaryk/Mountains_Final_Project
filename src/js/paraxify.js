
(function(document, window, index) {
  "use strict";
  var paraxify;
  paraxify = function(el, options) {
    var Paraxify, contador, i, opt, pho, posY, screenY;
    posY = 0;
    screenY = 0;
    i = 0;
    opt = {};
    pho = [];
    contador = 0;
    Paraxify = function(el, options) {
      this.options = {
        speed: 1,
        boost: 0
      };
      for (i in options) {
        this.options[i] = options[i];
      }
      if (this.options.speed < 0 || this.options.speed > 1) {
        this.options.speed = 1;
      }
      if (!el) {
        el = 'paraxify';
      }
      if (document.getElementsByClassName(el.replace('.', ''))) {
        this.photos = document.getElementsByClassName(el.replace('.', ''));
      } else if (document.querySelector(el) !== false) {
        this.photos = querySelector(el);
      } else {
        throw new Error("The elements you're trying to select don't exist.");
      }
      opt = this.options;
      pho = this.photos;
      this._init(this);
    };
    Paraxify.prototype = {
      update: function() {
        screenY = window.innerHeight;
        i = 0;
        while (i < pho.length) {
          pho[i].style.backgroundPosition = "center center";
          pho[i].url = window.getComputedStyle(pho[i], false).backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
          if (!pho[i].img) {
            pho[i].img = new Image();
          }
          if (pho[i].url !== pho[i].img.src) {
            this._check(i);
            pho[i].img.src = pho[i].url;
          }
          i++;
        }
        this._animate();
      },
      _init: function() {
        this.update();
        window.onscroll = (function() {
          this._animate();
        }).bind(this);
        window.onresize = (function() {
          this.update();
        }).bind(this);
      },
      _check: function(i) {
        var actualHeight, main;
        main = pho[i];
        main.ok = true;
        main.bgSize = window.getComputedStyle(main, false).backgroundSize;
        actualHeight = screenY;
        pho[i].img.onload = function() {
          if (main.bgSize === '' || main.bgSize === 'auto') {
            if (this.height < main.offsetHeight) {
              main.ok = false;
              throw new Error("The image " + main.url + " (" + this.height + "px) is too short for that container (" + main.offsetHeight + "px).");
            } else {
              actualHeight = this.height;
              if (this.height < screenY) {
                actualHeight = actualHeight + ((screenY - main.offsetHeight) * opt.speed);
              }
            }
          } else if (main.bgSize === 'cover') {
            if (screenY < main.offsetHeight) {
              main.ok = false;
              throw new Error("The container (" + main.offsetHeight + "px) can't be bigger than the image (" + screenY + "px).");
            }
          } else {
            window.getComputedStyle(main, false).backgroundSize === 'cover';
            this._check(i);
          }
          main.diff = -(actualHeight - main.offsetHeight) * opt.speed;
          main.diff = main.diff - (main.offsetHeight * opt.boost);
        };
      },
      _visible: function(i) {
        if (((posY + screenY) > pho[i].offsetTop) && (posY < pho[i].offsetTop + pho[i].offsetHeight)) {
          return true;
        }
        return false;
      },
      _animate: function() {
        var per, position;
        if (window.pageYOffset !== void 0) {
          posY = window.pageYOffset;
        } else {
          posY = (document.documentElement || document.body.parentNode || document.body).scrollTop;
        }
        i = 0;
        while (i < pho.length) {
          this._check(i);
          if (pho[i].ok && window.getComputedStyle(pho[i], false).backgroundAttachment === "fixed" && this._visible(i)) {
            per = (posY - pho[i].offsetTop + screenY) / (pho[i].offsetHeight + screenY);
            position = pho[i].diff * (per - 0.5);
            if (pho[i].bgSize !== 'cover') {
              position = position + ((screenY - pho[i].img.height) / 2);
            }
            position = Math.round(position * 100) / 100;
          } else {
            position = "center";
          }
          pho[i].style.backgroundPosition = "center " + position + "px";
          i++;
        }
      }
    };
    return new Paraxify(el, options);
  };
  window.paraxify = paraxify;
})(document, window, 0);
