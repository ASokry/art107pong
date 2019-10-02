function AI(){
  this.w = player.w;
  this.h = player.h;
  this.pos = createVector(width-this.w*3, height/2-this.h/2);
  this.acc = createVector(0,0);
  this.spd = 2;
  this.maxSpd = 15;

  //Draws the AI to screen
  this.show = function() {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  //Updates the AI (nomrally used before show)
  this.update = function() {
    if(ball.pos.y < this.pos.y-this.h/2){
      this.acc.y -= this.spd;
    }else if(ball.pos.y > this.pos.y+this.h/2){
      this.acc.y+=this.spd;
    }

    this.acc.y = constrain(this.acc.y, -this.maxSpd, this.maxSpd);
    this.pos.add(this.acc);
    this.pos.y = constrain(this.pos.y, 0, height-this.h);
  }
}
