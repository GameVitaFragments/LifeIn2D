function err(e) {
    console.log(e);
}

class Map {
    constructor(path) {
        this.map = loadTable(path, 'csv', err);
        this.corners = [];
        this.scale = 500;
        this.wallHeight = 800;
        this.wallWidth  = 200;
    }

    load(tex) {
        this.texture = tex;
        for (let r = 0; r < this.map.getRowCount(); r++) {
            let coord = [];
            coord[0] = parseInt(this.map.getString(r, 0));
            coord[1] = parseInt(this.map.getString(r, 1));
            this.corners.push(coord);
        }
        let n = this.corners.length;
    }

    showMap(playerAABB, buffer) {
        this.boundingBoxes = [];
        let n = this.corners.length;
        for (let i = 0; i < n; i++) {
            let currCorner = this.corners[i];
            let prevCorner = this.corners[(((i-1)%n) + n)%n];

            buffer.strokeWeight(5);

            buffer.push();
            buffer.noStroke();
            buffer.translate(
                this.scale * (currCorner[0] + prevCorner[0])/2,
                0,
                this.scale * (currCorner[1] + prevCorner[1])/2
            );
            let l;
            let w;
            let h;
            buffer.lights();
            buffer.texture(this.texture);
            if (prevCorner[0] == currCorner[0]) {
                buffer.box(this.wallWidth, this.wallHeight, (this.scale + this.wallWidth / 8) * Math.abs(prevCorner[1] - currCorner[1]));
                l = this.wallWidth;
                w = this.wallHeight;
                h = this.scale * Math.abs(prevCorner[1] - currCorner[1]);
            } else {
                buffer.box((this.scale + this.wallWidth / 8)* Math.abs(prevCorner[0] - currCorner[0]), this.wallHeight, this.wallWidth);
                l = this.scale * Math.abs(prevCorner[0] - currCorner[0]);
                w = this.wallHeight;
                h = this.wallWidth;
            }
            this.boundingBoxes.push(
                new AABB(
                    this.scale * (currCorner[0] + prevCorner[0])/2,
                    0,
                    this.scale * (currCorner[1] + prevCorner[1])/2,
                    l,
                    w,
                    h,
                )
            );

            buffer.rotateX(millis()/100);
            buffer.plane(30);

            buffer.pop();

        }
        for (let i = 0; i < this.boundingBoxes.length; i++) {
            let curr = this.boundingBoxes[i];
            curr.update();
            // if (curr.isColliding(playerAABB)) {
            //     //console.log(i);
            // }
        }
    }
}
