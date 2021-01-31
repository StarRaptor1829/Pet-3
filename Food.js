class Food{
    constructor(){
       // bedroom=loadImage("images/Bed Room.png")
        ///garden=loadImage("images/Garden.png")
        //washroom=loadImage("images/Wash Room.png")
        this.foodStock=0
        this.lastFed
        this.image=loadImage("images/milk.png")
        
        
    }
    updateFoodstock(foodStock){
        this.foodStock=foodStock;
    }
    getFeedTime(lastFed){
    this.lastFed=lastFed
}
 deductFood(){
     if(this.foodStock>0){
         this.foodStock=this.foodStock-1
     }
 }
getFoodStock(){
    return this.foodStock
}

    display(){
        background("46,137,87")
        fill("255,255,254")
        textSize(15);
        if(lastFed>=12){
            text("Last Fed: "+ lastFed%12 + "PM",50,30)
        }else if(lastFed==0){
          text("Last Fed : 12 AM",50,30)
        }else{
            text("Last Fed : "+ lastFed + " AM", 50,30);
        }
        var x=70, y = 100;

      imageMode(CENTER);
    
      image(this.image,50,220,70,70);

      if(this.foodStock!=0){
          for(var i = 0; i < this.foodStock;i++){
              if(i%10==0){
                  x=70;
                  y=y+50;
              }
              image(this.image,x,y,50,50);
              x=x+30
          }
      }

    }
    bedroom(){
background(bedroom,550,500)
    }

    garden(){
background(garden,550,500)
    }
    washroom(){
background(washroom,550,500)
    }
}