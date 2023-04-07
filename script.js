function start()
{
    food_img=new Image();
    food_img.src="milk.png";
    trophy=new Image();
    trophy.src="cup.png";
    score=5;
    canvas=document.getElementById("canvas");
    W=canvas.width=1000;
    H=canvas.height=657;
    pen=canvas.getContext("2d");
    ss=67;
    
    food=newfood();
    snake={
        len:5,
        color:"blue",
        cell:[],
        direction:"Right",
        create_snake:function(){
            for(var i=this.len; i>0; i--)
            {
                this.cell.push({x:i,y:0});
            }
        },
        draw_snake:function(){
            for (var i = 0; i < this.cell.length; i++) {
                pen.fillStyle=this.color;
                pen.fillRect(this.cell[i].x*ss,this.cell[i].y*ss,ss-2,ss-2)
            }
        },
        update_snake:function(){
            //for (var i = 0; i < this.cell.length; i++) {
            var head_x=this.cell[0].x;
            var head_y=this.cell[0].y;
            if(head_x==food.x && head_y==food.y)
            {
                food=newfood();
                score++;
            }
            else   
            this.cell.pop();
            var X,Y;
            if(this.direction=="Right")
            {
                X=this.cell[0].x+1;
                Y=this.cell[0].y;
            }
            else if(this.direction=="Left")
            {
                X=this.cell[0].x-1;
                Y=this.cell[0].y;
            }
            else if(this.direction=="Down")
            {
                X=this.cell[0].x;
                Y=this.cell[0].y+1;
            }
            else{
                X=this.cell[0].x;
                Y=this.cell[0].y-1;
            }
            this.cell.unshift({x:X,y:Y});
           
        },
        game_over:function(){
            if(this.cell[0].x<0||this.cell[0].x==Math.round(W/ss)||this.cell[0].y<0||this.cell[0].y==Math.round(H/ss))
            return true;
        }
    };
    snake.create_snake();
    function change_direction(e){
        if(e.key=="ArrowRight"){
            snake.direction="Right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="Left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="Down";
        }
        else{
            snake.direction="Up";
        }
    }
    document.addEventListener("keydown",change_direction);
    
}
function update(){
    
    snake.update_snake();
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.draw_snake();
    pen.drawImage(trophy,23,5,60,60);
    //pen.fillStyle=food.food_color;
    pen.drawImage(food_img,food.x*ss,food.y*ss,ss,ss);
    pen.fillStyle="green";
    pen.font="20px Roboto";
    pen.fillText(score,50,29);
}
function newfood(){
    var food_x=Math.round(Math.random()*(W-ss)/ss);
    var food_y=Math.round(Math.random()*(H-ss)/ss);
    //console.log(food_x);
    //console.log(food_y);
    var food={
        x:food_x,
        y:food_y,
        food_color:"red",
    }
    return food;
}

start();
function game(){
    if(snake.game_over()==true){
        alert("game over!!");
        clearInterval(f);
        location.reaload()
    }
    draw();
    update();
}
var f=setInterval(game,250)

