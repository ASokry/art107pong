function Player2() {
  //similar to player.js
  this.w = player.w;
  this.h = player.h;
  this.pos = createVector(width/2 - this.w/2, height/2-this.h/2);
  //this.pos = createVector(width-this.w*3, height/2-this.h/2);
  /*if (tab == 2) {
    this.pos = createVector(width-this.w*3, height/2-this.h/2);
  }else if (tab == 3) {
    this.pos = createVector(width/2 - this.w/2, height/2-this.h/2);
  }*/
  this.acc = createVector(0,0);
  //although it is similar, it must be hard coded
  //to prevent player 1 from controlling player 2
  this.spd = 10;
  this.maxSpd = 10;

  //Draws the Player 2 to screen
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

  //Updates the Player2 (nomrally used before show)
  this.update = function() {
    this.acc.y = constrain(this.acc.y, -this.maxSpd, this.maxSpd);
    this.pos.add(this.acc);
    this.pos.y = constrain(this.pos.y, 0, height-this.h);
  }
}
