class BallContainer {
    ballList = [];
    nextId = 0;
    constructor() {

    }

    addBall(x, y) {
        this.ballList.push(new Ball(this.nextId, x,y))
        this.nextId++;
    }

    drawBalls() {
        this.ballList.forEach((x) =>{
            x.draw()
        })
    }

    calculateBallsNextLocation(timestamp) {
        // console.log(timestamp)
        this.ballList.forEach((x) => {
            x.calculateNextLocation(timestamp);
        })
    }
    checkColideAndAddForce(timestamp) {
        const width = canvas.width;
        const height = canvas.height;
        this.ballList.forEach((x) =>{
            x.calculateElapsedTimeAndVelocity(timestamp);
        })
        for (let i = 0; i < this.ballList.length; i++) {
            for(let j = i+1; j < this.ballList.length; j++) {
                this.ballList[i].calculateColideWithBall(this.ballList[j]);
            }
        }
        this.ballList.forEach((x) =>{
            x.calculateColideWithFloor(width, height, timestamp)
        })
    }

    findBall(x,y) {
        return this.ballList.find((v)=> {
            return v.position.difference(new Vector(x,y)).length <= v.radius;
        })
    }

    removeBall(ball) {
        this.ballList = this.ballList.filter((x)=> x!==ball);
    }
}