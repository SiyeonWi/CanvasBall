const DEFAULT_RADIUS = 10;
const DEFAULT_COLOR = "blue"
const DEFAULT_ELASTICITY = 0.8
const GRAVITIY = 9.8;

class Vector {
    x;
    y;


    constructor(x, y) {
        this.y = y;
        this.x = x;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y)
    }




    get length() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    normalize() {
        const length = Math.sqrt(this.x**2 + this.y**2);
        return new Vector(this.x/length, this.y/length)

    }

    innerProduct(v) {
        return this.x * v.x + this.y * v.y;
    }

    multiply(n) {
        return new Vector(this.x*n,this.y*n);

    }

    difference(v) {
        return new Vector(this.x-v.x, this.y - v.y);
    }


}

class Ball {
    id;
    targeted;
    position;
    nextPosition;
    color;

    velocity;
    force;

    previousTime;
    elapsedTime;


    constructor(id,x,y) {
        this.id = id;
        this.position = new Vector(x,y);
        this.radius = DEFAULT_RADIUS;
        this.color = DEFAULT_COLOR
        this.velocity = new Vector( 30 - Math.random() * 60,0)
        this.force = new Vector(0,0)
        this.previousTime = null;
        this.targeted = false;
    }

    draw() { //draw this ball in cavnas.
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    calculateNextLocation(timestamp) {
        if(this.targeted == true) return;
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width

        this.position = this.nextPosition;

        //아래는 overflow의 방지용으로 들어간 코드.
        if (this.position.y + this.radius >= canvasHeight) {
            this.position.y = canvasHeight - this.radius;
        } else if(this.position.y - this.radius <= 0) {
            this.position.y = this.radius;
        }

        if (this.position.x + this.radius >= canvasWidth) {
            this.position.x = canvasWidth - this.radius;
        } else if(this.position.x - this.radius <= 0) {
            this.position.x = this.radius;
        }
        this.velocity = this.velocity.add(this.force.multiply(this.elapsedTime))



    }
    //계산 순서 -> colide with ball -> collide with floor -> nextLocation.
    calculateColideWithBall(target) {
        //아니 시발 안돼

        const targetNextPosition = target.nextPosition;
        const distanceVector = targetNextPosition.difference(this.nextPosition);
        const distance = distanceVector.length;
        const distance_radius = this.radius * 2 - distance;




        if ( distance_radius >= 0) {
            const angle = Math.atan2(distanceVector.y,distanceVector.x);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            const relativeVelocity = target.velocity.difference(this.velocity);
            const innerproduct = relativeVelocity.innerProduct(distanceVector);
            if (innerproduct >= 0) {return}

            const vx1 = this.velocity.x * cos + this.velocity.y * sin;
            const vy1 = this.velocity.y * cos + this.velocity.x * sin;

            const vx2 = target.velocity.x * cos + target.velocity.y * sin;
            const vy2 = target.velocity.y * cos + target.velocity.x * sin;





            this.velocity.x =  vx2 * cos - vy1 * sin;
            this.velocity.y = vy1 * cos +   vx2 * sin;
            target.velocity.x =  vx1 * cos - vy2 * sin;
            target.velocity.y = vy2 * cos +   vx1 * sin;
            const normalizedDistanceVector = distanceVector.normalize();
            target.nextPosition = target.nextPosition.add(normalizedDistanceVector.multiply(distance_radius))
        }
    }
    
    calculateColideWithFloor(canvasWidth,canvasHeight, timeStamp) {

        //만약 다음 프레임에서 충돌한다면을 계산하기 위함.


        if (this.nextPosition.x - this.radius <= 0 || this.nextPosition.x + this.radius >= canvasWidth) {
            //충돌 발생 왼쪽 벽면
            this.velocity.x = -this.velocity.x * DEFAULT_ELASTICITY;
            this.force.x -= this.force.x;
        }
        if (this.nextPosition.y - this.radius <= 0 || this.nextPosition.y + this.radius >= canvasHeight) {
            //충돌 발생 왼쪽 벽면
            this.velocity.y = -this.velocity.y * DEFAULT_ELASTICITY;
            this.force.y -= this.force.y
        }
    }

    calculateElapsedTimeAndVelocity(timestamp) {
        //시간 계산용, 반복을 줄이기 위해서.
        this.force.y = GRAVITIY;
        this.previousTime ??= timestamp;
        this.elapsedTime = (timestamp - this.previousTime) / 100;
        this.previousTime = timestamp;


        this.nextPosition = this.position.add(this.velocity.multiply(this.elapsedTime));
    }

}

