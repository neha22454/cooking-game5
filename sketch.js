var input;
var button;
var name;
var gameState=0
var obstacle,food;
var chief,chiefImage;
var score=0,timer=1000;
var count=0,timer1=20
function preload(){
  restrauntImg1=loadImage("restraunt.png")
  restrauntImg2=loadImage("restraunt1.png")
  
  boyImg1=loadImage("boy1.png")
  boyImg2=loadImage("boy2.png")
  boyImg3=loadImage("boy3.png")
  boyImg4=loadImage("boy4.png")
  girlImg1=loadImage("girl1.png")
  girlImg2=loadImage("girl2.png")
  girlImg3=loadImage("girl3.png")
  chiefImage=loadImage("chief.png")

  pizzaImg=loadImage("pizza.png")
  noodlesImg=loadImage("noodles.png")
  burgerImg=loadImage("burger.png")
  frenchfriesImg=loadImage("french fries.png")
  colddrinkImg=loadImage("cold drink.png")

  coffeeImg=loadImage("coffee.png")
   text1Img=loadImage("text1.PNG")
   text2Img=loadImage("text2.PNG")
   text3Img=loadImage("text3.PNG")
   text4Img=loadImage("text4.PNG")
   text5Img=loadImage("text5.PNG")
   text6Img=loadImage("text6.PNG")

   sound1Img=loadSound("sound1.mp3")
   sound2Img=loadSound("sound2.mp3")
}
function setup() {
  createCanvas(800,400);

  background1=createSprite(400,200,800,400)
  background1.addImage(restrauntImg1)
  chief=createSprite(200,150,10,10)
  chief.visible=false
  chief.addImage(chiefImage)
  chief.scale=0.
  
food1=createSprite(250,50,10,10)
food1.visible=false
food1.addImage(burgerImg)
food1.scale=0.3

food2=createSprite(350,50,10,10)
food2.visible=false
food2.addImage(colddrinkImg)
food2.scale=0.3

food3=createSprite(450,50,10,10)
food3.visible=false
food3.addImage(noodlesImg)
food3.scale=0.3

food4=createSprite(550,50,10,10)
food4.visible=false
food4.addImage(coffeeImg)
food4.scale=0.1

food5=createSprite(650,50,10,10)
food5.visible=false
food5.addImage(frenchfriesImg)
food5.scale=0.08

food6=createSprite(750,50,10,10)
food6.visible=false
food6.addImage(pizzaImg)
food6.scale=0.1

  kitchen=createSprite(400,400,800,50)
  kitchen.visible=false
  input=createInput("ENTER YOUR NAME")
  input.position(200,200)
  button=createButton("START")
  button.position(300,300)
  button.mousePressed(()=>{
    var name=input.value()

   greeting=createElement("h3")
   greeting.html("WELCOME " +  name)
   greeting.position(300,150)
   input.hide()
   button.hide()
   gameState=1
  })

obstaclesGroup=createGroup()
foodGroup=createGroup()
}


function draw() {
  background("pink"); 
  drawSprites();

if(gameState===0){
  fill("cyan")
  stroke("black")
  strokeWeight(3)
  textSize(20)
  text("Click on start to play the game",200,200)
  text("You have to serve the customers by clicking on the food icons",100,300)
}

if(gameState===1){
  kitchen.visible=true
  if(obstaclesGroup.isTouching(kitchen)||obstaclesGroup.isTouching (foodGroup)){
    obstaclesGroup.setVelocityYEach(0)
    spawnFood()
    timer1=timer1-1
    if(timer1>=1){
      sound2Img.play()

    }
    else if(timer1<=0){
      sound2Img.stop()
    }
  }

  textSize(18)
  fill ("black")
  text("score :"+score,100,50)
  text("timer:"+timer,100,100)

  timer=timer-1
  if(timer<=0){
    timer=0
    gameState=2
  }

  if(obstaclesGroup.isTouching(foodGroup)){
    if(mousePressedOver(food1)||mousePressedOver(food2)||mousePressedOver(food3)||mousePressedOver(food4)||
    mousePressedOver(food5)||mousePressedOver(food6)){count=count+1
    sound1Img.play()}

  }

  if(count===1){
    score=score+100
    count=0
  }

  chief.x=mouseX;
  chief.y=mouseY;
  chief.visible=true
  food1.visible=true
  food2.visible=true
  food3.visible=true
  food4.visible=true
  food5.visible=true
  food6.visible=true
  greeting.hide()
  spawnObstacles()
  background1.addImage(restrauntImg2)
  background1.changeImage(restrauntImg2)

}
if(gameState===2){
  chief.visible=false
  food1.visible=false
  food2.visible=false
  food3.visible=false
  food4.visible=false
  food5.visible=false
  food6.visible=false
  foodGroup.destroyEach()
  obstaclesGroup.destroyEach()
 if (score>3000){
   textSize(20)
   fill ("cyan")
   text("you have completed the orders successfully",150,200)
 }
 else{
  textSize(20)
   fill ("cyan")
   text("you have not completed the orders ",150,200) 
 }

 
}
  
}
function spawnObstacles(){
  if (frameCount % 200 === 0){
     obstacle = createSprite(random(100,600),165,10,40);
    obstacle.velocityY= 6;
    obstacle.lifetime=500
    //obstacle.debug=true
    
     //generate random obstacles
     var rand = Math.round(random(1,7));
     switch(rand) {
       case 1: obstacle.addImage(boyImg1);
        obstacle.scale=0.3
               break;

    case 2: obstacle.addImage(boyImg2);
     obstacle.scale=0.5
               break;
       case 3: obstacle.addImage(boyImg3);
        obstacle.scale=0.1
               break;
       case 4: obstacle.addImage(boyImg4);
        obstacle.scale=0.3
               break;
       case 5: obstacle.addImage(girlImg1);
        obstacle.scale=0.5
               break;
       case 6: obstacle.addImage(girlImg2);
       obstacle.scale=0.3
               break;
        case 7: obstacle.addImage(girlImg3);
         obstacle.scale=0.5
                break;
       default: break;
     }


    
     //assign scale and lifetime to the obstacle           
     
    // obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }

 }
 function spawnFood(){
  if(frameCount % 250===0){

  
     food = createSprite(obstacle.x+20,obstacle.y-80,10,40);
    timer1=20
    food.lifetime=500
    rand=Math.round(random(1,6))
     //generate random obstacles
     switch(rand) {
       case 1: food.addImage(text1Img);
      food.scale=0.5
               break;

    case 2: food.addImage(text2Img);
     food.scale=0.5
               break;
       case 3: food.addImage(text3Img);
        food.scale=0.5
               break;
       case 4: food.addImage(text4Img);
        food.scale=0.5
               break;
       case 5:food.addImage(text5Img);
        food.scale=0.5
               break;
       case 6: food.addImage(text6Img);
       food.scale=0.5
               break;
        
       default: break;
     }


    
     //assign scale and lifetime to the obstacle           
     
    // obstacle.lifetime = 300;
    
    //add each obstacle to the group

     foodGroup.add(food);
  }
  }
  
 
 
 