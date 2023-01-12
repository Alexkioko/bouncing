const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

//declare a constructor function for the balls, their position, size and velocity
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();  //states that we want to draw a shape on the paper
    ctx.fillStyle = this.color;  //defines the color of the ball
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // traces the arc's shape on the paper
    ctx.fill(); //finishes drawing the ball
}

//define an update function 
Ball.prototype.update = function() {
    //check whether the ball has reached the edge of the box and reverse the direction of movement
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
      }
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    //move the ball each time the function is called
    this.x += this.velX;
    this.y += this.velY;

    //define a method to detect when the balls collide
    Ball.prototype.CollisionDetect = function() {
        for (let j = 0; j < balls.length; j++) {   //start another loop through all the ball in the array
            if (!(this === balls[j])) {  //checks whether the current ball is the same as the one being invoked 
                //check if any of the two circles' areas collide
                const dx = this.x - balls[j].x;     
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if ( distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    }
}

//animating the ball
//create somewhere to store all our balls and then populate it
let balls = [];
while (balls.length < 15) {
    let size = random(10, 20)
    let ball = new Ball(
        //always draw atleast 1-ball width away from the edge to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';  //sets the canvas fill colour to semitransparent black
    ctx.fillRect(0, 0, width, height);  //sraws a rectangle of the same color across the whole width and height of the canvas

    for (let i = 0; i < balls.length; i++) {    //runs the draw and update functions for each ball
        balls[i].draw();
        balls[i].update();
        balls[i].CollisionDetect();
    }
    requestAnimationFrame(loop);  //runs the function again
}

loop();
