let time = 0;
let timer = 6000;
//screen 0: title screen
//screen 1: game screen
//screen 2: end screen
////////screen 3: lose screen NO LONGER IMPLEMENTED
//screen 4: how to play screen
//screen 5: high score screen
let screen = 0;
let characterX = 300;
let characterY = 300;
let peach = [];
let scoreMax = 50;
let currentScore = 0;
let scores = [0, 0, 0];
let speed = 5;
let multiplier = 1;
let indicator = 1;

function preload() {
  bg = loadImage('bg.png');
  grassBG = loadImage('grassBG.png');
  titleScreen = loadImage('titleScreen.gif');
  titleScreenHover = loadImage('titleScreenHover.gif');
  homeButton = loadImage('homeButton.png');
  homeButtonHover = loadImage('homeButtonHover.png');
  restartButton = loadImage('restartButton.png');
  restartButtonHover = loadImage('restartButtonHover.png');
  endScreen = loadImage('endScreen.gif');
  loseScreen = loadImage('loseScreen.gif');
  bear1 = loadImage('bear1.png');
  bear2 = loadImage('bear2.png');
  bearFront1 = loadImage('bearFront1.png');
  bearFront2 = loadImage('bearFront2.png');
  bearRight1 = loadImage('bearRight1.png');
  bearRight2 = loadImage('bearRight2.png');
  bearLeft1 = loadImage('bearLeft1.png');
  bearLeft2 = loadImage('bearLeft2.png');
  bearBack1 = loadImage('bearBack1.png');
  bearBack2 = loadImage('bearBack2.png');
  peachImg = loadImage('peach.png');
  peachHighlight = loadImage('peachHighlight.png');
  
  pressStartFont = loadFont('PressStart2P-Regular.ttf');
  WASD = loadImage('WASD.png');
  
  collectSound = loadSound('zapsplat_multimedia_button_click_007_53868.mp3');
  buttonClickSound = loadSound('zapsplat_multimedia_click_003_19369.mp3');
  levelUp = loadSound('zapsplat_multimedia_game_sound_digital_bright_positive_level_up_bonus_001_55271.mp3');
  
}

function setup() {
  createCanvas(600, 600);
  peach = {
    x: random(60, width-60),
    y: random(60, height/2),     
    size: 120,
  };
}

function draw() {
  background(220);
  time += 0.5;
  imageMode(CENTER);
  
  //title screen
  if(screen == 0){
      image(titleScreen, 300, 300, 600, 600);
    if(mouseX>130 && mouseX<470 && mouseY>100 && mouseY<255){
       image(titleScreenHover, 300, 300, 600, 600);
       }
    
    fill(99, 97, 135);
    strokeWeight(7);
    stroke(255);
    rect(70, 310, 200, 50);
    rect(330, 310, 200, 50);
    
    //how to play button
    if(mouseX>70 && mouseX<270 && mouseY>310 && mouseY<360){
       fill(110, 105, 199);
       stroke(255);
       rect(70, 310, 200, 50);
       }
    //highscores button
    if(mouseX>350 && mouseX<550 && mouseY>310 && mouseY<360){
       fill(110, 105, 199);
       stroke(255);
       rect(330, 310, 200, 50);
       }
    
    strokeWeight(0);
    textAlign(LEFT);
    fill(255);
    textSize(15);
    textFont(pressStartFont);
    text('HOW TO PLAY', 90, 345);
    text('HIGHSCORES', 355, 345);
    
  }
  
  
  //game screen
  if(screen == 1){
    image(grassBG, 300, 300, 600, 600);
    
    
    

    if(keyIsDown(83) == false && keyIsDown(68) == false && keyIsDown(65) == false && keyIsDown(87) == false

      ){
      if(time%30 < 15){
         image(bear1, characterX, characterY, 200, 200);
       }
      else{
        image(bear2, characterX, characterY, 200, 200);
      }
    }

    //'s' key
    if(keyIsDown(83)){
      characterY += speed;
      if(time%30 < 15){
         image(bearFront1, characterX, characterY, 200, 200);
       }
      else{
        image(bearFront2, characterX, characterY, 200, 200);
      }
    }

    //'d' key
    if(keyIsDown(68) == true && keyIsDown(83) == false && keyIsDown(65) == false && keyIsDown(87) == false){
      characterX += speed;
      if(time%30 < 15){
         image(bearRight1, characterX, characterY, 200, 200);
       }
      else{
        image(bearRight2, characterX, characterY, 200, 200);
      }
    }

    //'a' key
    if(keyIsDown(65) && keyIsDown(68) == false && keyIsDown(83) == false && keyIsDown(87) == false){
      characterX -= speed;
      if(time%30 < 15){
         image(bearLeft1, characterX, characterY, 200, 200);
       }
      else{
        image(bearLeft2, characterX, characterY, 200, 200);
      }
    }

    //'w' key
    if(keyIsDown(87)){
      characterY -= speed;
      if(time%30 < 15){
         image(bearBack1, characterX, characterY, 200, 200);
       }
      else{
        image(bearBack2, characterX, characterY, 200, 200);
      }
    }

    // check the area of bear
    // strokeWeight(0);
    // fill('rgba(0,255,0, 0.25)');
    // rectMode(CENTER);
    // rect(characterX, characterY, 120, 150);

    warp();
    
    
    
    
    //MULTIPLIERS TEXT
    textSize(10);
    fill(0);
    strokeWeight(5);
    stroke(255);
    text('Press 1 to increase speed (costs 10 peaches)', 50, 540, 550);
    text('Press 2 to add a peach multiplier (costs 15 peaches)', 50, 570, 550);
    
    
    
    

    //game mechanics here
    if(time%30 < 15){
         image(peachImg, peach.x, peach.y, peach.size, peach.size);
       }
      else{
        image(peachHighlight, peach.x, peach.y, peach.size, peach.size);
      }

    if(dist(peach.x, peach.y, characterX, characterY) < peach.size-20){
      peach.isTouching = true;
      currentScore += 1*multiplier;
    }
    else{
      peach.isTouching = false;
    }

    if(peach.isTouching){
      while(dist(peach.x, peach.y, characterX, characterY) < peach.size + 80){
        peach.x = random(60, width-60);
        peach.y = random(60, width-60);
        collectSound.play();
      }
    }
    
    textSize(15);
    text("PEACHES: " + currentScore, 50, 50);
    text("TIME LEFT: " + int(timer/100), 50, 80);
    
   
    

    // if(int(timeSeconds/100) >= 30){
    //    screen = 3;
    //    }
    
    if(timer <= -1){
       screen = 2;
       }
    timer -= 1.4;
  }
  
  
  //end screen
  if(screen == 2){
    image(endScreen, 300, 300, 600, 600);
    
    if(indicator == 1){
      scores.push(currentScore);
      scores.sort(compare);
      indicator = 0;
    }
    
    image(homeButton, 180, 410, 500, 500);
    if(mouseX>100 && mouseX<270 && mouseY>350 && mouseY<430){
       image(homeButtonHover, 180, 410, 500, 500);
       }
    textFont(pressStartFont);
    textSize(25);
    strokeWeight(0);
    fill(255);
    text('SCORE: '+currentScore, 100,  320);
  }
  //lose screen DECIDED NOT TO IMPLEMENT INTO GAME
  if(screen == 3){
    image(loseScreen, 300, 300, 600, 600);
    
    image(homeButton, 300, 410, 600, 600);
    if(mouseX>200 && mouseX<400 && mouseY>340 && mouseY<440){
       image(homeButtonHover, 300, 410, 600, 600);
       }
  }
  
  //how to play screen
  if(screen == 4){
    image(bg, 300, 300, 600, 600);
    textAlign(LEFT);
    textSize(40);
    strokeWeight(5);
    stroke(0);
    text('HOW TO PLAY', 80, 100);
    textSize(15);
    strokeWeight(0);
    text('GOAL: You have 60 seconds to collect as many peaches as fast as you can!', 100, 180, 420);
    image(WASD, 180, 320, 400, 400);
    text('Use these keys to move around.', 320, 280, 200);
    textAlign(CENTER);
    text('Tip: you can trade peaches for faster speed and multipliers!', 100, 400, 420);
    
    
    image(homeButton, 300, 540, 500, 500);
    if(mouseX>220 && mouseX<380 && mouseY>480 && mouseY<570){
       image(homeButtonHover, 300, 540, 500, 500);
       }
  }
  
  
  //highscores screen
  if(screen == 5){
    image(bg, 300, 300, 600, 600);
    textSize(40);
    textAlign(CENTER);
    strokeWeight(5);
    stroke(0);
    text('TOP 3 HIGHSCORES', 80, 100, 500);
    textSize(30);
    strokeWeight(0);
    text('1: ' + scores[0], 300, 250);
    text('2: ' + scores[1], 300, 300);
    text('3: ' + scores[2], 300, 350);
    
    image(homeButton, 300, 540, 500, 500);
    if(mouseX>220 && mouseX<380 && mouseY>480 && mouseY<570){
       image(homeButtonHover, 300, 540, 500, 500);
       }
  }
    
  
}

