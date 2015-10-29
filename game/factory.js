var createMouseButton = function(game, sprite, hitBox, x, y, row){
  button = new Entity(game);
  button.sprite = sprite;
  button.hitBox = hitBox;
  button.state = 0;
  button.x = x;
  button.y = y;
  button.row = row;
  button.hover = function() {
    this.state = 1;
  };
  button.update = function(){
    if(this.mouseOnIt()){
      this.hover();
      if(keydownLastUpdate[0]) this.onClick();
    }else this.state = 0;
  };
  button.render = function(ctx){
    this.sprite.render(ctx, this.x, this.y, this.row, this.state);
  };
  return button;
};

var createDifficultyButton = function(game, sprite, hitBox, x, y, row, speed){
  button = createMouseButton(game, sprite, hitBox, x, y, row);
  button.onClick = function() {
    this.game.loadState(new GameState(this.game, speed));
  };
  return button;
};

var createStartButton = function(game, sprite, hitBox, x, y, row){
  button = createMouseButton(game, sprite, hitBox, x, y, row);
  button.onClick = function() {
    this.game.state.selectDifficulty = true;
  };
  return button;
};
