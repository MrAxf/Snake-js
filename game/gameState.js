var Point = function(x, y){

  this.x = x;
  this.y = y;

  this.equals = function(point){
    if(this.x == point.x && this.y == point.y) return true;
    return false;
  };
};
/*jshint esnext: true */
var GameState = function(game, speed){
  const MOVE_NORTH = new Point(0, -1);
  const MOVE_EAST = new Point(1, 0);
  const MOVE_SOUTH = new Point(0, 1);
  const MOVE_WEST = new Point(-1, 0);

  const FRUIT_BOX = new Point(4, 0);
  const FREE_BOX = new Point(5, 0);
  const WALL_BOX = new Point(6, 0);

  this.game = game;

  this.board = [];
  this.freeBoxes = new LinkedList();
  this.moveBuffer = [];

  this.tailMustMove = true;
  this.fruitOnBoard = false;
  this.state = 0;

  this.speed = speed;
  this.speedCount = 120;

  this.headIterator = new Point(3, 6);
  this.tailIterator = new Point(0, 6);

  this.curMove = MOVE_EAST;
  this.nextMove = MOVE_EAST;

  this.imageBackground = new Image(960, 560);
  this.imageSnake = new Image(160, 160);
  this.imageFood = new Image(80, 40);
  this.imageStart = new Image(485, 136);
  this.imageGameOver = new Image(325, 135);
  this.imagePause = new Image(404, 69);
  this.imageExtraButtons = new Image(200, 200);

  this.init = function(){

    for(i=0; i < 13; i++){
      this.board[i] = [];
    }

    for(i=0; i < 17; i++)
      for(j=0; j < 13; j++){
      this.board[j][i] = FREE_BOX;
    }

    for (i = 0; i < 13; i++)
			this.board[i][0] = WALL_BOX;
		for (i = 0; i < 13; i++)
			this.board[i][16] = WALL_BOX;
		for (i = 1; i < 16; i++)
			this.board[0][i] = WALL_BOX;
		for (i = 1; i < 16; i++)
			this.board[12][i] = WALL_BOX;

    for (i = 1; i < 15; i++)
  		for (j = 1; j < 12; j++)
  				this.freeBoxes.add(new Point(i, j));

    this.board[6][1] = new Point(0, 0);
    this.board[6][2] = new Point(3, 0);
    this.board[6][3] = new Point(1, 0);

    this.freeBoxes.delete(new Point(1, 6));
    this.freeBoxes.delete(new Point(2, 6));
    this.freeBoxes.delete(new Point(3, 6));

    this.moveBuffer.push(MOVE_EAST);
    this.moveBuffer.push(MOVE_EAST);
    this.moveBuffer.push(MOVE_EAST);

    this.imageBackground.src = "images/GameBG.png";
    this.imageSnake.src = "images/SnakeBodySprites.png";
    this.imageFood.src = "images/Apple.png";
    this.imageStart.src = "images/GameStart.png";
    this.imageGameOver.src = "images/GameOver.png";
    this.imagePause.src = "images/Pause.png";
    this.imageExtraButtons.src = "images/ExtraButtons.png";

    this.snakeSprite = new Sprite(this.imageSnake, 4, 4);
    this.foodSprite = new Sprite(this.imageFood, 1, 2);
    this.spriteStart = new Sprite(this.imageStart, 2, 1);
    this.spriteExtraButtons = new Sprite(this.imageExtraButtons, 2, 2);

    this.backButton = createExitButton(this.game, this.spriteExtraButtons, new Rectangle(260, 352, 100, 100), 260, 352, 0);
    this.resetButton = createDifficultyButton(this.game, this.spriteExtraButtons, new Rectangle(360, 352, 100, 100), 360, 352, 1, this.speed);

    this.animateFood = new Animation(this.foodSprite, 0, 1, 20);

  };

  this.render = function(ctx){
    ctx.drawImage(this.imageBackground, 0, 0);
    if(this.state === 0){
      this.spriteStart.render(ctx, 117, 142, (this.speedCount < 31)?1:0, 0);
    }
    if(this.state != 3 && this.state != 2) {
      for(i = 1; i <= 15; i++)
        for(j = 1; j <= 11; j++){
          if(this.board[j][i].equals(FREE_BOX)) continue;
          else if(this.board[j][i].x > 3) this.animateFood.render(ctx, 20 + (40 * i), 20 + (40 * j));
          else this.snakeSprite.render(ctx, 20 + (40 * i), 20 + (40 * j), this.board[j][i].x, this.board[j][i].y);
      }
    }else if(this.state === 2) ctx.drawImage(this.imagePause, 158, 217);
    else if(this.state === 3){
      ctx.drawImage(this.imageGameOver, 199, 217);
      this.backButton.render(ctx);
      this.resetButton.render(ctx);
    }
  };

  this.update = function() {
    if(this.state === 0){
      this.speedCount--;
      if(this.speedCount === 0){
        this.speedCount = this.speed;
        this.state = 1;
      }
    }else if(this.state === 1){
      this.updateInputs();
      this.animateFood.update();
      if (!this.fruitOnBoard) this.generateFruit();
		  this.speedCount--;
		  if (this.speedCount === 0) {
        this.updateCurMove();
        if (this.tailMustMove) this.moveTail();
        this.tailMustMove = this.moveHead();
        this.speedCount = this.speed;
      }
    }else if (this.state === 2){
      this.updateInputs();
    }else if(this.state === 3){
      this.backButton.update();
      this.resetButton.update();
    }
	};

  this.generateFruit = function() {
		p = this.freeBoxes.getByIndex(Math.floor(this.freeBoxes.length * Math.random()));
		this.board[p.y][p.x] = FRUIT_BOX;
		this.fruitOnBoard = true;
	};

  this.moveTail = function() {
		move = this.moveBuffer.shift();
		this.tailIterator.x += move.x;
		this.tailIterator.y += move.y;

		x = this.tailIterator.x;
		y = this.tailIterator.y;

		this.board[y][x] = FREE_BOX;
		this.freeBoxes.add(new Point(x, y));

    move = this.moveBuffer[0];
    moveNext = this.moveBuffer[1];

    switch (2 * moveNext.x - moveNext.y) {
      case 1:
        this.board[this.tailIterator.y + move.y][this.tailIterator.x + move.x] = new Point(0, 3);
        break;
      case 2:
        this.board[this.tailIterator.y + move.y][this.tailIterator.x + move.x] = new Point(0, 0);
        break;
      case -1:
        this.board[this.tailIterator.y + move.y][this.tailIterator.x + move.x] = new Point(0, 1);
        break;
      case -2:
        this.board[this.tailIterator.y + move.y][this.tailIterator.x + move.x] = new Point(0, 2);
        break;
      default:

    }

	};

  this.moveHead = function() {
		toReturn = true;

		this.moveBuffer.push(this.curMove);
		this.headIterator.x += this.curMove.x;
		this.headIterator.y += this.curMove.y;

    this.freeBoxes.delete(new Point(this.headIterator.x, this.headIterator.y));

		if (this.board[this.headIterator.y][this.headIterator.x].equals(FRUIT_BOX)) {
			this.fruitOnBoard = false;
			toReturn = false;
			//score += scoreCount;
			//scoreCount = 100;
		} //else if (scoreCount != 0)
			//scoreCount--;

		if (this.board[this.headIterator.y][this.headIterator.x].equals(WALL_BOX) || this.board[this.headIterator.y][this.headIterator.x].x < 4) {
      this.state = 3;
			return toReturn;
		}

    move = this.moveBuffer[this.moveBuffer.length - 2];

    switch (this.curMove.x - move.x) {
      case 0:
        this.board[this.headIterator.y - this.curMove.y][this.headIterator.x - this.curMove.x] = new Point(3, Math.abs(move.y));
        break;
      default:
        x = move.x + this.curMove.x;
        y = move.y + this.curMove.y;

        if(x == -1 && y == -1) this.board[this.headIterator.y - this.curMove.y][this.headIterator.x - this.curMove.x] = (move.x === 0)?new Point(2, 3):new Point(2, 1);
        else if(x == 1 && y == -1) this.board[this.headIterator.y - this.curMove.y][this.headIterator.x - this.curMove.x] = (move.x === 0)?new Point(2, 2):new Point(2, 0);
        else if(x == 1 && y == 1) this.board[this.headIterator.y - this.curMove.y][this.headIterator.x - this.curMove.x] = (move.x === 0)?new Point(2, 1):new Point(2, 3);
        else this.board[this.headIterator.y - this.curMove.y][this.headIterator.x - this.curMove.x] = (move.x === 0)?new Point(2, 0):new Point(2, 2);
    }

    switch (2 * this.curMove.x - this.curMove.y) {
      case 1:
        this.board[this.headIterator.y][this.headIterator.x] = new Point(1, 3);
        break;
      case 2:
        this.board[this.headIterator.y][this.headIterator.x] = new Point(1, 0);
        break;
      case -1:
        this.board[this.headIterator.y][this.headIterator.x] = new Point(1, 1);
        break;
      case -2:
        this.board[this.headIterator.y][this.headIterator.x] = new Point(1, 2);
        break;
      default:

    }

		return toReturn;
	};

  this.updateCurMove = function(){
		if (!(this.curMove.x == this.nextMove.x && this.curMove.y == this.nextMove.y) && !(((this.curMove.x + this.nextMove.x) === 0) && ((this.curMove.y + this.nextMove.y) === 0)))
			this.curMove = this.nextMove;
	};

  this.updateInputs = function() {
    if (this.state === 1){
      if (keydownLastUpdate[38]) this.nextMove = MOVE_NORTH;
		  else if(keydownLastUpdate[39]) this.nextMove = MOVE_EAST;
		  else if(keydownLastUpdate[40]) this.nextMove = MOVE_SOUTH;
		  else if(keydownLastUpdate[37]) this.nextMove = MOVE_WEST;
    }
    if (keydownLastUpdate[32] && (this.state === 1 || this.state === 2)) this.state = (this.state === 1)?2:1;
	};

};
