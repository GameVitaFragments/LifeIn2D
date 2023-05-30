let timeSince = 0;
let teleporter;
class Teleporter
{

    constructor(position)
    {
        this.pos = position;
        this._teleport = false;
        this.change = true;
        this.model = loadModel('assets/models/Teleporter.obj');
        this.down = false;
        this.offsetY = 0;
        this.maxOffset = 300;
        this.pillarCol = createVector(0,0,0);

        this.playerIn = false;
        this.currentWorld = 1;
    }



    update(Buffer)
    {
        Buffer.push();
        Buffer.noStroke();
        Buffer.fill(120,120,120);
        Buffer.translate(this.pos.x,this.pos.y,this.pos.z);
        Buffer.scale(400);
        Buffer.model(this.model);
        Buffer.pop();
        Buffer.push();
        Buffer.noStroke();
        Buffer.fill(120,120,120);
        Buffer.translate(this.pos.x,this.pos.y,this.pos.z);
        let posVec = createVector(this.pos.x,0,this.pos.z);
        let plVec = createVector(player.position.x,0,player.position.z);
        if((posVec.sub(plVec)).mag()<400)
        {
            this._teleport = true;
            this.playerIn = true;
        }
        else
        {
            this.playerIn = false;
            this._teleport = false;
            this.change = true;
            this.down = false;
            timeSince = millis()/1000;
        }
        if(this._teleport === true)
        {
            this.Teleport(Buffer);
        }
    
        Buffer.pop();
    }

    Teleport(Buffer) {
        let t = millis()/1000;


        if(this.down === true && this.offsetY<=-this.maxOffset+1)
        {
            this.offsetY = -this.maxOffset;
            return;
        }
        this.offsetY = this.maxOffset * Math.sin((t - timeSince));
        Buffer.push();
        Buffer.noStroke();
        Buffer.fill(this.pillarCol.x, this.pillarCol.y, this.pillarCol.z);
        Buffer.translate(0,+this.offsetY-200,0);
        Buffer.cylinder(400, 1000);
        Buffer.pop();
        

        if (this.change === false) {
            this.down = true;
            return;
        }

        if (this.offsetY >= this.maxOffset - 1) {
            if (activeShader == 1.0){
                this.pillarCol = createVector(0,0,0); 
                Dialogue.setTimeSince();
                activeShader = 0.0;
                this.currentWorld = 2;
            }
            else
            {
                this.pillarCol = createVector(255,255,255);
                Dialogue.setTimeSince();
                activeShader = 1.0;
                this.currentWorld = 1;
            }
            this.onTeleport();
            this.change = false;
        }

    }

    onTeleport()
    {

        if(curmap === map1)
        {
            if(p_Inventory.heldObj == null)
            {

            }
            else {
                if(p_Inventory.heldObj.icon === images["compass"] && activeShader === 1.0)
                {
                    curmap = map2;
                    player.position = createVector(curmap.spawn2[0][0],-50,curmap.spawn2[0][1]);
                    this.pos = createVector(curmap.spawn2[0][0],-player.position.y-600,curmap.spawn2[0][1]);
                    player.yaw = 0;
                    player.pitch = 0;
                }
            }
        }
        else
        {
            curmap = map1;
            player.position = createVector(curmap.teleport[0][0],-50,curmap.teleport[0][1]);
            this.pos = createVector(curmap.teleport[0][0],-player.position.y-600,curmap.teleport[0][1]);
        }
    }
}

