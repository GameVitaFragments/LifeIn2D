
let player;
let map1;
let pointerLock = false;
let mapTexture;
let canvas;

let table;
let tex;
let crossHair;
let ghost;

let entities = [];

function preload() {
		renderShader = loadShader("./Shaders/FuzzyVert.glsl", "./Shaders/FuzzyFrag.glsl");
		map1 = new Map("./assets/maps/map1.csv");
		ImageLoader.preloadUIShader();
		ghost = new Model("./assets/models/ghost.obj", 10);
		tex = loadImage("./assets/texture/white.png");
		crossHair = loadImage("./assets/texture/crosshair.png");
		p_Dialogue = new Dialogue();
		mainSound = new Sound("./assets/sounds/owsong.wav", 0, true);
}

function setup() {
		canvas = createCanvas(windowWidth, windowHeight, WEBGL);
		renderBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
		player = new Player(createVector(300, -50, 350), 20.0, renderBuffer);

		activeShader = 0.0;

		map1.load(tex);
		mainSound.load();


		table = new Item(
		"./assets/models/coffee-table/source/table.obj", 
		200,
		item_Type.Interactible,
		createVector(2000, map1.wallHeight/2, 1100),
		tex,
		renderBuffer,
		player);

		entities.push(table.Obj);
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

		table.update();
		//table.show(renderBuffer, createVector(2000, map1.wallHeight/2, 1100), tex);
		ghost.show(renderBuffer, createVector(1500, map1.wallHeight/2, 4100), tex);
		
		//Test Code//
		
		// let intState = -1;
		// renderBuffer.push();
		// renderBuffer.noStroke();
		// renderBuffer.translate(table.pos.x,-table.pos.y,table.pos.z);
		// if(intState == 0) {
		//   renderBuffer.normalMaterial();
		// }
		// intState = player.interactionState(table);
		// console.log("New IntState",intState);
		// renderBuffer.box(50);
		// renderBuffer.pop();

		//End Test Code//

		//I assume order matters so update the player after everybody
		telepoter.update(renderBuffer);
		p_Inventory.displayItems(screenBuffer,player);
		p_Dialogue.Render(screenBuffer,0,255);
		if(pointerLock) {
			player.update(map1,entities);
		}

		drawScreen(activeShader);
}

function flushBuffers() {
	screenBuffer.clear();
	renderBuffer.clear();
	graphic.clear();
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