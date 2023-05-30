let graphic;
let p_Inventory;

function mouseWheel(event)
{
    if(event.delta > 0)
    {
        p_Inventory.changeItem(1.0);
    }
    else
    {
        p_Inventory.changeItem(-1.0);   
    }
    return false;
}

function InventoryInstanceProto()
{

    //this is just a prototype testing suite
    let it = [];
    p_Inventory = new Inventory(it);

}

class Inventory
{
    
    constructor(it_List)
    {

        graphic = createGraphics(100,100,WEBGL)
        this.heldObjNo = 0;
        this.ItemList = [];
        it_List.forEach(element => {
           this.addItem(element); 
        });
        if(this.ItemList.length>0){
            this.ItemList[this.heldObjNo].isHeld = true;
            this.heldObj = this.ItemList[this.heldObjNo];
        }
        else
        {
            this.heldObj = null;
        }

    }

    changeItem(roll)
    {
        if(this.ItemList.length === 0)
            return;
        else
        {
            this.ItemList[this.heldObjNo].isHeld = true;
            this.heldObj = this.ItemList[this.heldObjNo];
        }
        
        this.heldObjNo += roll; 
       // console.log(this.heldObjNo);
        if(this.heldObjNo > this.ItemList.length-1)
        {
            this.heldObjNo = 0;
        }
        else if(this.heldObjNo < 0)
        {
            this.heldObjNo = this.ItemList.length-1;
        }
        this.heldObj.isHeld = false;  
        this.ItemList[this.heldObjNo].isHeld = true;
        this.heldObj = this.ItemList[this.heldObjNo]; 
    }

    checkUsage()
    {
       // this.heldObj.isUsed();
    }

    addItem(it)
    {
        this.ItemList.push(it);
    }
    removeItem(it)
    {
        this.ItemList.forEach(element => {
            if(element === it)
            {
                const index = this.ItemList.indexOf(element);
                if (index > -1) {
                    this.ItemList.splice(index, 1);
                }
                screenBuffer.clear();
                //console.log(this.ItemList);
            }
        });
        this.changeItem(0.0);
    }

    displayItems(Buffer,Player)
    {
        if(this.heldObj == null && this.ItemList.length != 0)
        {
            this.ItemList[this.heldObjNo].isHeld = true;
            this.heldObj = this.ItemList[this.heldObjNo];
        }
        let x = 0;
        this.ItemList.forEach(element => {
            //createButton();
            Buffer.push();
            Buffer.fill(0,0,0,0);
           //console.log(element.icon);
            loadTexShader.setUniform('texture',element.icon);
            loadTexShader.setUniform('active',element.isHeld); 
            graphic.shader(loadTexShader);
            graphic.rect(0,0,width,height);
            Buffer.texture(graphic);
            Buffer.rect(-width/2+x*120 + 30,-height/2 + 30,100,100);
            Buffer.pop();
            x++;
        });
        this.checkUsage();
        //console.log(x);
    }

}
