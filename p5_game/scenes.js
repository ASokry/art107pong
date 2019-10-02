var player, ball, ai, player2;
var playerScore = 0;
var aiScore = 0;
var player2Score = 0;
var dots = [];
var dSize = 10;
var txtSize = 30;
var tab = 0;
var reveal = false;

function scene1() {
  //Main Menu
  this.setup = function() {
    //setup for scene1
    console.log("setup for scene1");
  }

  this.enter = function() {
    //entering scene1
    console.log("entering scene1");
    tab = 0;
    reveal = false;
  }

  this.draw = function() {
    background(0);
    push();
    let txtSize = 200;
    let x = width;
    let y = height;

    //translate(x/30,0);
    noStroke();
    fill(255);
    textStyle(BOLD);
    textAlign(LEFT);
    textSize(txtSize);
    text("PONG", 0, y/4);

    strokeWeight(4);
    stroke(255);
    noFill();
    //rectMode(CENTER);
    if (reveal == false) {
      if(tab == 0){
        rect(txtSize/3, y/3, txtSize, txtSize/3);
      }else if(tab == 1){
        rect(txtSize/3, y/3*1.4, txtSize, txtSize/3);
      }
    } else{
      if(tab == 2){
        rect(txtSize/0.62, y/3, txtSize, txtSize/3);
      }else if(tab == 3){
        rect(txtSize/0.62, y/3*1.4, txtSize*1.5, txtSize/3);
      }else if(tab == 4){
        rect(txtSize/0.62, y/3*1.8, txtSize, txtSize/3);
      }
    }

    strokeWeight(1);
    fill(255);
    stroke(0);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    textSize(txtSize/5);

    if (reveal == false) {
      text("1 Player", txtSize/2.5, y/3+15);
      text("2 Players", txtSize/2.5, y/3*1.4+15);
    }else if (reveal == true) {
      text("P1 vs P2", txtSize/0.6, y/3+15);
      text("P1 vs P2 vs AI", txtSize/0.6, y/3*1.4+15);
      text("Back", txtSize/0.6, y/3*1.8+15);
      fill(255,100);
      stroke(0,100);
      text("1 Player", txtSize/2.5, y/3+15);
      text("2 Players", txtSize/2.5, y/3*1.4+15);
    }

    pop();
  }

  this.keyPressed = function() {
    if(reveal == false){
      if(key == 'w' || keyCode == UP_ARROW){
        tab = 0;
      }else if(key == 's' || keyCode == DOWN_ARROW){
        tab = 1;
      }
    }else {
      if(key == 'w' || keyCode == UP_ARROW){
        tab--;
      }else if(key == 's' || keyCode == DOWN_ARROW){
        tab++;
      }
    }

    if(keyCode == ENTER && tab == 0){
      this.sceneManager.showScene(scene2);
    }else if (keyCode == ENTER && tab == 1) {
      reveal = true;
      tab = 2;
    }else if (keyCode == ENTER && tab == 2) {
      this.sceneManager.showScene(scene3);
    }else if (keyCode == ENTER && tab == 4) {
      reveal = false;
      tab = 0;
    }else if (keyCode == ENTER && tab ==3) {
      this.sceneManager.showScene(scene4);
    }
  }
}

function scene2() {
  //Player1 vs AI
  this.setup = function() {
    //setting up scene2
    console.log("Setup for scene2");

    //createCanvas(800, 500);

    player = new Player();
    ball = new Ball();
    ai = new AI();

    for(let y=dSize/2; y<height; y+=dSize*2){
      dots.push(createVector(width/2-dSize/2, y));
    }
  }

  this.enter = function() {
    //entering scene2
    console.log("Entering scene2");
    tab = 0;
    playerScore = 0;
    aiScore = 0;
    ball.res();
  }

  this.draw = function() {
    background(0);

    noStroke();
    fill(255,100);
    this.drawPaddles();

    ball.edges();
    ball.update();
    ball.show();

    player.update();
    player.show();

    ai.update();
    ai.show();

    ball.scores();

    this.drawScores();
  }

  this.drawScores = function() {
    let x1 = width/4;
    let x2 = width*3/4;
    let y = txtSize*1.5;

    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(txtSize);
    text(playerScore,x1,y);
    text(aiScore,x2,y);
  }

  this.drawPaddles = function() {
    for (let i = 0; i < dots.length; i++) {
      let x = dots[i].x;
      let y = dots[i].y;

      rect(x, y, dSize, dSize);
    }
  }

  this.keyPressed = function() {
    if(key == 'w' || keyCode == UP_ARROW){
      player.up();
    }else if(key == 's' || keyCode == DOWN_ARROW){
      player.down();
    }

  }

  this.keyReleased = function() {
    if(key == 'w' || keyCode == UP_ARROW || key == 's' || keyCode == DOWN_ARROW){
      player.stp();
    }
  }
}

