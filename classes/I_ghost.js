class Ghost extends Item
{

	constructor(model,scale, type ,pos,texture, Buffer, player) {   
	    super(model,scale, type ,pos,texture, Buffer, player);
        this.num = 0;
    }
    setDialogue(dial)
    {
        this._Dialogue = dial;
    }

    executeItem()
    {
        p_Dialogue.changeText(this._Dialogue[this.num]);  
		p_Dialogue.Render(screenBuffer,0,255);
        gameState = 1;
    }

    update()
    {
        super.update();
    }

    
}
