Colors = {};
Colors.names = {
  aqua: "#00ffff",
  /*azure: "#f0ffff",*/
  /*beige: "#f5f5dc",*/
  /*black: "#000000",*/
  blue: "#0000ff",
  brown: "#a52a2a",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  /*darkgrey: "#a9a9a9",*/
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  khaki: "#f0e68c",
  /*lightblue: "#add8e6",*/
  /*lightcyan: "#e0ffff",*/
  /*lightgreen: "#90ee90",*/
  /*lightgrey: "#d3d3d3",*/
  /*lightpink: "#ffb6c1",*/
  /*lightyellow: "#ffffe0",*/
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  /*silver: "#c0c0c0",*/
  /*white: "#ffffff",*/
  /*yellow: "#ffff00"*/
};

Colors.random = function () {
  var result;
  var count = 0;
  for (var prop in this.names) if (Math.random() < 1 / ++count) result = prop;
  return result;
};

var lastCalled = 0;
function debounce(func, wait) {
  return function () {
    var timeNow = Date.now();
    if (timeNow - lastCalled > wait) {
      func();
      lastCalled = timeNow;
    }
  };
}

var animationList = ["bounce", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello"];
var h1 = document.querySelector("h1");
var h1span = document.querySelector("h1 span");

var debounceAnim = debounce(function (e) {
  var transition = animationList[Math.floor(Math.random() * animationList.length)];
  h1span.className = "animated " + transition;
}, 500);

function startMainAnim() {
  debounceAnim();
  h1span.style.color = Colors.random();
}
h1.addEventListener("mouseover", startMainAnim);
h1.addEventListener("click", startMainAnim);
h1.addEventListener("mouseout", function () {
  h1span.style.color = "inherit";
});

// Spanify quote letters

var textSpan = document.querySelector("foot > span");
var string = textSpan.textContent;
string.split("");
var length = string.length;
textSpan.textContent = "";
for (var i = 0; i < length; i++) {
  var t = string[i];
  textSpan.innerHTML += "<span>" + (t != " " ? t : "&nbsp;") + "</span>";
}

var spans = document.querySelectorAll("foot > span > span");
var text_animating = false;
var text_timeout;
function startTextAnimation() {
  if (text_animating) return;
  text_animating = true;
  var text_cursor = 0;
  function textAnimation() {
    var s = spans[text_cursor];
    s.className = "playing";
    text_cursor++;
    if (text_cursor < spans.length) text_timeout = setTimeout(textAnimation, 20);
  }
  textAnimation();
}

function stopTextAnimation() {
  if (!text_animating) return;
  text_animating = false;
  clearTimeout(text_timeout);
  for (var i = 0; i < spans.length; i++) {
    var tspan = spans[i];
    tspan.className = "";
  }
}

textSpan.addEventListener("mouseover", startTextAnimation);
textSpan.addEventListener("mouseout", stopTextAnimation);
