
let gameState = 0;

let game = [
	() => {

	},
	() => {
		if (!avatarBoard.complete) {
			pointerLock = false;
			avatarBoard.update(screenBuffer);
			screenBuffer.image(avatarBoard.buffer, -avatarBoard.w/2, -avatarBoard.h/2, avatarBoard.w, avatarBoard.h);
		} else {
			pointerLock = true;
			gameState++;
		}
	},
	() => {
		ghos.num = 1;
	}
];

let player;
let map1;
let map2;
let curmap = map1;
let pointerLock = false;
let mapTexture;
let canvas;

let tex;
let crossHair;
let ghost;
let collectibles = [];
let collctiblesD1 = [];
let collctiblesD2 = [];
let entities = [];
let entitiesD1 = [];
let entitiesD2 = [];

let avatarBoard;
let avatarImages = [];
let draggables = [];

let compass;


function preload() {
	renderShader = loadShader("./Shaders/FuzzyVert.glsl", "./Shaders/FuzzyFrag.glsl");
	map1 = new Map("./assets/finalMap/corners1.csv", 1);
	map2 = new Map("./assets/finalMap/corners2.csv", 2);
	ImageLoader.preloadUIShader();
	// ghost = new Model("./assets/models/ghost.obj", 10);
	tex = loadImage("./assets/texture/white.png");
	crossHair = loadImage("./assets/texture/crosshair.png");
	p_Dialogue = new Dialogue();
	mainSound = new Sound("./assets/sounds/Moozik.wav", 100, true);

	avatarImages.push(loadImage("assets/Sprites/fire.png"));
	avatarImages.push(loadImage("assets/Sprites/earth.png"));
	avatarImages.push(loadImage("assets/Sprites/water.png"));
	avatarImages.push(loadImage("assets/Sprites/wind.png"));
	avatarImages.push(loadImage("assets/Sprites/leaf.jpg"));

}

function setup() {
	curmap = map1;
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	renderBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
	player = new Player(createVector(300, -50, 350), 20.0, renderBuffer);

	activeShader = 0.0;

	map1.load(tex);
	map2.load(tex);
	mainSound.load();


	ImageLoader.setupUIbuffer();

	// ghost = new Ghost (
	// 	"./assets/models/ghost.obj",
	// 	10,
	// 	item_Type.Interactible,
	// 	createVector(1500, map1.wallHeight/2, 4100),
	// 	tex,
	// 	renderBuffer,
	// 	player
	// );
	// compass = new Item(
	// 	"./assets/models/compass.obj",
	// 	100,
	// 	item_Type.collctibles,
	// 	createVector(45 * map1.scale, map1.wallHeight/3, 6 * map1.scale),
	// 	tex,
	// 	renderBuffer,
	// 	player,
	// 	images["compass"],
	// 	2
	// );

	compass = new Item(
		"./assets/models/compass.obj",
		100,
		item_Type.collctibles,
		createVector(45 * map1.scale, map1.wallHeight/3, 6 * map1.scale),
		tex,
		renderBuffer,
		player,
		images["compass"],
		2
	);

	ghost = new Ghost(
		"./assets/models/ghost.obj",
		7,
		item_Type.Interactible,
		createVector(3 * map1.scale, map1.wallHeight/4, 41 * map1.scale),
		tex,
		renderBuffer,
		player,
	);

	ghostdials = [
		"Solve the Puzzle \n Press esc to start"
	];
	ghost.setDialogue(
		ghostdials
	)
	//entitiesD1.push(table);
	entitiesD1.push(ghost);

	InventoryInstanceProto();
	
	p_Dialogue.Init(renderBuffer);
	//telepoter = new Teleporter(createVector(45 * map1.scale, -player.position.y-600, 6* map1.scale));
	telepoter = new Teleporter(createVector(map1.teleport[0][0], -player.position.y-600, map1.teleport[0][1]));


	for (let i = 0; i < avatarImages.length; i++) {
		draggables.push(
			new Draggable( 50 * random(1, width/50 - 1), 50 * random(1, height/50 - 1), 50, 50, avatarImages[i])
		);
	}
	avatarBoard = new Board(draggables);
}

function draw() {
	//Important Keep it above all others
	flushBuffers();

	renderBuffer.background(140, 184, 255);


	curmap.showMap(player.aabb,  renderBuffer);

	if(activeShader == 0.0)
	{
		entities = entitiesD1;
		collctibles = collctiblesD1;
		// table.update();
	}
	else
	{
		entities = entitiesD2;
		collctibles = collctiblesD2;
		//ghost.update();
	}

	collctibles.forEach(element => {
		element.update();
	});
	entities.forEach(element => {
		element.update();
	});


	p_Inventory.displayItems(screenBuffer,player);



	if(pointerLock) {
		player.update(curmap,entities);
	}
	telepoter.update(renderBuffer);
	game[gameState]();

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
	if (gameState == 1) {
		return;
	}
	pointerLock = true;
	requestPointerLock();
	userStartAudio();
}

function mousePressed() {
	for (let i = 0; i < draggables.length; i++) {
		draggables[i].pressed();
	}
}

function mouseReleased() {
	for (let i = 0; i < draggables.length; i++) {
		draggables[i].released();
	}
}
