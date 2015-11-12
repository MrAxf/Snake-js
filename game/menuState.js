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

  this.state = 0;

  this.imageBackground = new Image(960, 560);
  this.imageStartButton = new Image(812, 69);
  this.difficultyButtons = new Image(972, 207);
  this.imageExtraButtons = new Image(200, 200);
  this.imageControlButton = new Image(1298, 69);
  this.imageControl = new Image(610, 330);

  this.init = function(){
    this.imageBackground.src = "images/MenuBG.png";
    this.imageStartButton.src = "images/StartButton.png";
    this.difficultyButtons.src = "images/DifficultyButtons.png";
    this.imageExtraButtons.src = "images/ExtraButtons.png";
    this.imageControlButton.src = "images/ControlsButton.png";
    this.imageControl.src = "images/Control.png";

    this.spriteDifficultyButtons = new Sprite(this.difficultyButtons, 3, 2);

    this.startButton = createChangeStateButton(this.game, new Sprite(this.imageStartButton, 1, 2), new Rectangle(277, 280, 406, 69), 277, 280, 0, 1);
    this.easyButton = createDifficultyButton(this.game, this.spriteDifficultyButtons, new Rectangle(319, 237, 322, 69), 238, 237, 0, 21);
    this.normalButton = createDifficultyButton(this.game, this.spriteDifficultyButtons, new Rectangle(238, 333, 485, 69), 238, 333, 1, 14);
    this.hardButton = createDifficultyButton(this.game, this.spriteDifficultyButtons, new Rectangle(319, 431, 322, 69), 238, 431, 2, 7);
    this.backButton = createChangeStateButton(this.game, new Sprite(this.imageExtraButtons, 2, 2), new Rectangle(20, 313, 100, 100), 20, 313, 0, 0);
    this.controlsButton = createChangeStateButton(this.game, new Sprite(this.imageControlButton, 1, 2), new Rectangle(155, 401, 649, 69), 155, 401, 0, 2);

  };

  this.update = function(){
    if(this.state === 0){
      this.startButton.update();
      this.controlsButton.update();
    }else if(this.state == 1){
      this.easyButton.update();
      this.normalButton.update();
      this.hardButton.update();
      this.backButton.update();
    }else this.backButton.update();
  };

  this.render = function(ctx){
    ctx.drawImage(this.imageBackground, 0, 0);
    if(this.state === 0){
      this.startButton.render(ctx);
      this.controlsButton.render(ctx);
    }else if(this.state == 1){
      this.easyButton.render(ctx);
      this.normalButton.render(ctx);
      this.hardButton.render(ctx);
      this.backButton.render(ctx);
    }else{
      this.backButton.render(ctx);
      ctx.drawImage(this.imageControl, 226, 216);
    }
  };

};
