
let player;
let map1;
let pointerLock = false;


let table;
let tabelTex;
let ghost;
let tex;

let entities = [];

function preload() {
  renderShader = loadShader("Shaders/FuzzyVert.glsl", "Shaders/FuzzyFrag.glsl");
  map1 = new Map("assets/maps/map1.csv");
  ImageLoader.preloadUIShader();
  table = new Model("./assets/models/coffee-table/source/table.obj", 200);
  ghost = new Model("./assets/models/ghost.obj", 10);
  tex = loadImage("./assets/texture/white.png");
  p_Dialogue = new Dialogue();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  renderBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
  player = new Player(createVector(300, -50, 350), 30.0, renderBuffer);
   
  
  activeShader = 0.0;


  map1.load(tex);
  entities.push(table);
  entities.push(ghost);


  ImageLoader.setupUIbuffer();    
  InventoryInstanceProto();
  
  p_Dialogue.Init(renderBuffer);
  telepoter = new Teleporter(createVector(4000, -player.position.y-600, 6000));
}

function draw() {

  //Important Keep it above all others
  flushBuffers();


  renderBuffer.background(140, 184, 255);

  //Check If Needed or Not
  //var t = millis() * 0.001;



  map1.showMap(player.aabb,  renderBuffer);

  table.show(renderBuffer, createVector(2000, map1.wallHeight/2, 1100), tex);
  ghost.show(renderBuffer, createVector(1500, map1.wallHeight/2, 4100), tex);

  //Try to preserve order not sure if order matters
  player.update(map1,entities);
  telepoter.update(renderBuffer);
  p_Inventory.displayItems(screenBuffer,player);
  p_Dialogue.Render(screenBuffer,0,255);
  drawScreen(activeShader);
}

function flushBuffers()
{
  screenBuffer.clear();
  renderBuffer.clear();
  graphic.clear();
}

function mouseClicked() {
    if (!pointerLock) 
    {
        pointerLock = true;
        requestPointerLock();
    } 
    else 
    {
        exitPointerLock();
        pointerLock = false;
    }
}