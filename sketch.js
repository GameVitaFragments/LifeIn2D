let player;
let map1;
let pointerLock = false;
//let img;

function preload() {
  renderShader = loadShader("Shaders/FuzzyVert.glsl", "Shaders/FuzzyFrag.glsl");
  map1 = new Map("assets/maps/map1.csv");
  ImageLoader.preloadUIShader();
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  renderBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
  player = new Player(createVector(300, -50, 350), 30.0, renderBuffer);
  activeShader = 0.0;
  map1.load();
  ImageLoader.setupUIbuffer();    
  InventoryInstanceProto();
}

function draw() {
  background(140, 184, 255);
  var t = millis() * 0.001;
  map1.showMap(player.aabb,  renderBuffer);
  player.update(map1);
  p_Inventory.displayItems(screenBuffer,player);
  drawScreen(activeShader);
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

