const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let kv=false;

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}


let headX = 10;
let headY = 10;

const snakeparts = [];
tailLength = 2;
let score = 0;

let appleX = 5;
let appleY = 5;

let xVlocity=0;
let yVlocity=0;

const speed = 7;

//game loop
function drawGame(){
    
    
    changeSnakePosition();


    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    drawScore();
    checkAppleCollision();
    drawSnake();
    drawApple();
    setTimeout(drawGame,1000 /speed);
}

drawGame();

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function isGameOver(){


    if(xVlocity === 0 && yVlocity === 0){
        return false;
    }
    if(headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount ){
        let gradient = ctx.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1","red");
        ctx.fillStyle = gradient;
        ctx.font = "50px Verdana";
        ctx.fillText("GAME OVER", canvas.width*0.1 , canvas.height*0.5);
        return true;
    }
    for (let i = 0; i < snakeparts.length; i++) {
        if(headX === snakeparts[i].x && headY === snakeparts[i].y){
            let gradient = ctx.createLinearGradient(0,0,canvas.width,0);
            gradient.addColorStop("0","magenta");
            gradient.addColorStop("0.5","blue");
            gradient.addColorStop("1","red");
            ctx.fillStyle = gradient;
            ctx.font = "50px Verdana";
            ctx.fillText("GAME OVER", canvas.width*0.1 , canvas.height*0.5);
            return true;
        }
    }
    return false;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana bolder";
    ctx.fillText("Score :" + score, canvas.width - 50 , 10);
}

function drawSnake(){
    ctx.fillStyle='orange';
    ctx.fillRect(headX * tileCount, headY * tileCount , tileSize,tileSize);
    kv=true;

    ctx.fillStyle='red';
    for (let i = 0; i < snakeparts.length; i++) {
        let part = snakeparts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount , tileSize,tileSize);
    }

    snakeparts.push(new SnakePart(headX,headY));
    while(snakeparts.length > tailLength){
        snakeparts.shift();
    }  
    
}

function changeSnakePosition(){
    headX += xVlocity;
    headY += yVlocity;
}

function drawApple(){
    ctx.fillStyle = 'green';
    ctx.fillRect(appleX * tileCount, appleY * tileCount , tileSize,tileSize);
}

function checkAppleCollision(){
    if(appleX==headX && appleY==headY ){
        let valide = false;
        do{
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            for (let i = 0; i < snakeparts.length; i++) {
                if(appleX === snakeparts[i].x && appleY === snakeparts[i].y){
                    valide = true;
                    console.log("ff");
                }
            }
        }while(valide);
        
        tailLength += 1;
        score++;
    }
}

document.body.addEventListener('keydown',KeyDown);

function KeyDown(event){
    //up
    if(event.keyCode == 38 && kv){
        if (yVlocity == 1){
            return ;
        }
        yVlocity = -1;
        xVlocity = 0;
        kv=false;
    }
    
    //down
    if(event.keyCode == 40 && kv){
        if (yVlocity == -1){
            return ;
        }
        yVlocity = 1;
        xVlocity = 0;
        kv=false;

    }

    //left
    if(event.keyCode == 37 && kv){
        if (xVlocity == 1){
            return ;
        }
        yVlocity = 0;
        xVlocity = -1;
        kv=false;
    }

    //right
    if(event.keyCode == 39 && kv){
        if (xVlocity == -1){
            return ;
        }
        yVlocity = 0;
        xVlocity = 1;
        kv=false;
    }
}