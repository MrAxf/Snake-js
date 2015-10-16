var keystate = [];

document.addEventListener("keydown", function(evt) {
  keystate[evt.keyCode] = true;
});

document.addEventListener("keyup", function(evt) {
	delete keystate[evt.keyCode];
});