function scene3() {
  //Player1 vs Player2
  this.setup = function() {
    //setting up scene3
    console.log("Setup for scene2");

    //createCanvas(800, 500);

    player = new Player();
    ball = new Ball();
    player2 = new Player();

    for(let y=dSize/2; y<height; y+=dSize*2){
      dots.push(createVector(width/2-dSize/2, y));
    }
  }

  this.enter = function() {
    //entering scene3
    console.log("Entering scene3");
    tab = 2;
    playerScore = 0;
    player2Score = 0;
    ball.res();
  }

  this.draw = function() {
    background(0);

    noStroke();
    fill(255,100);
    this.drawPaddles();

    ball.edges();
    ball.update();
    ball.show();

    player.update();
    player.show();

    player2.update();
    player2.show();

    ball.scores();

    this.drawScores();
  }

  this.drawScores = function() {
    let x1 = width/4;
    let x2 = width*3/4;
    let y = txtSize*1.5;

    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(txtSize);
    text(playerScore,x1,y);
    text(player2Score,x2,y);
  }

  this.drawPaddles = function() {
    for (let i = 0; i < dots.length; i++) {
      let x = dots[i].x;
      let y = dots[i].y;

      rect(x, y, dSize, dSize);
    }
  }

  this.keyPressed = function() {
    if(key == 'w'){
      player.up();
    }else if(key == 's'){
      player.down();
    }

    if(keyCode == UP_ARROW){
      player2.up();
    }else if(keyCode == DOWN_ARROW){
      player2.down();
    }

  }

  this.keyReleased = function() {
    if(key == 'w' || key == 's'){
      player.stp();
    }
    if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
      player2.stp();
    }
  }
}

function scene4() {
  //Player1 vs Player2 vs AI
  this.setup = function() {
    //setting up scene4
    console.log("Setup for scene4");

    //createCanvas(800, 500);

    player = new Player();
    ball = new Ball();
    ai = new AI();
    player2 = new Player2();

    for(let y=dSize/2; y<height; y+=dSize*2){
      dots.push(createVector(width/2-dSize/2, y));
    }
  }

  this.enter = function() {
    //entering scene4
    console.log("Entering scene4");
    tab = 3;
    playerScore = 0;
    player2Score = 0;
    aiScore = 0;
    //ball.res();
  }

  this.draw = function() {
    background(0);

    noStroke();
    fill(255,100);
    this.drawPaddles();

    ball.edges();
    ball.update();
    ball.show();

    player.update();
    player.show();
    player2.update();
    player2.show();

    ai.update();
    ai.show();

    ball.scores();

    this.drawScores();
  }

  this.drawScores = function() {
    let x1 = width/4;
    let x2 = width*3/4;
    let x3 = width/2;
    let y = txtSize*1.5;

    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(txtSize);
    text(playerScore,x1,y);
    text(aiScore,x2,y);
    text(player2Score,x3,y);
  }

  this.drawPaddles = function() {
    for (let i = 0; i < dots.length; i++) {
      let x = dots[i].x;
      let y = dots[i].y;

      rect(x, y, dSize, dSize);
    }
  }

  this.keyPressed = function() {
    if(key == 'w'){
      player.up();
    }else if(key == 's'){
      player.down();
    }

    if(keyCode == UP_ARROW){
      player2.up();
    }else if(keyCode == DOWN_ARROW){
      player2.down();
    }

  }

  this.keyReleased = function() {
    if(key == 'w' || key == 's'){
      player.stp();
    }
    if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
      player2.stp();
    }
  }
}
