let obj;

function Ball(){
  this.pos = createVector(width/2, height/2);
  this.r = 10;
  this.maxSpd = createVector(20,15);
  this.collision = false;

  do{
    this.acc = p5.Vector.random2D();
    this.acc.setMag(random(4,6));
  }while(abs(this.acc.x)<3 || abs(this.acc.y)<3);

  this.show = function(){
    noStroke();
    fill(255);
    ellipse(this.pos.x,this.pos.y, this.r*2);
  }

  this.update = function() {
    this.pos.add(this.acc);

    if(this.pos.y < this.r || this.pos.y > height-this.r){
      this.acc.y *= -1;
    }
  }

  this.edges = function(){
    let collidedF = false;
    let collidedT = false;

    if (tab == 0) {
      //check if hitting front of player or AI
      for(let i=0; i<ai.h; i++){
        let d1, d2;
        d1 = dist(this.pos.x, this.pos.y, ai.pos.x, ai.pos.y+i);
        d2 = dist(this.pos.x, this.pos.y, player.pos.x+player.w, player.pos.y+i);

        if(d1 <= this.r){
          collidedF = true;
          obj = ai;
          break;
        }else if(d2 <= this.r){
          collidedF = true;
          obj = player;
          break;
        }
      }

      //check if hitting top or bottom of player or AI
      for(let i=0; i<ai.w; i++){
        let d1t, d2t, d1b, d2b;
        d1t = dist(this.pos.x, this.pos.y, ai.pos.x+i, ai.pos.y);
        d2t = dist(this.pos.x, this.pos.y, player.pos.x+i, player.pos.y);
        d1b = dist(this.pos.x, this.pos.y, ai.pos.x+i, ai.pos.y+ai.h);
        d2b = dist(this.pos.x, this.pos.y, player.pos.x+i, player.pos.y+player.h);

        if(d1t <= this.r || d1b <= this.r){
          collidedT = true;
          obj = ai;
          break;
        }else if(d2t <= this.r || d2b <= this.r){
          collidedT = true;
          obj = player;
          break;
        }
      }
    }else if (tab == 2) {
      //check if hitting front of player1 or player2
      for(let i=0; i<player.h; i++){
        let d1, d2;
        d1 = dist(this.pos.x, this.pos.y, player2.pos.x, player2.pos.y+i);
        d2 = dist(this.pos.x, this.pos.y, player.pos.x+player.w, player.pos.y+i);

        if(d1 <= this.r){
          collidedF = true;
          obj = player2;
          break;
        }else if(d2 <= this.r){
          collidedF = true;
          obj = player;
          break;
        }
      }

      //check if hitting top or bottom of player1 or player2
      for(let i=0; i<player.w; i++){
        let d1t, d2t, d1b, d2b;
        d1t = dist(this.pos.x, this.pos.y, player2.pos.x+i, player2.pos.y);
        d2t = dist(this.pos.x, this.pos.y, player.pos.x+i, player.pos.y);
        d1b = dist(this.pos.x, this.pos.y, player2.pos.x+i, player2.pos.y+player2.h);
        d2b = dist(this.pos.x, this.pos.y, player.pos.x+i, player.pos.y+player.h);

        if(d1t <= this.r || d1b <= this.r){
          collidedT = true;
          obj = player2;
          break;
        }else if(d2t <= this.r || d2b <= this.r){
          collidedT = true;
          obj = player;
          break;
        }
      }
    }else if (tab == 3) {
      //check if hitting front of player1 or player2 or AI
      for(let i=0; i<player.h; i++){
        let d1, d2, d3_2,d4_2;
        d1 = dist(this.pos.x, this.pos.y, ai.pos.x, ai.pos.y+i);
        d2 = dist(this.pos.x, this.pos.y, player.pos.x+player.w, player.pos.y+i);
        d3_2 = dist(this.pos.x, this.pos.y, player2.pos.x+player2.w, player2.pos.y+i);
        d4_2 = dist(this.pos.x, this.pos.y, player2.pos.x, player2.pos.y+i);

        if(d1 <= this.r){
          collidedF = true;
          obj = ai;
          break;
        }else if(d2 <= this.r){
          collidedF = true;
          obj = player;
          break;
        }else if (d3_2 <= this.r || d4_2 <= this.r) {
          collidedF = true;
          obj = player2;
          break;
        }
      }

      //check if hitting top or bottom of player1 or player2
      for(let i=0; i<player.w; i++){
        let d1t, d2t, d1b, d2b, d3t, d3b;
        d1t = dist(this.pos.x, this.pos.y, ai.pos.x+i, ai.pos.y);
        d2t = dist(this.pos.x, this.pos.y, player.pos.x+i, player.pos.y);
        d1b = dist(this.pos.x, this.pos.y, ai.pos.x+i, ai.pos.y+ai.h);
        d2b = dist(this.pos.x, this.pos.y, player.pos.x+i, player.pos.y+player.h);
        d3t = dist(this.pos.x, this.pos.y, player2.pos.x+i, player2.pos.y);
        d2b = dist(this.pos.x, this.pos.y, player2.pos.x+i, player2.pos.y+player2.h);

        if(d1t <= this.r || d1b <= this.r){
          collidedT = true;
          obj = ai;
          break;
        }else if(d2t <= this.r || d2b <= this.r){
          collidedT = true;
          obj = player;
          break;
        }else if (d3t <= this.r || d3b <= this.r) {
          collidedT = true;
          obj = player2;
          break;
        }
      }
    }

    //what happens when ball collides with paddle
    if(collidedF && !this.collision){
      //what happens when hitting front of paddle
      this.collision = true;

      this.acc.add(createVector(0.5, obj.acc.y*0.25));
      this.acc.x *= -1;
      this.acc.x = constrain(this.acc.x, -this.maxSpd.x, this.maxSpd.x);
      this.acc.y = constrain(this.acc.y, -this.maxSpd.y, this.maxSpd.y);
    }else if(collidedT && !this.collision) {
      //what happens when hitting top or bottom
      this.collision = true;

      this.acc.y *= -1;
    }else{
      this.collision = false;
    }
  }

  this.scores = function(){
    if (tab == 0) {
      if(this.pos.x + this.r < 0){
        aiScore++;
        this.res();
      }else if(this.pos.x - this.r > width){
        playerScore++;
        this.res();
      }
    }else if (tab == 2) {
      if(this.pos.x + this.r < 0){
        player2Score++;
        this.res();
      }else if(this.pos.x - this.r > width){
        playerScore++;
        this.res();
      }
    }else if (tab == 3) {
      if(obj==ai && this.pos.x + this.r < 0){
        aiScore++;
        this.res();
      }else if(obj==player && this.pos.x - this.r > width){
        playerScore++;
        this.res();
      }else if (obj==player2 && (this.pos.x + this.r < 0 || this.pos.x - this.r > width)) {
        player2Score++;
        this.res();
      }
    }

    if(aiScore == 8 || playerScore == 8 || player2Score == 8) {
      this.acc.x = 0;
      this.acc.y = 0;
      this.gameEnd();
    }
  }

  this.res = function() {
    if (tab == 0) {
      ai.pos = createVector(width-ai.w*3, height/2-ai.h/2);
      player.pos = createVector(player.w*2, height/2-player.h/2);
    }else if (tab == 2) {
      player2.pos = createVector(width-player2.w*3, height/2-player2.h/2);
      player.pos = createVector(player.w*2, height/2-player.h/2);
    }else if (tab == 3) {
      ai.pos = createVector(width-ai.w*3, height/2-ai.h/2);
      player.pos = createVector(player.w*2, height/2-player.h/2);
      player2.pos = createVector(width/2 - player2.w/2, height/2-player2.h/2);
    }

    this.pos = createVector(width/2, height/2);
    do{
      this.acc = p5.Vector.random2D();
      this.acc.setMag(random(4,6));
    }while(abs(this.acc.x)<3 || abs(this.acc.y)<3);
  }

  this.gameEnd = function() {
    let txtSize = 200;
    let x = width/2;
    let y = height/2 + txtSize/3;

    noStroke();
    fill(255);
    textSize(txtSize);
    textStyle(BOLD);
    textAlign(CENTER);

    if (tab == 0) {
      if (aiScore == 8) {
        text("LOSE", x, y);
      }else if (playerScore == 8) {
        text("WIN", x, y);
      }
    }else if (tab == 2) {
      if (playerScore == 8) {
        text("Player 1", x, y - txtSize/2);
        text("Win", x, y + txtSize/2);
      }else if (player2Score == 8) {
        text("Player 2", x, y - txtSize/2);
        text("WIN", x, y + txtSize/2);
      }
    }else if (tab == 3) {
      if (playerScore == 8) {
        text("Player 1", x, y - txtSize/2);
        text("Win", x, y + txtSize/2);
      }else if (player2Score == 8) {
        text("Player 2", x, y - txtSize/2);
        text("WIN", x, y + txtSize/2);
      }else if (aiScore == 8) {
        text("AI", x, y - txtSize/2);
        text("WIN", x, y + txtSize/2);
      }
    }
  }
}
