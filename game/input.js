var keystate = [];
var keydownLastUpdate = [];
var event = event || window.event;

document.addEventListener("keydown", function(evt) {
  keystate[evt.keyCode] = true;
  keydownLastUpdate[evt.keyCode] = true;
});

document.addEventListener("keyup", function(evt) {
	delete keystate[evt.keyCode];
});

document.addEventListener("onmousedown", function(evt) {
  keystate[evt.keyCode] = true;
  keydownLastUpdate[evt.button] = true;
});

document.addEventListener("onmouseup", function(evt) {
	delete keystate[evt.button];
});

var updateInputs = function() {
  keydownLastUpdate = [];
};

var getMousePos = function() {
  var rect = g.canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};
