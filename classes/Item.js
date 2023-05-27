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


class Item
{
    constructor(model,type,pos,minDist,Buffer)
    {
        this.pos = pos;
        this.icon = icon;
        this.type = type;
        this.collected = false;
        this.minDist = minDist;
        Buffer.push();
        transformX(pos.x);
        transformY(pos.y);
        this.Obj = Buffer.box(100);
        Buffer.pop();
    }

    getObj()
    {
        return this.Obj;
    }

    update(PlayerPos)
    {
        var posX = (PlayerPos.x-this.pos.x);
        var posY = (PlayerPos.y-this.pos.y);
        
        this.collected = isCollected(posX,posY);
    }


    isCollected(posX,posY)
    {
        var dist2 = posX*posX + posY*posY;

        if(dist2 <= this.minDist*this.minDist)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}