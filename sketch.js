
var monkey;
var monkey_running;
var ground;
var banana;
var bananaImage;
var obstacle;
var obstacleImage;
var FoodGroup;
var obstacleGroup;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var restart;
var restartImage;
var points = 0;
var monkey_collideImage;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart.png");
}

function setup(){
 createCanvas(windowWidth,windowHeight);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,height-20,10,10);
  monkey.scale = 0.20;
  monkey.addAnimation("monkey", monkey_running);
  
    
  ground = createSprite(width/2,height-10,3000,10);
  ground.velocityX = -4
  ground.x = ground.width/2
  ground.shapeColor = "green";
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImage);
  restart.scale = 0.85;
   
}

function draw(){
  background("skyblue");
  fill("black");
  stroke("black");
  textSize(25);
  text("SURVIVAL TIME: "+score, width-250,25);
  
  fill("black");
  stroke("black");
  textSize(25);
  text("POINTS GAINED: "+points,width-550,25);
   
  if (gameState === PLAY){
    restart.visible = false;
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 400) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.3;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
        
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      points = points+1;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    restart.visible = true;
    monkey.scale = 0.20;
 
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("black")
    textSize(50);
    text("OOPS!! You Lost!", width-850, 170);
    
    
    if (mousePressedOver(restart)){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      points = 0;
      gameState = PLAY; 
    }
  }

  
  
  monkey.collide(ground);
  
  drawSprites(); 
  
}

function bananas(){
 
  if (frameCount%80 === 0){
    
    var banana = createSprite(width-10,120,40,10);
    banana.y = Math.round(random(30,500));
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 2000;
    bananaGroup.add(banana);
    
  }
  

  
}

function obstacles(){
  if (frameCount%300== 0){
    
    obstacle = createSprite(width-10,height-55,width,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.25 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 2000;
    obstacleGroup.add(obstacle);
    
  }
  
}