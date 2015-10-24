var Rectangle = function(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.containsPoint = function(x, y){
    if(this.x < x && this.y < y && (this.x + this.width) > x && (this.y + this.height) > y) return true;
    return false;
  };
};

var MenuState = function(game){

  this.game = game;

  this.imageBackground = new Image(960, 560);
  this.imageStartButton = new Image(812, 69);

  this.startRec = new Rectangle(277, 280, 406, 69);
  this.startState = 0;

  this.init = function(){
    this.imageBackground.src = "images/MenuBG.png";
    this.imageStartButton.src = "images/StartButton.png";

    this.spriteStartButton = new Sprite(this.imageStartButton, 1, 2);
  };

  this.update = function(){
    if(this.startRec.containsPoint(mousePos.x, mousePos.y)) this.startState =1;
    else this.startState = 0;
    if(this.startState == 1 && keydownLastUpdate[0]) game.loadState(new GameState(this.game));
  };

  this.render = function(ctx){
    ctx.drawImage(this.imageBackground, 0, 0);
    this.spriteStartButton.render(ctx, 277, 280, 0, this.startState);
  };

};
