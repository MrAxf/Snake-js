var Animation = function(sprite, row, endCol, ticksPerUpdate){

  this. sprite = sprite;
  this.row = row;
  this.endCol = endCol;
  this.colToDraw = 0;
  this.ticksPerUpdate = ticksPerUpdate;
  this.counter = ticksPerUpdate;

  this.update = function(){
    this.counter--;
    if (this.counter === 0){
      this.counter = this.ticksPerUpdate;
      this.colToDraw++;
      if (this.colToDraw > this.endCol) this.colToDraw = 0;
    }
  };

  this.render = function(ctx, x, y){
    sprite.render(ctx, x, y, this.row, this.colToDraw);
  };

};
