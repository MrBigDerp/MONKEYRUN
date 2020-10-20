
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var ground
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,500);
  monkey=createSprite(50,350,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  ground=createSprite(200,410,600,10)
  ground.x = ground.width /2;
   score = 0;
   obstaclesGroup = createGroup();
  FoodGroup= createGroup();
 // monkey.debug=true;
  monkey.setCollider("circle",0,0,275);
}


function draw() {
background("white")
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: ", 500, 50);
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100 ,50);
  score = score + Math.round(getFrameRate()/60);
  drawSprites();
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& monkey.y >= 340) {
        monkey.velocityY = -19;
    } 
  monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
    spawnbanana();
    spawnObstacles();
  if(obstaclesGroup.isTouching(monkey)){
        gameState = END;}
    
    if (gameState === END) {
  
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);  
  
}
  }
function spawnbanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
  
    banana.lifetime = 200;
 
    monkey.depth = banana.depth;
    monkey.depth = banana.depth + 1;
    banana.scale=0.1;
    
   FoodGroup.add(banana);
     
     
  }
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,370,10,10);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.2
    var rand = Math.round(random(1,6));

    obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
     monkey.collide(obstaclesGroup);

 }
  

}




