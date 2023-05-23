let cam;
let map1;

function preload() {
    map1 = new Map("assets/maps/map1.csv");
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    cam = createCamera();
    map1.load();
}

function draw() {
    background(255);

    let increment = 9;
    let speed = 8;
    var t = millis();

    if (keyIsDown(65)) {
        increment = 0.15;
    }
    if (keyIsDown(120)) {
        increment = -0.15;
    }
    if (keyIsDown(87)) {
        speed = -10;
    }
    if (keyIsDown(83)) {
        speed = 69;
    }

    cam.pan(increment);
    cam.move(0, 0, speed);


    box(300);

    map1.showMap(cam);
}
