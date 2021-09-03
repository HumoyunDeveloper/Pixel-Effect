import Scene from "./init.js";
import {
    Rect,
    Circle
} from "./particles.js";

const scene = Scene.Create("#particles", 400, 350);
scene.init();
const {
    canvas,
    buffer
} = scene;
scene.canvas.style.backgroundColor = "gray";
var circleArray = [];

const mouse = {
    x: 0,
    y: 0,
    r: 50,
    vx: 1,
    active: false
};

document.getElementById("file").addEventListener("change", function (e) {
    const files = e.target.files[0];
    if (files.type === "image/png" || files.type === "image/jpeg") {
        putImage(files);
    } else {
        duDialog("Error", "Invalid Image");
    }
});

function putImage(file) {
    const url = URL.createObjectURL(file);
    const image = document.createElement("img");
    image.width = canvas.width;
    image.height = canvas.height;
    image.src = url;
    image.onload = function () {
        startAnimation(image);
    }
}

function startAnimation(image) {
    buffer.drawImage(image, 0, 0, canvas.width / 3, canvas.height / 3);
    var imgData = buffer.getImageData(0, 0, canvas.width / 3, canvas.height / 3);
    buffer.clearRect(0, 0, canvas.width, canvas.height);

    circleArray = [];
    for (var height = 0; height < imgData.height; height++) {
        for (var width = 0; width < imgData.width; width++) {
            if (imgData.data[(height * 4 * imgData.width) - (width * 4) + 3] > 128) {
                var xcoord = width * 3;
                var ycoord = height * 3;
                var r = 1;
                var col = 'rgb(' + imgData.data[(height * 4 * imgData.width) - (width * 4)] + ',' + imgData.data[(height * 4 * imgData.width) - (width * 4) + 1] + ',' + imgData.data[(height * 4 * imgData.width) - (width * 4) + 2] + ')';
                var newBall = new Circle({x: xcoord, y: ycoord, r, color: col});
                newBall.baseX = xcoord;
                newBall.baseY = ycoord;
                circleArray.push(newBall);
            }
        }
    }
    draw();
}

function draw() {
    buffer.clearRect(0, 0, canvas.width, canvas.height);
    // crossEffect();
    update();
    requestAnimationFrame(draw);
}

function update() {
    circleArray.forEach(balls => {
        balls.update(buffer, mouse);
    });
}

function crossEffect() {
    if (mouse.active) {
    }
    else {
        mouse.vx += 0.2;
        mouse.x += mouse.vx;
        mouse.y = c2h + 70;
        if (mouse.x >= cw) {
            mouse.x = 0;
            mouse.vx = 1;
        }
    }
}

function updateMouse(event) {
    mouse.active = true;
    mouse.x = event.clientX - canvas.getBoundingClientRect().left;
    mouse.y = event.clientY - canvas.getBoundingClientRect().top;
}

canvas.oncontextmenu = function (chj) {
    chj.preventDefault();
}

canvas.onmousemove = updateMouse;
canvas.onmouseout = () => mouse.active = false;
document.querySelector("#save").onclick = () => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.style.display = "none";
    var imgData = canvas.toDataURL("image/jpeg", 1); 
    link.href = imgData;
    link.download = new Date().getTime() +  ".jpg";
    link.click();
    document.body.removeChild(link);
};