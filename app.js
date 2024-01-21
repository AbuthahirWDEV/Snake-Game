const gameBoard = document.getElementById('gameBoard')
const context = gameBoard.getContext('2d')
let scoreText = document.getElementById('scoreVal')

const WIDTH  = gameBoard.width
const HEIGHT = gameBoard.height
const UNIT = 25

let foodX
let foodY

let xVel = 25
let yVel = 0

let score = 0

let active = true
let started = false

let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
]

// calling a keypress function to check what key is clicked
window.addEventListener('keydown' , keypress)

// starting the game function
startGame()

function startGame(){
    context.fillStyle = '#212121'
    //fillRect (XAxis , Yaxis , width , height )
    context.fillRect(0,0,WIDTH,HEIGHT)
    //functions
    createFood()
    displayFood()
    drawSnake()
}

function createFood(){
    foodX =  Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT
}


function displayFood(){
    context.fillStyle = 'red'
    context.fillRect(foodX,foodY,UNIT,UNIT)
}

function drawSnake(){
    context.fillStyle = 'aqua'
    context.strokeStyle = '#212121'
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x , snakePart.y , UNIT , UNIT)
        context.strokeRect(snakePart.x , snakePart.y , UNIT , UNIT)
    })
}

function clearBoard(){
    context.fillStyle = '#212121'
    //fillRect (XAxis , Yaxis , width , height )
    context.fillRect(0,0,WIDTH,HEIGHT)
}

function moveSnake(){
    const head = {
        x: snake[0].x + xVel ,
        y: snake[0].y + yVel
    }
    snake.unshift(head)
    if(snake[0].x == foodX && snake[0].y == foodY){
        createFood()
        score = score + 1
        scoreText.innerHTML = score
    }else{
        snake.pop()
    }
}

function nextTick(){
    if(active){
        setTimeout(() =>{
            clearBoard()
            displayFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        },200)
    }else{
        clearBoard()
        // Game Over Display
        context.font = 'bold 50px serif'
        context.fillStyle = '#ffffff'
        context.textAlign = 'center'
        context.fillText('Game Over!!!', WIDTH/2 , HEIGHT/2)
    }
}

function keypress(event){
    // introducing active = true for only key press happen then only snake will move
    // active = true
    if(!started){
        started = true
        nextTick()
    }
    // these numbers are keyboard press numbers that why we are receving an event
    const LEFT  = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
        // with the event we recieved we are checking keycode which has numbers to check which key pressed 
        case(event.keyCode === LEFT && xVel!=UNIT):
            xVel = -UNIT
            yVel = 0
        break;
        case(event.keyCode === RIGHT && xVel!=-UNIT):
            xVel = UNIT
            yVel = 0
        break;
        case(event.keyCode === UP && yVel!=UNIT):
            xVel = 0
            yVel = -UNIT
        break;
        case(event.keyCode === DOWN && yVel!=-UNIT):
            xVel = 0
            yVel = UNIT
        break;
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
        case(snake[0].x >= WIDTH):
        case(snake[0].y < 0):
        case(snake[0].x >= HEIGHT):
            active = false
            break
    }
}