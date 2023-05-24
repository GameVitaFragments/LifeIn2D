function err(e) {
    console.log(e);
}

class Map {
    constructor(path) {
        console.log(path);
        this.map = loadTable(path, 'csv', err);
        this.corners = [];
        this.scale = 500;
        this.wallHeight = 700;
        this.wallWidth  = 20;
        // console.log(this.map.getString(0, 0));
    }

    load() {
        for (let r = 0; r < this.map.getRowCount(); r++) {
            let coord = [];
            coord[0] = parseInt(this.map.getString(r, 0));
            coord[1] = parseInt(this.map.getString(r, 1));
            this.corners.push(coord);
        }
        //console.log(this.corners);
    }

    showMap(cam, buffer) {
        let n = this.corners.length;
        for (let i = 0; i < n; i++) {
            let currCorner = this.corners[i];
            let prevCorner = this.corners[(((i-1)%n) + n)%n];

            buffer.strokeWeight(5);
            //line(
            //    this.scale * currCorner[0] - width/4, 300, this.scale * currCorner[1] - height/4,
            //    this.scale * prevCorner[0] - width/4, 300, this.scale * prevCorner[1] - height/4
            //);

            buffer.push();
            buffer.strokeWeight(10);
            buffer.ambientLight(10, 10, 10);
            // directionalLight(200, 200, 0, 1, 0, 0);
            buffer.pointLight(100, 100, 100, cam.eyeX, cam.eyeY + 10, cam.eyeZ);
            buffer.translate(
                this.scale * (currCorner[0] + prevCorner[0])/2 - width/4,
                0,
                this.scale * (currCorner[1] + prevCorner[1])/2 - width/8
            );
            if (prevCorner[0] == currCorner[0]) {
                buffer.box(this.wallWidth, this.wallHeight, (this.scale + this.wallWidth / 8) * Math.abs(prevCorner[1] - currCorner[1]));
            } else {
                buffer.box((this.scale + this.wallWidth / 8)* Math.abs(prevCorner[0] - currCorner[0]), this.wallHeight, this.wallWidth);
            }
            buffer.pop();

            // console.log(currCorner, prevCorner);
            // line(
            //     this.scale * currCorner[0] - width/4, this.scale * currCorner[1] - height/4,
            //     this.scale * prevCorner[0] - width/4, this.scale * prevCorner[1] - height/4
            // );
        }
    }
}
