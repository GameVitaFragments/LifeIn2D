class Model {
    constructor(path, s) {
        this.model = loadModel(path);
        this.s = s;
        this.aabb = new staticAABB(this.model.vertices, s);
    }

    show(buffer, pos, texture,showTex) {
        this.aabb.update(this.model.vertices, pos);
        buffer.push();
        buffer.translate( pos.x, pos.y, pos.z );
        buffer.noStroke();
        buffer.scale(this.s);
        buffer.angleMode(DEGREES);
        if(!showTex)
        {
            buffer.lights();
            buffer.texture(texture);
        }
        buffer.model(this.model);

        buffer.noFill();
        buffer.strokeWeight(5);
        buffer.stroke(255);
        buffer.scale(1);

        buffer.pop();
        //this.aabb.show(buffer, pos);

    }
}
