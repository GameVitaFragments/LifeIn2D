let loadTexShader;
let images = {}
let screenBuffer;

class ImageLoader
{

    static preloadUIShader()
    {
        loadTexShader = loadShader(
            'Shaders/FuzzyVert.glsl',
            'Shaders/ImageFrag.glsl'
        )
    }

    static setupUIbuffer()
    {
        //********* SETUP THE UI RENDER BUFFER ******* */
        screenBuffer = createGraphics(windowWidth,windowHeight,WEBGL);

        
        //************** SETUP IMAGES TO LOAD *************
        this._loadImage("img1","./assets/Sprites/download.jpg");
        this._loadImage("img2","./assets/Sprites/download.png");
        this._loadImage("compass","./assets/texture/compass.png");

    }

    static _loadImage(name,path)
    {
        images[name]=loadImage(path);
    }
}
