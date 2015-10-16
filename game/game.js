//Object Game
var Game = function(width, height, scale, tps, fps, canvas){

	this.width = width;
	this.height = height;
	this.scale = scale;

	this.tps = tps;
	this.fps = fps;

	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.running = false;
	this.state = new State();
	this.state.init();

	this.update = function(){
		this.state.update();
	};

	this.render = function(){
		this.state.render(this.ctx);
	};
};

var g = new Game(960, 560, 1, 60, -1, document.getElementById("gameCanvas"));
var loop;
var now;
var then = Date.now(), thenAux = Date.now();
var interval = 1000/g.fps;
var delta = 0, lag = 0;

update = function(){
	g.update();
};

render = function(){
	g.render();
};

simpleLoop = function(){
	window.requestAnimationFrame(loop);
	now = Date.now();
	delta = now - then;
	if (delta > interval) {
		update();
		render();
		then = now - (delta % interval);
	}
};

fpsUnlimitedLoop = function(){
	window.requestAnimationFrame(loop);
	now = Date.now();
	lag += now - then;
	then = now;
	while(1000/g.tps < lag){
		update();
		lag -= 1000/g.tps;
	}
	g.state.updateInputs();
	render();
};

fpsLockedLoop = function(){
	window.requestAnimationFrame(loop);
	now = Date.now();
	lag += now - then;
	delta = now - thenAux;
	then = now;
	while(1000/g.tps < lag){
		update();
		lag -= 1000/g.tps;
	}
	if (delta > interval) {
		render();
		thenAux = now - (delta % interval);
	}
};

init = function(game){
	switch (game.fps) {
		case game.tps:
				loop = simpleLoop;
				break;
		case -1:
				loop = fpsUnlimitedLoop;
				break;
		default:
				loop = fpsLockedLoop;
	}
	game.running = true;

	window.requestAnimFrame = (function(){
  	return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / game.fps);
        };
		})();
};

init(g);
loop();
