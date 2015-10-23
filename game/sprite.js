var Sprite = function(image, rows, cols){

  this.image = image;
  this.rows = rows;
  this.cols = cols;
  this.widthPerSection = this.image.width / this.cols;
  this.heightPerSection = this.image.height / this.rows;
  console.log(this.widthPerSection);

  this.render = function(ctx, x, y, row, col){
    ctx.drawImage(this.image, col * this.widthPerSection, row * this.heightPerSection, this.widthPerSection, this.heightPerSection, x, y, this.widthPerSection, this.heightPerSection);
  };

};
