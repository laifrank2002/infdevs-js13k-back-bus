//handles all of the messy stuff
var canvas, context;
var width = window.innerWidth, height = window.innerHeight;

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    
    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener("click", click);
    canvas.addEventListener("mousemove", mousemove);
}

//the goal: get clicking on the canvas, then novering tooltips.

//objects to click
var objects = [];

//for now, generate stuff to click on
function generate_clickable() {
    var x = Math.floor(Math.random() * width), y = Math.floor(Math.random() * height);
    var w = Math.floor(Math.random() * 50) + 50, h = Math.floor(Math.random() * 50) + 50;
    
    objects.push([x, y, w, h, true]);
}

//animation related
var last_time = null, lapse = 0;
function animate(time) {
    if (last_time == null) {
        lapse = 0;
    } else {
        lapse = time - last_time;
    }
    last_time = time;
    
    //do what you need to do
    
    //clear the screen
    context.clearRect(0, 0, width, height);
    
    //get rid of what's not active (index 4)
    objects = objects.filter(obj => {return obj[4];});
    
    objects.forEach(obj => {
        context.fillStyle = "rgba(0, 0, 0, .3)";
        context.fillRect(obj[0], obj[1], obj[2], obj[3]);
    });
    
    requestAnimationFrame(animate);
}

//event handling
var cursor = [0, 0];
function click(e) {
    //for now
    
    console.log("click at " + e.clientX + ", " + e.clientY);
    
    //loop through objects BACKWARDS to find out which is clicked
    for (var i = objects.length - 1; i >= 0; i--) {
        var obj = objects[i];
        if (e.clientX > obj[0] &&
            e.clientX < obj[0] + obj[2] &&
            e.clientY > obj[1] &&
            e.clientY < obj[1] + obj[3]
        ) {
            obj[4] = false;
            console.log("clicked on a black rectangle.");
            //replace it.
            generate_clickable();
            break;
        }
    }
}

function mousemove(e) {
    cursor = [e.clientX, e.clientY];
}

generate_clickable();
generate_clickable();

requestAnimationFrame(animate);