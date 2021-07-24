var PLAY = 1;
var END = 0;
var gameState = PLAY;
var runner;
var invisibleGround;
var gameover;
var obstacle;
var score;
function preload(){
  
player=loadImage("The runner.gif");
forest=loadImage("dar forest.jpg");
stone=loadImage("stone.png");
gameEnd=loadImage("game over.jpg");
bananaImage=loadImage("banana.png");
jumpingSound=loadSound("362328__josepharaoh99__platform-jump.mp3");
gameoverSound=loadSound("331912__kevinvg207__wrong-buzzer.wav");
pokemon=loadImage("evve-1.gif");
food=loadImage("ketchhup.gif");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  score=0
  
   bg=createSprite(width/2,height/2,width,height);
  bg.addImage(forest);
  //bg.scale=0.50;
  bg.velocityX=-7;
  
 
  
  runner=createSprite(50,height-100,10,10);
  runner.addImage(player);
  runner.scale=0.15;

  invisibleGround=createSprite(50,height,1000,100);
  
  
 
  obstaclesGroup=new Group();
  bananaGroup=new Group();
}

function draw() {
  background(forest);
  
  runner.collide(invisibleGround);
  
  if(gameState===PLAY){
    
    //if(keyDown(UP_ARROW)) {
      //  runner.velocityY = -8;
        //jumpingSound.play()     
    //}
       
    if( touches.length > 0 || keyDown(UP_ARROW)) {
        runner.velocityY = -8;
        jumpingSound.play();
        touches=[];
    }
    
      if( touches.length > 0 || keyDown("space")) {
        runner.velocityY = -8;
        jumpingSound.play();
        touches=[];
    }
    spawnObstacle();
    spawnFood();
    
     runner.velocityY = runner.velocityY + 0.8;
    
  invisibleGround.visible=false;
    
    
  if (runner.y < height- 350 ){
      runner.velocityY=1.0;
    }
  
    if(runner.isTouching(bananaGroup)){
      banana.destroy();
      score=score+2;
    }
    
  if(bg.x < 0){
      bg.x = bg.width /4;
    }
    
    if(runner.isTouching(obstaclesGroup)){
      gameState=END
    }
  }
  
else if(gameState===END){
         obstaclesGroup.destroyEach();  
         runner.destroy();
          gameoverSound.play();
          stroke("white");
          fill("white");
          textSize(30);
          text("GAME OVER",20,100);
          text("Try again",30,150);
          bg.velocityX=0;
  
           gameover=createSprite(width/2,height/2);
          gameover.addImage(gameEnd);
          gameover.scale=0.75;
          
           //text("Computer",50,200);
        }  
  
  
  
  
  drawSprites();
 
 stroke("red");
    textSize(20);
    fill("red");
    text("score="+score,50,20);
}



function spawnFood(){
  if (frameCount % 60 === 0){
    banana = createSprite(300,height-250);
    banana.addImage(food);
    banana.scale = 0.10;
    banana.velocityX = -(7+score/100);
   // banana.x=Math.round(random(300,350));
    
    banana.lifetime = 134;
    bananaGroup.add(banana);
  }
}


function spawnObstacle(){
 
  if (frameCount % 120===0){
    obstacle = createSprite(500,height-100);
  
    obstacle.addImage(pokemon);
    obstacle.scale = 0.20;
    obstacle.velocityX = -(7+score/100);
    obstacle.lifetime =200; 
    obstaclesGroup.add(obstacle);
  }
}