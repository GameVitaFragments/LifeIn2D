const item_Type= Object.freeze({
	Collectible: Symbol('collectible'),
	Interactible: Symbol('interactible')
})
let EnterPressed =false;
function keyPressed()
{
	if(keyCode === 13)
	{
  		EnterPressed = true;       
	}
}

function keyReleased()
{
	if(keyCode === 13)
	{
  		EnterPressed = false;       
 	}
	// return false;
}

class InvetoryItem
{
 	constructor(icon,type)
 	{
	  	this.icon = icon;
		this.type = type;
		this.used = false;
		this.isHeld = false;
	}

	isUsed()
	{
		//console.log("used!!");
		if(EnterPressed === true)
		{
			this.Use();
			this.Destroy();
			EnterPressed = false; 
		}
	}

	Use()
	{        
	  
	}

	Destroy()
	{
	  p_Inventory.removeItem(this);
	}
}


class Item {
	constructor(model, type ,pos, minDist, Buffer, player) {
		this.pos = pos;
		this.icon = icon;
		this.type = type;
		this.collected = false;
		this.minDist = minDist;
		this.interState = -1;
		this.buffer = Buffer;
		this.Obj;
		this.player = player;
	}

	getObj() {
		return this.Obj;
	}

	executeItem() {
		//Item Logic
	}

	update() {
		this.interState = this.player.interactionState(this);
		if(this.interState == 1) {
			executeItem();
		}
		this.buffer.push();
		transformX(pos.x);
		transformY(pos.y);
		this.buffer.noStroke();
		if(this.interState == 0 || this.interState == 1) {
			this.buffer.normalMaterial();
		}
		this.Obj = buffer.box(100);
		this.buffer.pop();

		//Unused Code//
		// var posX = (PlayerPos.x-this.pos.x);
		// var posY = (PlayerPos.y-this.pos.y);

		// this.collected = isCollected(posX,posY);
	}


	isCollected(posX,posY) {
		var dist2 = posX*posX + posY*posY;

		if(dist2 <= this.minDist*this.minDist) {
			return true;
		}
		else {
			return false;
		}
	}
}