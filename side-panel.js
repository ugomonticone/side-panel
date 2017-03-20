var SidePanel = (function () {
  var bgcolor, side, size, opacity, tag, aiuto, trigger;
  var myConstructor = function SlidePanel(arg) {
    if (false === (this instanceof SlidePanel)) {
      return new SlidePanel(arg);
    }
    aiuto = document.getElementById(arg);
    bgcolor = '#ffffee';
    side = 'left';
    size = '300px';
    opacity = .5;
  }
  myConstructor.prototype.Initializer = function (BgColor, Side, Size, Opacity) {
    bgcolor = (BgColor != null && typeof BgColor !== 'undefined') ? BgColor : bgcolor;
    side = (Side != null && typeof Side !== 'undefined') ? Side : side;
    size = (Size != null && typeof Size !== 'undefined') ? Size : size;
    opacity = (Opacity != null && typeof Opacity !== 'undefined') ? Opacity : opacity;
    size = roundSize(size);
    aiuto.removeAttribute('class');
    aiuto.removeAttribute('style');
    tag = aiuto.getAttribute('id');
    trigger = document.createElement('div');
    trigger.setAttribute('id', 'trigger-' + tag);
    trigger.innerHTML = '<span></span>';
    if (side == 'left') {
      addClass(trigger, 'switcher');
      addClass(trigger, 'switcher-left');
    }
    if (side == 'right') {
      addClass(trigger, 'switcher');
      addClass(trigger, 'switcher-right');
    }
    if (side == 'top') {
      addClass(trigger, 'switcher');
      addClass(trigger, 'switcher-top');
    }
    if (side == 'bottom') {
      addClass(trigger, 'switcher');
      addClass(trigger, 'switcher-bottom');
    }
    var B = document.getElementsByTagName('body');
    B[0].appendChild(trigger);
    aiuto.style.backgroundColor = bgcolor;
    initObj();

    addEventHandler(trigger, 'click', function () {
      if (hasClass(aiuto, 'visible')) {
        removeClass(aiuto, 'visible');
        removeClass(trigger, 'expanded');
        animation(aiuto, side, 'out');
        animation(trigger, side, 'out');
      }
      else {
        addClass(aiuto, 'visible');
        addClass(trigger, 'expanded');
        animation(aiuto, side, 'in');
        animation(trigger, side, 'in');
      }
    });
  }
  // Remove SidePanel object
  myConstructor.prototype.Remove = function () {
    if (aiuto!=null && trigger!=null && typeof aiuto !== 'undefined' && typeof trigger !== 'undefined') {
      aiuto.removeAttribute('style');
      aiuto.removeAttribute('class');
      aiuto.setAttribute('style', 'display:none;');
      trigger.parentNode.removeChild(trigger);
    }
  }

  var timeout = false;
  var delay = 250;
  //window.addEventListener("resize", function () {
  //  clearTimeout(timeout);
  //  timeout = setTimeout(initObj, delay);
  //});

  addEventHandler(window, 'resize', function () {
    clearTimeout(timeout);
    timeout = setTimeout(initObj, delay);
  });


  // SidePanel object initialization
  function initObj() {
    if (side == "left") {
      removeClass(aiuto, 'help-horizontal');
      removeClass(aiuto, 'help-left');
      addClass(aiuto, 'help-horizontal');
      addClass(aiuto, 'help-left');
      aiuto.style.width = size + 'px';
      aiuto.style.left = (0 - parseInt(getStyle(aiuto, 'width'), 10)) + 'px';
    }
    if (side == "right") {
      removeClass(aiuto, 'help-horizontal');
      addClass(aiuto, "help-horizontal");
      removeClass(aiuto, 'help-right');
      addClass(aiuto, "help-right");
      aiuto.style.width = size + 'px';
      aiuto.style.right = (0 - parseInt(getStyle(aiuto, 'width'), 10) - 10) + 'px';
    }
    if (side == "top") {
      removeClass(aiuto, "help-vertical");
      addClass(aiuto, "help-vertical");
      removeClass(aiuto, "help-top");
      addClass(aiuto, "help-top");
      aiuto.style.height = size + 'px';
      aiuto.style.top = (0 - parseInt(getStyle(aiuto, 'height'), 10) - 10) + 'px';
    }
    if (side == "bottom") {
      removeClass(aiuto, "help-vertical");
      addClass(aiuto, "help-vertical");
      removeClass(aiuto, "help-bottom");
      addClass(aiuto, "help-bottom");
      aiuto.style.height = size + 'px';
      aiuto.style.bottom = (0 - parseInt(getStyle(aiuto, 'height'), 10) - 10) + 'px';
    }
  }

  // Add a class to element's class list
  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }
  // Removes a class from element's class list
  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  // Returns a value indicating if element has specific class value
  function hasClass(el, className) {
    if (el.classList)
      return (el.classList.contains(className));
    else
      return (new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className));
  }
  // Attaches an event handler element
  function addEventHandler(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function () {
        handler.call(el);
      });
    }
  }
  // Calculate element's Width
  function outerWidth(el) {
    var width = el.offsetWidth;
    var style = el.currentStyle || getComputedStyle(el);
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
  }
  // Calculates element's Height
  function outerHeight(el) {
    var height = el.offsetHeight;
    var style = el.currentStyle || getComputedStyle(el);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }
  // sets a value fro the attribute of specified element
  function setAttr(el, attribute, value) {
    el.setAttribute(attribute, value);
  }
  // Perform sidepanel sliding effect
  function animation(el, side, type) {
    var pos, end;
    var timing = setInterval(step, 10);
    if (type == 'in') {
      end = 0;
      if (side == 'left') {//OK
        pos = parseInt(getStyle(el, 'left'), 10);
      }
      if (side == 'right') {
        pos = parseInt(getStyle(el, 'right'), 10);
      }
      if (side == 'bottom') {//OK
        pos = parseInt(getStyle(el, 'bottom'), 10);
      }
      if (side == 'top') {//OK
        pos = parseInt(getStyle(el, 'top'), 10);
      }
    }
    else if (type == 'out') {
      pos = 0;
      if (side == 'left') {//OK
        end = 0 - parseInt(getStyle(el, 'width'), 10) - 10;
      }
      if (side == 'right') {
        end = 0 - parseInt(getStyle(el, 'width'), 10) - 10;
      }
      if (side == 'bottom') {//OK
        end = 0 - parseInt(getStyle(el, 'height'), 10) - 10;
      }
      if (side == 'top') {//OK
        end = 0 - parseInt(getStyle(el, 'height'), 10) - 10;
      }
    }
    function step() {
      if (pos == end) {
        clearInterval(timing);
      }
      else {
        if (type == 'in') {
          pos = pos + 10;
          if (side == 'left') {
            el.style.left = pos + 'px';
            trigger.style.left = (parseInt(getStyle(el, 'width')) + pos) + 'px';
          }
          if (side == 'right') {
            el.style.right = pos + 'px';
            trigger.style.right = (parseInt(getStyle(el, 'width')) + pos) + 'px';
          }
          if (side == 'top') {//OK
            el.style.top = pos + 'px';
            trigger.style.top = (parseInt(getStyle(el, 'height')) + pos) + 'px';
          }
          if (side == 'bottom') {//OK
            el.style.bottom = pos + 'px';
            trigger.style.bottom = (parseInt(getStyle(el, 'height')) + pos) + 'px';
          }
        }
        else if (type == 'out') {
          if (side == 'left') {
            el.style.left = pos + 'px';
            trigger.style.left = (parseInt(getStyle(el, 'width')) + pos) + 'px';
          }
          if (side == 'right') {
            el.style.right = pos + 'px';
            trigger.style.right = (parseInt(getStyle(el, 'width')) + pos) + 'px';
          }
          if (side == 'top') {//OK
            el.style.top = pos + 'px';
            trigger.style.top = (parseInt(getStyle(el, 'height')) + pos) + 'px';
          }
          if (side == 'bottom') {//OK
            el.style.bottom = pos + 'px';
            trigger.style.bottom = (parseInt(getStyle(el, 'height')) + pos) + 'px';
          }
          pos = pos - 10;
        }
      }
    }
  }

  // Gets the selected style value for the selected element. Returns the exact value.
  function getStyle(el, styleProp) {
    var value, defaultView = (el.ownerDocument || document).defaultView;
    if (defaultView && defaultView.getComputedStyle) {
      styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
      return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) {
      styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
        return letter.toUpperCase();
      });
      value = el.currentStyle[styleProp];
      if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
        return (function (value) {
          var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
          el.runtimeStyle.left = el.currentStyle.left;
          el.style.left = value || 0;
          value = el.style.pixelLeft + "px";
          el.style.left = oldLeft;
          el.runtimeStyle.left = oldRsLeft;
          return value;
        })(value);
      }
      return value;
    }
  }
  // Converts the hex color code to RGB notation
  function hexToRgb(hex) {
    if (hex == null) return ("255,255,255");
    var fullLengthRegex = /^#([A-Fa-f\d]{2}){3}$/i;
    var shortHandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shortHandRegex, function (m, r, g, b) {
      return "#" + r + r + g + g + b + b;
    });
    if (fullLengthRegex.test(hex)) {
      hex = hex.replace(/[^0-9A-F]/gi, '');
      return [(bigint = parseInt(hex, 16)) >> 16 & 255, bigint >> 8 & 255, bigint & 255].join();
    }
    else
      return ("255,255,255");
  }
  // Check opacity value
  function checkOpacity(op) {
    if (op == null) return 1;
    var percRegEx = /^(100|(\d){1,2})%$/i;
    var decimalRegEx = /^(1|1\.0|(0?\.\d{1,2}))$/i;
    if (percRegEx.test(op)) {
      var p = op.replace(/[^0-9A-F\.]/gi, '');
      return p / 100;
    }
    if (decimalRegEx.test(op)) return op;
    return 1;
  }
  // Convert color and opacity to ARGB value
  function ToRGBA(color, opacity) {
    var pattern = "rgba(";
    pattern += hexToRgb(color);
    pattern += "," + checkOpacity(opacity);
    pattern += ")";
    return pattern;
  }
  // Rounds to nearest xx0 value
  function roundSize(x) {
    var n = parseInt(x);
    var rem = n % 10;
    if (rem == 0) return n;
    if (rem <= 5)
      return parseInt((n - rem), 10);
    else
      return parseInt(n, 10) + parseInt((10 - rem), 10);
  }

  /*-------------------------------------------*/
  return myConstructor; //USCITA
  /*-------------------------------------------*/

}());