var Entity = function(game){

  this.sprite = null;
  this.hitBox = null;
  this.game = game;

  this.update = function() {};

  this.render = function(ctx) {};

  this.mouseOnIt = function() {
    return this.hitBox.containsPoint(mousePos.x, mousePos.y);
  };

  this.hover = function() {};

  this.onClick = function() {};

};
