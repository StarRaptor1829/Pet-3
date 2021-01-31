var dogImage, happyDog, dog, sadDog
var database
var foodS, foodStock
var fedTime, lastFed, currentTime;
var feed, foodObj, addFood
var bedroom, garden, washroom
var gameState, readState;
function preload()
{
  dogImage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/Happy.png")
 bedroom=loadImage("images/Bed Room.png")
garden=loadImage("images/Garden.png")
washroom=loadImage("images/Wash Room.png")
sadDog=loadImage("images/deadDog.png")
	//load images here
}

function setup() {
database=firebase.database();

  createCanvas(500,500);
  foodObj=new Food();

  
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  readState=databse.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
  feed=createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(200,200,10,10);
  dog.addImage(dogImage);
  dog.scale=0.25
}


function draw() {  
  currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
  update("Sleeping")
  foodObj.bedroom();
}else if(currentTime==(lastFed+2)&& currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}
if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show()
  addFood.show();
  dog.addImage(sadDog);
}

drawSprites();

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}




function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  FeedTime: hour(),
  gameState: "Hungry"
})
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  }

  function update(state){
    database.ref('/').update({
      gameState:state
    })
  }