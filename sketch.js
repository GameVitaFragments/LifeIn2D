let player
let map1;
let pointerLock = false;
let mapTexture;
let canvas;

function preload() {
    renderShader = loadShader("./Shaders/FuzzyVert.glsl", "Shaders/FuzzyFrag.glsl");
    map1 = new Map("./assets/maps/map1.csv");
    mapTexture = loadImage("./assets/maps/wall2.jpg");
    mainSound = new Sound("./assets/sounds/owsong.wav", 0, true);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    renderBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
    player = new Player(createVector(300, -50, 350), 10.0, renderBuffer);
    activeShader = 0.0;
    map1.load(mapTexture);
    mainSound.load();
}

function draw() {
    background(140, 184, 255);
    var t = millis() * 0.001;
    map1.showMap(player.aabb,  renderBuffer);
    let intState = 0;
    renderBuffer.push();
    renderBuffer.noStroke();
    renderBuffer.translate(400, 0, 500);
    //intState = player.interactionState(createVector(400, 0, 500));
    if(intState == 0) {
      renderBuffer.normalMaterial();
    }
    renderBuffer.box(50);
    renderBuffer.pop();
    if(pointerLock) {
      player.update(map1);
    }
    drawScreen(activeShader);
}

function onPointerlockChange() {
  if (document.pointerLockElement === canvas.elt ||
    document.mozPointerLockElement === canvas.elt)
    console.log("locked");
  else {
    console.log("unlocked");
    pointerLock = false;
    getAudioContext().suspend();
  }
}
document.addEventListener('pointerlockchange', onPointerlockChange, false);

function mouseClicked() {
  pointerLock = true;
    requestPointerLock();
    userStartAudio();
}