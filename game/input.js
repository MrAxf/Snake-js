var keystate = [];
var keydownLastUpdate = [];
var mousePos = {
  x:0,
  y:0
};

document.addEventListener("keydown", function(evt) {
  keystate[evt.keyCode] = true;
  keydownLastUpdate[evt.keyCode] = true;
});

document.addEventListener("keyup", function(evt) {
	delete keystate[evt.keyCode];
});

document.addEventListener("mousedown", function(evt) {
  keystate[evt.button] = true;
  keydownLastUpdate[evt.button] = true;
});

document.addEventListener("mouseup", function(evt) {
	delete keystate[evt.button];
});

document.addEventListener("mousemove", function(evt) {
  rect = g.canvas.getBoundingClientRect();
  mousePos.x = evt.clientX - rect.left;
  mousePos.y = evt.clientY - rect.top;
});

var updateInputs = function() {
  keydownLastUpdate = [];
};
