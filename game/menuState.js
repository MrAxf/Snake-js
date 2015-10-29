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

  this.init = function(){
    this.imageBackground.src = "images/MenuBG.png";
    this.imageStartButton.src = "images/StartButton.png";
    this.difficultyButtons.src = "images/DifficultyButtons.png";

    spriteDifficultyButtons = new Sprite(this.difficultyButtons, 3, 2);

    this.startButton = createStartButton(this.game, new Sprite(this.imageStartButton, 1, 2), new Rectangle(277, 280, 406, 69), 277, 280, 0);
    this.easyButton = createDifficultyButton(this.game, spriteDifficultyButtons, new Rectangle(319, 237, 322, 69), 238, 237, 0, 21);
    this.normalButton = createDifficultyButton(this.game, spriteDifficultyButtons, new Rectangle(238, 333, 485, 69), 238, 333, 1, 14);
    this.hardButton = createDifficultyButton(this.game, spriteDifficultyButtons, new Rectangle(319, 431, 322, 69), 238, 431, 2, 7);

  };

  this.update = function(){
    if(!this.selectDifficulty){
      this.startButton.update();
    }else {
      this.easyButton.update();
      this.normalButton.update();
      this.hardButton.update();
    }
  };

  this.render = function(ctx){
    ctx.drawImage(this.imageBackground, 0, 0);
    if(!this.selectDifficulty)this.startButton.render(ctx);
    else{
      this.easyButton.render(ctx);
      this.normalButton.render(ctx);
      this.hardButton.render(ctx);
    }
  };

};
