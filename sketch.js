let player
let map1;
let mapTexture;

let pointerLock = false;

let table;
let tabelTex;
let ghost;
let tex;

let entities = [];

function preload() {
    renderShader = loadShader("Shaders/FuzzyVert.glsl", "Shaders/FuzzyFrag.glsl");
    map1 = new Map("assets/maps/map1.csv");
    table = new Model("./assets/models/coffee-table/source/table.obj", 200);
    ghost = new Model("./assets/models/ghost.obj", 10);
    tex = loadImage("./assets/texture/white.png");
    ImageLoader.preloadUIShader();
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    renderBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
    player = new Player(createVector(300, 0, 350), 30.0, renderBuffer);
    activeShader = 0.0;
    map1.load(tex);

    entities.push(table);
    entities.push(ghost);

    ImageLoader.setupUIbuffer();    
    InventoryInstanceProto();
}

function draw() {
    renderBuffer.background(140, 184, 255);
    map1.showMap(player.aabb,  renderBuffer);

    table.show(renderBuffer, createVector(2000, map1.wallHeight/2, 1100), tex);
    ghost.show(renderBuffer, createVector(1500, map1.wallHeight/2, 4100), tex);

    player.update(map1, entities);
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