function warp(){
  if(characterX < -90){
     characterX = width;
     }
  if(characterX > width){
     characterX = -90;
     }
  if(characterY < -90){
     characterY = height;
     }
  if(characterY > height){
     characterY = -90;
     }
}

function mousePressed(){
  //title screen
  
  if(screen == 0 && mouseX>130 && mouseX<470 && mouseY>100 && mouseY<255){
    screen = 1;
    indicator = 1;
    buttonClickSound.play();
  }
  //how to play button
  if(screen == 0 && mouseX>70 && mouseX<270 && mouseY>310 && mouseY<360){
    screen = 4;
    buttonClickSound.play();
  }
    //highscores button
  if(screen == 0 && mouseX>350 && mouseX<550 && mouseY>310 && mouseY<360){
    screen = 5;
    buttonClickSound.play();
  }
  
  //end screen
  if(screen == 2 && mouseX>100 && mouseX<270 && mouseY>350 && mouseY<430){
    restart();
    screen = 0;
    buttonClickSound.play();
    
  }
  
  //lose screen NOT IMPLEMENTED ANYMORE
  if(screen == 3 && mouseX>200 && mouseX<400 && mouseY>340 && mouseY<440){
    restart();
    screen = 0;
    buttonClickSound.play();
  }
  
  //back to home screen from how to play screen
  if(screen == 4 && mouseX>220 && mouseX<380 && mouseY>480 && mouseY<570){
    screen = 0;
    buttonClickSound.play();
  }
  
  if(screen == 5 && mouseX>220 && mouseX<380 && mouseY>480 && mouseY<570){
    screen = 0;
    buttonClickSound.play();
  }
  
}

function restart(){
  time = 0;
  timer = 6000;
  screen = 0;
  characterX = 300;
  characterY = 300;
  scoreMax = 50;
  currentScore = 0;
  speed = 5;
  multiplier = 1;
}

function compare(x, y){
  if(x>y){
    return -1;
  }
  else{
    return 1;
  }
}

function keyPressed(){
  if(keyCode == 49 && screen == 1 && currentScore >= 10){
    speed += 2;
    currentScore -= 10;
    levelUp.play();
  }
  if(keyCode == 50 && screen == 1 && currentScore >= 15){
    multiplier ++;
    currentScore -= 15;
    levelUp.play();
  }
}
