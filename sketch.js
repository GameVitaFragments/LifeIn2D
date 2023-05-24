//let cam;
let player
let map1;
let pointerLock = false;

// function preload() {
//     map1 = new Map("assets/maps/map1.csv");
// }

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    fuzzyTex = createGraphics(windowWidth, windowHeight, WEBGL);
    //cam = new Camera(fuzzyTex);
    player = new Player(fuzzyTex);
    //map1.load();
}

function draw() {
    fuzzyTex.clear();
    background(140, 184, 255);
    var t = millis() * 0.001;
    fuzzyTex.push();
    fuzzyTex.fill(0);
    fuzzyTex.stroke(255, 0, 0);
    fuzzyTex.translate(0, 0, 0);
    fuzzyTex.box(100);
    fuzzyTex.pop();
    fuzzyTex.push();
    fuzzyTex.fill(6, 148, 63);
    fuzzyTex.noStroke();
    fuzzyTex.translate(0, 0, 0);
    fuzzyTex.rotateX(Math.PI / 2);
    fuzzyTex.plane(500);
    fuzzyTex.pop();
    //cam.update();
    player.update();
    texture(fuzzyTex);
    rect(-width / 2, -height / 2, width, height);
    //map1.showMap(player);
}

function mouseClicked() {
  if (!pointerLock) {
    pointerLock = true;
    requestPointerLock();
  } else {
    exitPointerLock();
    pointerLock = false;
  }
}