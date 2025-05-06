

const ballContainer = new BallContainer();

function draw(timestamp) {

    ctx.clearRect(0,0, canvas.width,canvas.height)
    ballContainer.drawBalls();
    ballContainer.checkColideAndAddForce(timestamp);
    ballContainer.calculateBallsNextLocation(timestamp);


    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
let clickedBall = null;
function mouseClickHandler(e) {
    targetBall =ballContainer.findBall(e.offsetX, e.offsetY)
    if(e.buttons == 2){
        if(targetBall) ballContainer.removeBall(targetBall);
    } else {
        if (targetBall) {
            targetBall.targeted = true;
            clickedBall = targetBall;
        } else {
            ballContainer.addBall(e.offsetX, e.offsetY)
        }
    }
}

function mouseMoveHandler(e) {
    if(clickedBall) {
        const newPosition = new Vector(e.offsetX, e.offsetY);
        clickedBall.velocity = newPosition.difference(clickedBall.position).multiply(1/targetBall.elapsedTime);
        clickedBall.position = newPosition;
    }
}

function mouseUpHandler(e) {
    if(clickedBall) {
        clickedBall.targeted = false;
        clickedBall = null;
    }
}

function mouseOutHandler(e) {
    if (clickedBall) {
        clickedBall.targeted = false;
        clickedBall = null;
    }
}



var rightPressed = false;
var leftPressed = false;

canvas.addEventListener("mousedown", mouseClickHandler, false);
canvas.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
})
canvas.addEventListener("mouseup", mouseUpHandler)
canvas.addEventListener("mousemove", mouseMoveHandler)
canvas.addEventListener("mouseout", mouseOutHandler);

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.stroke();
// ctx.closePath();

