var monkey, running;
var banana, bananaimg, obstacle, obstacleimg;
var foodgrp, obsgrp;
var score = 0;
var backimg, back;
var monkeyeating;
var monkeydyingsound;
var backmusic;
var ground;

function preload() {
  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  rockimg = loadImage("rock.png");
  bananaimg = loadImage("banana.png");
  monkeydyingsound = loadSound("monkeydying.wav");
  monkeyeating = loadSound("monkeyeating.wav");
  backimg = loadImage("jungle.jpg");
  backmusic = loadSound("backmus.mp3");
}



function setup() {
  createCanvas(900, 800);
  
  back = createSprite(450, 400, 700, 700);
  back.scale = 1.2;
  back.addImage(backimg);
  backmusic.play();
  backmusic.loop = true;
  monkey = createSprite(150, 650, 350, 350);
  monkey.addAnimation("monkeyimg", monkeyimg);
  monkey.scale = 0.15;
  
  ground = createSprite(450, 690, 900, 20);
  ground.visible = false;
  
  foodgrp = new Group();
  obsgrp = new Group();

  
}


function draw() {
  camera.position.x = displayHeight / 2;
  camera.position.y = monkey.y;
  background("white");



  if (keyDown("space") && monkey.y > 550) {
    monkey.velocityY = -7;
  }

  monkey.velocityY = monkey.velocityY + 0.2;
  
  monkey.collide(ground);
  
  food();
  obs();

  drawSprites();


  stroke("red");
  textSize(20);
  fill("black");
  //text("Score: " + score, 800, 550);

  if (obsgrp.isTouching(monkey)) {
    obsgrp.setLifetimeEach(-1);
    foodgrp.setLifetimeEach(-1);
    obsgrp.destroyEach();
    monkeydyingsound.play();
    monkey.scale = 0.15;
    score = score - score;
    monkey.scale = 0.0000000000000000001;
    obsgrp.velocityX = 0;
    foodgrp.velocityX = 0;
    backmusic.pause();
    backmusic.currentTime = 0;
    }
  
  if (foodgrp.isTouching(monkey)) {
    foodgrp.destroyEach();
    score = score + 1;
    monkey.scale = monkey.scale + 0.03;
    monkeyeating.play();
  }
}



function food() {
  if (camera.position.y % 60 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(420, 680);
    banana.velocityX = -8;

    banana.lifetime = 300;
    banana.addImage(bananaimg);
    banana.scale = 0.05;

    foodgrp.add(banana);
  }
}

function obs() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 620, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(rockimg);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obsgrp.add(obstacle);
  }
}