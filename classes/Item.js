
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
 	constructor(icon)
 	{
	  	this.icon = icon;
		//this.type = type;
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
	constructor(model,scale, type ,pos,texture, Buffer, player,icon = null) {
		this.pos = pos;
		this.model = model;
		this.type = type;
		this.collected = false;
		this.minDist = 2000;
		this.icon = icon;
		if(type == item_Type.collctibles)
			collctibles.push(this);
		console.log(this.id);
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
	collect()
	{
		console.log("hello");	
        let posVec = createVector(this.pos.x,0,this.pos.z);
        let plVec = createVector(player.position.x,0,player.position.z);
        if((posVec.sub(plVec)).mag()>this.minDist)
        {
            //this._teleport = true;
			return;
        }

		//this.interState=-1;
        collctibles.forEach(element => {
            if(element === this)
            {
                const index = collctibles.indexOf(element);
                if (index > -1) {
                    collctibles.splice(index, 1);
                }
                //console.log(this.ItemList);
            }
        });
		let it = new InvetoryItem(this.icon);
		p_Inventory.addItem(it);
		interactbutton = false;
		this.player.isInteracting = false;
	}

	update() {
		let showTex = false;
		//console.log(this.pos)
		this.interState = this.player.interactionState(this);
		 console.log(this.interState);

       // console.log("Hello World");
		if(this.player.isInteracting && (this.interState==0 || this.interState ==1)) {	
			if(this.type == item_Type.Interactible)
			{	
				this.executeItem();
			}
			else{
				console.log(this.type);
				this.collect();
			}
		}
		this.buffer.push();
		this.buffer.noStroke();
		if(this.interState == 0 || this.interState == 1) {
			this.buffer.normalMaterial();
			showTex = true;
		}
		if(!this.player.isInteracting)
		{
			Dialogue.setTimeSince();
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