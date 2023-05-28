
class Material
{
    static dirLight;
    static dirLightCol;
    constructor(vert,frag)
    {
        this._Shader = loadShader(vert,frag);
        this.Graphic = createGraphics(700,700,WEBGL);  
    }

    Init(Buffer,TexPath)
    {
        this._texture = Buffer.loadImage(TexPath);
        this.normalMap = Buffer.loadImage("./assets/Wall_Material/NormalMap.jpg");

    }

    Render(Buffer)
    {
        Buffer.push(); 
        this.Graphic.shader(this._Shader); 
        this.setUniforms();
        this.Graphic.rect(0,0,width,height);
        Buffer.texture(this.Graphic);
        this.RenderObjs(Buffer);
        Buffer.pop();
    }

    RenderObjs(Buffer)
    {
        Buffer.translate(1000,0,1000);
        Buffer.box(300);
    }

    setUniforms()
    {
        //console.log(this._Shader);
        this._Shader.setUniform('texture',this._texture);
        this._Shader.setUniform('NormalMap',this.normalMap);
        this._Shader.setUniform('LightDir',[Material.dirLight.x,Material.dirLight.y,Material.dirLight.z]);
        this._Shader.setUniform('LightCol',Material.dirLightCol);
    }
}