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
    // console.log(keyCode);
    if(keyCode == 70) {
        interactbutton = true;
    }
    else {
        interactbutton = false;
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
	constructor(model,scale, type ,pos,texture, Buffer, player) {
		this.pos = pos;
		this.model = model;
		this.type = type;
		this.collected = false;
		this.minDist = 900;
		this.scale = scale;
		this.tex = texture;
		this.interState = -1;
		this.buffer = Buffer;
		this.Obj;
		this.player = player;
		this.Obj = new Model(this.model,this.scale);
	}

	setMinDist(dist)
	{
		this.minDist = dist;
	}	
	getObj() {
		return this.Obj;
	}

	executeItem() {
		//Item Logic
		console.log("LOGIC !!");
	}

	update() {
		let showTex = false;
		//console.log(this.pos)
		this.interState = this.player.interactionState(this);
		// console.log(this.interState);
		if(this.interState == 1) {
			this.executeItem();
		}
		this.buffer.push();
		this.buffer.noStroke();
		if(this.interState == 0 || this.interState == 1) {
			this.buffer.normalMaterial();
			showTex = true;
		}
		this.Obj.show(this.buffer,this.pos,this.tex,showTex);
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