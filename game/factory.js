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

var createExitButton = function(game, sprite, hitBox, x, y, row){
  button = createMouseButton(game, sprite, hitBox, x, y, row);
  button.onClick = function() {
    this.game.loadState(new MenuState(this.game));
  };
  return button;
};

var createChangeStateButton = function(game, sprite, hitBox, x, y, row, newState){
  button = createMouseButton(game, sprite, hitBox, x, y, row);
  button.onClick = function() {
    this.game.state.state = newState;
  };
  return button;
};

var createPointPanel = function(game, sprite, digits, x, y){

  pointPanel = new Entity(game);
  pointPanel.sprite = sprite;
  pointPanel.digits = digits;
  pointPanel.x = x;
  pointPanel.y = y;
  pointPanel.points = 0;

  pointPanel.update = function(toAdd){
    this.points += toAdd;
  };
  pointPanel.render = function(ctx){
    separation = this.sprite.widthPerSection;
    stringPoint = this.points.toString();
    emptyDigits = digits - stringPoint.length;
    for(i = 0; i < emptyDigits; i++){
      this.sprite.render(ctx, this.x + (i*separation), this.y, 0, 0);
    }
    for(j = emptyDigits; j < this.digits; j++){
      this.sprite.render(ctx, this.x + (j*separation), this.y, 0, parseInt(stringPoint.charAt(j - emptyDigits)));
    }
  };
  return pointPanel;
};
