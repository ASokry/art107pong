function Player() {
  //Size of Player
  this.w = 15;
  this.h = 80;

  //Position of Player
  this.pos = createVector(this.w*2, height/2-this.h/2);
  //Acceleration of Player
  this.acc = createVector(0,0);
  //Speed of Player
  this.spd = 10;
  //Max Speed of Player
  this.maxSpd = 10;

  //Draws the Player to screen
  this.show = function() {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  //To have player move up
  this.up = function(){
    this.acc.y-=this.spd;

    //For Debug
    //console.log("UP");
  }

  //To have player move down
  this.down = function(){
    this.acc.y+=this.spd;

    //For Debug
    //console.log("DOWN");
  }

  //To have player not move
  this.stp = function(){
    this.acc.y=0;

    //For Debug
    //console.log("STOP");
  }

  //Updates the Player (nomrally used before show)
  this.update = function() {
    this.acc.y = constrain(this.acc.y, -this.maxSpd, this.maxSpd);
    this.pos.add(this.acc);
    this.pos.y = constrain(this.pos.y, 0, height-this.h);
  }
}
