//handles all of the messy stuff
var canvas, context;
var width = window.innerWidth, height = window.innerHeight;

function init() {
    let splash = document.querySelector('#splash-screen');
    splash.style.display = 'none';
    
    canvas = document.querySelector("canvas");
    
    canvas.style.display = 'block';
    
    context = canvas.getContext("2d");
    
    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener("click", click);
    canvas.addEventListener("mousemove", mousemove);
    
    generate_clickable();
    generate_clickable();

    requestAnimationFrame(animate);
}

//the goal: get clicking on the canvas, then novering tooltips.

//objects to click
var objects = [];
/*
    FOR EACH OBJECT ON THE SCREEN:
    
    index | description
    ------+-------------------
       0  | x coordinate
       1  | y coordinate
       2  | width
       3  | height
       4  | active (boolean)
       5  | mouseover text
*/

//for now, generate stuff to click on
function generate_clickable() {
    var x = Math.floor(Math.random() * width), y = Math.floor(Math.random() * height);
    var w = Math.floor(Math.random() * 50) + 50, h = Math.floor(Math.random() * 50) + 50;
    
    objects.push([x, y, w, h, true, "(" + x + ", " + y + ")"]);
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
    
    objects = objects.filter(obj => {return obj[4];});
    
    objects.forEach(obj => {
        context.fillStyle = "rgba(0, 0, 0, .3)";
        context.fillRect(obj[0], obj[1], obj[2], obj[3]);
    });
    
    //get the object that the mouse is hovering over
    for (var i = objects.length - 1; i >= 0; i--) {
        var obj = objects[i];
        
        if (cursor[0] > obj[0] &&
            cursor[0] < obj[0] + obj[2] &&
            cursor[1] > obj[1] &&
            cursor[1] < obj[1] + obj[3]
        ) {
            context.font = "Arial";
            context.fillStyle = "black";
            context.textAlign = "center";
            context.fillText(obj[5], obj[0] + (obj[2] / 2), obj[1] - 30);
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(obj[0] + (obj[2] / 2), obj[1]);
            context.lineTo(obj[0] + (obj[2] / 2), obj[1] - 30);
            context.closePath();
            context.stroke();
            break;
        }
    }
    
    requestAnimationFrame(animate);
}

//event handling

// format: [x, y]
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