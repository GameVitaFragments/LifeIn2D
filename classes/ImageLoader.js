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
        this._loadImage("img1","./assets/Sprites/download.jpg",screenBuffer);
        this._loadImage("img2","./assets/Sprites/download.png",screenBuffer);
        
    }

    static _loadImage(name,path,Buffer)
    {
        images[name]=Buffer.loadImage(path);
    }
}