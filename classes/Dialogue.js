let p_Dialogue;
class Dialogue
{
    static timeSince = 0;
    constructor()
    {
        this._text = "";
        this._texSize = 32;
        this.font = loadFont('assets/fonts/trebuc.ttf');
        this.dim1Col = createVector(255,255,255);
        this.dim2Col = createVector(0,0,0);
        this.timeSince = 0;
    }

    Init(Buffer,size = 18)
    {
        this._texSize = size;
    }

    static setTimeSince()
    {
        this.timeSince = millis()/1000;
    }


    changeText(text)
    {
        this._text = text;
    }

    Render(Buffer,a,b)
    {
        Buffer.push();

        let t = millis()/1000;
        if(activeShader === 0)
        {
            Buffer.fill(255,255,255,this.Lerp(t - Dialogue.timeSince,a,b)); 
        }
        else
        {
            Buffer.fill(0,0,0,this.Lerp(t-Dialogue.timeSince,a,b)); 
        }
        Buffer.textFont(this.font);
        Buffer.textSize(this._texSize);
        Buffer.textAlign(CENTER,CENTER);
        Buffer.text(this._text,0,300);
        Buffer.pop();
    }

    Lerp(t,a,b)
    {
        let scale = 1;
        t/=scale;
        return b*(t)+(1-t)*a;
    }
    
}