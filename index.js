/**
 *      Author: Antoni Chelstowski
 *      Date: 7 September 2022
 *      Description: 
 *          Hopefully next step in learning some graphics shit
 *          This time trying to make a rotating cube with
 *          projection Matrix.
 *      
 *      Any Use of this code is permited
 *      Copy anything you want from this UwU :3
 *      It's probably shit and unoptimized anyways
 */

var canvas          = document.getElementById("canvas");
var ctx             = canvas.getContext('2d');
canvas.width        = document.body.clientWidth;
canvas.height       = window.innerHeight;
var SCREEN_HEIGHT   = canvas.height;
var SCREEN_WIDTH    = canvas.width; 
var globalX         = 0;

ctx.translate(SCREEN_WIDTH/2, SCREEN_HEIGHT/2)

window.addEventListener('resize', onResize, false);

function onResize(){
    canvas.width     = document.body.clientWidth;
    canvas.height    = window.innerHeight;
    SCREEN_HEIGHT    = canvas.height;
    SCREEN_WIDTH     = canvas.width;
    ctx.translate(SCREEN_WIDTH/2, SCREEN_HEIGHT/2)
}

cube1 = new Cube(ctx, 0, -5, -1, 8, 1, 1);
cube2 = new Cube(ctx, 0, -2, -2.2, 8, 4, 0.2)
cube3 = new Cube(ctx, 0, 0, 0, 1, 1, 1);
cube3.updateScale(200)

function update(progress){
    globalX += (1/10)*progress
    cube3.transformAngleY(globalX)
    cube3.transformAngleX(-35)
    // cube3.transformAngleZ(globalX)
}

function draw(){
    //  Draws The Background each frame
    ctx.fillStyle = "rgb(17, 17, 17)"
    ctx.fillRect(-SCREEN_WIDTH/2, -SCREEN_HEIGHT/2, SCREEN_WIDTH, SCREEN_HEIGHT)

    // cube1.draw()
    // cube2.draw()
    cube3.draw()
}

function gameLoop(timeStamp){
    progress = (timeStamp - lastRender);

    update(progress)
    draw()

    lastRender = timeStamp;
    window.requestAnimationFrame(gameLoop);
}

var lastRender = 0;
window.requestAnimationFrame(gameLoop)