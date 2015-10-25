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

  this.selectDifficulty = false;

  this.imageBackground = new Image(960, 560);
  this.imageStartButton = new Image(812, 69);
  this.difficultyButtons = new Image(972, 207);

  this.startRec = new Rectangle(277, 280, 406, 69);
  this.easyRec = new Rectangle(319, 237, 322, 69);
  this.normalRec = new Rectangle(238, 333, 485, 69);
  this.hardRec = new Rectangle(319, 431, 322, 69);

  this.startState = 0;
  this.easyState = 0;
  this.normalState = 0;
  this.hardState = 0;

  this.init = function(){
    this.imageBackground.src = "images/MenuBG.png";
    this.imageStartButton.src = "images/StartButton.png";
    this.difficultyButtons.src = "images/DifficultyButtons.png";

    this.spriteStartButton = new Sprite(this.imageStartButton, 1, 2);
    this.spriteDifficultyButtons = new Sprite(this.difficultyButtons, 3, 2);
  };

  this.update = function(){
    if(!this.selectDifficulty){
      if(this.startRec.containsPoint(mousePos.x, mousePos.y)) this.startState =1;
      else this.startState = 0;
      if(this.startState == 1 && keydownLastUpdate[0]) this.selectDifficulty = true;
    }else {
      if(this.easyRec.containsPoint(mousePos.x, mousePos.y)) this.easyState =1;
      else this.easyState = 0;
      if(this.normalRec.containsPoint(mousePos.x, mousePos.y)) this.normalState =1;
      else this.normalState = 0;
      if(this.hardRec.containsPoint(mousePos.x, mousePos.y)) this.hardState =1;
      else this.hardState = 0;
      if(this.easyState == 1 && keydownLastUpdate[0]) game.loadState(new GameState(this.game, 21));
      if(this.normalState == 1 && keydownLastUpdate[0]) game.loadState(new GameState(this.game, 14));
      if(this.hardState == 1 && keydownLastUpdate[0]) game.loadState(new GameState(this.game, 7));
    }
  };

  this.render = function(ctx){
    ctx.drawImage(this.imageBackground, 0, 0);
    if(!this.selectDifficulty)this.spriteStartButton.render(ctx, 277, 280, 0, this.startState);
    else{
      this.spriteDifficultyButtons.render(ctx, 238, 237, 0, this.easyState);
      this.spriteDifficultyButtons.render(ctx, 238, 333, 1, this.normalState);
      this.spriteDifficultyButtons.render(ctx, 238, 431, 2, this.hardState);
    }
  };

};
